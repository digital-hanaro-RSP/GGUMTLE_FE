'use client';

import Post from '@/components/molecules/Post';
import { useCommunityApi } from '@/hooks/useCommunity/useCommunity';
import { Post as PostType } from '@/types/Community';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { parsePostData } from '@/lib/utils';

export default function GroupIdPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const observerRef = useRef<IntersectionObserver>();

  const params = useParams();
  const { getPosts } = useCommunityApi();

  const fetchGetPosts = async (isInitial: boolean = false) => {
    if (!isInitial && (isLoading || !hasMore)) return;

    setIsLoading(true);

    const limit = 10;
    const currentOffset = isInitial ? 0 : offset;

    try {
      const res = await getPosts(Number(params.groupId), currentOffset, limit);
      const parsedPosts = res.map(parsePostData);

      if (parsedPosts.length < limit) {
        setHasMore(false);
      }
      setPosts((prev) => (isInitial ? parsedPosts : [...prev, ...parsedPosts]));
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
          fetchGetPosts();
        }
      });

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [isLoading, hasMore]
  );

  const handlePostDelete = (deletedPostId: number) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== deletedPostId)
    );
  };

  useEffect(() => {
    setOffset(0); // 처음 렌더링
    setHasMore(true);
    fetchGetPosts(true);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className='flex flex-col gap-[20px] w-full'>
      {/* <Header text='꿈그룹' showActionButton={false} /> */}

      {posts.map((post, index) => (
        <div
          key={post.id}
          ref={index === posts.length - 1 ? lastElementObserver : null}
        >
          <Post {...post} onDelete={() => handlePostDelete(post.id)} />
        </div>
      ))}
    </div>
  );
}
