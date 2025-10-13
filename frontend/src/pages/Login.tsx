import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Mail, Lock, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import  type { LoginCredentials } from '../types';
import axios from "axios"

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });

  const handleSubmit = async () => {
     
    try{
      const res=await axios.post('http://localhost:3000/api/auth/signin',credentials,
        {
          headers:{
            "Content-Type":"application/json",
          },
          withCredentials:true
        }
      );
       
      if(res.status===200){
        const data=res.data;

        //store token
        localStorage.setItem("token",data.accessToken);
        // console.log("Saved token:", localStorage.getItem("token"));

        navigate("/dashboard");
      }

    }catch(error:any){
      console.error("Login error:",error);

      if (axios.isAxiosError(error)) {
      
      if (error.response && error.response.data?.message) {
        alert(error.response.data.message);
      } 
      
      else if (error.response && error.response.data?.errors) {
        const messages = error.response.data.errors.map((e: any) => e.message).join("\n");
        alert(messages);
      } 
      else {
        alert("Login failed. Please check your credentials.");
      }
    } else {
      alert("An unexpected error occurred. Please try again.");
    }
  


    }
  };
  
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value});
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
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-slate-400">Sign in to your second brain</p>
          </div>

          <div className="space-y-4">
            
            <Input  icon={Mail} placeholder='Email' name="email" type="email"  value={credentials.email} onChange={handleChange} />
            <Input
              icon={Lock}
              
              type="password"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />

            <Button variant="primary" className="w-full justify-center" onClick={handleSubmit}>
              Sign In <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="text-center space-y-4">
            <p className="text-slate-400 text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
              >
                Sign up
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

export default Login;