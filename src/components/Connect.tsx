import { motion } from 'motion/react';
import { ArrowLeft, Instagram, Mail, MapPin, Phone } from 'lucide-react';

interface ConnectProps {
  onBack: () => void;
}

export default function Connect({ onBack }: ConnectProps) {
  const contactInfo = [
    {
      id: 'email',
      label: 'Email',
      value: 'dongbangsalon@gmail.com',
      href: 'mailto:dongbangsalon@gmail.com',
      icon: <Mail size={16} />
    },
    {
      id: 'phone',
      label: 'Phone',
      value: '+82 70 4238 4242',
      href: 'tel:+827042384242',
      icon: <Phone size={16} />
    },
    {
      id: 'address',
      label: 'Address',
      value: '1F, Dongbang Salon, 8, Yanghwa-ro 8-gil, Mapo-gu, Seoul, Republic of Korea',
      href: 'https://maps.google.com/?q=1F, Dongbang Salon, 8, Yanghwa-ro 8-gil, Mapo-gu, Seoul, Republic of Korea',
      icon: <MapPin size={16} />
    },
    {
      id: 'instagram',
      label: 'Instagram',
      value: '@fingers.naps',
      href: 'https://www.instagram.com/fingers.naps',
      icon: <Instagram size={16} />,
      isExternal: true
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white text-black py-16 md:py-24 px-6 md:px-12 flex flex-col items-center justify-center overflow-x-hidden"
    >
      <div className="w-full max-w-2xl flex flex-col items-center">
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

        {/* Connect Content */}
        <div className="w-full flex flex-col gap-12 md:gap-16">
          {contactInfo.map((info, index) => (
            <motion.div 
              key={info.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex flex-col gap-3 group"
            >
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-black/20">
                {info.label}
              </span>
              <a 
                href={info.href}
                target={info.isExternal ? "_blank" : undefined}
                rel={info.isExternal ? "noopener noreferrer" : undefined}
                className="text-lg md:text-xl lg:text-2xl font-medium tracking-tight hover:text-black/40 transition-all inline-flex items-center gap-3 group-hover:underline underline-offset-8 decoration-black/10"
              >
                {info.value}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-32 text-[8px] uppercase tracking-[0.5em] text-black/10 pb-12 text-center">
          © 2026 Portfolio — Crafted with Precision
        </footer>
      </div>
    </motion.div>
  );
}
