'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // 이 console.log는 살릴게요.
  console.log('에러 : ', error);
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-2xl font-bold text-primary-error'>
        오류가 발생했습니다
      </h1>
      <button
        onClick={() => reset()}
        className='mt-4 px-4 py-2 bg-primary-main text-white rounded-md'
      >
        다시 시도하기
      </button>
    </div>
  );
}
