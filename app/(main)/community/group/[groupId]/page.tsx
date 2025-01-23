'use client';

import Post from '@/components/molecules/Post';
import { useCommunityApi } from '@/hooks/useCommunity/useCommunity';
import { useInfiniteScroll } from '@/hooks/useCommunity/useInfiniteScroll';
import { PostResponse } from '@/types/Community';
import { Post as PostType } from '@/types/Community';
import { domAnimation, LazyMotion, m } from 'motion/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { parsePostData } from '@/lib/utils';

export default function GroupIdPage() {
  const [posts, setPosts] = useState<PostType[]>([]);

  const params = useParams();
  const groupId = Number(params.groupId);
  const { getPosts } = useCommunityApi();

  const { data, isLoading, lastElementObserver } =
    useInfiniteScroll<PostResponse>({
      fetchData: ({ limit, offset }) => getPosts(groupId, offset, limit),
      dependencies: [],
    });

  useEffect(() => {
    if (Array.isArray(data)) {
      setPosts(data.map(parsePostData));
    } else {
      console.log('data는 array가 아닙니다.');
    }
  }, [data]);

  const handlePostDelete = (deletedPostId: number) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== deletedPostId)
    );
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className='flex flex-col w-full gap-[20px]'>
        {posts.map((post, index) => (
          <m.div
            key={post.id}
            ref={index === posts.length - 1 ? lastElementObserver : null}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='cursor-pointer'
          >
            <Post {...post} onDelete={() => handlePostDelete(post.id)} />
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
