import HeroSlider from "./hero";
import ArenaBannerList from "./arena-arena-banner";
import HomeContent from "./content";

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      {/* Arena Banner with spacing */}
      <div className="mt-10">
        <ArenaBannerList />
      </div>

      {/* Divider with icon aligned at end */}
      <div className="relative w-2/4 mx-auto mt-6">
        {/* Divider line */}
        <div id="divider" className="h-0.5 bg-black rounded w-full mb-10"></div>

        {/* Icon at the end of divider */}
        <img
          src="/static/img/util_icon09.png"
          alt="divider icon"
          className="absolute right-4 -top-2 h-2 w-auto"
        />
      </div>
      <HomeContent />
    </>
  );
}
