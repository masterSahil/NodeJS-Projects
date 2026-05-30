import React from "react";

export default function HeroSection() {
  return (
    <section id="Home" className="relative h-screen bg-cover banner-img-set bg-center" >
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div>
          <p className="uppercase text-white font-medium text-sm mb-5"> Hello, New Friend </p>
          <h1 className="text-white font-bold text-[64px] uppercase"> Reserve Your Table</h1>

          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <button className="border border-white text-white px-8 py-4 uppercase font-medium hover:bg-white hover:text-black transition"> Book A Table </button>

            <button className="text-white px-8 py-4 uppercase font-medium hover:text-orange-400 transition"> Open Menu </button>
          </div>
        </div>
      </div>
    </section>
  );
}