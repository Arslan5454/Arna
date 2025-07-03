import React from "react";

import { motion } from "framer-motion";
const stats = [
  { label: "Happy Customers", value: "15,000+" },
  { label: "Unique Designs", value: "1,200+" },
  { label: "Years of Experience", value: "5+" },
];
const About = () => {
  return (
    <section className="bg-white text-gray-800">
      {/* Hero Section with Video Background */}
      <div className="relative h-[80vh] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover brightness-50"
          src="/about-hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Passion, Your Style
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl max-w-3xl drop-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Redefining fashion with timeless elegance and modern trends.
          </motion.p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-rose-50 py-12 md:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="p-6 rounded shadow bg-white"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <h3 className="text-4xl md:text-5xl font-bold text-rose-600 mb-2">
                {stat.value}
              </h3>
              <p className="text-lg font-medium text-gray-700">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-6xl mx-auto py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4 md:px-8">
        <motion.img
          src="/about-premium.jpg"
          alt="About Arna Wearing"
          className="w-full rounded-lg shadow-xl object-cover h-80 md:h-[500px]"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Our Journey
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Since our inception, Arna Wearing has been synonymous with premium
            quality and unique designs. Every piece is crafted with passion,
            precision, and the finest materials — creating a wardrobe that
            speaks confidence and sophistication.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            We don’t just follow trends; we create them. Our collections blend
            tradition with innovation, offering styles that stand out in any
            crowd.
          </p>
        </motion.div>
      </div>

      {/* Mission & Values */}
      <div className="bg-gray-100 py-12 md:py-20">
        <div className="max-w-5xl mx-auto text-center px-4 md:px-8 space-y-6">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Our Mission & Values
          </motion.h2>
          <motion.p
            className="text-gray-700 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            We aim to make exceptional fashion accessible while embracing
            ethical practices. Sustainability, quality, and customer
            satisfaction drive every decision we make.
          </motion.p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-rose-600 py-12 text-center text-white">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          Ready to Redefine Your Style?
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          Discover our collections and make every outfit extraordinary.
        </motion.p>
        <a
          href="/"
          className="inline-block bg-white text-rose-600 font-bold px-6 py-4 rounded hover:bg-gray-100 transition"
        >
          Start Shopping
        </a>
      </div>
    </section>
  );
};

export default About;
