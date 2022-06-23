// Dependencies
const path = require("path");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

// Helpers
import { verifyFiles } from "../../helpers/verifyFiles";

// Queries
import { queryImagesList } from "./queries";

class ImageService {
    constructor(dependenciesData) {
        this.error = new Error();

        if (!dependenciesData.image) {
            this.error.dependencyError = "Image Model is undefined";
            throw this.error.dependencyError;
        } else {
            this.image = dependenciesData.image;
        }

        if (!dependenciesData.user) {
            this.error.dependencyError = "User Model is undefined";
            throw this.error.dependencyError;
        } else {
            this.user = dependenciesData.user;
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

    async findImages(paginationData, userId) {
        const { limit, skip } = paginationData;
        const query = queryImagesList(this.user, userId, limit, skip);
        return await this.image.findAndCountAll(query);
    }

    async findImageById(id) {
        return this.image.findOne({
            where: { id },
        });
    }
}

export default ImageService;
