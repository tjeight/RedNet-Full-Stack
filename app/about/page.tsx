// app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 mb-4">
            About RedNet
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Revolutionizing blood donation through decentralized technology
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-12 mb-20"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">
              Our <span className="text-red-400">Mission</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              RedNet was founded in 2025 to address critical gaps in blood bank
              management. Every day, thousands of lives are lost due to
              inefficient blood distribution systems. We leverage blockchain and
              real-time tracking to ensure no donor or recipient is left behind.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/30 flex-1 min-w-[200px]">
                <h3 className="text-red-400 font-semibold mb-2">120+</h3>
                <p className="text-gray-300 text-sm">Partner Hospitals</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/30 flex-1 min-w-[200px]">
                <h3 className="text-red-400 font-semibold mb-2">15K+</h3>
                <p className="text-gray-300 text-sm">Lives Saved</p>
              </div>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/30"
          >
            <img
              src="/team.jpg"
              alt="RedNet Team"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Timeline */}
        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Our <span className="text-red-400">Journey</span>
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 h-full w-0.5 bg-gray-700 transform -translate-x-1/2"></div>

            {/* Timeline items */}
            {[
              {
                year: "2025",
                title: "Founded",
                description: "Launched MVP as a new idea",
              },
              {
                year: "2025",
                title: "National Expansion",
                description: "Covered 12 states with 200+ integrated hospitals",
              },
              {
                year: "2025",
                title: "AI Matching",
                description: "Implemented predictive blood demand algorithms",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`relative mb-8 w-full ${
                  index % 2 === 0
                    ? "pr-8 pl-0 md:pr-0 md:pl-8"
                    : "pl-8 pr-0 md:pl-0 md:pr-8"
                }`}
              >
                <div
                  className={`relative ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  {/* Dot - always centered on the line */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full"></div>

                  {/* Card - positioned left or right */}
                  <div
                    className={`p-6 bg-gray-800/50 rounded-xl border border-gray-700/30 ${
                      index % 2 === 0
                        ? "ml-0 md:mr-auto md:ml-0"
                        : "mr-0 md:ml-auto md:mr-0"
                    }`}
                    style={{ maxWidth: "400px" }}
                  >
                    <h3 className="text-xl font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 mb-2">{item.description}</p>
                    <span className="text-sm text-red-400">{item.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Meet the <span className="text-red-400">Team</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Tejas Jagdale",
                role: "Medical Director",
                img: "/team1.jpg",
              },
              { name: "Tejas Jagdale", role: "CTO", img: "/team2.jpg" },
              {
                name: "Tejas Jagdale",
                role: "Head of Ops",
                img: "/team3.jpg",
              },
              {
                name: "Tejas Jagdale",
                role: "Blockchain Lead",
                img: "/team4.jpg",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <div className="mb-4 rounded-full overflow-hidden border-2 border-red-500/30 w-32 h-32 mx-auto">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {member.name}
                </h3>
                <p className="text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <Link href="/contact" passHref>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-red-500/30 transition-all"
            >
              Get in Touch →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
