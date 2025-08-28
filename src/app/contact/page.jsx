"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-gray-900"
        >
          Meet Our{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
            Founders
          </span>
        </motion.h1>

        {/* ---- Founder: Firoz Shah ---- */}
        <div className="mt-14 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-shrink-0">
            <Image
              src="/assets/founders/firoz.png" // Replace with actual
              alt="Firoz Shah - CEO of Refilly"
              width={300}
              height={300}
              className="rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="text-left max-w-2xl">
            <h2 className="text-3xl font-bold text-gray-800">Firoz Shah</h2>
            <p className="text-lg text-indigo-600 font-medium">
              CEO & Founder of Refilly
            </p>
            <div className="mt-4 flex items-center gap-4"></div>
            <div className="mt-2 flex items-center gap-4">
              <Mail className="w-5 h-5 text-blue-600" />
              <a
                href="mailto:shahfiroz677@gmail.com"
                className="text-gray-700 hover:text-blue-600"
              >
                shahfiroz677@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Founder Story */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="mt-10 bg-white p-10 rounded-lg shadow-lg text-left max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            The Journey of Refilly
          </h3>
          <p className="text-gray-700 leading-relaxed text-base space-y-4">
            {`Firoz Shah, the visionary founder and CEO of Refilly, has a journey
            that is nothing short of inspiring. Born in a small town with
            limited resources, Firoz faced numerous struggles during his early
            years. From working odd jobs to support his family, to dreaming of
            creating something impactful, his determination never wavered.

            His passion for fashion began as a teenager, when he would often
            redesign old T-shirts and experiment with styles. What started as a
            hobby soon transformed into a dream: to build his own brand where
            quality, comfort, and authenticity were not just promises but
            realities. However, the road to success was not easy.

            In the early days, Firoz lacked financial backing, professional
            machinery, and even a stable network to rely on. He would often walk
            long distances to suppliers, negotiate fabric scraps, and spend
            nights sketching designs under dim lights. Many dismissed his
            ambition, but his resilience turned every "no" into motivation.

            Slowly but steadily, he learned the nuances of textile sourcing,
            printing techniques, and sustainable production. After years of
            trial and error, countless sleepless nights, and unwavering belief,
            Refilly was born—a brand that represents not just clothing, but a
            lifestyle.

            Today, Refilly stands as a testament to Firoz's philosophy: "Your
            comfort is our priority, your style is our promise." Each T-shirt is
            a reflection of his struggles, his creativity, and his commitment to
            delivering premium quality with authentic prints. What sets Refilly
            apart is its ability to blend modern fashion with personal choice—
            every print tells a story, every fabric feels like home.`}
          </p>
        </motion.div>

        {/* ---- Co-Founder: Tauseef Ansari ---- */}
        <div className="mt-20 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-shrink-0 order-2 md:order-1">
            <Image
              src="/assets/founders/aamir.webp" // Replace with actual
              alt="Tauseef Ansari - Co-Founder of Refilly"
              width={300}
              height={300}
              className="rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="text-left max-w-2xl order-1 md:order-2">
            <h2 className="text-3xl font-bold text-gray-800">Tauseef Ansari</h2>
            <p className="text-lg text-indigo-600 font-medium">
              Co-CEO & Co-Founder of Refilly
            </p>
            <div className="mt-4 flex items-center gap-4"></div>
            <div className="mt-2 flex items-center gap-4">
              <Mail className="w-5 h-5 text-blue-600" />
              <a
                href="mailto:ansaritauheed003@gmail.com "
                className="text-gray-700 hover:text-blue-600"
              >
                ansaritauheed003@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Co-Founder Story */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="mt-10 bg-white p-10 rounded-lg shadow-lg text-left max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Supporting a Dream
          </h3>
          <p className="text-gray-700 leading-relaxed text-base space-y-4">
            {`Tauseef Ansari joined Refilly not just as a business partner, but as a true friend who believed in Firoz’s vision. 
            While Firoz brought creativity and design, Tauseef contributed his business acumen, management skills, and determination to take the brand to the next level. 
            From helping source raw materials to negotiating with suppliers and managing finances, Tauseef ensured that the dream didn’t just remain an idea — it became a movement. 
            
            His role has been pivotal in transforming Refilly into a scalable, professional brand while staying true to its core values. 
            Tauseef’s belief in friendship and partnership is what gave Refilly its strong foundation and the confidence to face bigger challenges ahead.`}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
