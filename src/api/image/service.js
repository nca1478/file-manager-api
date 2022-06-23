// Dependencies
const path = require("path");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

// Helpers
import { verifyFiles } from "../../helpers/verifyFiles";

class ImageService {
    constructor(dependenciesData) {
        this.error = new Error();

        if (!dependenciesData.image) {
            this.error.dependencyError = "Image Model is undefined";
            throw this.error.dependencyError;
        } else {
            this.image = dependenciesData.image;
        }
    }

    async uploadImage(dataUpload) {
        const { userId, img, validExtensions } = dataUpload;
        const verifyFile = verifyFiles(img, validExtensions);
        if (verifyFile) {
            try {
                const { tempFilePath } = img;
                const { secure_url } = await cloudinary.uploader.upload(
                    tempFilePath
                );
                const url = secure_url.split("/");
                const filename = url[url.length - 1];

                await this.image.create({
                    filename,
                    url: secure_url,
                    userId,
                });

                return secure_url;
            } catch (err) {
                throw err;
            }
        } else {
            return false;
        }
    }
}

export default ImageService;
