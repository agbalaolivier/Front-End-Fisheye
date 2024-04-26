import ImageModel from "../Model/ImageModel.js";
import VideoModel from "../Model/VideoModel.js";

export default class MediaFactory {
    constructor(data) {
        this.data = data;
    }

    getMedia() {
        if (this.data.image) {
            return new ImageModel(this.data);
        } else if (this.data.video) {
            return new VideoModel(this.data);
        }
    }
}


