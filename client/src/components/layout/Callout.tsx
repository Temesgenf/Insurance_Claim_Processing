import bgImage from "../../assets/bg-3.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const Callout = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/users/subscribe-newsletter`,
        { email }
      );

      setIsSuccess(true);
      setMessage(response.data.message);
      setEmail(""); // Clear the form
    } catch (error: any) {
      setIsSuccess(false);
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else if (error.message) {
        setMessage(`Network error: ${error.message}`);
      } else {
        setMessage("Failed to subscribe. Please check your connection and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="fancy-short-banner-one lg:mt-[170px] mt-[120px] px-4 sm:px-0 " id="contact">
      <div className="container mx-auto">
        <div
          className={`bg-wrapper relative bg-cover z-[1] lg:p-20 p-8 rounded-3xl md:rounded-[40px] bg-center bg-no-repeat`}
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          
          <div className="hidden md:block absolute z-[-1] w-12 h-12 md:w-14 md:h-14 right-[-1%] top-[-9%] rounded-lg bg-[#17BD] animate-spin"></div>

          <div className="inner-wrapper max-w-6xl mx-auto">
            <div className="subscribe-area">
              <div className="flex flex-wrap gap-8 lg:gap-0 lg:flex-nowrap">
             
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <div className="text-center lg:text-left">
                    <div className="sc-title font-medium text-lg lg:text-xl text-blue-600 mb-2">
                      Subscribe Now
                    </div>
                    <h4 className="main-title font-bold text-black text-3xl md:text-4xl lg:text-5xl leading-tight">
                      New user? Start your free trial now.
                    </h4>
                  </div>
                </div>

              
                <div className="w-full lg:w-1/2 flex items-center">
                  <div className="w-full max-w-xl lg:ml-auto flex flex-col gap-12 md:gap-0">
                    <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-12 bg-white shadow-lg rounded-xl p-2 h-16 sm:h-20 lg:h-[70px]">
                      <input
                        className="w-full h-full px-4 rounded-lg border-0 placeholder:text-gray-700 placeholder:font-medium font-medium text-base focus:outline-none focus:ring-0"
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                      />
                      <button 
                        type="submit"
                        className="transition-all duration-300 shrink-0 w-full sm:w-auto px-8 h-12 sm:h-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg text-base lg:text-lg shadow-lg hover:shadow-xl"
                      >
                        {isLoading ? "Subscribing..." : "Subscribe"}
                      </button>
                    </form>

                    {/* Success/Error Message */}
                    {message && (
                      <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${
                        isSuccess 
                          ? "bg-green-100 text-green-800 border border-green-200" 
                          : "bg-red-100 text-red-800 border border-red-200"
                      }`}>
                        {message}
                      </div>
                    )}

                    <p className="text-center sm:text-left mt-4 text-gray-600 text-sm">
                      Already a member?{" "}
                      <Link
                        to="/login"
                        className="text-black hover:text-blue-600 font-medium"
                      >
                        Sign in
                      </Link>
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
