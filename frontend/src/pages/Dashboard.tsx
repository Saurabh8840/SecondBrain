import React, { useEffect, useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import ContentCard from '../components/dashboard/ContentCard';
import AddContentModal from '../components/dashboard/AddContentModel';
import ShareModal from '../components/dashboard/ShareModel';
import AnimatedBackground from '../components/dashboard/AnimatedBackground';
import type { Content } from '../types';
import axios from 'axios';

const demoContents: Content[] = [
  // same demo content array as original
  {
    _id: '1',
    title: 'Future Projects',
    type: 'document',
    link: 'https://example.com/projects',
    tags: ['productivity', 'ideas'],
    createdAt: '2024-10-03T00:00:00Z'
  },
  {
    _id: '2',
    title: 'How to Build a Second Brain',
    type: 'video',
    link: 'https://youtube.com/watch?v=example',
    tags: ['productivity', 'learning'],
    createdAt: '2024-09-03T00:00:00Z'
  },
  {
    _id: '3',
    title: 'Productivity Tip',
    type: 'tweet',
    link: 'https://twitter.com/user/status/123',
    tags: ['productivity', 'learning'],
    createdAt: '2024-08-03T00:00:00Z'
  },
  {
    _id: '4',
    title: 'React Best Practices',
    type: 'document',
    link: 'https://example.com/react-guide',
    tags: ['coding', 'react'],
    createdAt: '2024-10-05T00:00:00Z'
  },
  {
    _id: '5',
    title: 'Design Inspiration',
    type: 'link',
    link: 'https://dribbble.com/shots/example',
    tags: ['design', 'ui'],
    createdAt: '2024-09-15T00:00:00Z'
  },
  {
    _id: '6',
    title: 'TypeScript Tutorial',
    type: 'video',
    link: 'https://youtube.com/watch?v=typescript',
    tags: ['coding', 'typescript'],
    createdAt: '2024-08-20T00:00:00Z'
  }
];

useEffect(()=>{
   

  const fetchData=async()=>{
     
    const response=await axios.post('http://localhost:3000/content');

  }
},[])


const Dashboard = () => {
  const [contents, setContents] = useState<Content[]>(demoContents);
  const [filteredContents, setFilteredContents] = useState<Content[]>(demoContents);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    type: 'tweet' as Content['type'],
    link: '',
    tags: ''
  });

  const filterContent = (type: string) => {
    setActiveFilter(type);
    setFilteredContents(type === 'all' ? contents : contents.filter(c => c.type === type));
  };

  const handleAddContent = (e: React.MouseEvent) => {
    e.preventDefault();
    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);
    const newContent: Content = {
      _id: Date.now().toString(),
      title: formData.title,
      type: formData.type,
      link: formData.link,
      tags: tagsArray,
      createdAt: new Date().toISOString()
    };
    const updatedContents = [newContent, ...contents];
    setContents(updatedContents);
    setFilteredContents(activeFilter === 'all' ? updatedContents : updatedContents.filter(c => c.type === activeFilter));
    setFormData({ title: '', type: 'tweet', link: '', tags: '' });
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    const updatedContents = contents.filter(c => c._id !== id);
    setContents(updatedContents);
    setFilteredContents(activeFilter === 'all' ? updatedContents : updatedContents.filter(c => c.type === activeFilter));
  };

  const handleShareBrain = () => {
    const demoHash = Math.random().toString(36).substring(7);
    setShareLink(`${window.location.origin}/shared/${demoHash}`);
    setShowShareModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AnimatedBackground />

      <div className="relative flex h-screen">
        <Sidebar activeFilter={activeFilter} filterContent={filterContent} />

        <div className="flex-1 overflow-auto p-8">
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold text-white">
              {activeFilter === 'all' ? 'All Notes' : activeFilter === 'tags' ? 'Tags' : activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1) + 's'}
            </h2>
            <div className="flex gap-4">
              <button onClick={handleShareBrain} className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-lg text-white transition-all">
                Share Brain
              </button>
              <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-semibold transition-all shadow-lg">
                Add Content
              </button>
            </div>
          </div>

          {filteredContents.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">You haven't added any content yet.<br />Click 'Add Content' to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContents.map(c => (
                <ContentCard key={c._id} content={c} handleDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </div>

      {showAddModal && <AddContentModal formData={formData} setFormData={setFormData} handleAddContent={handleAddContent} closeModal={() => setShowAddModal(false)} />}
      {showShareModal && <ShareModal shareLink={shareLink} copied={copied} onClose={() => setShowShareModal(false)} onCopy={copyToClipboard} totalItems={contents.length} />}
    </div>
  );
};

export default Dashboard;
