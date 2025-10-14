import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SharedView = () => {
  const { hash } = useParams();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/brain/${hash}`);
        setContents(res.data.contents || []);
      } catch (error) {
        console.error("Error fetching shared content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSharedContent();
  }, [hash]);

  if (loading) return <p className="text-white text-center mt-20">Loading shared content...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-10 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">🧠 Shared Second Brain</h1>
      {contents.length === 0 ? (
        <p className="text-center text-gray-400">No shared content found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map((item: any) => (
            <div key={item.id} className="p-4 bg-white/10 rounded-xl border border-white/20">
              <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:underline"
              >
                {item.link}
              </a>
              <p className="mt-2 text-sm text-gray-400">{item.type}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SharedView;
