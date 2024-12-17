import { ReactNode } from "react";

type IconButtonProps = {

  variant: "ghost" | "secondary";

  size: "icon";

  children: ReactNode;

  className?: string;

  onClick?: () => void;

};


export const IconButton = ({ variant, size, children, ...props }: IconButtonProps) => {

  const variants = {
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2',
  }

  const sizes = {
    icon: 'h-6 w-6',
  }

  return (
    <button
      className={`${variants[variant]} ${sizes[size]} cursor-default hover:opacity-75 transition-all ease-linear`}
      {...props}
    >
      {children}
    </button>
  )
}
