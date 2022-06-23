// Helpers
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
}

export default ImageController;
