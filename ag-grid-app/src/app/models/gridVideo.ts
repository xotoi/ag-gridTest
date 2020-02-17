export default class GridVideo {
    constructor(thumbnails: string, publishedAt: string, videoId: string, description: string) {
        this.thumbnails = thumbnails;
        this.publishedAt = publishedAt;
        this.videoId = videoId;
        this.description = description;
    }
    thumbnails: string;
    publishedAt: string;
    videoId: string;
    description: string;
}
