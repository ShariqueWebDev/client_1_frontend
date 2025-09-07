"use client";

import { motion } from "framer-motion";

export default function TermsAndConditions() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-center text-gray-900 mb-10"
        >
          Terms & <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Conditions</span>
        </motion.h1>

        {/* Intro */}
        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
          Welcome to <strong>Refilley</strong>. By accessing or using our
          website, products, or services, you agree to be bound by these Terms
          and Conditions. Please read them carefully before making a purchase.
        </p>

        {/* Section 1 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. General</h2>
        <p className="text-gray-600 mb-4">
          These Terms & Conditions apply to all users of Refilley’s website and
          customers purchasing our products. By engaging with our services, you
          acknowledge that you have read, understood, and agreed to abide by
          them. We reserve the right to update or modify these Terms at any time
          without prior notice.
        </p>

        {/* Section 2 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Eligibility</h2>
        <p className="text-gray-600 mb-4">
          To make a purchase, you must be at least 18 years old or have parental
          consent. By placing an order, you confirm that the information you
          provide is accurate, current, and complete.
        </p>

        {/* Section 3 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Products & Descriptions</h2>
        <p className="text-gray-600 mb-4">
          We make every effort to display our products as accurately as
          possible. However, slight variations in color, print, or design may
          occur due to screen differences. Such variations do not constitute a
          defect or grounds for return.
        </p>

        {/* Section 4 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Pricing & Payments</h2>
        <p className="text-gray-600 mb-4">
          All prices listed are in Indian Rupees (INR) and inclusive of
          applicable taxes unless otherwise stated. We reserve the right to
          modify prices at any time. Payments must be completed through our
          secure gateway partners, and Refilley is not responsible for any
          transaction errors caused by third-party payment providers.
        </p>

        {/* Section 5 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Shipping & Delivery</h2>
        <p className="text-gray-600 mb-4">
          Orders are typically processed within 1–3 business days and delivered
          within 5–10 business days depending on location. Delivery timelines
          are estimates and may vary due to circumstances beyond our control.
          Refilley is not liable for delays caused by courier services or
          unforeseen conditions.
        </p>

        {/* Section 6 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Return Policy</h2>
        <p className="text-gray-600 mb-4">
          Returns are only accepted at the time of delivery check. Once the
          delivery partner has left or the product has been used, washed, or
          altered, returns will not be processed. Customers are advised to
          thoroughly check their order upon receiving it.
        </p>

        {/* Section 7 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">7. Intellectual Property</h2>
        <p className="text-gray-600 mb-4">
          All content on this website, including text, images, logos, and
          designs, is the property of Refilley. Unauthorized use, reproduction,
          or distribution of our intellectual property is strictly prohibited.
        </p>

        {/* Section 8 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">8. Limitation of Liability</h2>
        <p className="text-gray-600 mb-4">
          Refilley will not be held liable for any indirect, incidental, or
          consequential damages arising from the use of our products or website.
          Our liability is strictly limited to the value of the product
          purchased.
        </p>

        {/* Section 9 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">9. Privacy Policy</h2>
        <p className="text-gray-600 mb-4">
          We respect your privacy and are committed to protecting your personal
          information. Your details are used only for processing orders and
          enhancing your shopping experience. We do not sell or share your data
          with third parties without consent.
        </p>

        {/* Section 10 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">10. Governing Law</h2>
        <p className="text-gray-600 mb-4">
          These Terms are governed by the laws of India. Any disputes shall be
          subject to the exclusive jurisdiction of courts located in Hyderabad,
          Telangana.
        </p>

        {/* Closing */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">11. Contact Us</h2>
        <p className="text-gray-600 mb-4">
          For questions regarding these Terms & Conditions, please contact us at{" "}
          <a href="mailto:support@refilley.com" className="text-blue-600 underline">
            support@refilley.com
          </a>
          .
        </p>

        <p className="mt-10 text-sm text-gray-500 text-center italic">
          These Terms & Conditions were last updated in August 2025 and are
          subject to change without prior notice.
        </p>
      </div>
    </section>
  );
}
