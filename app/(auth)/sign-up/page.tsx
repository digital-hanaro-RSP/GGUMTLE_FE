'use client';

import { Button } from '@/components/atoms/Button';
import { DefaultInputRef } from '@/components/atoms/Inputs';
import { RadioItem } from '@/components/atoms/RadioItem';
import { useSignUpStore } from '@/store/useSignUpStore';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

export default function SignUpPage() {
  const router = useRouter();
  const setBasicInfo = useSignUpStore((state) => state.setBasicInfo);

  const [name, setName] = useState('');
  const [birth, setBirth] = useState({
    year: '',
    month: '',
    day: '',
  });
  const [gender, setGender] = useState('');

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBirthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBirth((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };

  const handleNext = () => {
    // 입력값 존재 여부 검증
    if (!name || !birth.year || !birth.month || !birth.day || !gender) {
      Swal.fire({
        title: 'Oops!',
        text: '모든 정보를 입력해주세요.',
        icon: 'error',
        confirmButtonText: '네',
      });
      return;
    }

    // 숫자 검증을 위한 정규식
    const numberRegex = /^\d+$/;

    // 생년월일 숫자 검증
    if (
      !numberRegex.test(birth.year) ||
      !numberRegex.test(birth.month) ||
      !numberRegex.test(birth.day)
    ) {
      Swal.fire({
        title: 'Oops!',
        text: '생년월일은 숫자만 입력 가능합니다.',
        icon: 'error',
        confirmButtonText: '네',
      });
      return;
    }

    // 생년월일 유효성 검증
    const year = parseInt(birth.year);
    const month = parseInt(birth.month);
    const day = parseInt(birth.day);

    if (year < 1900 || year > new Date().getFullYear()) {
      Swal.fire({
        title: 'Oops!',
        text: '올바른 출생연도를 입력해주세요.',
        icon: 'error',
        confirmButtonText: '네',
      });
      return;
    }

    if (month < 1 || month > 12) {
      Swal.fire({
        title: 'Oops!',
        text: '올바른 월을 입력해주세요.',
        icon: 'error',
        confirmButtonText: '네',
      });
      return;
    }

    if (day < 1 || day > 31) {
      Swal.fire({
        title: 'Oops!',
        text: '올바른 일을 입력해주세요.',
        icon: 'error',
        confirmButtonText: '네',
      });
      return;
    }

    // 생년월일 포맷팅
    const birthDate = `${birth.year}-${birth.month.padStart(2, '0')}-${birth.day.padStart(2, '0')}`;

    // gender 값 변환 ('male' -> 'm', 'female' -> 'f')
    const genderValue = gender === 'male' ? 'm' : 'f';

    // Zustand store에 저장
    setBasicInfo(name, birthDate, genderValue);

    // 다음 페이지로 이동
    router.push('/sign-up/phone');
  };

  return (
    <div className='h-screen overflow-hidden'>
      <div className='h-full overflow-y-auto p-4'>
        <div className='flex flex-col items-center gap-10'>
          <div className='flex flex-col items-center mt-3'>
            <Image
              src={'/image/icons/list.png'}
              width={80}
              height={80}
              alt={'리스트 아이콘'}
              className='mb-3'
              style={{ width: 80, height: 80 }}
            />
            <h1 className='text-xl font-bold whitespace-pre-line text-center text-primary-main mb-4'>
              아래 내용을 하나씩{'\n'}차근차근 입력해주세요
            </h1>
          </div>

          <div className='w-full max-w-md space-y-6'>
            <div>
              <p className='text-lg font-bold mb-2 text-[#5B5B5B]'>이름</p>
              <DefaultInputRef
                name='name'
                placeHolder='이름을 입력해주세요'
                onChange={handleNameChange}
                value={name}
                required
                error='이름을 입력해주세요'
              />
            </div>

            <div>
              <p className='text-lg font-bold mb-2 text-[#5B5B5B]'>생년월일</p>
              <div className='flex justify-between'>
                <div className='w-[30%]'>
                  <DefaultInputRef
                    name='year'
                    placeHolder='출생연도'
                    onChange={handleBirthChange}
                    value={birth.year}
                    required
                    maxLength={4}
                  />
                </div>
                <div className='w-[30%]'>
                  <DefaultInputRef
                    name='month'
                    placeHolder='월'
                    onChange={handleBirthChange}
                    value={birth.month}
                    required
                    maxLength={2}
                  />
                </div>
                <div className='w-[30%]'>
                  <DefaultInputRef
                    name='day'
                    placeHolder='일'
                    onChange={handleBirthChange}
                    value={birth.day}
                    required
                    maxLength={2}
                  />
                </div>
              </div>
            </div>

            <div>
              <p className='text-lg font-bold mb-2 text-[#5B5B5B]'>성별</p>
              <div className='flex gap-4'>
                <RadioItem
                  id='male'
                  name='gender'
                  value='male'
                  contentDirection='vertical'
                  shape='box'
                  className='flex-1 rounded-xl text-[#C0C0C0] border border-placeholderGray'
                  onChange={handleGenderChange}
                  checked={gender === 'male'}
                >
                  남성
                </RadioItem>
                <RadioItem
                  id='female'
                  name='gender'
                  value='female'
                  contentDirection='vertical'
                  shape='box'
                  className='flex-1 rounded-xl text-[#C0C0C0] border border-placeholderGray'
                  onChange={handleGenderChange}
                  checked={gender === 'female'}
                >
                  여성
                </RadioItem>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center mt-12'>
            <Button size='lg' onClick={handleNext}>
              다음
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
