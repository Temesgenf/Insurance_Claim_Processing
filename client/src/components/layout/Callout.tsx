// import React from "react";
// import bgImage from "../../assets/bg-3.png";
// const Callout = () => {
//   return (
//     <div className="fancy-short-banner-one lg:mt-[170px]  mt-[120px]">
//       <div className="container">
//         <div
//           className={`bg-wrapper relative bg-cover z-[1] lg:p-[80px_12px] p-[50px_12px]  rounded-[40px]  bg-center bg-no-repeat wow `}
//           style={{ backgroundImage: `url(${bgImage})` }}
//         >
//           <div className="shapes shape-one absolute z-[-1] w-[60px] h-[60px] right-[-2%] top-[-9%] rounded-[13px] bg-[#17BD] animate-spin"></div>
//           <div className="inner-wrapper 2xl:max-w-[1170px] mx-auto my-0 lg:max-w-[1010px] max-w-[900px] ">
//             <div className="subscribe-area">
//               <div className="flex flex-wrap mx-[-12px] items-end">
//                 <div className="xl:w-6/12 lg:w-6/12 w-full flex-[0_0_auto] px-[12px] max-w-full">
//                   <div className="text-left">
//                     <div className="sc-title font-medium lg:text-[20px] text-[#F96F60] pb-[5px]">
//                       Subscirbe Now
//                     </div>
//                     <h4 className="main-title font-bold text-black lg:text-[48px] leading-[1.20em] text-[30px]  ">
//                       New user? Start your free trial now.
//                     </h4>
//                   </div>
//                 </div>
//                 <div className="xl:w-6/12 lg:w-6/12 w-full flex-[0_0_auto] px-[12px] max-w-full">
//                   <div className="subscribe-form max-w-[500px] ml-auto md:max-w-full md:m-[20px_0_0] sm:max-w-full sm:m-[20px_0_0] xsm:max-w-full xsm:m-[20px_0_0]">
//                     <form
//                       action="#"
//                       className=" lg:h-[70px] relative text-left bg-white shadow-[0_10px_20px_rgba(70,40,13,0.05)] h-[65px] rounded-[15px] "
//                     >
//                       <input
//                         className=" w-full h-full lg:p-[0_200px_0_20px] rounded-[7px] border-0  p-[0_122px_0_15px] placeholder:text-[#212121] placeholder:font-medium ] font-medium text-[16px] focus:border-0 focus:outline-0"
//                         type="email"
//                         placeholder="Email address"
//                       />
//                       <button className="tran3s absolute lg:text-[18px] font-medium text-white lg:w-40 rounded-[6px] right-2 inset-y-2 bg-[#FF8C24] hover:bg-[#212121] w-[120px] text-[16px]">
//                         Subscribe
//                       </button>
//                     </form>
//                     <p className="!m-0 pt-[10px] text-[#979797]">
//                       Already a member?{" "}
//                       <a href="#" className=" text-black hover:text-[#0d6efd]">
//                         Sign in.
//                       </a>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Callout;
import React from "react";
import bgImage from "../../assets/bg-3.png";

const Callout = () => {
  return (
    <div className="fancy-short-banner-one lg:mt-[170px] mt-[120px] px-4 sm:px-0">
      <div className="container mx-auto">
        <div
          className={`bg-wrapper relative bg-cover z-[1] lg:p-20 p-8 rounded-3xl md:rounded-[40px] bg-center bg-no-repeat`}
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          {/* Animated Shape - Hidden on mobile */}
          <div className="hidden md:block absolute z-[-1] w-12 h-12 md:w-14 md:h-14 right-[-1%] top-[-9%] rounded-lg bg-[#17BD] animate-spin"></div>

          <div className="inner-wrapper max-w-6xl mx-auto">
            <div className="subscribe-area">
              <div className="flex flex-wrap gap-8 lg:gap-0 lg:flex-nowrap">
                {/* Text Section */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <div className="text-center lg:text-left">
                    <div className="sc-title font-medium text-lg lg:text-xl text-[#F96F60] mb-2">
                      Subscribe Now
                    </div>
                    <h4 className="main-title font-bold text-black text-3xl md:text-4xl lg:text-5xl leading-tight">
                      New user? Start your free trial now.
                    </h4>
                  </div>
                </div>

                {/* Form Section */}
                <div className="w-full lg:w-1/2 flex items-center">
                  <div className="w-full max-w-xl lg:ml-auto flex flex-col gap-12 md:gap-0">
                    <form className="relative flex flex-col sm:flex-row gap-12 bg-white shadow-lg rounded-xl p-2 h-16 sm:h-20 lg:h-[70px]">
                      <input
                        className="w-full h-full px-4 rounded-lg border-0 placeholder:text-gray-700 placeholder:font-medium font-medium text-base focus:outline-none focus:ring-0"
                        type="email"
                        placeholder="Email address"
                      />
                      <button className="tran3s shrink-0 w-full sm:w-auto px-8 h-12 sm:h-full bg-[#FF8C24] hover:bg-[#212121] text-white font-medium rounded-lg text-base lg:text-lg">
                        Subscribe
                      </button>
                    </form>

                    <p className="text-center sm:text-left mt-4 text-gray-600 text-sm">
                      Already a member?{" "}
                      <a
                        href="#"
                        className="text-black hover:text-blue-600 font-medium"
                      >
                        Sign in
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Callout;
