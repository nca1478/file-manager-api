// Dependencies
import axios from "axios";

// Helpers
import { paginate } from "../../helpers/pagination";
import {
    responseError,
    responseGET,
    responsePOST,
} from "../../helpers/response";

// Service
import ImageService from "./service";

class ImageController extends ImageService {
    constructor(dependenciesData) {
        super(dependenciesData);
        this.error = new Error();
    }

    async upload(req, res) {
        try {
            const dataUpload = {
                userId: req.user.id,
                img: req.files.img,
                validExtensions: ["jpg", "jpeg", "png"],
            };
            const result = await this.uploadImage(dataUpload);
            if (result !== false) {
                const response = responsePOST({
                    msg: "Image uploaded successfully.",
                    url: result,
                });
                return res.status(200).json(response);
            } else {
                const error = responseError({
                    msg: `Only ${dataUpload.validExtensions} file extensions are accepted.`,
                });
                return res.status(400).json(error);
            }
        } catch (err) {
            const error = responseError([err]);
            res.status(500).json(error);
        }
    }

    async findAll(req, res) {
        const page = req.query.page ? req.query.page : 1;
        const limit = req.query.limit ? req.query.limit : 4;
        const userId = req.user.id;

        try {
            const paginationData = paginate(page, limit);
            const result = await this.findImages(paginationData, userId);
            const response = responseGET(paginationData.pagination, result);
            return res.status(200).json(response);
        } catch (err) {
            const error = responseError([err]);
            res.status(500).json(error);
        }
    }

    async findById(req, res) {
        try {
            const id = req.params.id;
            const result = await this.findImageById(id);
            const response = responseGET(null, result);
            return res.status(200).json(response);
        } catch (err) {
            const error = responseError([err]);
            res.status(500).json(error);
        }
    }

    async search(req, res) {
        try {
            const search = req.query.q;
            const urlUnsplash = `https://api.unsplash.com/search/photos?page=1&per_page=5&query=${search}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;
            const responseUnsplash = await axios.get(urlUnsplash);
            const response = responseGET(null, responseUnsplash.data.results);
            return res.status(200).json(response);
        } catch (err) {
            const error = responseError([err]);
            res.status(500).json(error);
        }
    }
}

export default ImageController;
