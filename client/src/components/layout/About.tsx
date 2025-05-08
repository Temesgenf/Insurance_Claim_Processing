import React from "react";
import { IoShieldCheckmark } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";
import { FaBriefcaseMedical } from "react-icons/fa";

const About = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="font-heading mb-6 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-2 rounded-full md:w-72 md:mx-auto text-sm font-semibold tracking-widest uppercase transform hover:scale-105 transition-transform duration-300">
              Why Choose Us?
            </h2>
            <p className="font-heading mt-4 text-4xl leading-tight font-bold text-gray-900 sm:text-5xl bg-clip-text bg-gradient-to-r from-blue-800 to-teal-600">
              Your Health, Our Priority
            </p>
            <p className="mt-6 max-w-3xl text-xl text-gray-600 lg:mx-auto">
              Experience healthcare coverage that truly cares. We combine
              compassionate service with cutting-edge solutions to protect your
              well-being.
            </p>
          </div>

          <div className="mt-16">
            <dl className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
              <div className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <div className="absolute -top-6 left-6 w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 text-white transform group-hover:-translate-y-2 transition-transform duration-300">
                  <IoShieldCheckmark className="w-8 h-8 text-white" />
                </div>
                <h3 className="mt-8 text-2xl font-bold text-gray-800">
                  360° Coverage
                </h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Full-spectrum protection including preventive care,
                  emergencies, chronic conditions, and alternative therapies.
                </p>
              </div>

              <div className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <div className="absolute -top-6 left-6 w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 text-white transform group-hover:-translate-y-2 transition-transform duration-300">
                  <FaClock className="w-8 h-8 text-white" />
                </div>
                <h3 className="mt-8 text-2xl font-bold text-gray-800">
                  Instant Support
                </h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  24/7 virtual consultations with doctors, instant claim
                  approvals, and emergency response within minutes.
                </p>
              </div>

              <div className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <div className="absolute -top-6 left-6 w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 text-white transform group-hover:-translate-y-2 transition-transform duration-300">
                  <IoDocuments className="w-8 h-8 text-white" />
                </div>
                <h3 className="mt-8 text-2xl font-bold text-gray-800">
                  Smart Claims
                </h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  AI-powered claims processing with 98% approval rate in under 4
                  hours. Track real-time via our wellness app.
                </p>
              </div>

              <div className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <div className="absolute -top-6 left-6 w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 text-white transform group-hover:-translate-y-2 transition-transform duration-300">
                  <FaBriefcaseMedical className="w-8 h-8 text-white" />
                </div>
                <h3 className="mt-8 text-2xl font-bold text-gray-800">
                  Elite Network
                </h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Access to 50,000+ premium healthcare providers across 150+
                  specialties worldwide.
                </p>
              </div>
            </dl>
          </div>

          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100 rounded-full opacity-20 mix-blend-multiply"></div>
            <div className="absolute -bottom-40 -left-20 w-72 h-72 bg-teal-100 rounded-full opacity-20 mix-blend-multiply"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
