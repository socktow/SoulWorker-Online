export default function SocialMedia({ socialMediaData }) {
  return (
    <div className="flex flex-col h-full min-h-[320px] bg-white/80 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-400/80 to-indigo-400/80 border-b border-blue-200">
      <img src="/static/img/icon-lastest.png" alt="news" className="h-7 w-7" />
        <h2 className="font-bold text-xl text-white drop-shadow">Social Media / Video</h2>
      </div>
      <div className="flex-1 flex flex-col gap-2 px-6 py-4">
        {socialMediaData.map((item, idx) => (
          <div key={idx} className="mb-2">
            {item.type === "youtube" ? (
              <iframe
                width="100%"
                height="120"
                src={item.video}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            ) : (
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                {item.title}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 