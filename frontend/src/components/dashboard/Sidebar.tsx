import React from 'react';
import { Brain, X, Video, FileText, Link2, Hash, LogOut,  } from 'lucide-react';

interface SidebarProps {
  activeFilter: string;
  filterContent: (type: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeFilter, filterContent }) => {
  const sidebarItems = [
    { icon: X, label: 'Tweets', filter: 'tweet' },
    { icon: Video, label: 'Videos', filter: 'video' },
    { icon: FileText, label: 'Documents', filter: 'document' },
    { icon: Link2, label: 'Links', filter: 'link' },
    { icon: Hash, label: 'Tags', filter: 'tags' },
  ];

  return (
    <div className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <Brain className="w-8 h-8 text-purple-400" />
        <h1 className="text-xl font-bold text-white">Second Brain</h1>
      </div>

      <nav className="space-y-2 flex-1">
        <button
          onClick={() => filterContent('all')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            activeFilter === 'all' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-white/5'
          }`}
        >
          <Brain className="w-5 h-5" />
          <span>All Notes</span>
        </button>

        {sidebarItems.map((item) => (
          <button
            key={item.filter}
            onClick={() => filterContent(item.filter)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeFilter === item.filter ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <button
        onClick={() => alert('Logout clicked')}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 transition-all"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
