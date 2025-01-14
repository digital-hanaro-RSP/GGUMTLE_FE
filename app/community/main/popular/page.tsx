'use client';

import Post from '@/components/molecules/Post';
import { useCommunityApi } from '@/hooks/useCommunity/useCommunity';
import { useCategoryStore } from '@/store/useCategoryStore';
import { Post as PostProps } from '@/types/Community';
import { useEffect, useState } from 'react';

export default function CommunityMainPopularPage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { getPosts } = useCommunityApi();
  const { selectedCategory } = useCategoryStore();
  useEffect(() => {
    // 일단 임시로 1번 그룹 가져오기
    getPosts(1).then((res) => {
      setPosts(res.data);
      console.log('selectedCategory :', selectedCategory);
    });
  }, []);

  return (
    <div className='flex flex-col w-full gap-[20px]'>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}
