import { v2 as cloudinary } from 'cloudinary';
import { env } from '../utils/env';

// Initialize Cloudinary with environment variables
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true, // Use HTTPS
});

// Export the configured Cloudinary instance
export { cloudinary };
export default cloudinary;
