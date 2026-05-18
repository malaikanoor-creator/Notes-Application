import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const createPaste = () => {
    const paste = {
      title,
      content: value,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, pastes]);

  return (
    <div className="w-full min-h-screen py-10 max-w-[1000px] mx-auto px-5 text-white">

      {/* TITLE + BUTTON */}
      <div className="flex gap-3 mb-5">

        <input
          type="text"
          placeholder="Enter Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          onClick={createPaste}
          className="bg-blue-600 hover:bg-blue-700 transition px-5 rounded-lg flex items-center gap-2"
        >
          <PlusCircle size={18} />
          {pasteId ? "Update" : "Create"}
        </button>

      </div>

      {/* TEXTAREA */}
      <div className="relative">

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write your content..."
          rows={18}
          className="w-full p-4 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* COPY BUTTON */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(value);
            toast.success("Copied!");
          }}
          className="absolute top-3 right-3 bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition"
        >
          <Copy size={18} />
        </button>

      </div>

    </div>
  );
};

export default Home;