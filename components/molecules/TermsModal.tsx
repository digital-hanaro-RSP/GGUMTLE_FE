import { useEffect, useRef, useState } from 'react';

export interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const TermsModal = ({ isOpen, onClose, children }: TermsModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = 'hidden';
      // Delay setting visibility to next frame to ensure mount is complete
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        setMounted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div
      className='fixed inset-0 z-50'
      style={{
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
          isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        ref={modalRef}
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[768px] h-2/3 
          bg-white rounded-t-3xl transform transition-transform duration-300 ease-out ${
            isVisible ? 'translate-y-0' : 'translate-y-full'
          }`}
        style={{
          willChange: 'transform',
        }}
      >
        <div className='h-full overflow-y-auto'>{children}</div>
      </div>
    </div>
  );
};
