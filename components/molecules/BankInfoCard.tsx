import Image from 'next/image';

export type BankInfoCardProps = {
  type: 'to' | 'from';
  title: string;
  isConnectedAccount?: boolean;
  balance?: number;
};

/** 가져오기, 보내기, 채우기, 꺼내기 관련 은행 계좌 정보 */
export const BankInfoCard = ({
  type,
  title,
  isConnectedAccount,
  balance,
}: BankInfoCardProps) => {
  const formattedBalance = `${(balance ?? 0).toLocaleString()}원`;
  return (
    <>
      <div className='bg-gray-200 rounded-lg flex items-center p-3 gap-4'>
        <Image
          src={'/image/Account/Hana.jpg'}
          alt='bankImg'
          width={56}
          height={56}
          className='rounded-2xl'
        />
        <div className='break-keep'>
          <strong>
            {title}
            {type === 'to' ? '으로' : '에서'}
          </strong>
        </div>
        <div className='flex justify-end flex-grow text-primary-main break-keep'>
          <strong className='font-semibold'>
            {isConnectedAccount ? '잔액 **원' : formattedBalance}
          </strong>
        </div>
      </div>
    </>
  );
};
