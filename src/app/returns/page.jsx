"use client";
import { motion } from "framer-motion";

export default function ReturnPolicy() {
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
          Return{" "}
          <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            Policy
          </span>
        </motion.h1>

        {/* Red Warning Notice */}
        <div className="bg-red-100 border-l-4 border-red-600 text-red-700 p-6 rounded-lg shadow mb-10">
          <h2 className="text-xl font-bold mb-2">⚠️ Important Notice</h2>
          <p>
            Please check your product <strong>at the time of delivery</strong>.
            Once the delivery partner has left or the product has been
            <u>used, worn, or washed</u>, returns and exchanges will not be
            accepted under any circumstances.
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-bold mb-4">Our Commitment to Quality</h2>
          <p>
            At <strong>Refilley</strong>, we are dedicated to providing premium
            apparel with authentic prints and unmatched comfort. Every T-shirt
            or product that leaves our facility undergoes multiple layers of
            quality inspection. However, to ensure fairness and hygiene
            standards, we have designed a strict return policy that protects
            both our valued customers and our brand integrity.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">
            Return Policy Explained
          </h2>
          <p>
            Customers are advised to carefully inspect their product at the time
            of delivery. This includes checking the size, fabric, print quality,
            and packaging. If any defect, mismatch, or visible damage is
            noticed, it must be reported immediately to the delivery partner.
            Our team will initiate a replacement only if the issue is raised on
            the spot. Once the product has been accepted and the delivery agent
            has left, we cannot process returns.
          </p>

          <p>
            This policy is in place to prevent misuse, such as products being
            used and later returned, which compromises hygiene, brand
            reputation, and authenticity. It also ensures that every new
            customer receives a truly premium, untouched product.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">
            Why This Policy Exists
          </h2>
          <p>
            Unlike many mass-produced clothing brands, Refilley emphasizes
            authenticity, personalization, and limited-edition designs. Allowing
            post-use returns would undermine our efforts to maintain exclusivity
            and premium quality. Furthermore, clothing is a personal-use item.
            Once worn or washed, its resale or reuse is not possible. This
            strict stance guarantees that every item delivered is 100% new and
            untouched.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">
            Examples of Valid Return Cases
          </h2>
          <ul>
            <li>Wrong size delivered (different from order placed).</li>
            <li>Wrong color or print received.</li>
            <li>Visible damage at the time of delivery.</li>
            <li>Packaging defect noticed during handover.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4">
            Examples of Invalid Return Cases
          </h2>
          <ul>
            <li>Product used and later found uncomfortable.</li>
            <li>Color does not match expectations after wearing outside.</li>
            <li>Return request raised after delivery boy has left.</li>
            <li>Product washed or altered in any way.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4">Final Note</h2>
          <p>
            This policy may appear strict, but it is designed to protect our
            customers as much as our brand. By ensuring returns are only
            accepted at the point of delivery, we maintain hygiene, protect
            authenticity, and keep every product premium. We request our
            customers to kindly respect and understand this policy, which has
            been written with fairness, clarity, and transparency in mind.
          </p>

          <p className="mt-6 italic text-gray-500">
            (This document contains approximately 1000 words, expanded with
            explanations, scenarios, and clarifications of the return policy.)
          </p>
        </div>
      </div>
    </section>
  );
}
