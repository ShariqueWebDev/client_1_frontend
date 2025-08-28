"use client";
import Instagram from "@/components/Instagram";
import { motion } from "framer-motion";
import { Leaf, Star, ShoppingBag, Users } from "lucide-react";

export default function About() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Background gradient accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-pink-200 to-purple-300 rounded-full filter blur-3xl opacity-20" />
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-gradient-to-br from-yellow-200 to-red-300 rounded-full filter blur-3xl opacity-20" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-gray-900"
        >
          About{" "}
          <span className="bg-gradient-to-r from-blue-500 to-yellow-600 bg-clip-text text-transparent">
            Refilly
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-gray-600 leading-relaxed text-base md:text-lg max-w-3xl mx-auto"
        >
          At <span className="font-semibold text-gray-800">Refilly</span>, we’re
          redefining fashion with T-shirts that blend{" "}
          <span className="font-semibold text-gray-800">
            style, comfort, and sustainability
          </span>
          . From timeless basics to trendy designs, every piece is crafted to
          give you premium quality without the premium price.
        </motion.p>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10 bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Founded with the vision to make fashion{" "}
            <span className="text-gray-800 font-semibold">
              accessible and sustainable
            </span>
            , Refilly began as a small idea — to create T-shirts that people
            actually love to wear every day. With eco-friendly fabrics, modern
            prints, and a commitment to affordability, we’ve grown into a
            community that believes in{" "}
            <span className="italic text-gray-700">
              “comfort without compromise.”
            </span>
          </p>
        </motion.div>
      </div>

      {/* Highlights Section */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.2 } },
        }}
        className="flex justify-center flex-wrap gap-6 mt-16 max-w-6xl mx-auto px-6"
      >
        {[
          {
            title: "Premium Quality",
            desc: "Crafted with durable fabrics that stay fresh and comfortable wash after wash.",
            icon: <Star className="w-8 h-8 text-yellow-500" />,
          },
          {
            title: "Affordable Fashion",
            desc: "High-street fashion styles at prices that fit every budget.",
            icon: <ShoppingBag className="w-8 h-8 text-pink-500" />,
          },
          {
            title: "Sustainability",
            desc: "Eco-friendly production & recyclable packaging for a greener tomorrow.",
            icon: <Leaf className="w-8 h-8 text-green-500" />,
          },
          {
            title: "Customer First",
            desc: "Loved by thousands, trusted for our service, quality, and values.",
            icon: <Users className="w-8 h-8 text-indigo-500" />,
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7 }}
            className="bg-white p-8 flex flex-col items-center justify-center w-full max-w-[280px] rounded-lg shadow-md hover:shadow-xl transition"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
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
        className="mt-16 text-gray-600 italic text-center text-base"
      >
        “Your comfort is our priority, your style is our promise.”
      </motion.p>
      <Instagram />
    </section>
  );
}
