"use client";

import React, { useState } from "react";
import {
  Video,
  Mic,
  MicOff,
  PhoneOff,
  Users,
  Share2,
  Volume2,
  LayoutGrid,
  Shield,
  Sparkles,
} from "lucide-react";

export default function VirtualOffice() {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  return (
    <section id="virtual-office" className="py-28 sm:py-36 bg-transparent text-white border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Editorial Header */}
        <div className="max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-neutral-300 text-xs font-semibold shadow-xs">
            <Video className="w-3.5 h-3.5 text-emerald-400" />
            <span>Built-in Real-time Collaboration</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[0.98]">
            Work together.<br />
            <span className="text-neutral-400">Like in the office.</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed pt-1">
            Create customized virtual rooms for creative reviews, client strategy calls, and daily standups with crystal-clear audio and video conferencing.
          </p>
        </div>

        {/* Video Conference Box with Deep Realistic Shadow and Breathing Room */}
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden bg-[#0b0e14]/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_30px_80px_rgba(0,0,0,0.6)] text-left relative">
          
          {/* Video Stage: Main Speaker + Stacked Right Tiles */}
          <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-3 min-h-[380px] sm:min-h-[440px]">
            
            {/* Main Participant Video Feed (Woman speaker smiling facing camera) */}
            <div className="md:col-span-8 rounded-2xl relative overflow-hidden bg-neutral-900 border border-white/10 min-h-[280px] sm:min-h-[400px] flex items-end p-4 group">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85"
                alt="Client Strategy Lead"
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-95"
              />

              {/* Subtle natural vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

              {/* Top Overlay Badge */}
              <div className="absolute top-4 left-4 z-10 space-y-0.5">
                <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 drop-shadow-md">
                  <span>Q3 Strategy & Client Onboarding</span>
                </div>
                <div className="text-[11px] text-neutral-300 flex items-center gap-1.5 drop-shadow-md">
                  <Users className="w-3.5 h-3.5 text-neutral-300" />
                  <span>4 Participants Live</span>
                </div>
              </div>

              {/* Floating Media Controls Pill */}
              <div className="w-full flex justify-center z-10 pb-2">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 shadow-2xl">
                  <button
                    onClick={() => setIsMicOn(!isMicOn)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                      isMicOn ? "text-white hover:bg-white/20" : "text-red-400 bg-red-500/20"
                    }`}
                    aria-label="Toggle Microphone"
                  >
                    {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                      isVideoOn ? "text-white hover:bg-white/20" : "text-red-400 bg-red-500/20"
                    }`}
                    aria-label="Toggle Camera"
                  >
                    <Video className="w-4 h-4" />
                  </button>

                  <button
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition"
                    aria-label="Share Screen"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  <button
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white transition ml-1"
                    aria-label="End Call"
                  >
                    <PhoneOff className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bottom Left Label */}
              <div className="absolute bottom-4 left-4 z-10 hidden sm:block">
                <div className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-[11px] font-medium text-white flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Amara Okafor (Head of Growth)</span>
                </div>
              </div>
            </div>

            {/* Right Stacked 3 Participant Tiles */}
            <div className="md:col-span-4 flex flex-col gap-2.5 justify-between">
              
              {/* Tile 1: Senior Creative Director */}
              <div className="rounded-xl relative overflow-hidden bg-neutral-900 border border-white/10 h-[125px] group">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                  alt="Creative Director"
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                  Elena Rostova (Design)
                </div>
              </div>

              {/* Tile 2: Lead Fullstack Engineer */}
              <div className="rounded-xl relative overflow-hidden bg-neutral-900 border border-white/10 h-[125px] group">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                  alt="Lead Engineer"
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                  Marcus Vance (Dev Lead)
                </div>
              </div>

              {/* Tile 3: Client Partner CMO */}
              <div className="rounded-xl relative overflow-hidden bg-neutral-900 border border-white/10 h-[125px] group">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
                  alt="Client CMO"
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                  David Kim (Lumina CMO)
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* 3 Clean Capability Columns Below (Quiet, Editorial) */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
          <div className="space-y-2 p-5 rounded-2xl bg-[#0b0e14]/80 backdrop-blur-xl border border-white/[0.08] shadow-lg">
            <h3 className="font-bold text-sm text-white">Audio & Video Conferencing</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Ultra-low latency WebRTC calls embedded directly inside client task boards and project workspaces.
            </p>
          </div>

          <div className="space-y-2 p-5 rounded-2xl bg-[#0b0e14]/80 backdrop-blur-xl border border-white/[0.08] shadow-lg">
            <h3 className="font-bold text-sm text-white">Instant Screen & Tab Sharing</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Review Figma designs, live ad accounts, and staging environments side-by-side with your clients.
            </p>
          </div>

          <div className="space-y-2 p-5 rounded-2xl bg-[#0b0e14]/80 backdrop-blur-xl border border-white/[0.08] shadow-lg">
            <h3 className="font-bold text-sm text-white">Departmental Virtual Rooms</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Permanent drop-in audio rooms for creative, media buying, and executive leadership syncs.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
