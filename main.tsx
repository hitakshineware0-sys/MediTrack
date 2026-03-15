@import "tailwindcss";

@theme {
  --color-brand-primary: #6366f1;
  --color-brand-secondary: #06b6d4;
  --color-brand-accent: #a855f7;
  --color-brand-bg: #020617;
  
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-display: 'Outfit', sans-serif;
}

@layer base {
  body {
    @apply bg-brand-bg text-slate-200 antialiased selection:bg-brand-primary/30;
    font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  }
}

@layer utilities {
  .glass {
    @apply bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)];
  }
  
  .glass-dark {
    @apply bg-black/20 backdrop-blur-2xl border border-white/5 shadow-2xl;
  }

  .glass-card {
    @apply relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md;
  }

  .neon-glow-blue {
    @apply shadow-[0_0_20px_rgba(6,182,212,0.3)];
  }

  .neon-glow-purple {
    @apply shadow-[0_0_20px_rgba(168,85,247,0.3)];
  }

  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400;
  }

  .bg-mesh {
    background-image: 
      radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.15) 0px, transparent 50%),
      radial-gradient(at 100% 0%, rgba(6, 182, 212, 0.15) 0px, transparent 50%),
      radial-gradient(at 100% 100%, rgba(168, 85, 247, 0.15) 0px, transparent 50%),
      radial-gradient(at 0% 100%, rgba(236, 72, 153, 0.1) 0px, transparent 50%);
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}
