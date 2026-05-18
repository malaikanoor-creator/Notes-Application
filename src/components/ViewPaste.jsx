import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);

  const paste = pastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-400 text-xl">
        Paste Not Found
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-10 max-w-[1000px] mx-auto px-5 text-white">

      {/* TITLE */}
      <input
        value={paste.title}
        disabled
        className="w-full p-3 mb-5 rounded-lg bg-gray-800 border border-gray-700"
      />

      {/* CONTENT BOX */}
      <div className="relative">

        <textarea
          value={paste.content}
          disabled
          rows={18}
          className="w-full p-4 rounded-lg bg-gray-900 border border-gray-700"
        />

        {/* COPY */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(paste.content);
            toast.success("Copied!");
          }}
          className="absolute top-3 right-3 bg-gray-800 p-2 rounded-lg hover:bg-gray-700"
        >
          <Copy size={18} />
        </button>

      </div>

    </div>
  );
};

export default ViewPaste;