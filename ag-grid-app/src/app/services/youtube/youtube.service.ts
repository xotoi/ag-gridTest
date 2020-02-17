import { Injectable } from '@angular/core';
import { map, catchError, retry } from 'rxjs/operators';
import youtube from '../../stubs/youtube.json';
import GridVideo from 'src/app/models/gridVideo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class YoutubeService {
  constructor(private http: HttpClient) {

  }

  private apiRoot = 'https://www.googleapis.com/youtube/v3/search';

  getVideos(): any {
    const apiURL = `${this.apiRoot}?key=AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk&maxResults=50&type=video&part=snippet&q=john`;

    const videosList = this.http.get(apiURL).pipe(
      map((response: any) => this.mapResponse(response)),
      catchError(err => this.mapResponse(youtube, true))
    );
    return videosList;
  }

  mapResponse(res: any, apiCallFailed = false): GridVideo[] {
    const body = apiCallFailed ? res : res.json();

    const videos = body.items.map((item: any) => {return new GridVideo(
      item.snippet.thumbnails.default.url,
      item.snippet.publishedAt,
      item.id.videoId,
      item.snippet.description
    );
   });
    return videos;
  }
}
