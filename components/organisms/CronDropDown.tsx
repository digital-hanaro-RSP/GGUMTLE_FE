import useCreateBucketStore from '@/store/useCreateBucketStore';
import { IoIosArrowDown } from 'react-icons/io';
import { cn } from '@/lib/utils';
import ColorChip from '../atoms/ColorChips';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

type CycleDropDownProps = {
  disable?: boolean;
};

export const CycleDropDown = ({ disable }: CycleDropDownProps) => {
  const { cycleOpt1, setCycleOpt1, setCycleOpt2 } = useCreateBucketStore();
  const cycle1 = new Map([
    ['Default', '선택'],
    ['Daily', '매일'],
    ['Weekly', '매주'],
    ['Monthly', '매월'],
  ]);
  const handleClick = (key: string) => {
    setCycleOpt1(key);
    if (key === 'Monthly') {
      setCycleOpt2('1');
    } else {
      setCycleOpt2('Default');
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className={cn('w-36 mr-1 ')} disabled={disable}>
          <ColorChip
            color='default'
            className='py-3 border bg-white text-black focus:outline-none ring-0 text-sm rounded-md w-full'
          >
            <div className='flex flex-row'>
              <div className='flex-grow w-full flex justify-center items-center break-keep'>
                {cycle1.get(cycleOpt1)}
              </div>
              <div className='flex justify-end items-center flex-grow '>
                <IoIosArrowDown />
              </div>
            </div>
          </ColorChip>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=' min-w-[30px] w-fit px-[10px]'>
          <DropdownMenuLabel className='flex justify-center'>
            주기 선택
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Array.from(cycle1)
            .filter(([key]) => key !== 'Default')
            .map(([key, value]) => (
              <DropdownMenuItem key={key} onClick={() => handleClick(key)}>
                {value}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const WeeklyDropDown = ({ disable }: CycleDropDownProps) => {
  const { cycleOpt2, setCycleOpt2 } = useCreateBucketStore();
  const weekly = new Map([
    ['Default', '선택'],
    ['Mon', '월요일'],
    ['Tue', '화요일'],
    ['Wed', '수요일'],
    ['Thu', '목요일'],
    ['Fri', '금요일'],
    ['Sat', '토요일'],
    ['Sun', '일요일'],
  ]);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className={cn('w-36 mr-1 ')} disabled={disable}>
          <ColorChip
            color='default'
            className='py-3 border bg-white text-black focus:outline-none ring-0 text-sm rounded-md w-full'
          >
            <div className='flex flex-row'>
              <div className='flex-grow w-full flex justify-center items-center break-keep'>
                {weekly.get(cycleOpt2)}
              </div>
              <div className='flex justify-end items-center flex-grow '>
                <IoIosArrowDown />
              </div>
            </div>
          </ColorChip>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=' min-w-[30px] w-fit px-[10px]'>
          <DropdownMenuLabel className='flex justify-center'>
            주기 선택
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Array.from(weekly)
            .filter(([key]) => key !== 'Default')
            .map(([key, value]) => (
              <DropdownMenuItem key={key} onClick={() => setCycleOpt2(key)}>
                {value}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const MonthlyDropDown = ({ disable }: CycleDropDownProps) => {
  const { cycleOpt2, setCycleOpt2 } = useCreateBucketStore();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className={cn('w-36 mr-1 ')} disabled={disable}>
          <ColorChip
            color='default'
            className='py-3 border bg-white text-black focus:outline-none ring-0 text-sm rounded-md w-full'
          >
            <div className='flex flex-row'>
              <div className='flex-grow w-full flex justify-center items-center break-keep'>
                {cycleOpt2}일
              </div>
              <div className='flex justify-end items-center flex-grow '>
                <IoIosArrowDown />
              </div>
            </div>
          </ColorChip>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=' min-w-[30px] w-fit px-[10px] h-[200px] overflow-y-scroll'>
          <DropdownMenuLabel className='flex justify-center'>
            주기 선택
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Array.from({ length: 31 }).map((_, i) => (
            <DropdownMenuItem
              key={i}
              onClick={() => setCycleOpt2((i + 1).toString())}
            >
              {i + 1}일
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const DefaultDropDown = ({ disable }: CycleDropDownProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className={cn('w-36 mr-1 ')} disabled={disable}>
          <ColorChip
            color='default'
            className='py-3 border bg-white text-black focus:outline-none ring-0 text-sm rounded-md w-full'
          >
            <div className='flex flex-row'>
              <div className='flex-grow w-full flex justify-center items-center break-keep'>
                선택
              </div>
              <div className='flex justify-end items-center flex-grow '>
                <IoIosArrowDown />
              </div>
            </div>
          </ColorChip>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=' min-w-[30px] w-fit px-[10px] overflow-y-scroll'>
          <DropdownMenuLabel className='flex justify-center'>
            주기 선택
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>선택</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
