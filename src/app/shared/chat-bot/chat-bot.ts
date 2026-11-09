import { Component, ElementRef, ViewChild, inject, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  time: Date;
}

interface ChatResponse {
  success: boolean;
  answer?: string;
  error?: string;
  status?: number;
}

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-bot.html',
  styleUrl: './chat-bot.css',
})
export class ChatBot {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('chatMessages')
  chatMessages!: ElementRef<HTMLDivElement>;

  private apiUrl = 'https://api.esat.ae/wp-content/themes/ESAT/api/ai-chat.php';

  userMessage = '';
  isLoading = false;
  isOpen = false;

  messages: ChatMessage[] = [
    {
      role: 'assistant',
      content: 'Hello! Welcome to ESAT. How can I help you today?',
      time: new Date(),
    },
  ];

  suggestions: string[] = [
    'What is ESAT ERP?',
    'What are the main ERP modules?',
    'Tell me about ESAT solutions',
    'How can I request a demo?',
  ];

  toggleChat(): void {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.scrollToBottom();
    }
  }

  sendSuggestion(suggestion: string): void {
    this.userMessage = suggestion;
    this.sendMessage();
  }

  sendMessage(): void {
    const message = this.userMessage.trim();

    if (!message || this.isLoading) {
      return;
    }

    // Add the user's message immediately.
    this.messages.push({
      role: 'user',
      content: message,
      time: new Date(),
    });

    this.userMessage = '';
    this.isLoading = true;

    this.cdr.detectChanges();
    this.scrollToBottom();

    this.http
      .post<ChatResponse>(this.apiUrl, {
        message: message,
      })
      .subscribe({
        next: (response) => {
          console.log('Gemini API response:', response);

          const answer = response?.answer?.trim();

          this.messages.push({
            role: 'assistant',
            content:
              response?.success && answer
                ? answer
                : response?.error || 'Sorry, I could not generate a response. Please try again.',
            time: new Date(),
          });

          this.isLoading = false;

          // Update the chat immediately.
          this.cdr.detectChanges();
          this.scrollToBottom();
        },

        error: (error) => {
          console.error('Chat API error:', error);

          this.messages.push({
            role: 'assistant',
            content: 'Sorry, something went wrong. Please try again in a moment.',
            time: new Date(),
          });

          this.isLoading = false;

          this.cdr.detectChanges();
          this.scrollToBottom();
        },
      });
  }

  clearChat(): void {
    this.messages = [
      {
        role: 'assistant',
        content: 'Hello! Welcome to ESAT. How can I help you today?',
        time: new Date(),
      },
    ];

    this.isLoading = false;
    this.cdr.detectChanges();
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    requestAnimationFrame(() => {
      const element = this.chatMessages?.nativeElement;

      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    });
  }
}
