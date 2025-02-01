export default function LoadingDot() {
  return (
    <>
      <div className='w-full h-screen flex justify-center absolute top-0 left-0 items-center bg-opacity-50 bg-black z-50 '>
        <div className='dot-loading'>
          <div className='middle-dot'></div>
        </div>
      </div>
    </>
  );
}
