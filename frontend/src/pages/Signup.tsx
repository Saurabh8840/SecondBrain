import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Mail, Lock, User, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import type { SignupCredentials } from '../types';
import axios from 'axios';


const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<SignupCredentials>({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = async () => {
    
    try {
      const response=await axios.post('http://localhost:3000/api/auth/signup',credentials,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
  
  
      if(response.status===201){
        alert(response.data.message||"User Registered successfully");
        navigate('/login')
      }
    } catch (error:any) {
       console.error("invalid credential try again",error);

      if (axios.isAxiosError(error)) {
      if (error.response && error.response.data?.message) {
        alert(error.response.data.message);
      } 
      else if (error.response && error.response.data?.errors) {
        const messages = error.response.data.errors.map((e: any) => e.message).join("\n");
        alert(messages);
      } 
      else {
        alert("Signup failed. Please check your credentials.");
      }
    } else {
      alert("An unexpected error occurred. Please try again.");
    }
  
    }
  };

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full animate-slide-up">
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-3 rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white">Create Account</h2>
            <p className="text-slate-400">Start building your second brain</p>
          </div>

          <div className="space-y-4">
            <Input
              icon={User}
              name="username"
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
            
            <Input
              icon={Mail}
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
            
            <Input
              icon={Lock}
               name="password"
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />

            <Button variant="primary" className="w-full justify-center" onClick={handleSubmit}>
              Create Account <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="text-center space-y-4">
            <p className="text-slate-400 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
              >
                Sign in
              </button>
            </p>
            <button
              onClick={() => navigate('/')}
              className="text-slate-500 hover:text-slate-400 text-sm transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;