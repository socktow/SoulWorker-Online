export default function BestArt({ artData }) {
  return (
    <div className="flex flex-col h-full min-h-[320px] bg-white/80 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-400/80 to-pink-400/80 border-b border-purple-200">
      <img src="/static/img/forum_medal.png" alt="news" className="h-7 w-7" />
        <h2 className="font-bold text-xl text-white drop-shadow">Best Art & Media</h2>
      </div>
      <div className="flex-1 flex flex-col gap-2 px-6 py-4">
        {artData.map((item, idx) => (
          <div key={idx} className="rounded-lg overflow-hidden mb-2">
            <img src={item.img} alt={item.title} className="w-full h-28 object-cover" />
            <div className="text-xs text-gray-700 mt-1 truncate">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 