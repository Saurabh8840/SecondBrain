import React, { useEffect, useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import ContentCard from '../components/dashboard/ContentCard';
import AddContentModal from '../components/dashboard/AddContentModel';
import ShareModal from '../components/dashboard/ShareModel';
import AnimatedBackground from '../components/dashboard/AnimatedBackground';
import type { Content,Tags } from '../types';
import axios from 'axios';





const Dashboard = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [filteredContents, setFilteredContents] = useState<Content[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(()=>{
  const fetchData=async()=>{
    try {
      const token=localStorage.getItem("token")
      const response=await axios.get('http://localhost:3000/api/content/fetchContent',
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      if(response.status==200){
        setContents(response.data);
        setFilteredContents(response.data);
      }
      
    } catch(error){
      console.error("Content error: ",error);
    };
  }



  fetchData();

},[])

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

  const handleAddContent = async(e: React.MouseEvent) => {
    e.preventDefault();
    const tagsArray:Tags[]= formData.tags.split(',').map(t => t.trim()).filter(t =>t!=='').map(t=>({id:t,title:t}));
    alert("wait updating dashboard...");
    try{
      const token=localStorage.getItem("token");

      const response=await axios.post('http://localhost:3000/api/content/addContent',
        {
          title:formData.title,
          type:formData.type,
          link:formData.link,
          tags:tagsArray.map(tag=>tag.title)
        },
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
      );
      
      if(response.data===200|| response.status===201){
         
        setShowAddModal(false);

        const newContent:Content=response.data;

        const updatedContents=[newContent,...contents];
         
        setContents(updatedContents);

        setFilteredContents(activeFilter==='all'
          ?updatedContents
          :updatedContents.filter(c=>c.type===activeFilter)
        )

        setFormData({title:'',type:'tweet',link:'',tags:''});         
      }

    }catch(error){
     console.error('Error adding content:',error);
    }

    
  };

  const handleDelete = async(id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`http://localhost:3000/api/content/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {} 
    });

    if (response.status === 200||response.status === 201) {
      
      const updatedContents = contents.filter(c => c.id !== id);
      setContents(updatedContents);
      setFilteredContents(
        activeFilter === "all"
          ? updatedContents
          : updatedContents.filter(c => c.type === activeFilter)
      );
      
    }
  } catch (error) {
    console.error("Error deleting content:", error);
  }
  };

  const handleShareBrain = async() => {
    
    try {
      const token=localStorage.getItem("token");
      if(!token){
        alert("please login first");
        return;
      }
      
      
      setShowShareModal(true); 
      alert("generating link");

      const response=await axios.post("http://localhost:3000/api/brain/all",
        {},
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
      );

      if(response.status===200&& response.data.url){
        setShareLink(response.data.url)
      }else{
        setShareLink("Failed to generate share link");
      }


    } catch (error) {
      console.error("Error sharing brain:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  // Inside Dashboard component
const handleLogout = async () => {
  try {
    const token = localStorage.getItem("token");
    
    await axios.post(
      "http://localhost:3000/api/auth/logout",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );

    localStorage.removeItem("token");
    window.location.href = "/login";
  } catch (err) {
    console.error("Logout failed:", err);
    alert("Failed to logout. Try again.");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AnimatedBackground />

      <div className="relative flex h-screen">
        <Sidebar activeFilter={activeFilter} onLogout={handleLogout} filterContent={filterContent} />

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
                <ContentCard key={c.id} content={c} handleDelete={handleDelete} />
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
