'use client';

import NewEvent from '@/components/molecules/NewEvent';
import Post from '@/components/molecules/Post';
import { useCommunityApi } from '@/hooks/useCommunity/useCommunity';
import { useInfiniteScroll } from '@/hooks/useCommunity/useInfiniteScroll';
import { GroupAd } from '@/types/Ads';
import { PostResponse } from '@/types/Community';
import { Post as PostType } from '@/types/Community';
import { domAnimation, LazyMotion, m } from 'motion/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { parsePostData } from '@/lib/utils';

export default function GroupIdPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [advertisement, setAdvertisement] = useState<GroupAd | null>(null);

  const params = useParams();
  const groupId = Number(params.groupId);
  const { getPosts, getAdvertisement } = useCommunityApi();

  const { data, isLoading, lastElementObserver } =
    useInfiniteScroll<PostResponse>({
      fetchData: ({ limit, offset }) => getPosts(groupId, offset, limit),
      dependencies: [],
    });

  useEffect(() => {
    const fetchGetAd = async () => {
      const res = await getAdvertisement(groupId);
      setAdvertisement(res);
    };

    fetchGetAd();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Array.isArray(data)) {
      setPosts(data.map(parsePostData));
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
            {post.postType === 'POST' ? (
              <Post {...post} onDelete={() => handlePostDelete(post.id)} />
            ) : (
              <NewEvent {...post} />
            )}

            {advertisement && index > 0 && (index + 1) % 5 === 0 ? (
              <div
                onClick={() => window.open(advertisement?.link, '_blank')}
                style={{
                  width: '100%',
                  height: '100px',
                  position: 'relative',
                  marginTop: '20px',
                }}
              >
                <Image
                  src={advertisement?.bannerImageUrl}
                  layout='fill'
                  objectFit='fill'
                  alt='advertisement'
                />
              </div>
            ) : null}
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
