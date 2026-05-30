import React from "react";

const features = [
  {
    icon: '/svgs/features/Menu.svg',
    title: "MENU FOR EVERY TASTE",
    description:
      "Lorem ipsum dolor sit amet consectetur. Felis eget sit sit scelerisque vestibulum. Urna faucibus amet massa lacus lorem.",
  },
  {
    icon: '/svgs/features/Beans.svg',
    title: "ALWAYS QUALITY BEANS",
    description:
      "Lorem ipsum dolor sit amet consectetur. Felis eget sit sit scelerisque vestibulum. Urna faucibus amet massa lacus lorem.",
  },
  {
    icon: '/svgs/features/Barista.svg',
    title: "EXPERIENCED BARISTA",
    description:
      "Lorem ipsum dolor sit amet consectetur. Felis eget sit sit scelerisque vestibulum. Urna faucibus amet massa lacus lorem.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="Shop" className="bg-[#041219] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="inline-block text-white text-[16px] font-medium uppercase relative pb-3"> Features
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[#d98a45]" />
          </span>

          <h2 className="text-white text-4xl font-semibold mt-6 mb-6">Why people choose us?</h2>
          <p className="text-[#797B78] text-[16px]">Lorem ipsum dolor sit amet consectetur. Dolor elit vitae nunc varius. Facilisis eget cras sit semper sit enim. Turpis aliquet at ac eu donec ut. Sagittis vestibulum at quis non massa netus.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
          {features.map((item, index) => {
            return (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-10">
                  <img src={item.icon} alt={item.title} className="w-12 h-13.5 object-contain" />
                </div>

                <h3 className="text-white text-2xl font-semibold uppercase mb-6">{item.title}</h3>
                <p className="text-[#797B78] font-medium text-[16px] max-w-sm mx-auto">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}