import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiChatService {
  private http = inject(HttpClient);

  private apiUrl = 'https://api.esat.ae/wp-content/themes/ESAT/api/ai-chat.php';

  sendMessage(message: string): Observable<any> {
    console.log('API URL:', this.apiUrl);
    console.log('Sending:', message);

    return this.http.post<any>(this.apiUrl, {
      message: message,
    });
  }
}
