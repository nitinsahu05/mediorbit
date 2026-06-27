import { v2 as cloudinary } from 'cloudinary';

const isCloudinaryEnabled = () => {
    const value = (process.env.CLOUDINARY_ENABLED || 'true').toLowerCase().trim();
    return !['false', '0', 'no', 'off'].includes(value);
};

const connectCloudinary = async () => {

    if (!isCloudinaryEnabled()) {
        console.log('Cloudinary is disabled by CLOUDINARY_ENABLED flag');
        return;
    }

    if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_SECRET_KEY) {
        console.log('Cloudinary credentials missing. File upload features are disabled.');
        return;
    }

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });

}

export default connectCloudinary;
export { isCloudinaryEnabled };