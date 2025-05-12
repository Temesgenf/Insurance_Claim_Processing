import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-200 py-16 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-bold mb-4 text-white">Company</h4>
          <ul className="space-y-2 opacity-80">
            {["About Us", "Careers", "Blog", "Contact"].map((link) => (
              <motion.li key={link} whileHover={{ x: 4 }}>
                <a
                  href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                  className="hover:text-white"
                >
                  {link}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-white">Resources</h4>
          <ul className="space-y-2 opacity-80">
            {["Help Center", "Privacy Policy", "Terms of Service"].map(
              (link) => (
                <motion.li key={link} whileHover={{ x: 4 }}>
                  <a
                    href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                    className="hover:text-white"
                  >
                    {link}
                  </a>
                </motion.li>
              )
            )}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-white">Connect</h4>
          <div className="flex space-x-6">
            {[
              { icon: <FaFacebookF />, href: "#" },
              { icon: <FaTwitter />, href: "#" },
              { icon: <FaLinkedinIn />, href: "#" },
              { icon: <FaEnvelope />, href: "#" },
            ].map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                className="text-gray-400 hover:text-white"
                whileHover={{ scale: 1.2 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 text-center opacity-60 text-sm">
        © {new Date().getFullYear()} HealthGuard Insurance. All rights reserved.
      </div>
    </footer>
  );
}
