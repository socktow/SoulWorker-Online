const banners = [
    {
      href: "https://store.steampowered.com/app/215830/Closers/",
      img: "https://image.closersonline.com/public/upload/files/new1-bedd.png?w=640&q=85",
      alt: "Available on Steam",
      highlight: "Update",
      title: "Available on Steam",
      descript: "2020-11-04",
      highlightClass: "update",
    },
    {
      href: "https://discord.gg/w7hShma",
      img: "https://image.closersonline.com/public/upload/files/new2-5b2b.png?w=640&q=85",
      alt: "Join now",
      highlight: "Notice",
      title: "Join now",
      descript: "2020-10-28",
      highlightClass: "notice",
    },
    {
      href: "https://www.closersonline.com/news/count-d-s-program-new-tier-rewards-for-new-returning-agents--OM7GmK991",
      img: "https://image.closersonline.com/public/upload/files/new4-c6c4.png?w=640&q=85",
      alt: "[RENEW] NEW/RETURNED Support Event",
      highlight: "Notice",
      title: "[RENEW] NEW/RETURNED Support Event",
      descript: "2023-08-16",
      highlightClass: "notice",
    },
    {
      href: "https://www.closersonline.com/news/new-dlc-packs-now-available--731",
      img: "https://image.closersonline.com/public/upload/files/new3-dcac.png?w=640&q=85",
      alt: "CLOSERS STEAM DLCs RELEASED",
      highlight: "Shop",
      title: "CLOSERS STEAM DLCs RELEASED",
      descript: "2023-06-01",
      highlightClass: "shop",
    },
  ];
  
  export default function ArenaBannerList() {
    return (
      <div className="area area-banner w-full flex justify-center mb-4">
        <ul className="list-banner flex gap-6 flex-wrap justify-center">
          {banners.map((b, i) => (
            <li
              key={i}
              className="relative w-[260px] h-[175px] overflow-hidden rounded-xl shadow-lg group"
            >
              <a
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                {/* Ảnh nền */}
                <img
                  src={b.img}
                  alt={b.alt}
                  className="absolute inset-0 w-full h-full object-cover object-center transition duration-300 group-hover:brightness-50"
                />
  
                {/* Overlay nội dung */}
                <div
                  className="absolute inset-0 p-4 flex flex-col justify-end 
                  bg-gradient-to-t from-black/80 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="highlight mb-1">
                    <p
                      className={`inline-block px-2 py-0.5 rounded text-xs font-bold text-white bg-yellow-500/80 ${b.highlightClass}`}
                    >
                      {b.highlight}
                    </p>
                  </div>
                  <p className="title text-white font-bold text-base leading-tight">
                    {b.title}
                  </p>
                  <p className="descript text-gray-200 text-xs mt-1">
                    {b.descript}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  