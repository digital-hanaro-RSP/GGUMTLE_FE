'use client';

export type Tab = '인기게시물' | '꿈모임' | '내꿈모임';

type CommunityHeaderProps = {
  selectedTab: Tab;
  onTabChange: (tab: Tab) => void;
};

export default function CommunityHeader({
  selectedTab,
  onTabChange,
}: CommunityHeaderProps) {
  const tabs: Tab[] = ['인기게시물', '꿈모임', '내꿈모임'];

  return (
    <div className='w-full h-[50px] flex items-center'>
      {tabs.map((tab) => (
        <div
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`flex-1 h-full flex items-center justify-center cursor-pointer text-center transition-colors font-semibold ${
            selectedTab === tab
              ? 'bg-primary-main text-white'
              : 'bg-white text-black'
          }`}
        >
          {tab}
        </div>
      ))}
    </div>
  );
}
