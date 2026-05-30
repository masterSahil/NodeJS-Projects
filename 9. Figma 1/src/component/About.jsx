import React from "react";
import about1 from '/images/about/about1.png'
import about2 from '/images/about/about2.png'
import about3 from '/images/about/about3.png'

const data = [
  {
    tag: "ABOUT US",
    title: "We Invite You to Visit Our Coffee House",
    desc: "Lorem ipsum dolor sit amet consectetur. Dolor elit vitae nunc varius. Facilisis eget cras sit semper sit enim. Turpis aliquet at ac eu donec ut. Sagittis vestibulum at quis non massa netus.",
    image: about1,
  },
  {
    tag: "COFFEE MENU",
    title: "Quality Kava Beans",
    desc: "Lorem ipsum dolor sit amet consectetur. Dolor elit vitae nunc varius. Facilisis eget cras sit semper sit enim. Turpis aliquet at ac eu donec ut.",
    image: about2,
    reverse: true,
  },
  {
    tag: "OUR TEAM",
    title: "Use the Tips & Recipes of Our Barista",
    desc: "Lorem ipsum dolor sit amet consectetur. Dolor elit vitae nunc varius. Facilisis eget cras sit semper sit enim. Turpis aliquet at ac eu donec ut.",
    image: about3,
  },
];

export default function AboutSection() {
  return (
    <section id="Blog" className="bg-[#06141b] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-20">
          {data.map((item, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-14 items-center  ${item.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="max-w-md">
                <p className="text-[16px] font-medium uppercase text-white relative inline-block mb-6">
                  {item.tag}
                  <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-orange-500"></span>
                </p>

                <h2 className="text-white text-4xl font-semibold leading-tight mb-6">{item.title}</h2>
                <p className="text-[#797B78] text-[16px] mb-8">{item.desc}</p>

                <button className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 text-white text-xs uppercase tracking-wider font-semibold">Read More</button>
              </div>

              <div className="group">
                <div className="overflow-hidden">
                  <img src={item.image} alt="Taste Nest Chefs Images" className="w-full h-112.5 object-cover transition duration-700 group-hover:scale-105" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}