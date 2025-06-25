import React from "react";

const systemSpecs = [
  { category: "OS", value: "Windows 10 64bit" },
  { category: "CPU", value: "Intel Core i5" },
  { category: "RAM", value: "8 GB or more" },
  { category: "HDD", value: "30GB" },
  { category: "VGA", value: "Nvidia GeForce 1050Ti or better graphics card" },
  { category: "DirectX", value: "Direct X 11 or higher" },
  { category: "Resolution", value: "1920 X 1080" },
];

const driverLinks = [
  {
    name: "Microsoft Direct X",
    url: "https://www.microsoft.com/en-us/download/confirmation.aspx?id=35",
    img: "https://image.closersonline.com/public/upload/files/directX-5f99.gif",
  },
  {
    name: "Visual C++ 2010 SP1",
    url: "https://www.microsoft.com/en-us/download/details.aspx?id=48145",
    img: "https://image.closersonline.com/public/upload/files/VisualC++-484d.gif",
  },
  {
    name: "NVIDIA",
    url: "https://www.nvidia.com/Download/index.aspx",
    img: "https://image.closersonline.com/public/upload/files/Nvidia-9059.gif",
  },
  {
    name: "AMD",
    url: "https://www.amd.com/en/support",
    img: "https://image.closersonline.com/public/upload/files/AMD-b23e.gif",
  },
  {
    name: "INTEL",
    url: "https://www.intel.com/content/www/us/en/support/products/80939/graphics.html",
    img: "https://image.closersonline.com/public/upload/files/Intel-35a1.gif",
  },
];

export default function GameDownload() {
  return (
    <div id="Content" className="w-full flex flex-col items-center">
      {/* Banner - Glassmorphism Card */}
      <div
        className="w-full flex flex-col items-center justify-center relative bg-cover bg-center md:h-[540px] "
        style={{
          backgroundImage: "url(/static/img/download-page/download-bg.png)",
        }}
      >
        {/* Lớp nền đen chiếm 50% chiều cao từ trên xuống */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0" />
        <div className="w-full flex flex-col items-center justify-center h-[400px] md:h-[440px] relative">
          {/* Glass Card */}
          <div className="backdrop-blur-md bg-white/20 border border-white/40 shadow-2xl rounded-3xl px-8 py-10 md:px-16 md:py-14 flex flex-col items-center max-w-2xl mx-auto mt-16 z-20">
            <h1 className="text-3xl md:text-5xl font-extrabold text-yellow-400 text-center mb-2 drop-shadow-lg">
              Anime action RPG
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-4 drop-shadow">
              with attractive characters and epic storylines
            </h2>
            <p className="text-white text-base md:text-lg text-center drop-shadow">
              Please check your PC specs and version of Direct X first for
              faster game play Client Download
            </p>
          </div>
          {/* Download Button */}
          <div
            className="w-full flex justify-center absolute left-0 right-0"
            style={{ bottom: -60 }}
          >
            <button
              className="px-12 py-4 text-lg font-bold text-black rounded-2xl shadow-lg flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 hover:scale-105 transition-transform border-2 border-yellow-300"
              style={{ minWidth: 300, minHeight: 80 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-7 h-7 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v12m0 0l-4-4m4 4l4-4m-9 8h10"
                />
              </svg>
              Client Download
            </button>
          </div>
        </div>
        {/* spacing bên dưới banner */}
        <div className="h-[120px] md:h-[120px]" />
      </div>

      {/* System Requirements */}
      <div className="container mx-auto mt-10 mb-20 px-4 max-w-5xl">
        <div className="configuration mb-8">
          <p className="title text-xl font-bold mb-4">
            System Recommended Specifications
          </p>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white border-t border-black">
              <thead>
                <tr>
                  <th className="bg-gray-100 border-b border-gray-200 px-6 py-4 text-center text-lg font-semibold">
                    Category
                  </th>
                  <th className="bg-gray-100 border-b border-gray-200 px-6 py-4 text-center text-lg font-semibold">
                    Recommended
                  </th>
                </tr>
              </thead>
              <tbody>
                {systemSpecs.map((spec) => (
                  <tr key={spec.category}>
                    <td className="border-b border-gray-200 px-6 py-4 text-center font-medium">
                      {spec.category}
                    </td>
                    <td className="border-b border-gray-200 px-6 py-4 text-center">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notice */}
        <div className="notice mb-8">
          <div className="title-notice flex items-center mb-2">
            <img
              src="/static/img/download-page/notice-icon.png"
              className="notice-icon w-6 h-6 mr-2"
              alt="Notice"
            />
            <span className="font-semibold text-lg">Notice</span>
          </div>
          <ul className="text list-disc pl-6 text-gray-700">
            <li>
              You may not be able to play smoothly with lower than recommended
              specs.
            </li>
            <li>
              Please make sure you have more than 30GB of free space before the
              first Install.
            </li>
            <li>
              When using internal VGA, the game may not run properly, regardless
              of the test result.
            </li>
          </ul>
        </div>

        {/* Driver Downloads */}
        <div className="mb-8">
          <p className="title text-xl font-bold mb-4">Driver Downloads</p>
          <div className="flex flex-wrap gap-6 items-center justify-center">
            {driverLinks.map((driver) => (
              <a
                key={driver.name}
                href={driver.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center w-40 p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition"
              >
                <img src={driver.img} alt={driver.name} className="h-16 mb-2" />
                <span className="text-center font-medium text-gray-800">
                  {driver.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Driver Notice */}
        <div className="notice mb-8">
          <div className="title-notice flex items-center mb-2">
            <img
              src="/static/img/download-page/notice-icon.png"
              className="notice-icon w-6 h-6 mr-2"
              alt="Notice"
            />
            <span className="font-semibold text-lg">Notice</span>
          </div>
          <ul className="text list-disc pl-6 text-gray-700">
            <li>
              The latest version of DirectX and Visual ++ 2010 SP1 are required
              to run the client.
            </li>
            <li>
              Install the latest version of the graphics driver to enjoy the
              game in a better condition.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
