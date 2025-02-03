'use client';

import { Button } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import { ImageInputRef } from '@/components/atoms/Inputs';
import ShowSelectedImage from '@/components/atoms/ShowSelectedImage';
import TextArea from '@/components/atoms/TextArea';
import { BucketListCard } from '@/components/molecules/BucketListCard';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Switch } from '@/components/ui/switch';
import { useBucketListApi } from '@/hooks/useBucketList/useBucketList';
import { useCommunityApi } from '@/hooks/useCommunity/useCommunity';
import { getAllBucketListRes } from '@/types/BucketList';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { calculatePercent, checkImageSize, parsePostData } from '@/lib/utils';

export default function EditPostPage() {
  const param = useParams();
  const searchParams = useSearchParams();
  const groupId = searchParams.get('group');
  const { getPost, editPost, uploadImages } = useCommunityApi();
  const router = useRouter();

  const { getAllBucketList } = useBucketListApi();
  const [bucketLists, setBucketLists] = useState<getAllBucketListRes[]>([]);
  const [selectedBucketList, setSelectedBucketList] = useState<
    getAllBucketListRes[]
  >([]);
  const [isOpenBucketListDrawer, setIsOpenBucketListDrawer] = useState(false);
  let tempSeletedBucketIds: number[] = [];

  const [selectedImage, setSelectedImage] = useState<(string | File)[]>([]);
  const [content, setContent] = useState('');
  const [isPortfolioIncluded, setIsPortfolioIncluded] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchPost = async () => {
      const postRes = await getPost(Number(groupId), Number(param.postId));
      const parseData = parsePostData(postRes);

      setSelectedImage(parseData.imageUrls);

      setContent(parseData.content);

      if (parseData.snapShot?.bucketLists) {
        tempSeletedBucketIds = parseData.snapShot?.bucketLists.map(
          (bucketList: getAllBucketListRes) => bucketList.id
        );
      }

      setIsPortfolioIncluded(
        parseData.snapShot.goalPortfolio && parseData.snapShot.currentPortfolio
          ? true
          : false
      );

      await fetchBucketList(tempSeletedBucketIds);
    };
    fetchPost();
  }, [param, searchParams, groupId]);

  const fetchBucketList = async (tempIds: number[]) => {
    const allBuckets = await getAllBucketList();
    setBucketLists(allBuckets);

    if (tempIds?.length > 0) {
      const matched = allBuckets.filter((item) => tempIds.includes(item.id));
      setSelectedBucketList(matched);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. 새로운 이미지(File 객체)와 기존 이미지(URL 문자열) 분리
      const newFiles = selectedImage.filter(
        (image): image is File => image instanceof File
      );
      const existingUrls = selectedImage.filter(
        (image): image is string => typeof image === 'string'
      );

      // 2. 새로운 이미지만 업로드
      let finalImageUrls = [...existingUrls];
      if (newFiles.length > 0) {
        const uploadedUrls = await uploadImages(newFiles);
        finalImageUrls = [...finalImageUrls, ...uploadedUrls];
      }

      // 3. 최종 이미지 URL 배열을 JSON 문자열로 변환
      const imageUrlsString = JSON.stringify(finalImageUrls);

      // 4. 스냅샷 생성 (create 페이지와 동일한 형식)
      const snapshot = JSON.stringify({
        bucketId: selectedBucketList.map((bucket) => bucket.id),
        portfolio: isPortfolioIncluded,
      });

      // 5. 수정 API 호출
      await editPost(
        Number(groupId),
        Number(param.postId),
        imageUrlsString,
        content,
        snapshot
      );

      router.replace(`/community/group/${groupId}/post/${param.postId}`);
    } catch (error) {
      console.error('포스트 수정 실패:', error);
    }
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!checkImageSize(file)) {
        return;
      }
      setSelectedImage((prev) => [...prev, file]); // File 객체를 직접 저장
    }
  };

  const handleImageRemove = (index: number) => {
    setSelectedImage((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDisabled = () => {
    return content === '';
  };

  return (
    <div className='flex flex-col gap-[20px] w-full'>
      <Header text='커뮤니티 글 수정' showActionButton={false} />

      {/* 이미지 입력 칸 간격이 너무 좁아서 간격 7 -> 10으로 조정했습니다. */}
      <div className='flex flex-col gap-[20px] w-full px-[20px]'>
        {/* 버킷리스트 선택 */}
        <div
          className='flex flex-col gap-[10px]'
          onClick={() => setIsOpenBucketListDrawer(true)}
        >
          <p className='text-[18px] font-bold'>
            글을 작성할 버킷리스트를 선택해주세요 (선택)
          </p>
          <div className='flex p-[20px] h-[42px] items-center justify-between bg-white border border-primary-placeholder rounded-[10px]'>
            {/* 선택된 버킷리스트 목록 표시 */}
            <div>
              {selectedBucketList.length === 0 ? (
                <p className='text-[14px] text-primary-placeholder'>
                  선택된 버킷리스트가 없습니다
                </p>
              ) : (
                <div className='flex gap-2 flex-wrap'>
                  {selectedBucketList.map((bucket) => (
                    <div
                      key={bucket.id}
                      className='flex items-center gap-1 bg-gray-100 px-2 py-1 rounded'
                    >
                      <span className='text-[14px]'>{bucket.title}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBucketList((prev) =>
                            prev.filter((item) => item.id !== bucket.id)
                          );
                        }}
                        className='ml-1 text-gray-500 hover:text-gray-700'
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 포트폴리오 선택 */}
        <div className='flex flex-col gap-[10px]'>
          <p className='text-[18px] font-bold'>
            내 포트폴리오를 포함할까요? (선택)
          </p>
          <div className='flex p-[20px] h-[42px] items-center justify-between bg-white border border-primary-placeholder rounded-[10px]'>
            <span>내 포트폴리오 포함하기</span>
            <Switch
              checked={isPortfolioIncluded}
              onCheckedChange={setIsPortfolioIncluded}
            />
          </div>
        </div>

        {/* 이미지 선택 */}
        <div className='flex flex-col gap-[10px]'>
          <p className='text-[18px] font-bold'>이미지를 선택해주세요 (선택)</p>
          <div className='flex flex-wrap gap-[20px]'>
            {selectedImage.map((image, index) => (
              <ShowSelectedImage
                key={index}
                imageUrl={
                  image instanceof File ? URL.createObjectURL(image) : image
                }
                onRemove={() => handleImageRemove(index)}
              />
            ))}
            {selectedImage.length < 4 && (
              <ImageInputRef onChange={handleImageSelect} />
            )}
          </div>
        </div>

        {/* 본문 입력 */}
        <div className='flex flex-col gap-[10px]'>
          <p className='text-[18px] font-bold'>본문을 입력해주세요</p>
          <TextArea type='post' value={content} onChange={onChangeContent} />
        </div>

        <Button
          className='w-full'
          isDisabled={handleDisabled()}
          onClick={handleSubmit}
        >
          완료
        </Button>
      </div>

      {/* 버킷리스트 선택 Drawer */}
      <Drawer
        open={isOpenBucketListDrawer}
        onOpenChange={(open) => setIsOpenBucketListDrawer(open)}
      >
        <DrawerContent className='h-[60%] max-h-[60%] max-w-screen-md mx-auto flex flex-col gap-[20px] px-[10px] pb-[70px] overflow-hidden'>
          <DrawerHeader>
            <DrawerTitle>버킷리스트를 선택해주세요</DrawerTitle>
          </DrawerHeader>

          <div className='flex-1 overflow-y-auto flex flex-col gap-[20px]'>
            {bucketLists
              .filter((item) => !selectedBucketList.includes(item))
              .map((bucket) => (
                <BucketListCard
                  key={bucket.id}
                  {...bucket}
                  safeBox={bucket.safeBox}
                  howTo={bucket.howTo}
                  dataPercent={calculatePercent(
                    bucket.howTo,
                    bucket.goalAmount,
                    bucket.safeBox,
                    new Date(bucket.dueDate),
                    new Date(bucket.createdAt)
                  )}
                  title={bucket.title}
                  tagType={bucket.tagType}
                  bucketId={bucket.id}
                  onClick={() => {
                    setSelectedBucketList((prev) => [...prev, bucket]);
                    setIsOpenBucketListDrawer(false);
                  }}
                  isSelectMode={true}
                />
              ))}
          </div>
        </DrawerContent>{' '}
      </Drawer>
    </div>
  );
}
