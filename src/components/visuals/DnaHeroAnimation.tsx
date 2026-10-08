import React, { useEffect, useRef } from 'react';

export const DnaHeroAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particles system
    const numParticles = 45;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 0.8,
      color: Math.random() > 0.5 ? '#25C5E9' : '#8B5CF6',
      alpha: Math.random() * 0.5 + 0.2,
    }));

    // DNA parameters
    let angle = 0;
    const numRungs = 28;
    const helixRadius = Math.min(width * 0.18, 110);
    const strandLength = Math.min(height * 0.75, 450);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.012;

      // 1. Draw ambient floating particles & faint medical data grid
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 2. Center coordinates for DNA helix
      const centerX = width / 2;
      const centerY = height / 2;
      const stepY = strandLength / numRungs;
      const startY = centerY - strandLength / 2;

      // Draw DNA rungs and twin strands
      for (let i = 0; i < numRungs; i++) {
        const currentY = startY + i * stepY;
        const currentAngle = angle + (i * Math.PI) / 6.5;

        // 3D rotation projection
        const x1 = centerX + Math.cos(currentAngle) * helixRadius;
        const z1 = Math.sin(currentAngle); // Depth (-1 to 1)

        const x2 = centerX + Math.cos(currentAngle + Math.PI) * helixRadius;
        const z2 = Math.sin(currentAngle + Math.PI);

        // Perspective scale & depth alpha
        const scale1 = 0.75 + (z1 + 1) * 0.25;
        const scale2 = 0.75 + (z2 + 1) * 0.25;
        const alpha1 = 0.35 + (z1 + 1) * 0.32;
        const alpha2 = 0.35 + (z2 + 1) * 0.32;

        // Base pair connecting hydrogen bond (Rung line)
        const lineAlpha = 0.18 + Math.max(0, (z1 + z2 + 2) / 4) * 0.4;
        ctx.beginPath();
        ctx.moveTo(x1, currentY);
        ctx.lineTo(x2, currentY);
        ctx.strokeStyle = i % 2 === 0 ? `rgba(37, 197, 233, ${lineAlpha})` : `rgba(139, 92, 246, ${lineAlpha})`;
        ctx.lineWidth = 2 * ((scale1 + scale2) / 2);
        ctx.stroke();

        // Intermediate data node on the bond
        const midX = (x1 + x2) / 2;
        ctx.beginPath();
        ctx.arc(midX, currentY, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = '#5DE2E7';
        ctx.globalAlpha = lineAlpha * 0.8;
        ctx.fill();

        // Strand 1 (Cyan / Aqua Nucleotide Node)
        ctx.beginPath();
        ctx.arc(x1, currentY, 4.5 * scale1, 0, Math.PI * 2);
        ctx.fillStyle = '#25C5E9';
        ctx.globalAlpha = alpha1;
        ctx.shadowBlur = 14 * scale1;
        ctx.shadowColor = '#25C5E9';
        ctx.fill();

        // Strand 2 (Purple / Lavender Nucleotide Node)
        ctx.beginPath();
        ctx.arc(x2, currentY, 4.5 * scale2, 0, Math.PI * 2);
        ctx.fillStyle = '#A78BFA';
        ctx.globalAlpha = alpha2;
        ctx.shadowBlur = 14 * scale2;
        ctx.shadowColor = '#8B5CF6';
        ctx.fill();

        // Reset shadow
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] lg:min-h-[520px] flex items-center justify-center overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Decorative Glow Centers */}
      <div className="absolute w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none -top-10 -left-10 animate-pulse-glow" />
      <div className="absolute w-80 h-80 rounded-full bg-purple-600/15 blur-3xl pointer-events-none -bottom-10 -right-10 animate-pulse-glow" />
      
      {/* Overlay medical telemetry tags */}
      <div className="absolute top-6 right-6 hidden md:flex items-center space-x-2 bg-navy-900/80 border border-cyan-500/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-cyan-300 font-mono shadow-lg">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>HEURISTIC AI MAPPING ACTIVE</span>
      </div>

      <div className="absolute bottom-6 left-6 hidden md:flex items-center space-x-2 bg-navy-900/80 border border-purple-500/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-purple-300 font-mono shadow-lg">
        <span className="w-2 h-2 rounded-full bg-purple-400" />
        <span>ICD-11 AYUSH ONTOLOGY MATRIX</span>
      </div>
    </div>
  );
};
