import { SupportCard } from '@/components/molecules/SuppportCard';
import {
  supportEduData,
  supportJobData,
  supportTownData,
} from '@/data/Support';

export default function SupportPage() {
  return (
    <div className='p-4 flex flex-col gap-4'>
      <div className='scrollContainer'>
        <h1 className='text-2xl font-bold'>인기 교육/취미</h1>
        {/*횡 스크롤 구역 */}
        <div className='flex flex-row w-full overflow-scroll  gap-10 py-2 px-2 scrollContent'>
          {supportEduData.map((item, i) => (
            <SupportCard
              key={i}
              src={item.src}
              title={item.title}
              desc1={item.desc1}
              desc2={item.desc2}
              desc3={item.desc3}
              url={item.url}
            />
          ))}
        </div>
      </div>
      <div className='scrollContainer'>
        <h1 className='text-2xl font-bold'>인기 시니어 취업</h1>
        {/*횡 스크롤 구역 */}
        <div className='flex flex-row w-full overflow-scroll gap-10 py-2 px-2 scrollContent'>
          {supportJobData.map((item, i) => (
            <SupportCard
              key={i}
              src={item.src}
              title={item.title}
              desc1={item.desc1}
              desc2={item.desc2}
              desc3={item.desc3}
              url={item.url}
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className='text-2xl font-bold'>인기 시니어 타운</h1>
        {/*횡 스크롤 구역 */}
        <div className='flex flex-row w-full overflow-scroll gap-10 py-2 px-2'>
          {supportTownData.map((item, i) => (
            <SupportCard
              key={i}
              src={item.src}
              title={item.title}
              desc1={item.desc1}
              desc2={item.desc2}
              desc3={item.desc3}
              url={item.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
