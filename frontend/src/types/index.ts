export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps {
  icon: React.ComponentType<{ className?: string }>;
  type: string;
  name:string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
}


export interface Content {
  _id: string;
  title: string;
  type: 'tweet' | 'video' | 'document' | 'link';
  link: string;
  tags: string[];
  createdAt: string;
}
