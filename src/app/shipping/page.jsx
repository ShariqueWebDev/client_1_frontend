"use client";

import { motion } from "framer-motion";

export default function ShippingInfo() {
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
          Shipping <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">Information</span>
        </motion.h1>

        {/* Intro */}
        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
          At <strong>Refilley</strong>, we take pride in delivering your
          favorite T-shirts with care, speed, and transparency. Below, you’ll
          find all the information regarding our shipping process, timelines,
          charges, and policies.
        </p>

        {/* Section 1 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Delivery Locations</h2>
        <p className="text-gray-600 mb-4">
          We currently ship across all major cities and towns in India. For
          remote or hard-to-reach areas, shipping may take additional time. We
          are expanding globally soon, so international customers can also look
          forward to shopping with us.
        </p>

        {/* Section 2 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Shipping Charges</h2>
        <p className="text-gray-600 mb-4">
          - <strong>Standard Shipping:</strong> Free for all orders above ₹999.
          <br />
          - <strong>Orders below ₹999:</strong> A nominal fee of ₹99 will be
          charged.
          <br />
          - <strong>Express Shipping:</strong> Available at an additional cost,
          calculated at checkout.
        </p>

        {/* Section 3 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Estimated Delivery Time</h2>
        <p className="text-gray-600 mb-4">
          - <strong>Metro Cities:</strong> 2 – 4 business days.
          <br />
          - <strong>Tier 2 & Tier 3 Cities:</strong> 4 – 7 business days.
          <br />
          - <strong>Remote Areas:</strong> 7 – 10 business days.
        </p>
        <p className="text-gray-600 mb-4">
          Please note that weekends and public holidays are not counted as
          business days. Delivery timelines may also be affected during festive
          seasons or due to unforeseen circumstances (e.g., weather conditions,
          courier strikes).
        </p>

        {/* Section 4 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Order Processing</h2>
        <p className="text-gray-600 mb-4">
          Once your order is placed, our warehouse team carefully inspects and
          packs your product within <strong>24 to 48 hours</strong>. Orders
          placed after 5 PM will be processed on the next business day.
        </p>

        {/* Section 5 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Tracking Your Order</h2>
        <p className="text-gray-600 mb-4">
          As soon as your order is dispatched, you’ll receive a confirmation
          email and SMS with a tracking ID and a link to track your shipment in
          real-time. You can also track your order directly through the{" "}
          <strong>“My Orders”</strong> section of your Refilley account.
        </p>

        {/* Section 6 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Multiple Shipments</h2>
        <p className="text-gray-600 mb-4">
          In rare cases, if your order contains multiple items, they may be
          shipped separately due to packaging or stock availability. You will
          receive separate tracking details for each shipment.
        </p>

        {/* Section 7 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">7. Delays in Delivery</h2>
        <p className="text-gray-600 mb-4">
          While we do our best to ensure timely delivery, certain factors may
          cause delays beyond our control. These include:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Natural disasters (floods, storms, earthquakes, etc.)</li>
          <li>Political unrest or strikes</li>
          <li>Courier delays or high seasonal demand</li>
          <li>Incorrect address or unavailable recipient</li>
        </ul>

        {/* Section 8 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">8. Undelivered Orders</h2>
        <p className="text-gray-600 mb-4">
          If the courier is unable to deliver your package after multiple
          attempts, it will be returned to our warehouse. In such cases, we will
          contact you for reshipment or refund (excluding shipping charges, if
          applicable).
        </p>

        {/* Section 9 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">9. International Shipping (Coming Soon)</h2>
        <p className="text-gray-600 mb-4">
          We are actively working to expand Refilley to customers worldwide.
          International shipping will be announced shortly with full details on
          charges, timelines, and duties.
        </p>

        {/* Section 10 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">10. Contact Us</h2>
        <p className="text-gray-600 mb-4">
          For any shipping-related queries, please reach out to us at{" "}
          <a href="mailto:support@refilley.com" className="text-purple-600 underline">
            support@refilley.com
          </a>{" "}
          or call us at +91-9876543210. Our customer support team is available
          Monday to Saturday, 10 AM – 7 PM.
        </p>

        {/* Closing */}
        <p className="mt-10 text-sm text-gray-500 text-center italic">
          This Shipping Policy was last updated in August 2025. Delivery
          timelines are estimates and may vary based on location and courier
          partner.
        </p>
      </div>
    </section>
  );
}
