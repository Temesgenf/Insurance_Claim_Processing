import React from "react";
import pricingPlanImage from "../../assets/pricing-plan.png";
import { MdHealthAndSafety } from "react-icons/md";
import { MdFamilyRestroom } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
const Pricing = () => {
  return (
    <section className="mt-[200px] block font-poppins leading-[30px] text-rgb([#000]/[0.87])">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap mx-3">
          {/* Left Column */}
          <div className="hidden xl:flex xl:w-5/12 justify-end">
            <div className="relative">
              <img
                src={pricingPlanImage}
                className="max-w-full h-auto"
                alt="Pricing illustration"
              />
              <div className="flex items-center justify-between gap-[30px] mt-[100px] text-left">
                <div className="leading-[30px]">
                  <h4 className="text-[32px] text-[#000] leading-[44px] font-bold">
                    Need Your Custom Pricing?
                  </h4>
                  <p className="mt-[20px] text-[#797979] font-poppins">
                    If your need any custom pricing for your business or
                    anything you can contact with us.
                  </p>
                </div>
                <a
                  href="contact.html"
                  className="bg-[#ff6a16] w-[162px] h-[162px] text-white rounded-[50%] flex items-center justify-center p-2 grow-0 shrink-0"
                >
                  Contact Us →
                </a>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full xl:w-7/12 xl:pl-12">
            <div className="mb-12 text-left">
              <h4 className=" font-inter font-normal leading-7 inline-block py-2 px-[30px] bg-[#ff6a16]-50 border border-[#ff6a16]-100 text-[#ff6a16] rounded-[27px] ">
                Our Pricing Plan
              </h4>
              <h2 className="text-[#797979] text-[66px] leading-[84px] font-tight mt-[30px]">
                Your best <span className="text-blue-700">pricing plan</span>{" "}
                for your service
              </h2>
            </div>

            <div className="flex flex-wrap -mx-4 ">
              {/* Insurance Plan 1 */}
              <div className="max-w-full w-1/2 px-3">
                <div className="p-8 rounded-lg hover:shadow-lg transition-shadow">
                  {/* <img
                    src="svg/health-insurance.svg"
                    className="w-16 h-16 mb-4"
                    alt="Health Insurance Icon"
                  /> */}
                  <MdHealthAndSafety className="w-16 h-16 text-blue-600" />
                  <h3 className="text-[2rem] leading-[44px]  mt-5 mb-[30px] font-bold font-poppins">
                    Basic Health Plan
                  </h3>
                  <ul className="">
                    {[
                      "hospitalization up to $10,000",
                      "Free annual health check-ups",
                      "24/7 Telemedicine support",
                      "Affordable monthly premiums",
                      "Accident & Emergency coverage",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center justify-start gap-2 mb-5 leading-[28px]"
                      >
                        <FaCheck className="" />
                        <span className="text-left">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="contact.html"
                    className="inline-flex font-[500] items-center gap-3 pb-[5px] relative  text-[#ffa616] mt-[50px]  "
                  >
                    Choose Plan
                    <FaArrowRight className="inline-block ml-2" />
                    <div className="absolute bottom-0 bg-[#ffa616] w-full h-[2px] transition-transform duration-300"></div>
                  </a>
                </div>
              </div>

              {/* Insurance Plan 2 (Active) */}
              <div className="max-w-full w-1/2 px-3 bg-[#f6f6f6]">
                <div className="p-8 rounded-lg hover:shadow-lg transition-shadow">
                  <MdFamilyRestroom className="w-16 h-16 text-blue-600" />
                  <h3 className="text-[2rem] leading-[44px]  mt-5 mb-[30px] font-bold font-poppins">
                    Family Protection Plan
                  </h3>
                  <ul className="">
                    {[
                      "Covers up to 4 family members",
                      "Maternity & newborn care",
                      "No co-pay on primary visits",
                      "Worldwide emergency coverage",
                      "Lifetime renewal guarantee",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center justify-start gap-2 mb-5 leading-[28px]"
                      >
                        <FaCheck className="" />
                        <span className="text-left">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="contact.html"
                    className="inline-flex font-[500] items-center gap-3 pb-[5px] relative  text-[#ffa616] mt-[50px]  "
                  >
                    Choose Plan
                    <FaArrowRight className="inline-block ml-2" />
                    <div className="absolute bottom-0 bg-[#ffa616] w-full h-[2px] transition-transform duration-300"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
