// Dependencies
const path = require("path");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

// Helpers
import { getFilenameFromURL } from "../../helpers/utils";
import { verifyFiles } from "../../helpers/verifyFiles";

// Queries
import { queryGetImageById, queryImagesList } from "./queries";

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
                const filenameCloudinary = getFilenameFromURL(secure_url);

                await this.image.create({
                    filename: filenameCloudinary,
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

    async uploadRemoteImage(dataUpload) {
        const { userId, url, validExtensions } = dataUpload;
        const filename = getFilenameFromURL(url);
        const verifyFile = verifyFiles({ name: filename }, validExtensions);
        if (verifyFile) {
            try {
                const { secure_url } = await cloudinary.uploader.upload(url);
                const filenameCloudinary = getFilenameFromURL(secure_url);

                await this.image.create({
                    filename: filenameCloudinary,
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
        const query = queryGetImageById(this.user, id);
        return this.image.findOne(query);
    }
}

export default ImageService;
