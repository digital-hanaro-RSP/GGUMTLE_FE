import { Card } from '@/components/atoms/Card';
import { GrLineChart } from 'react-icons/gr';
import { IoWarningOutline } from 'react-icons/io5';
import { LiaWonSignSolid } from 'react-icons/lia';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type ProductCardProps = {
  productType: string;
  productName: string;
  riskRating: string;
  yield: string;
  bannerImageUrl: string | null;
  link: string;
};

const PRODUCT_TYPE_MAP = {
  savingTimeDeposit: '정기예금',
  investment: '투자',
  pension: '연금',
} as const;

const RISK_RATING_COLORS = {
  매우낮은위험: '#9997FD',
  매우높은위험: '#FF0000',
  높은위험: '#F26100',
} as const;

export default function ProductCard({
  productType,
  productName,
  riskRating,
  yield: yieldValue,
  bannerImageUrl,
  link,
}: ProductCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(link);
  };

  const getDisplayProductType = () => {
    return (
      PRODUCT_TYPE_MAP[productType as keyof typeof PRODUCT_TYPE_MAP] ||
      productType
    );
  };

  const getYieldLabel = () => {
    if (productType === 'savingTimeDeposit') {
      return `금리 ${yieldValue}`;
    }
    return `수익률 12개월 ${yieldValue}`;
  };

  const getRiskRatingColor = () => {
    return (
      RISK_RATING_COLORS[riskRating as keyof typeof RISK_RATING_COLORS] ||
      '#000000'
    );
  };

  return (
    <Card
      className='w-full cursor-pointer hover:shadow-lg transition-shadow p-4'
      onClick={handleClick}
    >
      <div className='flex flex-col gap-3'>
        <div className='flex items-center'>
          <span className='text-lg font-bold text-gray-900'>{productName}</span>
        </div>

        <div className='flex items-center gap-2'>
          <GrLineChart className='w-4 h-4' />
          <span>종목구분</span>
          <span className='text-sm text-gray-500'>
            {getDisplayProductType()}
          </span>
        </div>

        <div className='flex items-center gap-2'>
          <IoWarningOutline
            className='w-4 h-4'
            style={{ color: getRiskRatingColor() }}
          />
          <span
            className='text-sm rounded'
            style={{ color: getRiskRatingColor() }}
          >
            {riskRating}
          </span>
        </div>

        <div className='flex items-center gap-2'>
          <LiaWonSignSolid className='w-4 h-4 text-blue-600' />
          <span className='text-lg font-bold text-blue-600'>
            {getYieldLabel()}
          </span>
        </div>

        {bannerImageUrl && (
          <Image
            src={bannerImageUrl}
            alt={productName}
            className='w-full h-[120px] object-cover rounded-lg'
          />
        )}
      </div>
    </Card>
  );
}
