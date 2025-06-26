import LastNews from "./lastnews";
import BestArt from "./bestart";
import BestTips from "./besttips";
import SocialMedia from "./socialmedia";

const newsData = [
  {
    title: "June 25th Update Patch Notes",
    tag: "Updates",
    tagColor: "text-green-600",
    date: "Jun 25, 2025",
  },
  {
    title: "Spotlight Bubble - New Costume!",
    tag: "Shop",
    tagColor: "text-blue-500",
    date: "Jun 25, 2025",
  },
  {
    title: "21st Pet Transmitter - Mini Binah Pickup",
    tag: "Shop",
    tagColor: "text-blue-500",
    date: "Jun 25, 2025",
  },
  {
    title: "Noah Full-Body Costume Package - New for Ria!",
    tag: "Shop",
    tagColor: "text-blue-500",
    date: "Jun 24, 2025",
  },
];

const artData = [
  {
    img: "/static/img/content/content-1.jpg",
    title: "Spring Sakura by ArtistA",
  },
  {
    img: "/static/img/content/content-2.jpg",
    title: "Epic Battle Scene by ArtistB",
  },
];

const tipsData = [
  {
    title:
      "Damage Reduction Values (%) & Total CDmg (%), Per Boss from Division ...",
    tag: "Game Tips",
    author: "Agent004",
    date: "Dec 22",
  },
  {
    title: "Solo Flame King Patch Overview Video Guide",
    tag: "Game Tips",
    author: "espurrrr",
    date: "Oct 29",
  },
  {
    title: "Small Jump PNA Tip",
    tag: "Game Tips",
    author: "Scopeodge",
    date: "Oct 14",
  },
  {
    title: "PNA Revamp Patch Overview + Gremory Arcade Video Guide",
    tag: "Game Tips",
    author: "espurrrr",
    date: "Oct 14",
  },
  {
    title: "how to increase combat power",
    tag: "Game Tips",
    author: "dracala",
    date: "Sep 01",
  },
];

const socialMediaData = [
  {
    type: "youtube",
    title: "[CLOSERS] Misteltein's Skill Remake",
    video: "https://www.youtube.com/embed/2Qw1rQKQw1w",
  },
  {
    type: "discord",
    title: "Join our Discord!",
    link: "https://discord.gg/w7hShma",
  },
];

export default function HomeContent() {
  return (
    <div className="relative w-full py-4 px-2" style={{ minHeight: "60vh" }}>
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 " />
      <h2 className="flex items-center justify-center text-3xl md:text-4xl font-extrabold mb-10 text-gray-900 drop-shadow-lg tracking-tight gap-4">
        Community Highlights
      </h2>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="transition-all duration-300 hover:scale-[1.025] hover:shadow-2xl bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-0">
          <LastNews newsData={newsData} />
        </div>
        <div className="transition-all duration-300 hover:scale-[1.025] hover:shadow-2xl bg-white/60 backdrop-blur-md rounded-2xl shadow-lg">
          <SocialMedia socialMediaData={socialMediaData} />
        </div>
        <div className="transition-all duration-300 hover:scale-[1.025] hover:shadow-2xl bg-white/60 backdrop-blur-md rounded-2xl shadow-lg">
          <BestArt artData={artData} />
        </div>
        <div className="transition-all duration-300 hover:scale-[1.025] hover:shadow-2xl bg-white/60 backdrop-blur-md rounded-2xl shadow-lg">
          <BestTips tipsData={tipsData} />
        </div>
      </div>
    </div>
  );
}
