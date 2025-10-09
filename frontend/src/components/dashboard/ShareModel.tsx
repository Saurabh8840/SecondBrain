import React from 'react';
import { X, Copy, Check } from 'lucide-react';

interface Props {
  shareLink: string;
  copied: boolean;
  onClose: () => void;
  onCopy: () => void;
  totalItems: number;
}

const ShareModal: React.FC<Props> = ({ shareLink, copied, onClose, onCopy, totalItems }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-md w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">Share Your Second Brain</h3>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-all">
          <X className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      <p className="text-gray-400 mb-4">
        Share your entire collection of notes, documents, tweets, and videos with others. They'll be able to import your content into their own Second Brain.
      </p>

      <div className="flex gap-2">
        <input type="text" value={shareLink} readOnly className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" />
        <button onClick={onCopy} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-all flex items-center gap-2">
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <p className="text-gray-500 text-sm mt-4 text-center">{totalItems} items will be shared</p>
    </div>
  </div>
);

export default ShareModal;
