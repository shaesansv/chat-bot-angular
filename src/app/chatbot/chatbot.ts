import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import responses from '../../assets/greeting-responses.json';

type ResponseCategory = {
  [key: string]: string;
};

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class Chatbot implements AfterViewChecked {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  
  showChatbot: boolean = false;
  userInput: string = '';
  // Add this property
  isCollapsed: boolean = false;
  messages: { text: string, isUser: boolean }[] = [];
  responseData: {
    greetings: ResponseCategory;
    farewells: ResponseCategory;
    faqs: ResponseCategory;
    commands: ResponseCategory;
    mood_responses: ResponseCategory;
  } = responses;

  // Properly implement AfterViewChecked
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

 toggleChatbot() {
  this.showChatbot = !this.showChatbot;
  if (this.showChatbot) {
    this.isCollapsed = false;
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

  // Add this method
  toggleChat() {
    this.isCollapsed = !this.isCollapsed;
  }

  sendMessage() {
    if (this.userInput.trim() === '') return;

    this.messages.push({ text: this.userInput, isUser: true });
    const response = this.getBotResponse(this.userInput.toLowerCase());
    
    setTimeout(() => {
      this.messages.push({ text: response, isUser: false });
    }, 500);

    this.userInput = '';
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = 
        this.messageContainer.nativeElement.scrollHeight;
    } catch(err) { 
      console.error(err); 
    }
  }

  private getBotResponse(input: string): string {
    const categories: (keyof typeof this.responseData)[] = [
      'greetings',
      'farewells',
      'faqs',
      'commands',
      'mood_responses'
    ];

    // Check exact matches first
    for (const category of categories) {
      if (this.responseData[category][input]) {
        return this.responseData[category][input];
      }
    }

    // Check partial matches
    for (const category of categories) {
      for (const key in this.responseData[category]) {
        if (input.includes(key)) {
          return this.responseData[category][key];
        }
      }
    }

    return "Ohh sorry 😣 I can't understand..";
  }
}