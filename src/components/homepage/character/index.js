"use client";
import React, { useEffect, useState, useRef } from "react";

const borderSize = 650;
const VISIBLE_THUMBS = 5; // Số lượng thumb xếp hàng (giữa là selected)

// Đọc Setting.json (client-side fetch)
async function fetchCharacters() {
  const res = await fetch("/static/img/character/Setting.json");
  return res.json();
}

const CharacterCircle = ({ image }) => {
  return (
    <div
      className="relative flex items-end justify-end-safe mx-auto"
      style={{ width: borderSize, height: borderSize }}
    >
      {/* Border layers */}
      <img
        src="/static/img/character/Border/gold-border.png"
        alt="gold border"
        className="absolute inset-0 w-full h-full pointer-events-none select-none gold-spin"
        style={{ zIndex: 1, transformOrigin: "50% 50%" }}
      />
      <img
        src="/static/img/character/Border/dot-border.png"
        alt="dot border"
        className="absolute inset-0 w-full h-full pointer-events-none select-none dot-spin"
        style={{ zIndex: 2, transformOrigin: "50% 50%" }}
      />
      <img
        src="/static/img/character/Border/main-border.png"
        alt="main border"
        className="absolute inset-0 w-full h-full pointer-events-none select-none main-spin"
        style={{ zIndex: 3, transformOrigin: "50% 50%" }}
      />
      {/* Ảnh nhân vật lớn */}
      {image && (
        <img
          src={image}
          alt="Character"
          className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] z-10 object-contain"
          style={{
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,1) 100%)",
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,1) 100%)",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        />
      )}
      <style jsx>{`
        @keyframes gold-border {
          100% {
            transform: rotate(360deg);
          }
        }
        .gold-spin {
          animation: gold-border 5s linear 0s infinite normal none;
        }
        .dot-spin {
          animation: gold-border 0.8s linear 0.8s infinite normal none;
        }
        .main-spin {
          animation: gold-border 3.5s linear 0s infinite normal none;
        }
      `}</style>
    </div>
  );
};

const CharacterIntro = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const timerRef = useRef();

  useEffect(() => {
    fetchCharacters().then((data) => {
      setCharacters(data);
      // Chọn Erwin mặc định nếu có, nếu không thì chọn nhân vật đầu tiên
      const erwinIdx = data.findIndex((c) => c.name.toLowerCase() === "erwin");
      setSelectedIdx(erwinIdx !== -1 ? erwinIdx : 0);
    });
  }, []);

  // Auto next character every 7s
  useEffect(() => {
    if (!characters.length) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line
  }, [characters, selectedIdx]);

  const handleSelect = (idx) => {
    setSelectedIdx(idx);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        handleNext();
      }, 7000);
    }
  };

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev - 1 + characters.length) % characters.length);
  };
  const handleNext = () => {
    setSelectedIdx((prev) => (prev + 1) % characters.length);
  };

  // Lấy 5 thumb xếp hàng, selected ở giữa (nếu đủ), nếu không thì lấy đủ số lượng có
  const getLineupThumbs = () => {
    if (!characters.length) return [];
    const n = characters.length;
    const half = Math.floor(VISIBLE_THUMBS / 2);
    const thumbs = [];
    for (let i = -half; i <= half; i++) {
      let idx = (selectedIdx + i + n) % n;
      thumbs.push({ ...characters[idx], idx });
    }
    return thumbs;
  };
  const lineupThumbs = getLineupThumbs();

  // Scale và opacity cho từng vị trí
  const getScaleOpacity = (pos) => {
    const abs = Math.abs(pos);
    if (abs === 0) return { scale: 1.2, opacity: 1, z: 20 };
    if (abs === 1) return { scale: 1, opacity: 0.8, z: 10 };
    if (abs === 2) return { scale: 0.8, opacity: 0.5, z: 1 };
    return { scale: 0.7, opacity: 0.3, z: 0 };
  };

  return (
    <section className="w-full flex flex-col items-center py-10 hidden md:block">
      <h2 className="flex items-center justify-center text-3xl md:text-4xl font-extrabold mb-10 text-gray-900 drop-shadow-lg tracking-tight gap-4">
        Soul Worker Character
      </h2>
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Character Selector/List bên trái */}
        <div className="flex-1 w-full max-w-2xl flex flex-col items-center lg:items-start mb-8 lg:mb-0">
          <div className="p-8 w-full text-center flex flex-col items-center ">
            <div className="flex items-center justify-center gap-2 w-full mb-4">
              <button
                className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 text-2xl font-bold text-blue-700 shadow-lg border-2 border-white/70 transition duration-200"
                onClick={handlePrev}
                aria-label="Trái"
              >
                ◀
              </button>
              <div className="flex flex-row items-end gap-2 w-full justify-center relative" style={{ minHeight: 120 }}>
                {lineupThumbs.map((char, i) => {
                  const pos = i - Math.floor(VISIBLE_THUMBS / 2);
                  const { scale, opacity, z } = getScaleOpacity(pos);
                  return (
                    <div
                      key={char.idx}
                      className={`flex flex-col items-center cursor-pointer transition-all duration-300 rounded-xl bg-white/80 hover:bg-blue-100 shadow-md hover:shadow-xl px-2 py-2 absolute`}
                      style={{
                        left: `calc(50% + ${(pos) * 90}px)`,
                        transform: `translateX(-50%) scale(${scale})`,
                        opacity,
                        zIndex: z,
                        boxShadow: pos === 0 ? '0 8px 32px 0 rgba(0,0,0,0.25)' : '',
                        border: pos === 0 ? '3px solid #facc15' : 'none',
                      }}
                      onClick={() => handleSelect(char.idx)}
                    >
                      <img
                        src={char.thumb}
                        alt={char.name}
                        className="w-24 h-24 object-cover rounded-xl mb-1"
                      />
                      <div className="text-base font-semibold text-gray-800 tracking-wide">
                        {char.name}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 text-2xl font-bold text-blue-700 shadow-lg border-2 border-white/70 transition duration-200"
                onClick={handleNext}
                aria-label="Phải"
              >
                ▶
              </button>
            </div>
            <div className="text-2xl font-bold text-blue-700 mt-2">
              {characters[selectedIdx]?.name}
            </div>
          </div>
        </div>
        {/* Vòng tròn bên phải */}
        <div className="flex-1 flex justify-center items-center">
          <CharacterCircle image={characters[selectedIdx]?.image} />
        </div>
      </div>
    </section>
  );
};

export default CharacterIntro;
