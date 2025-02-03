import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useBucketListApi } from '@/hooks/useBucketList/useBucketList';
import { useDreamAccountApi } from '@/hooks/useDreamAccount/useDreamAccount';
import { accountInfoRes } from '@/types/Account';
import { getBucketListbyIdRes } from '@/types/BucketList';
import { useEffect, useRef, useState } from 'react';
import { cn, parseIntWithoutCommas } from '@/lib/utils';
import { Button } from '../atoms/Button';
import { MoneyInputRef } from '../atoms/Inputs';
import { BankInfoCard } from '../molecules/BankInfoCard';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

type MoneyTransferDrawerProps = {
  transferDrawerOpen: boolean;
  setTransferDrawerOpen: (open: boolean) => void;
  transferType?: 'RECEIVE' | 'SEND' | 'BRINGOUT' | 'FILLUP';
  fromId?: number;
  toId?: number;
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
  /**직접 입력 유무 변수 */
  const [onSelf, setOnSelf] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const moneyRef = useRef<HTMLInputElement>(null);
  const onMoneyChange = () => {
    setAmount(parseIntWithoutCommas(moneyRef.current?.value ?? '0'));
  };
  const [transferSuccess, setTransferSuccess] = useState<boolean>(false);
  const {
    receiveMoneyToDreamAccount,
    sendMoneyFromDreamAccount,
    bringOutMoneyToDreamAccount,
    fillUpMoneyFromDreamAccount,
  } = useDreamAccountApi();
  const handleTransfer = async () => {
    const formData = {
      amount: amount,
    };
    switch (transferType) {
      case 'SEND':
        await sendMoneyFromDreamAccount(formData, fromId)
          .then(() => {
            setTransferSuccess(true);
          })
          .catch(() => {
            alert('금액이 부족합니다.');
          });
        break;
      case 'RECEIVE':
        await receiveMoneyToDreamAccount(formData, toId)
          .then(() => {
            setTransferSuccess(true);
          })
          .catch(() => {
            alert('금액이 부족합니다.');
          });
        break;
      case 'FILLUP':
        await fillUpMoneyFromDreamAccount(formData, accountInfo?.id, toId)
          .then(() => {
            setTransferSuccess(true);
          })
          .catch(() => {
            alert('금액이 부족합니다.');
          });
        break;
      case 'BRINGOUT':
        await bringOutMoneyToDreamAccount(formData, accountInfo?.id, fromId)
          .then(() => {
            setTransferSuccess(true);
          })
          .catch(() => {
            alert('금액이 부족합니다.');
          });
        break;
    }
  };
  const [openCheck, setOpenCheck] = useState<boolean>(false);

  type InfoCard = {
    balance?: number;
    title?: string;
  };
  const [fromBalance, setFromBalance] = useState<InfoCard>();
  const [toBalance, setToBalance] = useState<InfoCard>();

  const { getAccountInfo } = useDreamAccountApi();
  const { getBucketListbyId } = useBucketListApi();
  const [accountInfo, setAccountInfo] = useState<accountInfoRes>();
  const [bucketList, setBucketList] = useState<getBucketListbyIdRes>();

  /**계좌및 버킷 잔액 확인용 */
  useEffect(() => {
    switch (transferType) {
      case 'BRINGOUT':
        const getFROMBucketInfo = async () => {
          if (fromId) {
            await getBucketListbyId(fromId).then((res) => {
              setBucketList(res);
            });
          }
        };
        getFROMBucketInfo();
        break;
      case 'FILLUP':
        const getToBucketInfo = async () => {
          if (toId) {
            await getBucketListbyId(toId)
              .then((res) => {
                setBucketList(res);
              })
              .catch((err) => {
                alert(err);
              });
          }
        };
        getToBucketInfo();
        break;
    }
    const getAccount = async () => {
      await getAccountInfo()
        .then((res) => {
          setAccountInfo(res);
        })
        .catch((err) => {
          alert(err);
        });
    };
    getAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferDrawerOpen]);

  useEffect(() => {
    if (transferType === 'BRINGOUT' && bucketList) {
      setFromBalance({ title: bucketList.title, balance: bucketList.safeBox });
    }
    if (transferType === 'FILLUP' && bucketList) {
      setToBalance({ title: bucketList.title, balance: bucketList.safeBox });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bucketList]);

  useEffect(() => {
    if (accountInfo) {
      switch (transferType) {
        case 'BRINGOUT':
        case 'RECEIVE':
          setToBalance({ title: '꿈 모음 통장', balance: accountInfo.balance });
          break;
        case 'SEND':
        case 'FILLUP':
          setFromBalance({
            title: '꿈 모음 통장',
            balance: accountInfo.balance,
          });
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountInfo, setAccountInfo]);

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
        {!transferSuccess ? (
          <>
            <DrawerHeader className='text-left'>
              <DrawerTitle>
                {transferType === 'RECEIVE'
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
                balance={fromBalance?.balance}
                title={fromBalance?.title ?? '연결된 계좌'}
                type='from'
                isConnectedAccount={transferType === 'RECEIVE'}
              />
              <BankInfoCard
                balance={toBalance?.balance}
                title={toBalance?.title ?? '연결된 계좌'}
                type='to'
                isConnectedAccount={transferType === 'SEND'}
              />
              <div className='flex flex-col text-xl font-semibold items-start gap-3 flex-1 overflow-scroll w-full'>
                {Array.from(moneyShortCut).map(([key, value]) => (
                  <button
                    key={key}
                    className={cn('pl-5', onSelf && 'hidden')}
                    onClick={() => {
                      setAmount(value);
                      setOpenCheck(true);
                    }}
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
                        onClick={() => setOpenCheck(true)}
                      >
                        {transferType === 'RECEIVE'
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
                <AlertDialog
                  open={openCheck}
                  onOpenChange={(open) => setOpenCheck(open)}
                >
                  <AlertDialogContent className='bg-white z-[1000]'>
                    <AlertDialogHeader>
                      <AlertDialogTitle className='break-keep'>
                        입력하신 금액이 맞으신가요?
                      </AlertDialogTitle>
                      <AlertDialogDescription className='text-5xl font-semibold text-primary-main'>
                        {amount.toLocaleString()}원
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className='flex flex-col justify-center items-center '>
                      <Button className='py-2' onClick={handleTransfer}>
                        네, 맞아요
                      </Button>
                      <AlertDialogCancel className='btn-md rounded-xl text-[15px]'>
                        아니요 다시 입력할게요
                      </AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <div className='flex flex-col w-full justify-center items-center'>
                  <DrawerClose className='p-4 rounded-xl text-[15px] btn-lg bg-primary-disable text-white flex justify-center'>
                    취소하기
                  </DrawerClose>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className='flex flex-col justify-center items-center h-full gap-5 animate-fadeIn'>
            <h1 className='text-3xl font-semibold'>
              거래가 정상적으로 처리되었어요
            </h1>
            <div className='w-full flex justify-center items-center bg-none'>
              <video
                className='w-96'
                src='/image/video/pig.mp4'
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            <div className='flex flex-col w-full justify-center items-center'>
              <Button onClick={() => window.location.reload()}>완료하기</Button>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};
