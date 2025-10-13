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

export interface Tags {
  id: string;
  title: string;
}

export interface Tags{
  id: string;
  title: string;
}


export interface Content {
  id: string;
  title: string;
  // type: 'tweet' | 'video' | 'document' | 'link';
  type:'image'|'video'|'article'|'audio'
  link: string;
  tags: Tags[];
  createdAt: string;
}

// image
//   video
//   article
//   audio