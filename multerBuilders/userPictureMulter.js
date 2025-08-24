import multer from 'multer';
import path from 'path';

const filePath = path.resolve("uploads", "usersPictures");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, filePath);
    },
    filename: (req, file, cb) => {
        const [fileType, extension] = file.mimetype.split("/");
        if (fileType === "image") {
            const fileName = Date.now() + fileType + "." + extension
            cb(null, fileName);
        }
    }
});

export const userPictureUpload = multer({ storage });