import React from 'react';
import { X } from 'lucide-react';
import type { Content } from '../../types';

type AddContentFormData = { title: string; type: Content['type']; link: string; tags: string };

interface Props {
  formData: AddContentFormData;
  setFormData: React.Dispatch<React.SetStateAction<AddContentFormData>>;
  handleAddContent: (e: React.MouseEvent) => void;
  closeModal: () => void;
}

const AddContentModal: React.FC<Props> = ({ formData, setFormData, handleAddContent, closeModal }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-md w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">Add Content</h3>
        <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-lg transition-all">
          <X className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
        />
        <select
          value={formData.type}
          onChange={e => setFormData({ ...formData, type: e.target.value as Content['type'] })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
        >
          <option value="tweet">Tweet</option>
          <option value="video">Video</option>
          <option value="document">Document</option>
          <option value="link">Link</option>
        </select>
        <input
          type="url"
          placeholder="Link (URL)"
          value={formData.link}
          onChange={e => setFormData({ ...formData, link: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={formData.tags}
          onChange={e => setFormData({ ...formData, tags: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
        />
        <button
          onClick={handleAddContent}
          disabled={!formData.title || !formData.link}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-semibold transition-all shadow-lg"
        >
          Add Content
        </button>
      </div>
    </div>
  </div>
);

export default AddContentModal;
