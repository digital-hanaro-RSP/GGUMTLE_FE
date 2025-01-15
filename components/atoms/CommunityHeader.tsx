'use client';

import { motion } from 'motion/react';

export type Tab = 'popular' | 'group' | 'mygroup';

type CommunityHeaderProps = {
  selectedTab: Tab;
  onTabChange: (tab: Tab) => void;
};

export default function CommunityHeader({
  selectedTab,
  onTabChange,
}: CommunityHeaderProps) {
  const tabs: Tab[] = ['popular', 'group', 'mygroup'];

  const tabNameMap: Record<Tab, string> = {
    popular: '인기게시물',
    group: '꿈모임',
    mygroup: '내꿈모임',
  };

  const selectedIndex = tabs.indexOf(selectedTab);
  const tabWidthPercent = 100 / tabs.length;

  return (
    <div className='w-full h-[50px] flex items-center relative'>
      {/* 슬라이딩 배경 요소 */}
      <motion.div
        className='absolute top-0 bottom-0 bg-primary-main z-0'
        style={{
          width: `${tabWidthPercent}%`,
          left: `${selectedIndex * tabWidthPercent}%`,
        }}
        animate={{
          left: `${selectedIndex * tabWidthPercent}%`,
        }}
        transition={{
          type: 'tween',
          stiffness: 300,
          damping: 30,
          duration: 0.3,
        }}
      />
      {tabs.map((tab) => (
        <div
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`flex-1 h-full flex items-center justify-center cursor-pointer text-center font-semibold z-10
            ${selectedTab === tab ? 'text-white' : 'text-black'}`}
        >
          {tabNameMap[tab]}
        </div>
      ))}
    </div>
  );
}
