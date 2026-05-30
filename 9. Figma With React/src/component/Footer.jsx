import React from 'react'
import Logo from '/images/logo/logo.png'

const Footer = () => {
  
  return (
    <>
      <section id='Contact' className="relative">
        <div className="relative bg-footer-img h-full flex items-center bg-cover md:bg-cover md:bg-center bg-no-repeat">
          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 min-h-auto lg:min-h-108 py-16 sm:py-20 lg:py-10 w-full">
            
            <div className="max-w-4xl">
              <div className="flex flex-col items-start gap-3 mb-5 sm:mb-6">
                <span className="text-white uppercase tracking-wider text-sm sm:text-[16px] font-semibold">News letter</span>
                <div className="w-15 h-0.5 bg-orange-500"></div>
              </div>

              <h2 className="text-white text-[32px] leading-tight sm:text-4xl font-semibold mb-5 sm:mb-6">Subscribe Our Newsletter</h2>
              <p className="text-[#797B78] max-w-3xl font-medium text-[15px] sm:text-base md:text-lg leading-7 sm:leading-relaxed mb-8 sm:mb-10">Lorem ipsum dolor sit amet consectetur. Dolor elit vitae nunc varius. Facilisis eget cras sit semper sit enim. Turpis aliquet at ac eu donec ut.</p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-4xl">
                <input type="email" placeholder="Type here" className="w-full h-16 sm:h-16 px-5 sm:px-7 text-base sm:text-xl bg-[#182F31] text-[#B2BBBB] placeholder:text-[#B2BBBB] rounded-lg outline-none" />

                <button className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-12 bg-[#D68240] hover:bg-[#c77733] transition text-white text-[15px] sm:text-[16px] font-medium rounded-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-[#121A1D]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-14">
              <div>
                <img src={Logo} alt="Taste Nest Logo" />
                <p className="text-[#797B78] leading-6 text-sm font-medium mb-10">Lorem ipsum dolor sit amet consectetur. Tristique cursus morbi nibh nec et vulputate. Turpis tortor nisi imperdiet quis accumsan. Ligula netus amet leo ultricies. Neque venenatis magnis amet eget sagittis leo enim.</p>

                <div className="flex gap-4">
                  {["facebook", "twitter", "instagram", "linkedin"].map((val, item) => (
                    <img key={item} src={`/images/footer/${val}.png`} className="w-12 h-12 rounded-full bg-white flex items-center justify-center tex font-bold text-xl cursor-pointer hover:scale-102 transition"></img>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white text-[16px] font-semibold mb-4">Opening Restaurant</h4>
                <ul className="space-y-3 text-[#797B78] text-sm font-medium">
                  <li>Sa - We: 09:00am - 10:00pm</li>
                  <li>Thu - We: 09:00am - 10:00pm</li>
                  <li>Friday Closed</li>
                </ul>
              </div>

              <div>
                <h4 className="text-white text-[16px] font-semibold mb-4">User Link</h4>
                <ul className="space-y-3 text-[#797B78] text-sm font-medium">
                  <li><a href="#" className="hover:text-orange-400">About Us</a></li>
                  <li><a href="#" className="hover:text-orange-400">Contact Us</a></li>
                  <li><a href="#" className="hover:text-orange-400">Order Delivery</a></li>
                  <li><a href="#" className="hover:text-orange-400">Payment & Tax</a></li>
                  <li><a href="#" className="hover:text-orange-400">Terms Of Services</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white text-[16px] font-semibold mb-4">Contact Us</h4>
                <div className="text-[#797B78] text-sm font-medium leading-6 mb-4">
                  <p>543 Country Club Ave,</p>
                  <p>NC 27587, London, UK</p>
                  <p>+1257 6541120</p>
                </div>

                <div className="bg-white rounded-lg p-1.5 flex items-center overflow-hidden w-full max-w-72.5 sm:max-w-xl">
                  <input type="email" placeholder="Email" className="flex-1 min-w-0 px-4 py-2 outline-none text-[#6A6A6A] text-md font-medium bg-transparent" />

                  <button className="shrink-0 bg-[#d4833e] hover:bg-[#c77733] transition font-medium text-md text-white px-8 py-2 rounded-md">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  )
}

export default Footer