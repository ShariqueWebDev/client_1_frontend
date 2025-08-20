"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="relative py-20 bg-white">
      {/* Background gradient accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-pink-200 to-purple-300 rounded-full filter blur-3xl opacity-20" />
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-gradient-to-br from-yellow-200 to-red-300 rounded-full filter blur-3xl opacity-20" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-gray-800"
        >
          About{" "}
          <span className="bg-gradient-to-r from-red-400 to-yellow-600 bg-clip-text text-transparent">
            Refilly
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6  text-gray-600 leading-relaxed text-sm"
        >
          Refilly is your go-to online store for premium quality T-shirts. We
          believe fashion should be comfortable, affordable, and sustainable.
          Every design we create is inspired by modern trends while keeping
          timeless comfort in mind.
        </motion.p>

        {/* Values / Highlights */}
      </div>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.2 } },
        }}
        className="flex justify-center flex-wrap gap-5 mt-14"
      >
        {[
          {
            title: "Premium Quality",
            desc: "Crafted with high-quality fabrics that last longer.",
          },
          {
            title: "Affordable Fashion",
            desc: "Trendy T-shirts at prices that make sense.",
          },
          {
            title: "Sustainability",
            desc: "Eco-friendly production and packaging.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7 }}
            className="bg-gray-100 p-10 flex  flex-col items-center justify-center max-w-[300px] w-full rounded-sm  shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {item.title}
            </h3>
            <p className="text-gray-600 text-center text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Closing Line */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-14 text-gray-500 italic text-center text-sm"
      >
        “Your comfort is our priority, your style is our promise.”
      </motion.p>
    </section>
  );
}
