import React from 'react';

type TextAreaType = 'post' | 'dream' | 'memo' | 'comment';

interface TextAreaProps {
  type: TextAreaType;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ type, value, onChange }) => {
  const getPlaceholder = (type: TextAreaType): string => {
    switch (type) {
      case 'post':
        return '본문을 입력해주세요.';
      case 'dream':
        return '꿈모임 설명을 입력해주세요.';
      case 'memo':
        return '• 버킷리스트로 만든 계기가 무엇인가요?\n• 어떻게 달성했나요? 달성할건가요?\n• 보류한 이유가 무엇인가요?';
      case 'comment':
        return '댓글을 입력해주세요.';
      default:
        return '';
    }
  };

  const baseClasses = `
    rounded-lg bg-white border border-[#C0C0C0] 
    p-3 w-full resize-none focus:outline-none 
    flex items-center
    placeholder:translate-y-[-50%] placeholder:top-[50%]
    placeholder:absolute placeholder:leading-normal
  `;

  const sizeClasses = {
    post: 'w-[335px] h-[120px] sm:w-[90%] sm:h-[150px] md:w-[80%]',
    dream: 'w-[335px] h-[120px] sm:w-[90%] sm:h-[150px] md:w-[80%]',
    memo: 'w-[335px] h-[120px] sm:w-[90%] sm:h-[150px] md:w-[80%]',
    comment: 'w-[309px] h-[55px] sm:w-[85%] sm:h-[60px] md:w-[75%]',
  };

  return (
    <div className='relative'>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={getPlaceholder(type)}
        className={`${baseClasses} ${sizeClasses[type]}`}
      />
    </div>
  );
};

export default TextArea;
