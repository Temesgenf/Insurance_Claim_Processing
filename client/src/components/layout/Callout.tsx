import React from "react";
import bgImage from "../../assets/bg-3.png";
const Callout = () => {
  return (
    <div className="fancy-short-banner-one lg:mt-[170px]  mt-[120px]">
      <div className="container">
        <div
          className={`bg-wrapper relative bg-cover z-[1] lg:p-[80px_12px] p-[50px_12px]  rounded-[40px]  bg-center bg-no-repeat wow `}
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="shapes shape-one absolute z-[-1] w-[60px] h-[60px] right-[-2%] top-[-9%] rounded-[13px] bg-[#17BD] animate-spin"></div>
          <div className="inner-wrapper 2xl:max-w-[1170px] mx-auto my-0 lg:max-w-[1010px] max-w-[900px] ">
            <div className="subscribe-area">
              <div className="flex flex-wrap mx-[-12px] items-end">
                <div className="xl:w-6/12 lg:w-6/12 w-full flex-[0_0_auto] px-[12px] max-w-full">
                  <div className="text-left">
                    <div className="sc-title font-medium lg:text-[20px] text-[#F96F60] pb-[5px]">
                      Subscirbe Now
                    </div>
                    <h4 className="main-title font-bold text-black lg:text-[48px] leading-[1.20em] text-[30px]  ">
                      New user? Start your free trial now.
                    </h4>
                  </div>
                </div>
                <div className="xl:w-6/12 lg:w-6/12 w-full flex-[0_0_auto] px-[12px] max-w-full">
                  <div className="subscribe-form max-w-[500px] ml-auto md:max-w-full md:m-[20px_0_0] sm:max-w-full sm:m-[20px_0_0] xsm:max-w-full xsm:m-[20px_0_0]">
                    <form
                      action="#"
                      className=" lg:h-[70px] relative text-left bg-white shadow-[0_10px_20px_rgba(70,40,13,0.05)] h-[65px] rounded-[15px] "
                    >
                      <input
                        className=" w-full h-full lg:p-[0_200px_0_20px] rounded-[7px] border-0  p-[0_122px_0_15px] placeholder:text-[#212121] placeholder:font-medium ] font-medium text-[16px] focus:border-0 focus:outline-0"
                        type="email"
                        placeholder="Email address"
                      />
                      <button className="tran3s absolute lg:text-[18px] font-medium text-white lg:w-40 rounded-[6px] right-2 inset-y-2 bg-[#FF8C24] hover:bg-[#212121] w-[120px] text-[16px]">
                        Subscribe
                      </button>
                    </form>
                    <p className="!m-0 pt-[10px] text-[#979797]">
                      Already a member?{" "}
                      <a href="#" className=" text-black hover:text-[#0d6efd]">
                        Sign in.
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
