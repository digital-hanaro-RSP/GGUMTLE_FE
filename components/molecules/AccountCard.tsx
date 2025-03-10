'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';
import { MoneyTransferDrawer } from '../organisms/MoneyTransferDrawer';

type AccountCardProps = {
  title: string;
  balance: string;
  className?: string;
  aid?: number;
};

export default function AccountCard({
  aid,
  title,
  balance,
  className,
}: AccountCardProps) {
  const [isHide, setIsHide] = useState(false);
  const [transferDrawerOpen, setTransferDrawerOpen] = useState<boolean>(false);
  const [transferType, setTransferType] = useState<
    'SEND' | 'RECEIVE' | undefined
  >();
  const onTransferClick = (type: 'SEND' | 'RECEIVE' | undefined) => {
    setTransferType(type);
    setTransferDrawerOpen(true);
  };
  return (
    <>
      <Card
        className={cn(
          'flex flex-col w-full p-[20px] justify-between',
          className
        )}
      >
        {/* 제목 및 계좌 번호 및 잔액 */}
        <div className='flex flex-col justify-between'>
          {/* 제목 */}
          <h1 className='font-semibold text-[18px] mb-[10px] h-[21px] text-[#272727]'>
            {title}
          </h1>
          {/* 잔액 및 숨김 버튼 */}
          <div className='flex items-center  mb-[10px]'>
            {/* 잔액 */}
            {isHide ? (
              <div className='flex items-center h-[36px]'>
                <h3 className='text-subGray font-bold text-[25px] mr-[5px]'>
                  금액 숨김
                </h3>
              </div>
            ) : (
              <div className='flex items-center h-[36px]'>
                <h2 className='font-bold text-[30px] mr-[5px]'>
                  {Number(balance).toLocaleString()}
                </h2>
                <span className='font-semibold text-[25px] mr-[5px]'>원</span>
              </div>
            )}

            {/* 숨김 버튼 */}
            <button
              className='rounded-lg w-[30px] h-[20px] bg-[#EAE9EE] text-[#6F6F6F] text-[10px] font-bold z-[0]'
              onClick={() => {
                setIsHide((pre) => !pre);
              }}
            >
              {isHide ? '보기' : '숨김'}
            </button>
          </div>
        </div>

        {/* 가져오기, 보내기, ... 버튼 */}
        <div className='flex'>
          <Button
            className='rounded-lg bg-[#EFF0F4] text-fontBlack flex-1 h-[40px] mr-[9px] flex items-center justify-center'
            onClick={() => onTransferClick('RECEIVE')}
          >
            가져오기
          </Button>
          <Button
            className='rounded-lg flex-1 h-[40px] mr-[13px] flex items-center justify-center'
            onClick={() => onTransferClick('SEND')}
          >
            보내기
          </Button>
          <Button
            className='rounded-lg bg-[#EFF0F4] text-[#666668] h-[40px] w-[40px] flex items-center justify-center'
            style={{ boxShadow: '0px 4px 8px 0px rgba(136, 137, 157, 0.30)' }}
          >
            ...
          </Button>
        </div>
      </Card>
      <div>
        {transferType === 'RECEIVE' && (
          <MoneyTransferDrawer
            transferDrawerOpen={transferDrawerOpen}
            setTransferDrawerOpen={(open) => setTransferDrawerOpen(open)}
            transferType={'RECEIVE'}
            fromId={undefined}
            toId={aid}
          />
        )}
        {transferType === 'SEND' && (
          <MoneyTransferDrawer
            transferDrawerOpen={transferDrawerOpen}
            setTransferDrawerOpen={(open) => setTransferDrawerOpen(open)}
            transferType={'SEND'}
            fromId={aid}
            toId={undefined}
          />
        )}
      </div>
    </>
  );
}
