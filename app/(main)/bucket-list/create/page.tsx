'use client';

import { DefaultInputRef, MoneyInputRef } from '@/components/atoms/Inputs';
import { RadioItem } from '@/components/atoms/RadioItem';
import TextArea from '@/components/atoms/TextArea';
import {
  DropCard,
  DropCardItem,
  DropCardItemList,
  DropDownTrigger,
} from '@/components/molecules/DropCard';
import {
  CycleDropDown,
  DefaultDropDown,
  MonthlyDropDown,
  WeeklyDropDown,
} from '@/components/organisms/CronDropDown';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import useCreateBucketStore from '@/contexts/useCreateBucketStore';
import { addDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { IoIosArrowDown } from 'react-icons/io';
import { useRef, useState } from 'react';
import * as React from 'react';
import { cn } from '@/lib/utils';

export default function BucketListRegisterPage() {
  const bucketTitleRef = useRef<HTMLInputElement>(null);
  const [bucketType, setBucketType] = useState<string>('default');
  const [isDueDate, setIsDueDate] = useState<boolean | null>(null);
  const [date, setDate] = useState<Date>();
  const [howTo, setHowTo] = useState<'MONEY' | 'EFFORT' | 'WILL'>();
  const [autoAllocate, setAutoAllocate] = useState<boolean>(false);
  const [memo, setMemo] = useState<string>('');
  console.log('🚀 ~ BucketListRegisterPage ~ memo:', memo);

  const { cycleOpt1 } = useCreateBucketStore();

  const categories = new Map([
    ['default', '버킷리스트 타입을 선택해주세요.'],
    ['want', '해보고 싶다'],
    ['become', '되고 싶다'],
    ['have', '갖고 싶다'],
    ['visit', '가보고 싶다'],
    ['learn', '배우고 싶다'],
  ]);

  const bgColor = (type: string) => {
    switch (type) {
      case 'want':
        return '#FFF89F';
      case 'become':
        return '#CDF5D8';
      case 'have':
        return '#CDF7F7';
      case 'visit':
        return '#F5CFF6';
      case 'learn':
        return '#F3D0CE';
      default:
        return '#FFF';
    }
  };

  const clickIsDueDate = (tf: boolean) => {
    setIsDueDate(tf);
  };
  const clickHowTo = (howto: 'MONEY' | 'EFFORT' | 'WILL') => {
    setHowTo(howto);
  };
  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };

  const CycleMoneyinputRef = useRef<HTMLInputElement>(null);
  console.log(CycleMoneyinputRef);

  const GoalMoneyinputRef = useRef<HTMLInputElement>(null);
  console.log(GoalMoneyinputRef);

  return (
    <div className='p-4'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl font-bold'>버킷리스트가 무엇인가요?</h1>
        <DefaultInputRef
          placeHolder='버킷리스트를 입력해주세요.'
          ref={bucketTitleRef}
          required
        />
        <DropCard className='flex flex-col justify-center relative'>
          <DropDownTrigger>
            <div
              className={cn(
                'bg-white text-[#9CA3AF] btn-lg py-3 px-4 font-normal text-left rounded-xl text-[16px] w-full border flex flex-row justify-between items-center'
              )}
            >
              <p>{categories.get(bucketType)}</p>
              <IoIosArrowDown className={cn('-rotate-90')} />
              <div
                className={cn(
                  'border px-3 absolute right-10 rounded-md top-2 h-2/3'
                )}
                style={{ backgroundColor: bgColor(bucketType) }}
              ></div>
            </div>
          </DropDownTrigger>
          <DropCardItemList
            isBlur={true}
            direction='down'
            className='items-center gap-2 top-[52px]'
          >
            {Array.from(categories)
              .filter(([key]) => key !== 'default')
              .map(([key, value]) => (
                <DropCardItem key={key} onClick={() => setBucketType(key)}>
                  <div
                    className={cn(
                      'bg-white text-black btn-lg py-3 px-4 text-left rounded-xl text-[15px] w-full relative'
                    )}
                  >
                    {value}
                    <div
                      className={cn(
                        'border px-3 absolute right-10 rounded-md top-2 h-2/3'
                      )}
                      style={{ backgroundColor: bgColor(key) }}
                    ></div>
                  </div>
                </DropCardItem>
              ))}
          </DropCardItemList>
        </DropCard>
      </div>
      <div
        className={cn(
          'pt-3 flex flex-col gap-2',
          bucketType === 'default' || !bucketTitleRef
            ? 'hidden'
            : 'animate-fadeIn'
        )}
      >
        <h1 className='text-xl font-bold'>언제까지 이루고 싶나요?</h1>
        <fieldset className='flex flex-row gap-2'>
          <RadioItem
            className='rounded-lg'
            contentDirection='vertical'
            shape='box'
            id='date-op1'
            name='date'
            onChange={() => clickIsDueDate(false)}
          >
            기간 미정
          </RadioItem>
          <RadioItem
            className='rounded-lg'
            contentDirection='vertical'
            shape='box'
            id='date-op2'
            name='date'
            onChange={() => clickIsDueDate(true)}
          >
            기간 설정
          </RadioItem>
        </fieldset>
        <div className={cn(isDueDate ? 'animate-fadeIn' : 'hidden')}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full bg-white justify-start text-left font-normal rounded-lg py-5',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon />
                {date ? (
                  format(date, 'yyyy년 M월 d일', { locale: ko })
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-full p-0'>
              <Select
                onValueChange={(value) =>
                  setDate(addDays(new Date(), parseInt(value)))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent position='popper'>
                  <SelectItem value='1'>일주일 뒤</SelectItem>
                  <SelectItem value='30'>한달 뒤</SelectItem>
                  <SelectItem value='183'>6개월 뒤</SelectItem>
                  <SelectItem value='365'>1년 뒤</SelectItem>
                </SelectContent>
              </Select>
              <Calendar
                className='w-full'
                mode='single'
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div
        className={cn(
          'pt-3 flex flex-col gap-3',
          date || isDueDate === false ? 'animate-fadeIn' : 'hidden'
        )}
      >
        <h1 className='text-xl font-bold'>이루기 위해 무엇이 필요한가요?</h1>
        <fieldset className='flex flex-row gap-2'>
          <RadioItem
            className='rounded-lg'
            contentDirection='vertical'
            shape='box'
            id='need-op1'
            name='need'
            onChange={() => clickHowTo('MONEY')}
          >
            자금
          </RadioItem>
          <RadioItem
            className='rounded-lg'
            contentDirection='vertical'
            shape='box'
            id='need-op2'
            name='need'
            onChange={() => clickHowTo('EFFORT')}
          >
            노력
          </RadioItem>
          <RadioItem
            className='rounded-lg'
            contentDirection='vertical'
            shape='box'
            id='need-op3'
            name='need'
            onChange={() => clickHowTo('WILL')}
          >
            의지
          </RadioItem>
        </fieldset>
        <div
          className={cn(
            'flex flex-col gap-3',
            howTo === 'MONEY' ? 'animate-fadeIn' : 'hidden'
          )}
        >
          <div
            className={cn(
              'bg-white text-[#9CA3AF] btn-lg py-3 px-4 font-normal text-left rounded-xl text-[16px] w-full border flex flex-row justify-between items-center'
            )}
          >
            <p>정기적으로 쌓기</p>
            <Switch onCheckedChange={() => setAutoAllocate(!autoAllocate)} />
          </div>
          <div className={cn('flex flex-row')}>
            <CycleDropDown disable={!autoAllocate} />
            {cycleOpt1 === 'Monthly' ? (
              <MonthlyDropDown disable={!autoAllocate} />
            ) : cycleOpt1 === 'Weekly' ? (
              <WeeklyDropDown disable={!autoAllocate} />
            ) : (
              <DefaultDropDown disable={!autoAllocate} />
            )}
            <MoneyInputRef
              disable={!autoAllocate}
              ref={CycleMoneyinputRef}
              onChange={() => console.log(CycleMoneyinputRef.current?.value)}
            />
          </div>
          <MoneyInputRef
            ref={GoalMoneyinputRef}
            onChange={() => console.log(GoalMoneyinputRef.current?.value)}
          />
        </div>
      </div>
      <div className='w-full'>
        <h1 className='text-xl font-bold'>메모</h1>
        <div className='flex w-full justify-center items-center'>
          <TextArea type='memo' value={memo} onChange={handleMemoChange} />
        </div>
      </div>
    </div>
  );
}
