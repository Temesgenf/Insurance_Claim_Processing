import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { env } from '../utils/env';

class CloudinaryService {
  private static instance: CloudinaryService;

  private constructor() {
    cloudinary.config({
      cloud_name: env.CLOUDINARY_CLOUD_NAME,
      api_key: env.CLOUDINARY_API_KEY,
      api_secret: env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  public static getInstance(): CloudinaryService {
    if (!CloudinaryService.instance) {
      CloudinaryService.instance = new CloudinaryService();
    }
    return CloudinaryService.instance;
  }

  public async uploadProfilePicture(
    fileBuffer: Buffer,
    userId: number,
    options: {
      folder?: string;
      public_id?: string;
      overwrite?: boolean;
      invalidate?: boolean;
    } = {}
  ): Promise<{ url: string; public_id: string }> {
    const defaultOptions = {
      folder: 'insurance-claim-profiles',
      public_id: `user_${userId}_${Date.now()}`,
      overwrite: true,
      invalidate: true,
      ...options,
    };

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          ...defaultOptions,
          resource_type: 'image',
          transformation: [
            { width: 500, height: 500, crop: 'fill', gravity: 'face' },
            { quality: 'auto' },
          ],
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(error);
          }
          if (!result) {
            return reject(new Error('No result from Cloudinary'));
          }
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );

      const readableStream = new Readable();
      readableStream.push(fileBuffer);
      readableStream.push(null);
      readableStream.pipe(uploadStream);
    });
  }

  public async deleteImage(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          console.error('Cloudinary delete error:', error);
          return reject(error);
        }
        if (result?.result !== 'ok') {
          console.warn('Cloudinary delete warning:', result);
        }
        resolve();
      });
    });
  }

  public async uploadClaimDocument(
    fileBuffer: Buffer,
    fileName: string,
    options: {
      folder?: string;
      public_id?: string;
      overwrite?: boolean;
      invalidate?: boolean;
      resource_type?: 'image' | 'raw' | 'video' | 'auto';
    } = {}
  ): Promise<{ url: string; public_id: string; resource_type: string }> {
    const defaultOptions = {
      folder: 'insurance-claim-documents',
      public_id: `${fileName}_${Date.now()}`,
      overwrite: false,
      invalidate: true,
      resource_type: 'auto' as const, // Automatically detect the resource type
      ...options,
    };

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          ...defaultOptions,
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(error);
          }
          if (!result) {
            return reject(new Error('No result from Cloudinary'));
          }
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            resource_type: result.resource_type,
          });
        }
      );

      const readableStream = new Readable();
      readableStream.push(fileBuffer);
      readableStream.push(null);
      readableStream.pipe(uploadStream);
    });
  }
}

export const cloudinaryService = CloudinaryService.getInstance();
