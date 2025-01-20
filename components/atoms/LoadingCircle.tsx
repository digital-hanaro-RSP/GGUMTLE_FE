// components/Loading.tsx
export default function LoadingCircle() {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
      <div className='text-center'>
        <div className='w-16 h-16 border-8 border-primary-main border-t-transparent rounded-full animate-spin mx-auto mb-6'></div>
        <p className='text-lg font-semibold text-gray-600'>
          결과를 분석하고 있습니다
        </p>
      </div>
    </div>
  );
}
