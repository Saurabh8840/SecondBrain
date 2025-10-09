import { useNavigate } from 'react-router-dom';
import { Brain, ArrowRight, Sparkles } from 'lucide-react';
import Button from '../components/Button';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <Brain className="w-24 h-24 text-purple-400 relative animate-float" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-gradient">
            Second Brain
          </h1>
          <div className="flex items-center justify-center gap-2 text-slate-300">
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            <p className="text-xl italic">"Imagination is the only limit."</p>
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button variant="primary" onClick={() => navigate('/login')}>
            Login <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="secondary" onClick={() => navigate('/signup')}>
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;