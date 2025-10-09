import type  { ButtonProps } from '../types';

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '',
  type = 'button'
}: ButtonProps) => {
  const baseStyles = "px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg";
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-500/50",
    secondary: "bg-slate-800/80 hover:bg-slate-700/80 text-white backdrop-blur-sm border border-slate-700",
    ghost: "text-purple-400 hover:text-purple-300 hover:bg-slate-800/50"
  };
  
  return (
    <button 
      type={type}
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;