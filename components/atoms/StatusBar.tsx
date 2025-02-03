export interface StatusBarProps {
  current: number;
  total: number;
  className?: string;
}

export function StatusBar({ current, total, className = '' }: StatusBarProps) {
  // 현재 스텝을 기반으로 정확한 퍼센티지 계산
  const progress = (current / total) * 100;

  return (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
      <div
        className='bg-primary-main h-2.5 rounded-full transition-all duration-300'
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
