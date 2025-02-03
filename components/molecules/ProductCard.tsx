import { Card } from '@/components/atoms/Card';
import { Ad } from '@/types/Ads';
import { GrLineChart } from 'react-icons/gr';
import { IoWarningOutline } from 'react-icons/io5';
import { LiaWonSignSolid } from 'react-icons/lia';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MoreButton } from '../atoms/Button';

type ProductCardProps = {
  adsData: { mainAds: Ad[] };
};

const PRODUCT_TYPE_MAP = {
  SAVING_TIME_DEPOSIT: '정기예금',
  INVESTMENT: '투자',
  FOREIGN_CURRENCY: '외화',
  PENSION: '연금',
} as const;

const RISK_RATING_COLORS = {
  매우낮은위험: '#FDC7C7',
  매우높은위험: '#540A09',
  높은위험: '#911110',
  보통위험: '#FE1E1E',
  낮은위험: '#FC8E8D',
} as const;

export default function ProductCard({ adsData }: ProductCardProps) {
  const router = useRouter();

  const handleClick = (link: string) => {
    router.push(link);
  };

  const getDisplayProductType = (productType: string) => {
    return (
      PRODUCT_TYPE_MAP[productType as keyof typeof PRODUCT_TYPE_MAP] ||
      productType
    );
  };

  const getRiskRatingColor = (riskRating: string) => {
    return (
      RISK_RATING_COLORS[riskRating as keyof typeof RISK_RATING_COLORS] ||
      '#000000'
    );
  };

  return (
    <div className='w-full relative'>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={8}
        slidesPerView={1}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
        }}
        className='relative pl-4'
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성
        }}
      >
        {adsData.mainAds.map((ad) => (
          <SwiperSlide key={ad.id} className='flex justify-start'>
            <Card
              className='w-[98%] h-fit cursor-pointer transition-shadow p-4 ml-2 shadow-none border border-gray-100'
              onClick={() => handleClick(ad.link)}
            >
              <div className='flex flex-col gap-2'>
                <div className='flex items-center'>
                  <span className='text-md font-bold text-gray-900'>
                    {ad.productName}
                  </span>
                </div>

                <div className='flex items-center gap-4'>
                  <GrLineChart className='w-5 h-5' />
                  <div className='flex gap-2 items-end'>
                    <span className='text-sm text-gray-500'>종목구분</span>
                    <span className='text-md text-black font-bold'>
                      {getDisplayProductType(ad.productType)}
                    </span>
                  </div>
                </div>

                <div className='flex items-center gap-4'>
                  <IoWarningOutline className='w-5 h-5 text-black' />
                  <div className='flex gap-2 items-end'>
                    <span className='text-sm text-gray-500'>위험등급</span>
                    <span
                      className='text-md font-bold'
                      style={{ color: getRiskRatingColor(ad.riskRating) }}
                    >
                      {ad.riskRating}
                    </span>
                  </div>
                </div>

                <div className='flex items-center gap-4'>
                  <LiaWonSignSolid className='w-5 h-5 text-black' />
                  <div className='flex gap-2 items-end'>
                    <span className='text-sm text-gray-500'>
                      {ad.productType === 'SAVING_TIME_DEPOSIT'
                        ? '금리'
                        : '수익률 12개월'}
                    </span>
                    <span
                      className='text-md font-bold'
                      style={{ color: '#069894' }}
                    >
                      {ad.yield}
                    </span>
                  </div>
                </div>

                {ad.bannerImageUrl && (
                  <Image
                    src={ad.bannerImageUrl}
                    alt={ad.productName}
                    width={300}
                    height={200}
                    className='w-full h-[120px] object-cover rounded-lg'
                  />
                )}
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination 및 네비게이션 버튼: Pagination 컨테이너의 양쪽에 버튼 배치 */}
      <div className='w-full mt-4 flex items-center justify-between'>
        <MoreButton
          direction='left'
          onClick={() => {
            (
              document.querySelector(
                '.swiper-button-prev'
              ) as HTMLElement | null
            )?.click();
          }}
        />
        <div className='swiper-pagination !static !w-auto' />
        <MoreButton
          direction='right'
          onClick={() => {
            (
              document.querySelector(
                '.swiper-button-next'
              ) as HTMLElement | null
            )?.click();
          }}
        />
      </div>

      {/* 스와이퍼 네비게이션을 위한 더미 엘리먼트 (실제 동작은 위 MoreButton 클릭 시 발생) */}
      <div className='hidden'>
        <div className='swiper-button-prev' />
        <div className='swiper-button-next' />
      </div>
    </div>
  );
}
