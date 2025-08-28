"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  // Brand & Story
  {
    question: "What is Refilly?",
    answer: "Refilly is a premium clothing brand founded by Firoz Shah with a vision to deliver authentic prints and high-quality T-shirts."
  },
  {
    question: "Who founded Refilly?",
    answer: "Refilly was founded by Firoz Shah, later joined by Tauseef Ansari as co-founder."
  },
  {
    question: "What makes Refilly unique?",
    answer: "Our products focus on premium quality fabrics, authentic prints, and personalized designs that reflect your personality."
  },
  {
    question: "Where is Refilly based?",
    answer: "Refilly is proudly based in India, with a mission to serve customers worldwide."
  },
  {
    question: "What inspired Refilly?",
    answer: "Firoz Shah’s struggles and love for fashion inspired him to start a clothing line that balances comfort and style."
  },

  // Orders
  {
    question: "How can I place an order?",
    answer: "You can place an order directly on our website by selecting your favorite T-shirt and completing the checkout process."
  },
  {
    question: "Do I need an account to place an order?",
    answer: "No, you can place an order as a guest. However, creating an account gives you better order tracking and exclusive offers."
  },
  {
    question: "Can I modify my order after placing it?",
    answer: "Yes, contact our support team within 12 hours of placing the order to request modifications."
  },
  {
    question: "How can I track my order?",
    answer: "Once shipped, you’ll receive a tracking number via email and SMS."
  },
  {
    question: "Can I cancel my order?",
    answer: "Orders can be canceled within 12 hours of placement. After that, they are processed for shipping."
  },

  // Payments
  {
    question: "What payment methods are accepted?",
    answer: "We accept debit/credit cards, UPI, net banking, wallets, and Cash on Delivery in select regions."
  },
  {
    question: "Is Cash on Delivery available?",
    answer: "Yes, COD is available for most regions in India."
  },
  {
    question: "Are my payment details secure?",
    answer: "Yes, we use SSL encryption and trusted payment gateways to ensure complete safety of your details."
  },
  {
    question: "Do you offer EMI options?",
    answer: "Currently, EMI is not available, but we are working on offering it soon."
  },
  {
    question: "Can I use multiple discount codes?",
    answer: "No, only one discount code can be used per order."
  },

  // Shipping
  {
    question: "What are the shipping charges?",
    answer: "We offer free shipping on all prepaid orders. COD may have a small service fee."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship worldwide. International shipping charges apply."
  },
  {
    question: "How long does delivery take?",
    answer: "Orders are usually delivered within 4-7 business days in India and 10-15 days internationally."
  },
  {
    question: "Which courier partners do you use?",
    answer: "We work with leading courier partners like Bluedart, Delhivery, DTDC, and India Post."
  },
  {
    question: "Can I change my delivery address after ordering?",
    answer: "Yes, reach out to our support team within 6 hours of placing your order."
  },

  // Products & Quality
  {
    question: "What material are Refilly T-shirts made of?",
    answer: "Our T-shirts are made with premium cotton and blends that ensure comfort and durability."
  },
  {
    question: "Do your T-shirts shrink after wash?",
    answer: "No, our fabrics are pre-shrunk and undergo strict quality testing."
  },
  {
    question: "Do you offer plus sizes?",
    answer: "Yes, our size range goes from XS to 5XL."
  },
  {
    question: "Are your products unisex?",
    answer: "Yes, most of our designs are unisex unless specified."
  },
  {
    question: "Do prints fade after wash?",
    answer: "No, we use premium printing techniques to ensure long-lasting prints."
  },

  // Returns & Refunds
  {
    question: "What is your return policy?",
    answer: "We offer a 7-day return policy for unused products in original condition."
  },
  {
    question: "How do I return a product?",
    answer: "You can request a return by contacting our support team with your order ID."
  },
  {
    question: "When will I get my refund?",
    answer: "Refunds are processed within 7-10 working days after product inspection."
  },
  {
    question: "Can I exchange a product?",
    answer: "Yes, you can exchange sizes or designs within 7 days of delivery."
  },
  {
    question: "Are return shipping costs covered?",
    answer: "Return shipping is free for defective products. For exchanges, a small shipping fee may apply."
  },

  // Printing & Customization
  {
    question: "Can I get custom prints?",
    answer: "Yes, we offer personalized printing services for bulk and single orders."
  },
  {
    question: "What printing technology do you use?",
    answer: "We use DTG (Direct to Garment), screen printing, and sublimation depending on the design."
  },
  {
    question: "Is there a minimum order for custom prints?",
    answer: "No, you can order even a single customized T-shirt."
  },
  {
    question: "Do you make corporate or team T-shirts?",
    answer: "Yes, we create bulk orders for corporate teams, events, and organizations."
  },
  {
    question: "Can I upload my own design?",
    answer: "Yes, simply upload your design while ordering and we’ll print it for you."
  },

  // Customer Support
  {
    question: "How can I contact Refilly?",
    answer: "You can reach us via email at support@refilly.com or call us at +91 98765 43210."
  },
  {
    question: "What are your customer service hours?",
    answer: "Our support team is available Mon-Sat, 10 AM - 7 PM IST."
  },
  {
    question: "Do you have a physical store?",
    answer: "Currently, we are online-only but plan to open flagship stores soon."
  },
  {
    question: "Can I collaborate with Refilly?",
    answer: "Yes, we’re open to influencer and business collaborations."
  },
  {
    question: "Do you offer wholesale rates?",
    answer: "Yes, we provide bulk and wholesale pricing. Contact sales@refilly.com."
  },

  // Sustainability
  {
    question: "Is Refilly eco-friendly?",
    answer: "Yes, we focus on sustainable production and ethically sourced fabrics."
  },
  {
    question: "Do you recycle fabrics?",
    answer: "We partner with local recyclers to reduce textile waste."
  },
  {
    question: "Do you use organic cotton?",
    answer: "Yes, many of our premium lines use organic cotton."
  },
  {
    question: "Are your dyes safe?",
    answer: "We use eco-friendly dyes that are safe for skin and the environment."
  },
  {
    question: "Does Refilly support social causes?",
    answer: "Yes, a part of our profit goes towards supporting underprivileged communities."
  }
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-center text-gray-900 mb-16"
        >
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
            Questions
          </span>
        </motion.h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.02 }}
              className="bg-white shadow-md rounded-lg p-6"
            >
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-lg text-gray-800">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-gray-600 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-gray-600 text-base leading-relaxed"
                >
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Closing CTA */}
        <div className="mt-20 text-center">
          <p className="text-gray-700 text-lg">
            Still have questions?{" "}
            <a
              href="/contact"
              className="text-blue-600 font-semibold hover:underline"
            >
              Contact our support team
            </a>{" "}
            and we’ll be happy to help.
          </p>
        </div>
      </div>
    </section>
  );
}
