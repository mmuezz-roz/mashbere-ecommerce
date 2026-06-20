'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'idle' | 'hover' | 'downloading' | 'done';

export default function DownloadProfileButton() {
  const [phase, setPhase] = useState<Phase>('idle');

  function handleClick() {
    if (phase === 'downloading' || phase === 'done') return;

    setPhase('downloading');

    // Trigger the real download
    const a = document.createElement('a');
    a.href = '/photos/mashbere Profile -11.pdf';
    a.download = 'Mashbere_Company_Profile.pdf';
    a.click();

    setTimeout(() => setPhase('done'), 2200);
    setTimeout(() => setPhase('idle'), 4000);
  }

  const isIdle     = phase === 'idle' || phase === 'hover';
  const isLoading  = phase === 'downloading';
  const isDone     = phase === 'done';

  return (
    <button
      id="download-company-profile"
      onClick={handleClick}
      onMouseEnter={() => phase === 'idle' && setPhase('hover')}
      onMouseLeave={() => phase === 'hover' && setPhase('idle')}
      disabled={isLoading}
      aria-label="Download Mashbere Company Profile PDF"
      className="group relative select-none focus:outline-none"
    >
      {/* ── Doc card shell ───────────────────────────────────────────── */}
      <motion.div
        animate={
          isDone      ? { scale: 1, rotate: 0 } :
          isLoading   ? { scale: 0.97 } :
          phase === 'hover' ? { scale: 1.04, y: -4 } :
          { scale: 1, y: 0 }
        }
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        className="relative w-[136px] h-[164px] rounded-[20px] overflow-hidden
                   bg-white/6 border border-white/10
                   shadow-[0_8px_32px_rgba(0,0,0,0.35)]
                   flex flex-col items-center justify-between pt-5 pb-5 px-4"
      >

        {/* Folded corner (top-right) */}
        <svg
          className="absolute top-0 right-0"
          width="30" height="30" viewBox="0 0 30 30"
          fill="none"
        >
          <path d="M0 0 L30 0 L30 30 Z"
            fill={isDone ? '#C4EB54' : isLoading ? '#C4EB54' : '#ffffff14'} />
        </svg>

        {/* ── Top: file-lines / progress ──────────────────────────────── */}
        <div className="w-full space-y-1.5 mt-2">
          {[1, 0.5, 0.75].map((w, i) => (
            <motion.div
              key={i}
              className="h-[3px] rounded-full bg-white/12"
              animate={{
                scaleX: isLoading ? [w, 1, w] : w,
                backgroundColor: isLoading
                  ? ['#C4EB5440', '#C4EB54', '#C4EB5440']
                  : isDone
                  ? '#C4EB5480'
                  : '#ffffff18',
              }}
              transition={
                isLoading
                  ? { duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }
                  : { duration: 0.4 }
              }
              style={{ transformOrigin: 'left', width: '100%' }}
            />
          ))}
        </div>

        {/* ── Centre icon area ────────────────────────────────────────── */}
        <div className="relative flex items-center justify-center w-12 h-12">
          <AnimatePresence mode="wait">

            {/* Idle — PDF badge */}
            {isIdle && (
              <motion.div
                key="pdf"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.22 }}
                className="flex flex-col items-center"
              >
                {/* Download arrow bounces on hover */}
                <motion.svg
                  animate={phase === 'hover'
                    ? { y: [0, 3, 0], opacity: 1 }
                    : { y: 0, opacity: 0.55 }
                  }
                  transition={{ duration: 0.55, repeat: phase === 'hover' ? Infinity : 0, ease: 'easeInOut' }}
                  width="26" height="26" viewBox="0 0 24 24"
                  fill="none" stroke="#C4EB54" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M12 3v13M7 11l5 5 5-5" />
                  <path d="M5 21h14" />
                </motion.svg>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#C4EB54]/70 mt-1">
                  PDF
                </span>
              </motion.div>
            )}

            {/* Downloading — spinning ring */}
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                className="relative w-10 h-10"
              >
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="16"
                    fill="none" stroke="#ffffff0d" strokeWidth="3" />
                  <motion.circle
                    cx="20" cy="20" r="16"
                    fill="none" stroke="#C4EB54" strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="100"
                    animate={{ strokeDashoffset: [100, 0] }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center
                                 text-[8px] font-black text-[#C4EB54] uppercase tracking-wider">
                  ...
                </span>
              </motion.div>
            )}

            {/* Done — checkmark */}
            {isDone && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                className="w-10 h-10 rounded-full bg-[#C4EB54]/15 border border-[#C4EB54]/30
                           flex items-center justify-center"
              >
                <motion.svg
                  width="20" height="20" viewBox="0 0 24 24"
                  fill="none" stroke="#C4EB54" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <motion.path
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  />
                </motion.svg>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* ── Bottom label ────────────────────────────────────────────── */}
        <div className="text-center">
          <AnimatePresence mode="wait">
            {isIdle && (
              <motion.div key="lbl-idle"
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80
                               group-hover:text-[#C4EB54] transition-colors duration-300">
                  {phase === 'hover' ? 'Download' : 'Company'}
                </p>
                <p className="text-[8px] font-semibold uppercase tracking-widest text-white/30 mt-0.5">
                  {phase === 'hover' ? 'Click to save' : 'Profile'}
                </p>
              </motion.div>
            )}
            {isLoading && (
              <motion.div key="lbl-loading"
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C4EB54]">
                  Saving…
                </p>
              </motion.div>
            )}
            {isDone && (
              <motion.div key="lbl-done"
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C4EB54]">
                  Saved!
                </p>
                <p className="text-[8px] font-semibold uppercase tracking-widest text-white/30 mt-0.5">
                  Check downloads
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hover glow overlay */}
        <motion.div
          animate={{ opacity: phase === 'hover' ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-[20px] ring-1 ring-[#C4EB54]/30
                     bg-gradient-to-b from-[#C4EB54]/5 to-transparent pointer-events-none"
        />

      </motion.div>
    </button>
  );
}
