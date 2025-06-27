import Link from "next/link";

export default function LastNews({ newsData }) {
  return (
    <div className="flex flex-col h-full min-h-[320px] bg-white/80 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-red-400/80 to-pink-400/80 border-b border-red-200">
        <h4 className="flex items-center gap-2 text-xl font-bold text-white drop-shadow">
          <img src="/static/img/icon-lastest.png" alt="news" className="h-7 w-7" />
          Latest News
        </h4>
        <Link href="/news/">Read More</Link>
      </div>
      {/* News List */}
      <div className="flex-1 px-6 py-4">
        <ul className="list-news flex flex-col gap-2">
          {newsData.map((item, idx) => (
            <li key={idx} className="cursor-pointer border-b last:border-b-0 pb-2">
              <p className="name font-medium text-gray-900 truncate">
                <a>{item.title}</a>
              </p>
              <p className="sub-name text-xs flex items-center gap-2 mt-1">
                <a className={`font-bold ${item.tagColor}`}>{item.tag}</a>
                <span className="text-gray-400">{item.date}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 