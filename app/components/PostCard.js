import { useState } from "react";
import { FaHeart, FaComment, FaRegCopy, FaTimes } from "react-icons/fa";

export default function PostCard({
  
  userEmail,
  imageUrl,
  prediction,
  organicText,
  chemicalText,
  createdAt
}) {
  const formattedDate = createdAt?.toDate
    ? createdAt.toDate().toLocaleString()
    : "Unknown";

  const [liked, setLiked] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(userEmail || "Anonymous User");
    alert("Email copied to clipboard!");
  };

  const renderBulletPoints = (text) => {
    return text
      .split(".")
      .filter((line) => line.trim() !== "")
      .map((line, idx) => <li key={idx}>{line.trim()}.</li>);
  };

  return (
    <>
      {/* Main Card */}
      <div className="bg-white rounded-xl p-5 my-4 shadow-lg w-full max-w-lg mx-auto border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-800 text-sm break-all">
              {userEmail || "Anonymous User"}
            </h3>
            <FaRegCopy
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={handleCopyEmail}
            />
          </div>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>

        {/* Image */}
        <img
          src={imageUrl}
          alt="Plant"
          className="w-full h-52 object-cover rounded-lg mb-4 cursor-pointer hover:opacity-90"
          onClick={() => setIsImageOpen(true)}
        />

        {/* Disease */}
        <h4 className="font-bold text-green-700 mb-1">Disease Detected:</h4>
        <p className="text-sm text-gray-800 mb-3">
          {prediction || "No prediction available."}
        </p>

        {/* Organic Remedies */}
        <h4 className="font-bold text-green-700 mb-1">Organic Remedies:</h4>
        <ul className="text-sm text-gray-700 mb-3 list-disc list-inside">
          {organicText
            ? renderBulletPoints(organicText)
            : <li>No organic remedies found.</li>}
        </ul>

        {/* Chemical Remedies */}
        <h4 className="font-bold text-green-700 mb-1">Chemical Remedies:</h4>
        <ul className="text-sm text-gray-700 list-disc list-inside">
          {chemicalText
            ? renderBulletPoints(chemicalText)
            : <li>No chemical remedies found.</li>}
        </ul>

        {/* Actions */}
        <div className="flex space-x-6 text-gray-600 mt-4">
          <FaHeart
            className={`cursor-pointer text-lg transition ${
              liked ? "text-red-500" : "hover:text-red-400"
            }`}
            onClick={() => setLiked(!liked)}
          />
          <FaComment className="hover:text-blue-500 cursor-pointer text-lg" />
        </div>
      </div>

      {/* Image Modal */}
      {isImageOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative">
            <FaTimes
              className="absolute top-2 right-2 text-white text-xl cursor-pointer"
              onClick={() => setIsImageOpen(false)}
            />
            <img
              src={imageUrl}
              alt="Enlarged"
              className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
