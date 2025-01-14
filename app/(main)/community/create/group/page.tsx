import Header from '@/components/atoms/Header';
import { DefaultInputRef } from '@/components/atoms/Inputs';

export default function CreateGroupPage() {
  return (
    <div className='flex flex-col gap-[20px] w-full'>
      <Header text='꿈모임 만들기' showActionButton={false} />
      <div className='flex flex-col gap-[20px] w-full px-[20px]'>
        <div className='flex flex-col gap-[7px]'>
          <p className='text-[18px] font-bold'>
            생성할 꿈모임의 이름을 입력해주세요.
          </p>
          <DefaultInputRef placeHolder='꿈모임 이름을 입력해주세요.' />
        </div>
      </div>
    </div>
  );
}
