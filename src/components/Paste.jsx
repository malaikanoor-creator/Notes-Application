import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utlis/formatDate";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
  };

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen py-10 max-w-[1200px] mx-auto px-5 text-white">

      {/* SEARCH BOX */}
      <div className="flex items-center gap-3 mb-8">
        <input
          type="search"
          placeholder="Search paste..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6">All Pastes</h1>

      {/* PASTES LIST */}
      <div className="flex flex-col gap-5">

        {filteredPastes.length > 0 ? (
          filteredPastes.map((paste) => (
            <div
              key={paste._id}
              className="bg-gray-900 border border-gray-700 rounded-xl p-5 shadow-md hover:shadow-blue-500/20 transition"
            >

              {/* TITLE + CONTENT */}
              <div className="mb-4">
                <h2 className="text-2xl font-bold">{paste.title}</h2>
                <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                  {paste.content}
                </p>
              </div>

              {/* FOOTER */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                {/* DATE */}
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar size={18} />
                  {FormatDate(paste.createdAt)}
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 flex-wrap">

                  {/* EDIT */}
                  <a
                    href={`/?pasteId=${paste._id}`}
                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                  >
                    <PencilLine size={18} />
                  </a>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(paste._id)}
                    className="p-2 bg-pink-600 hover:bg-pink-700 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* VIEW */}
                  <a
                    href={`/pastes/${paste._id}`}
                    className="p-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition"
                  >
                    <Eye size={18} />
                  </a>

                  {/* COPY */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Copied!");
                    }}
                    className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
                  >
                    <Copy size={18} />
                  </button>

                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 text-xl mt-10">
            No Pastes Found 😢
          </div>
        )}

      </div>
    </div>
  );
};

export default Paste;