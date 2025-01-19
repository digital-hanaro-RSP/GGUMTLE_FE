'use client';

import GroupCard from '@/components/molecules/GroupCard';
import { useCommunityApi } from '@/hooks/useCommunity/useCommunity';
import { useCategoryStore } from '@/store/useCategoryStore';
import { useSearchStore } from '@/store/useSearchStore';
import { Group } from '@/types/Community';
import { domAnimation, LazyMotion, m } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { convertCategoryToCode } from '@/lib/utils';

export default function CommunityMainMyGroupPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { selectedCategory } = useCategoryStore();
  const { searchInput } = useSearchStore();
  const { getMyGroups } = useCommunityApi();
  const observerRef = useRef<IntersectionObserver>();
  console.log('selectedCategory :', selectedCategory);

  const fetchGetMyGroups = async (isInitial: boolean = false) => {
    if (!isInitial && (isLoading || !hasMore)) return;

    setIsLoading(true);

    const category = convertCategoryToCode(selectedCategory);
    const limit = 10;
    const search = searchInput;
    const currentOffset = isInitial ? 0 : offset;

    try {
      const res = await getMyGroups(limit, currentOffset, category, search);
      console.log('데이터 패칭 완료, 데이터 ' + res.length + '개');

      if (res.length < limit) {
        setHasMore(false);
      }

      setGroups((prev) => (isInitial ? res : [...prev, ...res]));
      setOffset(currentOffset + limit);
    } catch (err) {
      console.log('데이터 fetch중 에러 :', err);
    } finally {
      setIsLoading(false);
    }
  };

  const lastElementObserver = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchGetMyGroups();
        }
      });

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    setOffset(0);
    setHasMore(true);
    fetchGetMyGroups(true);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [searchInput, selectedCategory]);

  return (
    <LazyMotion features={domAnimation}>
      <div className='flex flex-col w-full gap-[20px]'>
        {groups.map((group, index) => (
          <m.div
            key={group.id}
            ref={index == groups.length - 1 ? lastElementObserver : null}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }} // index 사라지면 조금 위험
            onClick={() => {
              router.push(`/community/group/${group.id}`);
            }}
            className='cursor-pointer'
          >
            <GroupCard key={group.id} {...group} />
          </m.div>
        ))}
      </div>
    </LazyMotion>
  );
}
