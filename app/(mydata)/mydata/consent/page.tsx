'use client';

import { Button } from '@/components/atoms/Button';
import { AgreementBox } from '@/components/molecules/AgreementBox';
import { TermsModal } from '@/components/molecules/TermsModal';
import { useMyDataApi } from '@/hooks/useMyData/useMyData';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ConsentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { updatePermission } = useMyDataApi();
  const [isChecked, setIsChecked] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const { data: session, update } = useSession();

  const handleConsentSuccess = async () => {
    if (!isChecked) {
      alert('모든 항목에 동의해주세요.');
      return;
    }

    try {
      const response = await updatePermission();
      if (response.permission === 1) {
        // session의 user만 업데이트
        await update({
          ...session,
          user: {
            ...session?.user,
            permission: 1,
          },
        });

        console.log(response.permission);
        router.push('/mydata/sync');
      } else {
        alert('마이데이터 권한 설정에 실패했습니다.');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='p-4 bg-[#F2F5F6]'>
      <div className='flex flex-col items-center gap-14'>
        <div className='flex flex-col items-center mt-3'>
          <h1 className='text-xl font-bold tracking-tighter whitespace-pre-line text-center text-primary-main mb-2 mt-10'>
            마이데이터에서{'\n'}정보를 가져올까요?
          </h1>
          <div className='w-60 h-60'>
            <video
              src='/image/video/file.mp4'
              autoPlay
              loop
              muted
              playsInline
              className='mb-3 mt-10'
            />
          </div>
          <p className='text-[#7D8B8A] font-semibold text-center text-md translate-y-12'>
            약관동의하시면
            <br />
            소중한 꿈을 이루는데 도움을 드릴 수 있어요!
          </p>
        </div>
        <div className='flex flex-col items-center mt-16'>
          <Button size='lg' onClick={handleOpenModal}>
            약관동의 하러가기
          </Button>
        </div>
      </div>

      <TermsModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className='p-6'>
          <h2 className='text-xl font-semibold mb-4'>
            서비스 이용을 위해
            <br />
            아래 내용에 동의해 주세요
          </h2>
          <AgreementBox
            title='전체 동의하기'
            checked={isChecked}
            onChange={setIsChecked}
            isOpen={isModalOpen}
          />
        </div>
        <div className='flex flex-col items-center mt-2'>
          <Button size='lg' onClick={handleConsentSuccess}>
            확인
          </Button>
        </div>
      </TermsModal>
    </div>
  );
}
