import { ButtonHTMLAttributes } from 'react';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

// DropCard Context
type DropCardContextType = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const DropCardContext = createContext<DropCardContextType | undefined>(
  undefined
);

export const useDropCard = () => {
  const context = useContext(DropCardContext);
  if (!context) {
    throw new Error('No Dropdown Provider');
  }
  return context;
};

type DropdownProps = {
  children: ReactNode;
  className?: string;
};

export const DropCard = ({ children, className }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <DropCardContext.Provider value={{ isOpen, toggle, close }}>
      <div className={cn(className, 'relative')}>{children}</div>
    </DropCardContext.Provider>
  );
};

//DropCard Trigger
export type DropCardTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const DropDownTrigger = ({
  className,
  children,
  ...props
}: DropCardTriggerProps) => {
  const { toggle } = useDropCard();

  return (
    <>
      <button onClick={toggle} className={cn(className, '')} {...props}>
        {children}
      </button>
    </>
  );
};

//DropCard Item List
export interface DropCardItemListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  direction: 'up' | 'down';
  isBlur: boolean;
}

export const DropCardItemList = ({
  direction,
  isBlur,
  children,
  className,
  ...props
}: DropCardItemListProps) => {
  const { isOpen, close } = useDropCard();
  return (
    <>
      {isOpen && (
        <>
          <div
            className={cn(
              isBlur && 'bg-black opacity-70',
              'fixed top-0 left-0 w-screen h-screen'
            )}
          ></div>
          <div
            onClick={close}
            className={cn(
              direction === 'down' && 'top-5',
              direction === 'up' && 'bottom-5 items-end justify-end',
              'flex flex-col absolute w-full h-screen',
              className
            )}
            {...props}
          >
            {children}
          </div>
        </>
      )}
    </>
  );
};

//DropCard Item
export type DropCardItemProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const DropCardItem = ({
  children,
  className,
  onClick,
  ...props
}: DropCardItemProps) => {
  const { close } = useDropCard();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) {
      onClick(e);
    }
    close();
  };

  return (
    <>
      <button
        {...props}
        onClick={(e) => handleClick(e)}
        className={cn(className, 'w-full flex justify-center')}
      >
        {children}
      </button>
    </>
  );
};
