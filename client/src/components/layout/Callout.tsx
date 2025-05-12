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
