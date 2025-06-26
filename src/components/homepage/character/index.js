"use client";
import React from "react";

const borderSize = 650;

const CharacterCircle = () => {
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
  return (
    <section className="w-full flex flex-col items-center py-10">
      <h2 className="flex items-center justify-center text-3xl md:text-4xl font-extrabold mb-10 text-gray-900 drop-shadow-lg tracking-tight gap-4">
        Soul Worker Character
      </h2>
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Character Selector/List bên trái */}
        <div className="flex-1 w-full max-w-xl flex flex-col items-center lg:items-start mb-8 lg:mb-0">
          {/* Placeholder: Thay bằng selector thực tế sau */}
          <div className="bg-white/80 rounded-xl p-8 w-full text-center">
            <div className="text-2xl font-bold mb-4">Chọn Nhân Vật</div>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div
                className="w-full h-full flex flex-col items-center justify-center relative bg-cover bg-center md:h-[540px] "
                style={{
                  backgroundImage: "url(/static/img/character/d369.jpg)",
                }}
              ></div>
            </div>
          </div>
        </div>
        {/* Vòng tròn bên phải */}
        <div className="flex-1 flex justify-center items-center">
          <CharacterCircle />
        </div>
      </div>
    </section>
  );
};

export default CharacterIntro;
