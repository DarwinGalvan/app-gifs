import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GitsService {
  public gifsList: Gif[] = [];
  private _tagHistory: string[] = [];
  private apiKey = 'yUDgSEit1VhNPq1mbHcnA27GQu390Dl8';
  private urlGiphy = 'https://api.giphy.com/v1/gifs';

  constructor(private http:HttpClient) { 
    this.loadLocalStorage();
  }

  get tagHistory(): string[] {
    return [...this._tagHistory];
  }

  private organizationTagHistory(tag:string): void {
    tag = tag.toLowerCase();
    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter(t => t !== tag);      
    }
    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('tagHistory', JSON.stringify(this._tagHistory));
  }

  private loadLocalStorage(): void {
    const tags = localStorage.getItem('tagHistory');
    if (tags) {
      this._tagHistory = JSON.parse(tags);
    }
    if (this._tagHistory.length === 0)return;
    this.searchTag(this._tagHistory[0]);
  }

  searchTag(tag: string): void {
    if (tag === '') {
      return;      
    }
    this.organizationTagHistory(tag);
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('q', tag)
    .set('limit', '10');
    this.http.get<SearchResponse>(`${this.urlGiphy}/search?`, {params})
      .subscribe((response) => {
        this.gifsList = response.data;
        console.log({gifs: this.gifsList});
      });
  }
}
