"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicy() {
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
          Privacy <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">Policy</span>
        </motion.h1>

        {/* Intro */}
        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
          At <strong>Refilley</strong>, your privacy is our top priority. This
          Privacy Policy explains how we collect, use, and safeguard your
          information when you interact with our website, products, and
          services. By using our platform, you agree to the practices described
          below.
        </p>

        {/* Section 1 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Information We Collect</h2>
        <p className="text-gray-600 mb-4">
          We may collect personal information such as your name, email address,
          phone number, billing/shipping address, and payment details when you
          make a purchase. Additionally, we collect non-personal information
          such as browser type, IP address, and device details to improve your
          shopping experience.
        </p>

        {/* Section 2 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="text-gray-600 mb-4">
          Your information is used to process orders, manage deliveries, provide
          customer support, personalize your experience, and keep you updated
          with promotional offers. We may also use data to improve our website’s
          performance and ensure secure transactions.
        </p>

        {/* Section 3 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Sharing of Information</h2>
        <p className="text-gray-600 mb-4">
          Refilley does not sell or rent your personal data to third parties.
          We only share necessary information with trusted service providers
          such as delivery partners, payment gateways, and IT support teams to
          fulfill your orders. All partners are required to handle your data
          responsibly and securely.
        </p>

        {/* Section 4 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Cookies & Tracking</h2>
        <p className="text-gray-600 mb-4">
          We use cookies, pixels, and similar technologies to enhance your
          browsing experience. Cookies help us remember your preferences,
          analyze traffic, and serve relevant ads. You may disable cookies in
          your browser settings, but some site features may not function
          properly without them.
        </p>

        {/* Section 5 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Data Security</h2>
        <p className="text-gray-600 mb-4">
          Protecting your personal data is critical to us. We implement
          encryption, firewalls, and secure servers to safeguard your
          information. While we strive to protect your data, no method of
          transmission over the internet is 100% secure, and we cannot guarantee
          absolute security.
        </p>

        {/* Section 6 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Your Rights</h2>
        <p className="text-gray-600 mb-4">
          You have the right to access, update, or delete your personal
          information stored with us. You may also opt out of promotional
          emails at any time by clicking the “unsubscribe” link. For requests
          regarding your data, please contact us directly.
        </p>

        {/* Section 7 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">7. Third-Party Services</h2>
        <p className="text-gray-600 mb-4">
          Our website may contain links to third-party websites. Please note
          that we are not responsible for the privacy practices of such
          third-party platforms. We encourage you to review their policies
          before sharing personal information.
        </p>

        {/* Section 8 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">8. Children’s Privacy</h2>
        <p className="text-gray-600 mb-4">
          Refilley does not knowingly collect personal data from children under
          the age of 13. If we discover that we have inadvertently obtained such
          information, we will delete it immediately.
        </p>

        {/* Section 9 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">9. Policy Updates</h2>
        <p className="text-gray-600 mb-4">
          We may revise this Privacy Policy from time to time to reflect changes
          in our practices or legal requirements. Updated versions will be
          posted on our website with the date of revision. We encourage you to
          check this page periodically.
        </p>

        {/* Section 10 */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">10. Contact Us</h2>
        <p className="text-gray-600 mb-4">
          If you have any questions, concerns, or complaints regarding our
          Privacy Policy, please contact us at{" "}
          <a href="mailto:privacy@refilley.com" className="text-green-600 underline">
            privacy@refilley.com
          </a>{" "}
          or call our support line at +91-9876543210.
        </p>

        {/* Closing */}
        <p className="mt-10 text-sm text-gray-500 text-center italic">
          This Privacy Policy was last updated in August 2025 and applies to all
          users of Refilley’s services.
        </p>
      </div>
    </section>
  );
}
