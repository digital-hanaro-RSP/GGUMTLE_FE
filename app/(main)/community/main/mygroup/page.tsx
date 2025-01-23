'use client';

import GroupCard from '@/components/molecules/GroupCard';
import { useCommunityApi } from '@/hooks/useCommunity/useCommunity';
import { useInfiniteScroll } from '@/hooks/useCommunity/useInfiniteScroll';
import { useCategoryStore } from '@/store/useCategoryStore';
import { useSearchStore } from '@/store/useSearchStore';
import { Group } from '@/types/Community';
import { domAnimation, LazyMotion, m } from 'motion/react';
import { useRouter } from 'next/navigation';
import { convertCategoryToCode } from '@/lib/utils';

export default function CommunityMainMyGroupPage() {
  const router = useRouter();
  const { selectedCategory } = useCategoryStore();
  const { searchInput } = useSearchStore();
  const { getMyGroups } = useCommunityApi();

  const category = convertCategoryToCode(selectedCategory);

  const {
    data: groups,
    isLoading,
    lastElementObserver,
  } = useInfiniteScroll<Group>({
    fetchData: ({ limit, offset }) =>
      getMyGroups(limit, offset, category, searchInput),
    dependencies: [searchInput, selectedCategory],
    category,
    search: searchInput,
  });

  return (
    <LazyMotion features={domAnimation}>
      <div className='flex flex-col w-full gap-[20px]'>
        {groups.map((group, index) => (
          <m.div
            key={group.id}
            ref={index === groups.length - 1 ? lastElementObserver : null}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => router.push(`/community/group/${group.id}`)}
            className='cursor-pointer'
          >
            <GroupCard {...group} />
          </m.div>
        ))}
        {isLoading && (
          <div className='w-full flex justify-center mt-[20px]'>
            <div className='dot-loading'>
              <div className='middle-dot'></div>
            </div>
          </div>
        )}
      </div>
    </LazyMotion>
  );
}
