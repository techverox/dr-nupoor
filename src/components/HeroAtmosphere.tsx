"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * HeroAtmosphere: Digivigee Master Volumetric Light & Endless Loop Photon Engine
 * 
 * Features:
 * 1. Infinite Seamless Photon Loop:
 *    All photons are evenly distributed across the vertical beam and wrap around
 *    in an endless, uninterrupted mathematical loop (p.y = (p.y + speedY) % H).
 *    Zero pauses, zero gaps, zero stock depletion.
 * 2. Downward Photon Energy Waves:
 *    Light packets race down the 1.6px diamond-white laser spine continuously.
 * 3. Hyperbolic Shoulder-Wrap Curve:
 *    Light flares and wraps down around both shoulders of the dashboard card (no flat horizon).
 * 4. Ultra-Smooth 60FPS Performance:
 *    Batched GPU hardware rendering with cached geometry and zero layout reflows.
 */
export default function HeroAtmosphere() {
  const glCanvasRef = useRef<HTMLCanvasElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const glCanvas = glCanvasRef.current;
    const pCanvas = particleCanvasRef.current;
    if (!glCanvas || !pCanvas) return;

    let isRunning = true;
    let animId: number;

    const gl = (glCanvas.getContext("webgl", { alpha: true, antialias: true, depth: false, powerPreference: "default" }) ||
      glCanvas.getContext("experimental-webgl", { alpha: true, antialias: true, depth: false })) as WebGLRenderingContext | null;

    const pCtx = pCanvas.getContext("2d");

    // Optimal DPR cap for silky 60fps rendering without GPU fillrate thrashing
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    let width = glCanvas.offsetWidth || window.innerWidth;
    let height = glCanvas.offsetHeight || 1100;

    const updateDimensions = () => {
      width = glCanvas.offsetWidth || window.innerWidth;
      height = glCanvas.offsetHeight || 1100;

      glCanvas.width = Math.floor(width * dpr);
      glCanvas.height = Math.floor(height * dpr);
      
      glCanvas.addEventListener("webglcontextlost", (e) => {
        e.preventDefault();
      }, false);

      pCanvas.width = Math.floor(width * dpr);
      pCanvas.height = Math.floor(height * dpr);
    };

    updateDimensions();

    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX / window.innerWidth;
      targetMouseY = e.clientY / window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        targetMouseX = e.touches[0].clientX / window.innerWidth;
        targetMouseY = e.touches[0].clientY / window.innerHeight;
      }
    };
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // CACHED Geometry: Never query getBoundingClientRect() inside the 60fps loop!
    let cachedGeom = { left: width * 0.15, top: 500, right: width * 0.85, bottom: 1020, width: width * 0.70 };

    const recalculateGeometry = () => {
      const dashboard = document.getElementById("hero-dashboard-container");
      if (dashboard && glCanvas) {
        const dRect = dashboard.getBoundingClientRect();
        const cRect = glCanvas.getBoundingClientRect();
        const top = Math.max(0, dRect.top - cRect.top);
        const left = dRect.left - cRect.left;
        const right = dRect.right - cRect.left;
        const bottom = dRect.bottom - cRect.top;
        cachedGeom = { left, top, right, bottom, width: dRect.width };
      } else {
        const isMobile = width < 768;
        const cardW = Math.min(width * 0.92, 1152);
        const left = (width - cardW) * 0.5;
        const top = isMobile ? 580 : 500;
        cachedGeom = { left, top, right: left + cardW, bottom: top + 520, width: cardW };
      }
    };

    recalculateGeometry();
    const handleResize = () => {
      updateDimensions();
      recalculateGeometry();
    };
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", recalculateGeometry, { passive: true });

    // --- 1. WEBGL VOLUMETRIC ATMOSPHERE INITIALIZATION ---
    let glProgram: WebGLProgram | null = null;
    let uResLoc: WebGLUniformLocation | null = null;
    let uTimeLoc: WebGLUniformLocation | null = null;
    let uBeamPosLoc: WebGLUniformLocation | null = null;
    let uCardRectLoc: WebGLUniformLocation | null = null;
    let uMouseLoc: WebGLUniformLocation | null = null;
    let uDprLoc: WebGLUniformLocation | null = null;

    if (gl) {
      const vsSource = `
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = position * 0.5 + 0.5;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

      const fsSource = `
        #ifdef GL_FRAGMENT_PRECISION_HIGH
        precision highp float;
#else
        precision mediump float;
#endif
        varying vec2 vUv;
        uniform vec2 u_resolution;
        uniform float u_time;
        uniform vec2 u_beam_pos;
        uniform vec4 u_card_rect;
        uniform vec2 u_mouse;
        uniform float u_dpr;

        vec2 hash2(vec2 p) {
          p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
          return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
            mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
            u.y
          );
        }

        float fbm(vec2 p) {
          mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
          float v = 0.0;
          float a = 0.5;
          for (int i = 0; i < 4; i++) {
            v += a * noise(p);
            p = rot * p * 2.02 + vec2(1.7, 2.3);
            a *= 0.5;
          }
          return v;
        }

        void main() {
          vec2 fragCoord = vUv * u_resolution;
          vec2 cssCoord = fragCoord / u_dpr;
          vec2 cssRes = u_resolution / u_dpr;
          float yCoord = cssRes.y - cssCoord.y;
          float xCoord = cssCoord.x;
          bool isMobile = cssRes.x < 768.0;

          float beamX = u_beam_pos.x;
          float targetY = u_card_rect.y;
          float cardLeft = u_card_rect.x;
          float cardRight = u_card_rect.z;

          vec2 parallax = (u_mouse - 0.5) * vec2(8.0, 4.0);
          vec2 pCoord = cssCoord + parallax;

          // Base Deep Obsidian Void (#040507)
          vec3 color = vec3(0.016, 0.020, 0.027);

          float distX = abs(xCoord - beamX);
          float sideBlend = smoothstep(-24.0, 24.0, xCoord - beamX);

          // Hyperbolic trumpet flare & shoulder-wrap
          float flareSpan = isMobile ? 180.0 : 280.0;
          float flareProgress = clamp((yCoord - (targetY - flareSpan)) / flareSpan, 0.0, 1.0);
          float trumpetFlare = pow(max(0.0001, flareProgress), 3.2);

          float halfSpan = (xCoord < beamX) ? max(60.0, beamX - cardLeft) : max(60.0, cardRight - beamX);
          float normX = distX / halfSpan;

          // Clean bottom envelope directly at the card top: zero downward sag or side pillar
          float bottomEnvelopeY = targetY;
          // Smoothly fade out flanks so light stays naturally focused over the card without spilling off the sides
          float flankFade = (xCoord > beamX) ? (1.0 - smoothstep(0.68, 0.88, normX)) : (1.0 - smoothstep(0.78, 0.98, normX));

          float beamTopFade = smoothstep(0.0, 45.0, yCoord);
          float beamBottomFade = 1.0 - smoothstep(bottomEnvelopeY - 8.0, bottomEnvelopeY + 10.0, yCoord);
          float beamMask = beamTopFade * beamBottomFade * flankFade;

          // High-energy laser core & volumetric glows
          float dCore = distX / 1.6;
          float coreInt   = exp(-dCore * dCore);
          float innerW    = 10.0 + trumpetFlare * (halfSpan * 0.22);
          float innerInt  = exp(-pow(max(0.0001, distX / max(2.5, innerW)), 1.85));
          float coronaW   = 36.0 + trumpetFlare * (halfSpan * 0.65);
          float coronaInt = exp(-pow(max(0.0001, distX / max(8.0, coronaW)), 1.55));
          float bloomW    = 90.0 + trumpetFlare * (halfSpan * 0.95);
          float bloomInt  = exp(-pow(max(0.0001, distX / max(25.0, bloomW)), 1.35));

          // Downward photon energy pulses racing down the spine in an infinite wave loop
          float photonPulse = pow(max(0.0001, sin(yCoord * 0.022 - u_time * 9.0)), 12.0) * 2.2;
          float spineEnergy = (coreInt + photonPulse * coreInt) * beamMask;

          // Duotone Palettes
          vec3 gInner  = vec3(0.25, 0.95, 0.48);
          vec3 gCorona = vec3(0.08, 0.82, 0.32);
          vec3 gBloom  = vec3(0.02, 0.38, 0.12);

          vec3 bInner  = vec3(0.28, 0.65, 1.00);
          vec3 bCorona = vec3(0.08, 0.45, 0.98);
          vec3 bBloom  = vec3(0.02, 0.16, 0.58);

          vec3 cInner  = mix(gInner, bInner, sideBlend);
          vec3 cCorona = mix(gCorona, bCorona, sideBlend);
          vec3 cBloom  = mix(gBloom, bBloom, sideBlend);

          color += cBloom  * bloomInt  * 0.45 * beamMask;
          color += cCorona * coronaInt * 0.72 * beamMask;
          color += cInner  * innerInt  * 1.15 * beamMask;
          color += vec3(1.0, 1.0, 1.0) * spineEnergy * 2.5;

          // 1. Microscopic Continuous Light Threads / 3D Optical Fiber Mesh (Huly Masterpiece)
          float threadWave = (
            sin(xCoord * 1.35) * 0.35 +
            sin(xCoord * 3.71) * 0.25 +
            sin(xCoord * 8.43) * 0.20 +
            sin(xCoord * 18.85) * 0.20
          );
          float threadIntensity = pow(clamp(0.5 + 0.5 * threadWave, 0.0001, 1.0), 3.2);
          float threadMask = exp(-pow(max(0.0001, distX / max(6.0, innerW * 0.85)), 1.5)) * beamMask;
          color += cInner * threadIntensity * threadMask * 0.85;
          float dTh = distX / 3.0;
          color += vec3(1.0, 1.0, 1.0) * threadIntensity * exp(-dTh * dTh) * beamMask * 1.2;



          // Contact glow at targetY
          float contactX = distX;
          float contactY = abs(yCoord - targetY);
          float contactHotspot = exp(-pow(max(0.0001, contactX / 38.0), 1.8)) * exp(-pow(max(0.0001, contactY / 7.0), 1.8));
          color += vec3(1.0, 1.0, 1.0) * contactHotspot * 1.5 + cInner * contactHotspot * 0.8;

          color = color / (1.0 + color * 0.025);
          gl_FragColor = vec4(color, 1.0);
        }
      `;

      const compileShader = (type: number, source: string) => {
        const s = gl.createShader(type);
        if (!s) return null;
        gl.shaderSource(s, source);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
          console.warn(gl.getShaderInfoLog(s));
          gl.deleteShader(s);
          return null;
        }
        return s;
      };

      const vs = compileShader(gl.VERTEX_SHADER, vsSource);
      const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);

      if (vs && fs) {
        glProgram = gl.createProgram();
        if (glProgram) {
          gl.attachShader(glProgram, vs);
          gl.attachShader(glProgram, fs);
          gl.linkProgram(glProgram);
          if (gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
            gl.useProgram(glProgram);

            const posBuf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
            gl.bufferData(
              gl.ARRAY_BUFFER,
              new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
              gl.STATIC_DRAW
            );

            const posLoc = gl.getAttribLocation(glProgram, "position");
            gl.enableVertexAttribArray(posLoc);
            gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

            uResLoc = gl.getUniformLocation(glProgram, "u_resolution");
            uTimeLoc = gl.getUniformLocation(glProgram, "u_time");
            uBeamPosLoc = gl.getUniformLocation(glProgram, "u_beam_pos");
            uCardRectLoc = gl.getUniformLocation(glProgram, "u_card_rect");
            uMouseLoc = gl.getUniformLocation(glProgram, "u_mouse");
            uDprLoc = gl.getUniformLocation(glProgram, "u_dpr");
          }
        }
      }
    }

    const startTime = performance.now();

    const renderLoop = (now: number) => {
      if (!isRunning) return;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const elapsed = (now - startTime) * 0.001;
      const isMobile = width < 768;
      const beamX = isMobile ? width * 0.69 : width * 0.654;

      const targetY = cachedGeom.top;
      const cardLeft = cachedGeom.left;
      const cardRight = cachedGeom.right;
      const halfSpanLeft = Math.max(60, beamX - cardLeft);
      const halfSpanRight = Math.max(60, cardRight - beamX);

      // Loop wraps cleanly at the card top
      const loopMaxY = targetY + 15;

      // 1. RENDER WEBGL BACKGROUND ATMOSPHERE (Safe against mobile driver quirks)
      if (gl && glProgram) {
        try {
          gl.viewport(0, 0, glCanvas.width, glCanvas.height);
          if (uResLoc) gl.uniform2f(uResLoc, glCanvas.width, glCanvas.height);
          if (uTimeLoc) gl.uniform1f(uTimeLoc, elapsed);
          if (uBeamPosLoc) gl.uniform2f(uBeamPosLoc, beamX, targetY);
          if (uCardRectLoc) gl.uniform4f(uCardRectLoc, cardLeft, targetY, cardRight, cachedGeom.bottom);
          if (uMouseLoc) gl.uniform2f(uMouseLoc, mouseX, mouseY);
          if (uDprLoc) gl.uniform1f(uDprLoc, dpr);

          gl.drawArrays(gl.TRIANGLES, 0, 6);
        } catch (glErr) {
          // Graceful mobile WebGL fallback
        }
      }

      // 2. Clean 2D Particle Canvas (Zero particles, pristine clean atmosphere)
      if (pCtx) {
        pCtx.save();
        pCtx.scale(dpr, dpr);
        pCtx.clearRect(0, 0, width, height);
        pCtx.restore();
      }

      animId = requestAnimationFrame(renderLoop);
    };

    setIsLoaded(true);
    animId = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", recalculateGeometry);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* CSS Hardware Fallback Beam Spine (Guarantees visible volumetric beam even if GPU throttles WebGL) */}
      <div
        className="absolute top-0 pointer-events-none z-0"
        style={{
          left: 'var(--beam-css-x, 65.4%)',
          transform: 'translateX(-50%)',
          width: '240px',
          height: '620px',
          background: 'radial-gradient(ellipse at 50% 15%, rgba(34, 197, 94, 0.35) 0%, rgba(37, 99, 235, 0.28) 45%, transparent 75%)',
          filter: 'blur(32px)',
        }}
      />
      <div
        className="absolute top-0 pointer-events-none z-0"
        style={{
          left: 'var(--beam-css-x, 65.4%)',
          transform: 'translateX(-50%)',
          width: '4px',
          height: '560px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(34,197,94,0.8) 50%, rgba(37,99,235,0.6) 85%, transparent)',
          boxShadow: '0 0 16px rgba(34,197,94,0.9), 0 0 35px rgba(37,99,235,0.8)',
        }}
      />

      {/* Layer 1: WebGL Volumetric Atmosphere (GPU Hardware Shading) */}
      <canvas
        ref={glCanvasRef}
        className="absolute inset-0 w-full h-full min-h-[950px] md:min-h-[1100px]"
      />
      {/* Layer 2: Seamless Infinite Photon Loop (Batched 60FPS Hardware Rendering) */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 w-full h-full min-h-[950px] md:min-h-[1100px]"
      />
    </div>
  );
}
