'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>; // 사용자의 선택 결과, platform은 사용된 플랫폼
}

export function InstallPWA() {
  const [supportsPWA, setSupportsPWA] = useState(false); // 브라우저가 PWA 설치 지원하는지 여부
  const [promptInstall, setPromptInstall] =
    useState<BeforeInstallPromptEvent | null>(null); // 설치 프롬프트 이벤트 객체
  const [isInstalled, setIsInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler); // 윈도우 객체에 이벤트 리스너 등록

    // standalone은 이미 설치된 상태.  이미 설치 됐는지 확인
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleInstall = async () => {
    if (!promptInstall) return;
    promptInstall.prompt();
    const { outcome } = await promptInstall.userChoice;
    if (outcome === 'accepted') {
      // 사용자가 설치하겠다 했으면 설치
      setIsInstalled(true);
    }
  };

  if (!supportsPWA || isInstalled || dismissed) return null;

  return (
    <div
      className={`fixed w-full max-w-screen-md bottom-[100px] mx-auto bg-white p-4 rounded-lg shadow-lg transform transition-transform duration-300 z-[111111] ${
        animateIn ? 'translate-y-0' : 'translate-y-[300px]'
      }`}
    >
      <h3 className='text-lg font-semibold mb-2'>꿈틀 앱 설치하기</h3>
      <p className='mb-4'>
        앱을 설치해서 꿈틀 서비스를 더욱 간편하게 이용하세요!
      </p>
      <div className='flex gap-2'>
        <button
          onClick={handleInstall}
          className='flex-1 bg-primary-main text-white py-2 rounded-md'
        >
          설치하기
        </button>
        <button
          onClick={() => setDismissed(true)}
          className='flex-1 bg-gray-300 text-black py-2 rounded-md'
        >
          닫기
        </button>
      </div>
    </div>
  );
}
