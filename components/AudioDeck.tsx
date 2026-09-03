"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, Radio, Disc, Sparkles } from "lucide-react";
import { playUiClick, playSuccessChime } from "@/lib/audio";

export { playUiClick, playSuccessChime };

export default function AudioDeck() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [minimized, setMinimized] = useState(true);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const animIntervalRef = useRef<any>(null);

  const tracks = [
    { title: "SHIBUYA_RAIN_23:42", rootFreq: 110, bpm: "72 BPM", vibe: "Deep Loopback Drone" },
    { title: "AKIRA_NEO_HIGHWAY", rootFreq: 146.83, bpm: "85 BPM", vibe: "Synthwave Pulse" },
    { title: "MECHA_HANGAR_SUB", rootFreq: 98, bpm: "64 BPM", vibe: "Sub-Bass Ambient" },
  ];

  const stopAudio = () => {
    try {
      if (osc1Ref.current) {
        osc1Ref.current.stop();
        osc1Ref.current.disconnect();
        osc1Ref.current = null;
      }
      if (osc2Ref.current) {
        osc2Ref.current.stop();
        osc2Ref.current.disconnect();
        osc2Ref.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    } catch {}
    if (animIntervalRef.current) {
      clearInterval(animIntervalRef.current);
    }
  };

  const startAudio = () => {
    stopAudio();
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const track = tracks[currentTrackIndex];

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : 0.12, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Low Pass Resonant Filter (Cyberpunk warmth)
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(420, ctx.currentTime);
      filter.Q.setValueAtTime(4.0, ctx.currentTime);
      filter.connect(masterGain);
      filterNodeRef.current = filter;

      // Root Oscillator (Warm Triangle)
      const osc1 = ctx.createOscillator();
      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(track.rootFreq, ctx.currentTime);
      osc1.connect(filter);
      osc1.start();
      osc1Ref.current = osc1;

      // Sub-Fifth Oscillator with detune for stereophonic drift
      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(track.rootFreq * 1.498, ctx.currentTime);
      osc2.detune.setValueAtTime(7, ctx.currentTime);
      osc2.connect(filter);
      osc2.start();
      osc2Ref.current = osc2;

      // Subtle LFO filter modulation
      let step = 0;
      animIntervalRef.current = setInterval(() => {
        if (!filterNodeRef.current || !audioCtxRef.current) return;
        step += 0.1;
        const cutoff = 380 + Math.sin(step) * 140;
        filterNodeRef.current.frequency.setValueAtTime(cutoff, audioCtxRef.current.currentTime);
      }, 100);

      setIsPlaying(true);
    } catch (e) {
      console.error("Audio deck error", e);
    }
  };

  const togglePlay = () => {
    playUiClick();
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      startAudio();
    }
  };

  const toggleMute = () => {
    playUiClick();
    if (gainNodeRef.current && audioCtxRef.current) {
      const nextMute = !isMuted;
      gainNodeRef.current.gain.setValueAtTime(
        nextMute ? 0 : 0.12,
        audioCtxRef.current.currentTime
      );
      setIsMuted(nextMute);
    } else {
      setIsMuted(!isMuted);
    }
  };

  const nextTrack = () => {
    playUiClick();
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIdx);
    if (isPlaying) {
      setTimeout(startAudio, 100);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const track = tracks[currentTrackIndex];

  return (
    <div className="fixed bottom-4 left-4 z-40 font-mono select-none">
      {minimized ? (
        /* Compact Floating Capsule */
        <button
          onClick={() => {
            playUiClick();
            setMinimized(false);
          }}
          className={`flex items-center space-x-2.5 px-3.5 py-2 rounded-full border shadow-2xl backdrop-blur-md transition-all ${
            isPlaying
              ? "bg-[#101018]/90 border-[#ff2a5f]/60 text-white shadow-[#ff2a5f]/20"
              : "bg-[#0b0b12]/80 border-[#232334] text-zinc-400 hover:text-white"
          }`}
        >
          <Radio className={`w-3.5 h-3.5 ${isPlaying ? "text-[#ff2a5f] animate-pulse" : ""}`} />
          <span className="text-[11px] font-bold tracking-wider">
            {isPlaying ? track.title : "SHIBUYA RADIO"}
          </span>
          {isPlaying && (
            <div className="flex items-center space-x-0.5 h-3">
              <span className="w-1 bg-[#ff2a5f] h-3 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1 bg-[#00f0ff] h-2 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1 bg-[#ff2a5f] h-3.5 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          )}
        </button>
      ) : (
        /* Expanded Cyber Deck */
        <div className="w-72 bg-[#0e0e16]/95 border border-[#262638] rounded-2xl shadow-2xl p-4 backdrop-blur-md space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-[#1c1c2b]">
            <div className="flex items-center space-x-2">
              <Disc className={`w-4 h-4 text-[#ff2a5f] ${isPlaying ? "animate-spin" : ""}`} />
              <span className="text-xs font-bold text-white tracking-widest">SHIBUYA DECK</span>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={toggleMute}
                className="w-6 h-6 rounded bg-[#181824] hover:bg-[#252538] flex items-center justify-center text-zinc-400 hover:text-white"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-3 h-3 text-red-400" /> : <Volume2 className="w-3 h-3" />}
              </button>
              <button
                onClick={() => setMinimized(true)}
                className="text-[10px] text-zinc-500 hover:text-zinc-300 px-1.5 py-0.5"
              >
                MINIMIZE
              </button>
            </div>
          </div>

          {/* Track Info */}
          <div className="bg-[#12121c] p-2.5 rounded-lg border border-[#1f1f2e] space-y-1">
            <div className="flex justify-between items-center text-[10px] text-[#00f0ff]">
              <span>CHANNEL // 0{currentTrackIndex + 1}</span>
              <span>{track.bpm}</span>
            </div>
            <div className="text-xs font-bold text-white truncate">{track.title}</div>
            <div className="text-[10px] text-zinc-500">{track.vibe}</div>
          </div>

          {/* Equalizer Waveform Visualization */}
          <div className="flex items-end justify-between h-7 bg-[#09090e] p-1.5 rounded border border-[#1a1a27] gap-1">
            {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65].map((h, i) => (
              <span
                key={i}
                className={`w-full rounded-t-sm transition-all duration-300 ${
                  isPlaying
                    ? i % 2 === 0
                      ? "bg-[#ff2a5f]"
                      : "bg-[#00f0ff]"
                    : "bg-zinc-800"
                }`}
                style={{
                  height: isPlaying ? `${Math.max(15, (h * (i % 3 + 1)) % 100)}%` : "15%",
                }}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={nextTrack}
              className="text-[11px] text-zinc-400 hover:text-white px-2 py-1 rounded bg-[#161622] border border-[#232334]"
            >
              NEXT TRACK ❯
            </button>

            <button
              onClick={togglePlay}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded text-xs font-bold transition-all ${
                isPlaying
                  ? "bg-[#ff2a5f] text-white shadow-lg shadow-[#ff2a5f]/25"
                  : "bg-zinc-800 hover:bg-zinc-700 text-white"
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? "STOP" : "TRANSMIT"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
