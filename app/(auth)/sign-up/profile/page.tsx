'use client';

import { Button } from '@/components/atoms/Button';
import { DefaultInputRef, ImageInputRef } from '@/components/atoms/Inputs';
import ShowSelectedImage from '@/components/atoms/ShowSelectedImage';
import { useCommunityApi } from '@/hooks/useCommunity/useCommunity';
import { useSignUpStore } from '@/store/useSignUpStore';
import { SignUpData } from '@/types/Auth';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { checkImageSize } from '@/lib/utils';

export default function ProfilePage() {
  const { formData, setFinalInfo } = useSignUpStore();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { uploadImages } = useCommunityApi();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!checkImageSize(file)) {
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setSelectedFile(file);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage('');
    setSelectedFile(null);
  };

  const handleSignUp = async () => {
    const passwordInput = document.querySelector(
      "input[name='password']"
    ) as HTMLInputElement;
    const confirmPasswordInput = document.querySelector(
      "input[name='confirmPassword']"
    ) as HTMLInputElement;
    const nicknameInput = document.querySelector(
      "input[name='nickname']"
    ) as HTMLInputElement;

    if (passwordInput.value !== confirmPasswordInput.value) {
      Swal.fire({
        title: 'Oops!',
        text: '비밀번호가 일치하지 않습니다.',
        icon: 'error',
        confirmButtonText: '네',
      });
      return;
    }

    let profileImageUrl = '';

    if (selectedFile) {
      const encodedUrls = await uploadImages([selectedFile]);
      profileImageUrl = encodedUrls[0];
    }

    if (passwordInput?.value && nicknameInput?.value) {
      setFinalInfo(passwordInput.value, nicknameInput.value);

      const signUpData: SignUpData = {
        name: formData.name,
        birthDate: formData.birthDate,
        gender: formData.gender as 'm' | 'f',
        tel: formData.tel,
        password: passwordInput.value,
        nickname: nicknameInput.value,
        profileImageUrl: profileImageUrl,
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/data/user`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(signUpData),
          }
        );

        const data = await response.json();

        if (data.code === 200) {
          Swal.fire({
            text: '회원가입이 성공적으로 완료되었습니다.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          router.push('/sign-in');
        } else {
          // API에서 다양한 에러 코드와 메시지 전달 시
          switch (data.code) {
            case 409:
              Swal.fire({
                title: 'Oops!',
                text: data.message || '중복된 전화번호입니다.',
                icon: 'error',
                confirmButtonText: '네',
              });
              break;
            case 500:
              Swal.fire({
                title: 'Oops!',
                text: data.message || '내부 서버 오류가 발생했습니다.',
                icon: 'error',
                confirmButtonText: '네',
              });
              break;
            default:
              Swal.fire({
                title: 'Oops!',
                text: data.message || '회원가입에 실패했습니다.',
                icon: 'error',
                confirmButtonText: '네',
              });
          }
        }
      } catch (error) {
        console.error('회원가입 실패:', error);
        Swal.fire({
          title: 'Oops!',
          text: '회원가입 중 오류가 발생했습니다.',
          icon: 'error',
          confirmButtonText: '네',
        });
      }
    } else {
      Swal.fire({
        title: 'Oops!',
        text: '모든 필수 항목을 입력해주세요',
        icon: 'error',
        confirmButtonText: '네',
      });
    }
  };

  return (
    <div className='py-2 px-4'>
      <div className='flex flex-col items-center gap-10'>
        <div className='flex flex-col items-center mt-3'>
          {/* <Image
            src={'/image/icons/smile.png'}
            width={80}
            height={80}
            alt={''}
            className='mb-3'
          /> */}
          <h1 className='text-xl font-bold tracking-tighter whitespace-pre-line text-center text-primary-main mb-2'>
            프로필 정보를 입력하고{'\n'}나만의 계정을 만들어보세요
          </h1>
        </div>

        <div className='w-full max-w-md space-y-6'>
          <div>
            <p className='text-lg font-bold mb-2 text-[#5B5B5B]'>비밀번호</p>
            <DefaultInputRef
              type='password'
              name='password'
              placeHolder='비밀번호를 입력하세요'
              required
              error='비밀번호를 입력해주세요'
            />
          </div>
          <div>
            <p className='text-lg font-bold mb-2 text-[#5B5B5B]'>
              비밀번호 확인
            </p>
            <DefaultInputRef
              type='password'
              name='confirmPassword'
              placeHolder='비밀번호를 다시 입력해주세요'
              required
              error='비밀번호를 입력해주세요'
            />
          </div>
          <div>
            <p className='text-lg font-bold mb-2 text-[#5B5B5B]'>닉네임</p>
            <DefaultInputRef
              type='name'
              name='nickname'
              placeHolder='닉네임은 10글자까지 가능해요.'
              required
              error='닉네임을 입력해주세요'
            />
          </div>
          <div>
            <p className='text-lg font-bold mb-2 text-[#5B5B5B]'>
              프로필 이미지 설정
            </p>
            <div className='flex items-center justify-center'>
              {selectedImage ? (
                <ShowSelectedImage
                  imageUrl={selectedImage}
                  onRemove={handleImageRemove}
                />
              ) : (
                <ImageInputRef onChange={handleImageSelect} />
              )}
            </div>
          </div>
          <div className='flex flex-col items-center mt-2'>
            <Button size='lg' onClick={handleSignUp}>
              회원가입 완료
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
