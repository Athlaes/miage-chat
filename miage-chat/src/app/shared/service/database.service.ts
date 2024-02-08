import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private options = {
  }

  private baseUrl = "localhost:8080"

  constructor(private httpClient: HttpClient) { }

  public getBaseUrl() : string {
    return this.baseUrl;
  }

  public register(body: any): Observable<any> {
    return this.httpClient.post(`http://${this.baseUrl}/api/users`, body, this.options);
  }
  public getSalons(): Observable<any> {
    return this.httpClient.get(`http://${this.baseUrl}/api/channels`, this.options);
  }
  public getParticipants(id: string): Observable<any> {
    return this.httpClient.get(`http://${this.baseUrl}/api/users/${id}`, this.options);
  }
  public getMessages(id: string):Observable<any> {
    return this.httpClient.get(`http://${this.baseUrl}/api/messages/${id}`);
  }
  public sendMessage(body:any) : Observable<any> {
    return this.httpClient.post(`http://${this.baseUrl}/api/messages`,body,this.options);
  }
  public createChannel(body:any): Observable<any> {
    return this.httpClient.post(`http://${this.baseUrl}/api/channels`,body,this.options);
  }
  public login(body:any) : Observable<any> {
    return this.httpClient.post(`http://${this.baseUrl}/api/auth`,body,this.options);
  }
  public updateUser(body:any) : Observable<any> {
    return this.httpClient.patch(`http://${this.baseUrl}/api/users`,body,this.options);
  }
}
