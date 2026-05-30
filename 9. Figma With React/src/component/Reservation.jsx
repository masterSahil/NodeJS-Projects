import React from "react";

export default function WorkingHours() {
  return (
    <section id="Reservation" className="relative bg-working-hours-img bg-cover bg-center bg-no-repeat overflow-hidden">
      <div className="relative z-10 min-h-screen lg:min-h-150 max-w-7xl 2xl:max-w-375 mx-auto px-5 sm:px-8  py-16 lg:py-0 2xl:px-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen lg:min-h-150">
          <div className="text-center lg:text-left">
            <div className="mb-6 sm:mb-8 flex justify-center lg:justify-start">
              <span className="uppercase text-white tracking-[3px] text-sm sm:text-lg xl:text-xl relative inline-block pb-3">
                Reservation <span className="absolute left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 bottom-0 w-14 h-0.5 bg-[#d98a45]" />
              </span>
            </div>

            <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-8 sm:mb-10">Working Hours</h2>
            <div className="flex flex-col sm:flex-row items-center sm:justify-center lg:justify-start gap-4 sm:gap-5">
              <button className="bg-[#d98a45] hover:bg-[#c27b38] transition-all duration-300 px-8 sm:px-10 py-4 text-white font-semibold uppercase rounded-sm w-full sm:w-auto">Book A Table</button>
              <button className="text-white font-semibold uppercase hover:text-[#d98a45] transition duration-300">Contact Us</button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="bg-[#07161d]/95 backdrop-blur-sm w-full max-w-md rounded-xl p-7 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10">
              <div className="text-center">
                <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-snug">Sunday to Tuesday</h3>
                <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl">09:00 AM - 10:00 PM</p>
              </div>

              <div className="h-px bg-white/10 my-10 sm:my-12 lg:my-14" />

              <div className="text-center">
                <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-snug">Friday to Saturday</h3>
                <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl">09:00 AM - 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}