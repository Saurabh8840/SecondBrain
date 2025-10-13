import React from 'react';
import { X, Video, FileText, Link2, Trash2 } from 'lucide-react';
import type { Content } from '../../types';

interface Props {
  content: Content;
  handleDelete: (id: string) => void;
}

const ContentCard: React.FC<Props> = ({ content, handleDelete }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tweet': return <X className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'document': return <FileText className="w-5 h-5" />;
      case 'link': return <Link2 className="w-5 h-5" />;
      default: return null;
    }
  };


  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          {getTypeIcon(content.type)}
          <span className="text-sm text-gray-400 capitalize">{content.type}</span>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => handleDelete(content.id)} className="p-2 hover:bg-red-500/20 rounded-lg transition-all">
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div> 
      </div>
      
    

      <h3 className="text-white font-semibold mb-2">{content.title}</h3> 
      {content.link && (
        <a href={content.link} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 text-sm mb-3 block truncate">
          {content.link}
        </a>
      )}

      {content.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {content.tags.map((tag, idx) => (
            <span key={tag.id||idx} className="px-2 py-1 bg-purple-600/30 text-purple-300 text-xs rounded-full">#{tag.title}</span>
          ))}
        </div>
      )}

      <p className="text-gray-500 text-sm">Added on {new Date(content.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ContentCard;
