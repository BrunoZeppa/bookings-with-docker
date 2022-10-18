const { initializeApp } = require("firebase/app");
const dotenv = require("dotenv");

const {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} = require("firebase/storage");
const { BookingImg } = require("../models/bookingImg.model");

dotenv.config({ path: "./config.env" });

// Model

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    appId: process.env.FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const uploadBookingImgs = async (imgs, bookingId) => {
    const imgsPromises = imgs.map(async (img) => {
        const [originalName, ext] = img.originalname.split(".");

        const filename = `bookings/${bookingId}/${originalName}-${Date.now()}.${ext}`;
        const imgRef = ref(storage, filename);

        const result = await uploadBytes(imgRef, img.buffer);

        await BookingImg.create({
            bookingId,
            imgUrl: result.metadata.fullPath,
        });
    });

    await Promise.all(imgsPromises);
};

const getBookingsImgsUrls = async (bookings) => {
    const bookingsWithImgsPromises = bookings.map(async (booking) => {
        const bookingImgsPromises = booking.bookingImgs.map(
            async (bookingImg) => {
                const imgRef = ref(storage, bookingImg.imgUrl);
                const imgUrl = await getDownloadURL(imgRef);

                bookingImg.imgUrl = imgUrl;
                return bookingImg;
            }
        );

        const bookingImgs = await Promise.all(bookingImgsPromises);

        booking.bookingImgs = bookingImgs;
        return booking;
    });

    return await Promise.all(bookingsWithImgsPromises);
};

module.exports = { storage, uploadBookingImgs, getBookingsImgsUrls };
