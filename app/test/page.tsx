// app/page.tsx
export default function TestPage() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold text-primary-main'>
        메인 페이지 (메인 컬러)
      </h1>

      {/* 시스템 색상 테스트 */}
      <div className='mt-8'>
        <h2 className='text-xl font-bold mb-4 text-black'>시스템 색상</h2>
        <div className='space-y-2'>
          <p className='text-primary-error'>에러 텍스트 컬러</p>
          <p className='bg-primary-disable p-2'>비활성화 배경 컬러</p>
          <input
            type='text'
            placeholder='플레이스홀더 테스트'
            className='border p-2 placeholder:text-primary-placeholder'
          />
        </div>
      </div>

      {/* 버킷리스트 태그 색상 테스트 */}
      <div className='mt-8'>
        <h2 className='text-xl font-bold mb-4 text-black'>버킷리스트 태그</h2>
        <div className='space-y-2 text-slate-400'>
          <div className='bg-bucket-want p-2 rounded '>해보고 싶다</div>
          <div className='bg-bucket-become p-2 rounded'>되고 싶다</div>
          <div className='bg-bucket-have p-2 rounded'>갖고 싶다</div>
          <div className='bg-bucket-visit p-2 rounded'>가보고 싶다</div>
          <div className='bg-bucket-learn p-2 rounded'>배우고 싶다</div>
        </div>
      </div>

      {/* 글꼴 테스트 */}
      <div className='mt-8 text-black'>
        <h2 className='text-xl font-bold mb-4'>글꼴 테스트</h2>
        <div className='space-y-2'>
          <p className='font-thin'>Pretendard Thin 텍스트</p>
          <p className='font-normal'>Pretendard Regular 텍스트</p>
          <p className='font-bold'>Pretendard Bold 텍스트</p>
          <p className='font-black'>Pretendard Black 텍스트</p>
        </div>
      </div>
    </div>
  );
}
