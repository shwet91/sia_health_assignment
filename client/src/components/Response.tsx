// import React from "react";

// function Response() {
//   return <div className="md:w-[80%] md:h-[600px] rounded-xl bg-white border-2 border-black"></div>;
// }

// export default Response;

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  CheckCircle,
  MessageCircle,
  Phone,
  Calendar,
  Shield,
  Users,
  Award,
} from "lucide-react";

const ReportPage = ({
  showMessage,
  displayMessage,
}: {
  showMessage: boolean;
  displayMessage: string;
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatVariants: Variants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen" style={{ background: "#EAF6FB" }}>
      <motion.div
        className="container mx-auto px-4 py-8 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
            style={{ background: "#4CB7A5" }}
            variants={floatVariants}
            animate="animate"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#1D3557" }}
          >
            Assessment Complete!
          </h1>
          <button
            onClick={() => {
              console.log("message :", displayMessage);
              console.log("boolean :", showMessage);
            }}
          >
            Click me
          </button>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Thank you for trusting us with your health information. Your
            responses have been securely collected and are now being reviewed by
            our medical experts.
          </p>
        </motion.div>

        {/* Success Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-lg border-l-4"
            style={{ borderLeftColor: "#4CB7A5" }}
            variants={itemVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Shield className="w-8 h-8" style={{ color: "#4CB7A5" }} />
              </div>
              <div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "#1D3557" }}
                >
                  Data Securely Stored
                </h3>
                <p className="text-gray-600">
                  Your personal information and responses have been encrypted
                  and safely stored in our secure database following healthcare
                  privacy standards.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl p-6 shadow-lg border-l-4"
            style={{ borderLeftColor: "#4CB7A5" }}
            variants={itemVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <MessageCircle
                  className="w-8 h-8"
                  style={{ color: "#4CB7A5" }}
                />
              </div>
              <div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "#1D3557" }}
                >
                  WhatsApp Report Sent
                </h3>
                <p className="text-gray-600">
                  A brief summary of your responses has been sent to your
                  WhatsApp number. Check your messages for instant access to
                  your preliminary report.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Expert Review Section */}
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg mb-10"
          variants={itemVariants}
        >
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{ background: "#4DB6AC" }}
              variants={floatVariants}
              animate="animate"
            >
              <Users className="w-8 h-8 text-white" />
            </motion.div>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "#1D3557" }}
            >
              What Happens Next?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our team of certified healthcare professionals is now reviewing
              your assessment. You'll receive a comprehensive, personalized
              report within 24-48 hours.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Award className="w-6 h-6" />,
                title: "Expert Analysis",
                description: "Certified professionals review your responses",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Personalized Report",
                description:
                  "Tailored recommendations based on your health profile",
              },
              {
                icon: <Phone className="w-6 h-6" />,
                title: "Follow-up Support",
                description: "Optional consultation to discuss your results",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center p-4"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                  style={{ background: "#EAF6FB", color: "#4CB7A5" }}
                >
                  {step.icon}
                </div>
                <h3 className="font-semibold mb-2" style={{ color: "#1D3557" }}>
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div className="text-center" variants={itemVariants}>
          <motion.div
            className="rounded-3xl p-8 shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #4CB7A5 0%, #4DB6AC 100%)",
            }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Want to Discuss Your Results?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Book a free 15-minute consultation with our healthcare experts to
              discuss your assessment results and next steps.
            </p>

            <motion.button
              className="bg-white text-lg font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
              style={{ color: "#1D3557" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-5 h-5" />
              <span>Book Free Consultation</span>
            </motion.button>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-white/80">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>No commitment required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Expert guidance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Personalized recommendations</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-12 pt-8 border-t border-gray-200"
          variants={itemVariants}
        >
          <p className="text-gray-500">
            Questions? Contact our support team at{" "}
            <span className="font-semibold" style={{ color: "#4CB7A5" }}>
              support@healthcare.com
            </span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ReportPage;
