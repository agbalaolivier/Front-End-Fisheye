import ImageModel from "../Model/ImageModel.js";
import VideoModel from "../Model/VideoModel.js";

export default class MediaFactory {
    constructor(data, photographerModel) {
        this.data = data;
        this.photographerModel=photographerModel;
    }

    getMedia() {
        if (this.data.image) {
            return new ImageModel(this.data,this.photographerModel);
        } else if (this.data.video) {
            return new VideoModel(this.data,this.photographerModel);
        }
    }
}


