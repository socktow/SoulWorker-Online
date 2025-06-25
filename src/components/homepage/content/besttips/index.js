export default function BestTips({ tipsData }) {
  return (
    <div className="flex flex-col h-full min-h-[320px] bg-white/80 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-green-400/80 to-blue-400/80 border-b border-green-200">
      <img src="/static/img/forum_medal.png" alt="news" className="h-7 w-7" />
        <h2 className="font-bold text-xl text-white drop-shadow">Best Tips</h2>
      </div>
      <ul className="flex-1 flex flex-col gap-2 px-6 py-4">
        {tipsData.map((item, idx) => (
          <li key={idx} className="border-b last:border-b-0 pb-2">
            <div className="font-semibold text-gray-800 truncate">{item.title}</div>
            <div className="text-xs text-green-600 font-bold inline-block mr-2">{item.tag}</div>
            <span className="text-xs text-gray-400">By {item.author} / {item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 