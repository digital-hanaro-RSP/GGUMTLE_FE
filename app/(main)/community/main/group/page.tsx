'use client';

// 백업
import GroupCard from '@/components/molecules/GroupCard';
import { useCommunityApi } from '@/hooks/useCommunity/useCommunity';
import { useCategoryStore } from '@/store/useCategoryStore';
import { useSearchStore } from '@/store/useSearchStore';
import { Group } from '@/types/Community';
import { domAnimation, LazyMotion, m } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { convertCategoryToCode } from '@/lib/utils';

export default function CommunityMainGroupPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const { selectedCategory } = useCategoryStore();
  const { searchInput } = useSearchStore();
  const [offset, setOffset] = useState(0);
  console.log('selectedCategory :', selectedCategory);
  const { getGroups } = useCommunityApi();
  const observerRef = useRef<IntersectionObserver>();

  const fetchGetGroups = async (isInitial: boolean = false) => {
    if (!isInitial && (isLoading || !hasMore)) return;

    setIsLoading(true);

    const category = convertCategoryToCode(selectedCategory);
    const limit = 10;
    const search = searchInput;
    const currentOffset = isInitial ? 0 : offset;

    try {
      const res = await getGroups(limit, currentOffset, category, search);
      console.log('데이터 패칭 완료, 데이터 ' + res.length + '개');
      for (let i = 0; i < res.length; i++) {
        console.log(res[i]);
      }
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
          fetchGetGroups();
        }
      });

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    setOffset(0); // 처음 렌더링, 카테고리 변경, 검색 입력 은 처음부터 로드
    setHasMore(true);
    fetchGetGroups(true);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [searchInput, selectedCategory]);

  return (
    <LazyMotion features={domAnimation}>
      <div className='flex flex-col w-full gap-[20px]'>
        {groups &&
          groups.map((group, index) => (
            <m.div
              key={group.id}
              ref={index === groups.length - 1 ? lastElementObserver : null}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => {
                router.push(`/community/group/${group.id}`);
              }}
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
