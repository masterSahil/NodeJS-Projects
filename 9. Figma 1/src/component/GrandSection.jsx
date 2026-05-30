import React from "react";
import BGIMAGE from '/images/foodOrder/bg-image.png'
import Phone1 from '/images/foodOrder/phone1.png'
import Phone2 from '/images/foodOrder/phone2.png'
import Burger from '/images/explore/burger.png'
import Pasta from '/images/explore/pasta.png'
import Salad from '/images/explore/salad.png'

export default function FoodShowcase() {
  const testimonials = [
    {
      color: "#EB9D20",
      text: "Lorem ipsum dolor sit amet consectetur. Suspendisse aliquet tellus adipiscing condimentum donec faucibus.",
    },
    {
      color: "#EF7C6A",
      text: "Lorem ipsum dolor sit amet consectetur. Suspendisse aliquet tellus adipiscing condimentum donec faucibus.",
    },
    {
      color: "#F855CA",
      text: "Lorem ipsum dolor sit amet consectetur. Suspendisse aliquet tellus adipiscing condimentum donec faucibus.",
    },
  ];

  const stats = [
    { number: "1287+", label: "VISITORS DAILY" },
    { number: "578+", label: "DELIVERIES MONTHLY" },
    { number: "1440+", label: "POSITIVE FEEDBACK" },
    { number: "40+", label: "AWARDS AND HONORS" },
  ];

  const foods = [
    { image: Pasta, title: "Raspberry French Toast", price: "$12.50", oldPrice: "$13.20" },
    { image: Burger, title: "Raspberry French Toast", price: "$12.50", oldPrice: "$13.20" },
    { image: Salad, title: "Raspberry French Toast", price: "$12.50", oldPrice: "$13.20" },
  ];

  return (
    <section id="Pages" className="relative bg-[#031118] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-28 lg:py-32">
      <div className="text-center max-w-3xl mx-auto">
        <span className="relative inline-block text-white uppercase text-[16px] tracking-[3px] font-medium">
          Features <span className="absolute left-1/2 -translate-x-1/2 top-7 w-14 h-0.5 bg-[#D68240]" />
        </span>

        <h2 className="text-white text-4xl font-semibold mt-10">Why people choose us?</h2>
        <p className="text-[#797B78] text-base font-medium leading-6 mt-5">Lorem ipsum dolor sit amet consectetur. Dolor elit vitae nunc varius. Facilisis eget cras sit semper sit enim. Turpis aliquet at ac eu donec ut. Sagittis vestibulum at quis non massa netus.</p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-24">
        {testimonials.map((item, index) => (
            <div key={index} className="relative bg-[#10181B] rounded-2xl px-8 pt-16 pb-10 text-center border border-white/5 shadow-[0_15px_40px_rgba(0,0,0,.25)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,.35)]" >
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-[#0d1d25] flex items-center justify-center text-4xl shadow-lg" style={{ color: item.color }} >
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.4722 22.9862C15.4448 22.9896 14.4356 23.2575 13.5417 23.7639C14.8002 20.5063 16.8876 17.6338 19.5972 15.4306C19.7523 15.3029 19.8806 15.146 19.975 14.9687C20.0694 14.7914 20.1279 14.5973 20.1472 14.3974C20.1666 14.1975 20.1464 13.9957 20.0877 13.8036C20.0291 13.6115 19.9332 13.4329 19.8056 13.2778C19.6779 13.1228 19.5209 12.9944 19.3436 12.9001C19.1664 12.8057 18.9722 12.7472 18.7723 12.7278C18.5724 12.7085 18.3707 12.7287 18.1786 12.7873C17.9865 12.8459 17.8078 12.9418 17.6528 13.0695C12.0972 17.5834 9.625 23.8334 9.625 27.7084C9.63457 29.0785 10.0429 30.4162 10.8001 31.5582C11.5572 32.7001 12.6305 33.5969 13.8889 34.1389C14.7033 34.5335 15.5951 34.7422 16.5 34.7501C17.2965 34.7888 18.0925 34.6653 18.8398 34.3872C19.5872 34.1091 20.2703 33.6821 20.8476 33.1321C21.425 32.5821 21.8847 31.9205 22.1988 31.1876C22.5128 30.4546 22.6748 29.6655 22.6748 28.8681C22.6748 28.0707 22.5128 27.2816 22.1988 26.5486C21.8847 25.8157 21.425 25.1542 20.8476 24.6042C20.2703 24.0542 19.5872 23.6272 18.8398 23.349C18.0925 23.0709 17.2965 22.9475 16.5 22.9862H16.4722Z" fill={item.color} />
                  <path d="M31.9449 22.9858C30.9173 22.988 29.9078 23.2559 29.0143 23.7636C30.2724 20.5093 32.3543 17.6378 35.056 15.4302C35.2251 15.3083 35.3675 15.1531 35.4743 14.9742C35.5812 14.7952 35.6503 14.5962 35.6774 14.3895C35.7046 14.1829 35.6891 13.9728 35.632 13.7723C35.5749 13.5718 35.4773 13.3852 35.3454 13.2238C35.2134 13.0624 35.0499 12.9297 34.8647 12.834C34.6796 12.7382 34.4768 12.6813 34.2688 12.6668C34.0609 12.6523 33.8522 12.6805 33.6555 12.7497C33.4589 12.8189 33.2785 12.9276 33.1254 13.0691C27.5699 17.583 25.0977 23.833 25.0977 27.708C25.1042 29.0626 25.5006 30.3867 26.2395 31.5221C26.9784 32.6575 28.0284 33.5562 29.2643 34.1108C30.0993 34.5168 31.0164 34.7259 31.9449 34.7219C32.7414 34.7606 33.5374 34.6372 34.2847 34.359C35.0321 34.0809 35.7151 33.6539 36.2925 33.1039C36.8699 32.5539 37.3296 31.8924 37.6436 31.1594C37.9577 30.4265 38.1197 29.6374 38.1197 28.84C38.1197 28.0425 37.9577 27.2534 37.6436 26.5205C37.3296 25.7875 36.8699 25.126 36.2925 24.576C35.7151 24.026 35.0321 23.599 34.2847 23.3209C33.5374 23.0427 32.7414 22.9193 31.9449 22.958V22.9858Z" fill={item.color} />
                </svg>
              </div>

              <p className="text-[#797B78] text-[16px] leading-6 mb-8">“Lorem ipsum dolor sit amet consectetur. Suspendisse aliquet tellus adipiscing condimentum donec blandit. Dignissim nunc facilisi pretium id molestie lectus duis.”</p>

              <div className="text-lg tracking-[2px] flex justify-center" style={{ color: item.color }} >
                <svg width="115" height="21" viewBox="0 0 115 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_1_210)">
                    <path d="M10.125 14.5716L15.3394 17.7188L13.9556 11.7872L18.5625 7.79625L12.4959 7.28156L10.125 1.6875L7.75406 7.28156L1.6875 7.79625L6.29437 11.7872L4.91063 17.7188L10.125 14.5716Z" fill={item.color} />
                  </g>
                  <g clipPath="url(#clip1_1_210)">
                    <path d="M33.75 14.5716L38.9644 17.7188L37.5806 11.7872L42.1875 7.79625L36.1209 7.28156L33.75 1.6875L31.3791 7.28156L25.3125 7.79625L29.9194 11.7872L28.5356 17.7188L33.75 14.5716Z" fill={item.color} />
                  </g>
                  <g clipPath="url(#clip2_1_210)">
                    <path d="M57.375 14.5716L62.5894 17.7188L61.2056 11.7872L65.8125 7.79625L59.7459 7.28156L57.375 1.6875L55.0041 7.28156L48.9375 7.79625L53.5444 11.7872L52.1606 17.7188L57.375 14.5716Z" fill={item.color} />
                  </g>
                  <g clipPath="url(#clip3_1_210)">
                    <path d="M81 14.5716L86.2144 17.7188L84.8306 11.7872L89.4375 7.79625L83.3709 7.28156L81 1.6875L78.6291 7.28156L72.5625 7.79625L77.1694 11.7872L75.7856 17.7188L81 14.5716Z" fill={item.color} />
                  </g>
                  <g clipPath="url(#clip4_1_210)">
                    <path d="M113.062 7.79625L106.996 7.27312L104.625 1.6875L102.254 7.28156L96.1875 7.79625L100.794 11.7872L99.4106 17.7188L104.625 14.5716L109.839 17.7188L108.464 11.7872L113.062 7.79625ZM104.625 12.9937L101.452 14.9091L102.296 11.2978L99.495 8.86781L103.191 8.54719L104.625 5.14687L106.068 8.55563L109.763 8.87625L106.962 11.3062L107.806 14.9175L104.625 12.9937Z" fill={item.color} />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_210"><rect width="20.25" height="20.25" fill="white" /></clipPath>
                    <clipPath id="clip1_1_210"><rect width="20.25" height="20.25" fill="white" transform="translate(23.625)" /></clipPath>
                    <clipPath id="clip2_1_210"><rect width="20.25" height="20.25" fill="white" transform="translate(47.25)" /></clipPath>
                    <clipPath id="clip3_1_210"><rect width="20.25" height="20.25" fill="white" transform="translate(70.875)" /></clipPath>
                    <clipPath id="clip4_1_210"><rect width="20.25" height="20.25" fill="white" transform="translate(94.5)" /></clipPath>
                  </defs>
                </svg>

              </div>

              <h4 className="text-white font-semibold mt-0.5">John</h4>
              <p className="text-[#797B78] text-sm">Business Man</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <span className="w-3 h-3 rounded-full bg-[#d89b52]" />
          <span className="w-3 h-3 rounded-full bg-white/10" />
          <span className="w-3 h-3 rounded-full bg-white/10" />
        </div>

        <div className="mt-16 border-dashed border-t border-white/7" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 text-center mt-16">
          {stats.map((item, index) => {
            const value = item.number.replace("+", "");

            return (
              <div key={index}>
                <h3 className="text-white text-4xl font-bold">
                  {value}<span className={`${index % 2 == 0 ? 'text-white' : 'text-[#d89b52]'} font-bold`}>+</span>
                </h3>
                <p className="text-white uppercase text-[16px] font-semibold tracking-wide mt-4">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div id="Order" className="relative h-160 md:h-120 px-5 lg:px-10 flex flex-col md:flex-row justify-around">
        <img src={BGIMAGE} alt="Food Ordering Background Image" className="absolute inset-0 w-full h-full object-cover object-top-right md:object-cover md:object-center" />
        <div className="relative z-10 max-w-6xl h-full lg:px-6 flex justify-center items-center">
          <div>
            <h2 className="text-white text-3xl text-center md:text-left lg:text-5xl font-semibold leading-tight">Simple Way To <br /> Order Your Foods</h2>

            <div className="flex flex-wrap justify-center gap-5 mt-12">
              <button className="group bg-white rounded-xl p-3 md:p-4 flex items-center gap-4 shadow-lg hover:-translate-y-1 transition-all duration-300">
                <svg viewBox="0 0 37 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 md:h-10 md:w-9 h-5 w-6">
                  <g clipPath="url(#clip0)">
                    <path d="M16.8975 19.0693L0.149414 36.6163C0.337494 37.2829 0.675479 37.8976 1.13753 38.4134C1.59959 38.9293 2.17348 39.3327 2.81534 39.5928C3.45719 39.8529 4.15002 39.9628 4.84086 39.9142C5.5317 39.8655 6.20226 39.6594 6.80129 39.3119L25.6461 28.5792L16.8975 19.0693Z" fill="#EA4335"/>
                    <path d="M33.8337 16.0866L25.6846 11.4189L16.5117 19.4684L25.7219 28.5539L33.809 23.9363C34.5254 23.5611 35.1255 22.9971 35.5441 22.3052C35.9628 21.6133 36.1842 20.8201 36.1842 20.0114C36.1842 19.2027 35.9628 18.4094 35.5441 17.7176C35.1255 17.0257 34.5254 16.4616 33.809 16.0865L33.8337 16.0866Z" fill="#FBBC04"/>
                    <path d="M0.149821 3.31982C0.0486472 3.69409 -0.00174537 4.08026 0 4.46795V35.4682C0.000996972 35.8558 0.051343 36.2417 0.149821 36.6165L17.4721 19.5188L0.149821 3.31982Z" fill="#4285F4"/>
                    <path d="M17.0223 19.9681L25.6835 11.4192L6.86376 0.636475C6.15567 0.221805 5.35034 0.00219444 4.52977 8.6686e-06C2.49344 -0.00394893 0.703195 1.34757 0.149414 3.30729L17.0223 19.9681Z" fill="#34A853"/>
                  </g>
                  <defs>
                    <clipPath id="clip0"> <rect width="36.1837" height="40" fill="white"/> </clipPath>
                  </defs>
                </svg>

                <div className="text-left">
                  <p className="text-[8px] md:text-[10px] uppercase font-medium tracking-wide text-black">Get iton</p>
                  <h3 className="text-[16px] md:text-[24px] leading-none font-semibold text-black">Google Play</h3>
                </div>
              </button>

              <button className="group bg-white rounded-xl p-3 flex items-center gap-4 shadow-lg hover:-translate-y-1 transition-all duration-300">
                <svg viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 md:h-10 md:w-9 h-5.5 w-6.5" >
                  <path d="M21.0618 28.8C19.4285 30.3833 17.6451 30.1333 15.9285 29.3833C14.1118 28.6167 12.4451 28.5833 10.5285 29.3833C8.12846 30.4167 6.8618 30.1167 5.42846 28.8C-2.70487 20.4167 -1.50487 7.65 7.72846 7.18333C9.97846 7.3 11.5451 8.41667 12.8618 8.51667C14.8285 8.11667 16.7118 6.96667 18.8118 7.11667C21.3285 7.31667 23.2285 8.31667 24.4785 10.1167C19.2785 13.2333 20.5118 20.0833 25.2785 22C24.3285 24.5 23.0951 26.9833 21.0451 28.8167L21.0618 28.8ZM12.6951 7.08333C12.4451 3.36667 15.4618 0.3 18.9285 0C19.4118 4.3 15.0285 7.5 12.6951 7.08333Z" fill="black" />
                </svg>

                <div className="text-left">
                  <p className="text-[8px] md:text-[10px] uppercase font-medium tracking-wide text-black">Get iton</p>
                  <h3 className="text-[16px] md:text-[24px] leading-none font-semibold text-black">Apple Store</h3>
                </div>
              </button>
            </div>
          </div>
        </div> 

        <div className="flex justify-center md:mr-25 lg:mr-20">
          <img src={Phone1} alt="Food Delivery Home Page Screen"
            className="w-50 h-80 object-contain sm:object-fill sm:h-100 md:h-130 md:-ml-2 lg:w-64 lg:h-142 md:-mt-20 px-1 drop-shadow-[0_20px_50px_rgba(0,0,0,.5)]" />

          <img src={Phone2} alt="Food Delivery Details Page Screen"
            className="w-50 h-80 object-contain sm:object-fill sm:h-100 md:h-130 lg:w-64 lg:h-140 px-1 drop-shadow-[0_20px_50px_rgba(0,0,0,.5)]" />
        </div>
      </div>

      <div id="Menu" className="max-w-7xl mx-auto px-6 py-24 lg:py-28 mt-10">
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <span className="relative inline-block text-white uppercase text-[16px] font-medium">
            Menu <span className="absolute left-1/2 -translate-x-1/2 top-7.5 w-15 h-0.5 bg-[#d89b52]" />
          </span>

          <h2 className="text-white text-4xl font-semibold mt-8 mb-5">Explore Our Foods</h2>
          <p className="text-[#797B78] text-sm font-medium sm:text-base leading-6 max-w-3xl mx-auto">Lorem ipsum dolor sit amet consectetur. Dolor elit vitae nunc varius. Facilisis eget cras sit semper sit enim. Turpis aliquet at ac eu donec ut. Sagittis vestibulum at quis non massa netus.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {foods.map((food, index) => (
            <div key={index} className="group bg-[#081920] rounded-2xl overflow-hidden border border-white/5 shadow-[0_15px_40px_rgba(0,0,0,.35)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(216,155,82,.18)]" >
              <div className="overflow-hidden">
                <img src={food.image} alt={food.title} className="w-full h-65 sm:h-75 object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>

              <div className="p-6">
                <h3 className="text-[#D68240] text-[24px] font-semibold leading-tight mb-1">{food.title}</h3>
                <p className="text-[#797B78] text-[16px] font-medium mb-5">Time: 10 - 15 Minutes | Serve: 1</p>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[#d89b52] font-bold text-2xl">{food.price}</span>
                  <span className="line-through text-[#797B78] font-semibold text-2xl">{food.oldPrice}</span>
                </div>

                <button className="bg-[#D68240] px-6 py-3 rounded-sm text-[16px] font-medium transition-all duration-300 hover:bg-[#b96402] hover:text-white hover:shadow-lg hover:shadow-[#d89b52]/30 active:scale-95">Order Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}