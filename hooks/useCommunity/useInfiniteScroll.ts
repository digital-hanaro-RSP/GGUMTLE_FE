import { useCallback, useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollProps<T> {
  fetchData: (params: {
    limit: number;
    offset: number;
    category?: string;
    search?: string;
  }) => Promise<T[]>;
  limit?: number;
  dependencies?: any[];
  category?: string;
  search?: string;
}

export const useInfiniteScroll = <T>({
  fetchData,
  limit = 10,
  dependencies = [],
  category = '',
  search = '',
}: UseInfiniteScrollProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver>();

  const fetchItems = async (isInitial: boolean = false) => {
    // 처음이면 로딩 무시
    if (!isInitial && (isLoading || !hasMore)) return;

    setIsLoading(true);
    const currentOffset = isInitial ? 0 : offset;

    try {
      const res = await fetchData({
        limit,
        offset: currentOffset,
        category,
        search,
      });

      if (res.length < limit) {
        setHasMore(false);
      }

      setData((prev) => (isInitial ? res : [...prev, ...res]));
      setOffset(currentOffset + limit);
    } catch (err) {
      console.error('데이터 fetch 중 에러:', err);
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
          fetchItems();
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
    fetchItems(true);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [...dependencies]);

  return {
    data,
    isLoading,
    lastElementObserver,
    setData,
  };
};
