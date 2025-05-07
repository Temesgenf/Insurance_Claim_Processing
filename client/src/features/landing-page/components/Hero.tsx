import { IoChevronForwardCircleOutline } from "react-icons/io5";
import happyFamilyImage from "../../../assets/c.png";

function Hero() {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[550px] my-[1rem]">
        <div className="flex flex-col justify-center py-14 md:py-0 relative z-10">
          <div className="flex items-center bg-gray-200 space-x-2 px-2 py-1 rounded-full shadow-sm w-max">
            <span className="bg-[#547aff] text-white text-[14px] font-500 px-3 py-1 rounded-full">
              New
            </span>
            <span className="text-sm text-gray-800 font-medium">
              Experience Seamless Claims 🎉
            </span>
          </div>

          <div className="text-center md:text-left space-y-7">
            <h1 className="text-5xl lg:text-6xl font-bold text-[#000]  xl:leading-[1.1]">
              Transforming <span className="text-[#547aff]">Insurance</span>{" "}
              Claims Management
            </h1>
            <p className="text-2xl tracking-wide font-400 ">
              experience seamless claims processing with claimspro.ai
            </p>
          </div>
          <div className="flex justify-center gap-4 md:justify-start mt-20">
            <button className="bg-[#547aff] font-semibold text-[#fff] leading-6 flex justify-center items-center py-4 gap-2 md:gap-3 px-[50px] rounded-[20px]">
              <span>Get Started </span>
              <IoChevronForwardCircleOutline className="text-2xl" />
            </button>
            <button className="bg-[#f9f9f9] font-semibold text-[#000] leading-6 flex justify-center items-center py-4 gap-2 md:gap-3 px-[50px] rounded-[20px]">
              <span>Learn More </span>
              <IoChevronForwardCircleOutline className="text-2xl text-[#ff6600]" />
            </button>
          </div>
          <div className="flex jusitify-center items-center gap-4 my-4">
            <div className="flex -space-x-2">
              <img
                className="inline-block size-11 rounded-full ring-2 ring-white dark:ring-neutral-900"
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                alt="avatar"
              />
              <img
                className="inline-block size-11 rounded-full ring-2 ring-white dark:ring-neutral-900"
                src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                alt="avatar"
              />
              <img
                className="inline-block size-11 rounded-full ring-2 ring-white dark:ring-neutral-900"
                src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
                alt="avatar"
              />
              <img
                className="inline-block size-11 rounded-full ring-2 ring-white dark:ring-neutral-900"
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                alt="avatar"
              />
              <div className="hs-dropdown [--placement:top-left] relative inline-flex">
                <button
                  id="hs-avatar-group-dropdown"
                  className="hs-dropdown-toggle inline-flex items-center justify-center size-11 rounded-full bg-[#f1c817] border-2 border-white font-medium text-gray-700 shadow-2xs align-middle hover:bg-gray-200 focus:outline-hidden focus:bg-gray-300 text-sm dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:border-neutral-800"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Dropdown"
                >
                  <span className=" font-bold ">18+</span>
                </button>

                <div
                  className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-48 hidden z-10 transition-[margin,opacity] opacity-0 duration-300 mb-2 bg-white shadow-md rounded-lg p-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="hs-avatar-group-dropdown"
                >
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                    href="#"
                  >
                    Chris Lynch
                  </a>
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                    href="#"
                  >
                    Maria Guan
                  </a>
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                    href="#"
                  >
                    Amil Evara
                  </a>
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                    href="#"
                  >
                    Ebele Egbuna
                  </a>
                </div>
              </div>
            </div>
            <div>
              <span className="text-xl text-[#000] text-[14px] font-bold leading-6">
                Agent activity Update
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center relative">
          <img src={happyFamilyImage} alt="" className="scale-[1.6]" />
          <div className="rounded-full w-[600px] h-[600px]  bg-[#547aff] opacity-[0.5] absolute -bottom-10 -z-10 flex justify-center items-center">
            <div className="rounded-full w-[500px] h-[500px] bg-white flex justify-center items-center">
              <div className="rounded-full w-[350px] h-[350px] bg-[#547aff]  flex justify-center items-center">
                <div className="rounded-full w-[250px] h-[250px] bg-[#fff]"></div>
              </div>
            </div>
          </div>
          <div className="flex jusitify-between items-center h-16 rounded-full bg-gray-200">
            <img
              className="inline-block size-11 rounded-full ring-2 ring-white dark:ring-neutral-900"
              src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
              alt="avatar"
            />

            <p>
              <span>Doney</span> has got an easy claim
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
