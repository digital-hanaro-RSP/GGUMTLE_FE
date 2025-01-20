import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useRef, useState } from 'react';
import { cn, parseIntWithoutCommas } from '@/lib/utils';
import { Button } from '../atoms/Button';
import ColorChip from '../atoms/ColorChips';
import { MoneyInputRef } from '../atoms/Inputs';
import { BankInfoCard } from '../molecules/BankInfoCard';

type MoneyTransferDrawerProps = {
  transferDrawerOpen: boolean;
  setTransferDrawerOpen: (open: boolean) => void;
  transferType: 'RETRIEVE' | 'SEND' | 'BRINGOUT' | 'FILLUP';
  fromId: number;
  toId: number;
};

export const MoneyTransferDrawer = ({
  transferDrawerOpen,
  setTransferDrawerOpen,
  transferType,
  fromId,
  toId,
}: MoneyTransferDrawerProps) => {
  const moneyShortCut = new Map([
    ['200만원', 2000000],
    ['100만원', 1000000],
    ['50만원', 500000],
    ['30만원', 300000],
    ['20만원', 200000],
    ['10만원', 100000],
  ]);
  const [onSelf, setOnSelf] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const moneyRef = useRef<HTMLInputElement>(null);
  const onMoneyChange = () => {
    setAmount(parseIntWithoutCommas(moneyRef.current?.value ?? '0'));
  };

  return (
    <Drawer
      open={transferDrawerOpen}
      onOpenChange={(open) => {
        setTransferDrawerOpen(open);
        setOnSelf(false);
        setAmount(0);
      }}
    >
      <DrawerContent className='h-[70%] max-h-[70%] max-w-screen-md mx-auto flex flex-col gap-[0px] px-[10px] pb-[60px] overflow-hidden'>
        <DrawerHeader className='text-left'>
          <DrawerTitle>
            {transferType === 'RETRIEVE'
              ? '얼마나 가져올까요?'
              : transferType === 'SEND'
                ? '얼마나 보낼까요?'
                : transferType === 'FILLUP'
                  ? '얼마나 채울까요?'
                  : '얼마나 꺼낼까요?'}
          </DrawerTitle>
        </DrawerHeader>
        <div className='flex flex-grow flex-col gap-2 py-0 overflow-scroll'>
          <BankInfoCard
            balance={1234567}
            title='하나은행 계좌'
            type='from'
            isConnectedAccount={transferType === 'RETRIEVE'}
          />
          <BankInfoCard
            balance={1234567}
            title='하나은행 계좌'
            type='to'
            isConnectedAccount={transferType === 'SEND'}
          />
          <div className='flex flex-col text-xl font-semibold items-start gap-3 flex-1 overflow-scroll w-full'>
            {Array.from(moneyShortCut).map(([key, value]) => (
              <button
                key={key}
                className={cn('pl-5', onSelf && 'hidden')}
                onClick={() => setAmount(value)}
              >
                {key}
              </button>
            ))}
            <div className='w-full flex justify-center items-center flex-col'>
              <button
                className='pl-5 text-left w-full'
                onClick={() => setOnSelf(true)}
              >
                직접 입력하기
              </button>
              {onSelf && (
                <div className='w-full flex gap-3 flex-col items-center'>
                  <MoneyInputRef
                    value={amount.toLocaleString()}
                    ref={moneyRef}
                    onChange={onMoneyChange}
                    placeHolder='얼마를 충전할까요?'
                  />
                  <div className='flex flex-row justify-around text-black text-sm font-light w-full'>
                    <button
                      className='bg-gray-300 px-5 py-2 rounded-lg'
                      onClick={() => setAmount((prev) => prev + 10000)}
                    >
                      +1만
                    </button>
                    <button
                      className='bg-gray-300 px-5 py-2 rounded-lg'
                      onClick={() => setAmount((prev) => prev + 50000)}
                    >
                      +5만
                    </button>
                    <button
                      className='bg-gray-300 px-5 py-2 rounded-lg'
                      onClick={() => setAmount((prev) => prev + 100000)}
                    >
                      +10만
                    </button>
                    <button
                      className='bg-gray-300 px-5 py-2 rounded-lg'
                      onClick={() => setAmount((prev) => prev + 500000)}
                    >
                      +50만
                    </button>
                  </div>
                  <Button
                    isDisabled={amount === 0}
                    className=''
                    size='lg'
                    onClick={() => console.log(amount)}
                  >
                    {transferType === 'RETRIEVE'
                      ? '가져오기'
                      : transferType === 'SEND'
                        ? '보내기'
                        : transferType === 'FILLUP'
                          ? '채우기'
                          : '꺼내기'}
                  </Button>
                </div>
              )}
            </div>
            <div className='flex flex-col w-full justify-center items-center'>
              <DrawerClose className='p-4 rounded-xl text-[15px] btn-lg bg-primary-disable text-white flex justify-center'>
                취소하기
              </DrawerClose>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
