import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface AboutProps {
  onBack: () => void;
}

export default function About({ onBack }: AboutProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white text-black py-16 md:py-24 px-6 md:px-12 flex flex-col items-center justify-center overflow-x-hidden"
    >
      <div className="w-full max-w-3xl flex flex-col items-center">
        {/* Back Button */}
        <div className="w-full flex justify-start mb-20">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.4em] hover:text-black/40 transition-colors font-medium"
          >
            <ArrowLeft size={14} />
            Back
          </button>
        </div>

        {/* About Content */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center"
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-[1.8] md:leading-[2] tracking-tight text-black/80 max-w-2xl mx-auto">
            Fingersnaps는 공간 디자인과 영상 제작을 기반으로 시각적 경험을 설계하는 크리에이티브 팀입니다. 
            우리는 경계를 넘나드는 감각으로 브랜드의 메시지를 가장 감도 높게 전달합니다. 
            당신의 상상을 우리와 함께 현실로 만들어보세요.
          </p>
        </motion.div>

        {/* Footer */}
        <footer className="mt-32 text-[8px] uppercase tracking-[0.5em] text-black/10 pb-12 text-center">
          © 2026 Portfolio — Crafted with Precision
        </footer>
      </div>
    </motion.div>
  );
}
