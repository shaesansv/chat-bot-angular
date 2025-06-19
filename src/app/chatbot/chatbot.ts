import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class Chatbot implements AfterViewChecked {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  
  userInput: string = '';
  messages: { text: string, isUser: boolean }[] = [];
  greetingResponses: { [key: string]: string } = {
    'hello': 'Hello there! How can I help you today?😁',
    'hi': 'Hi! Nice to meet you!😊',
    'hey': 'Hey! What can I do for you?',
    'good morning': 'Good morning! Have a great day!😇',
    'good afternoon': 'Good afternoon! How are you doing?',
    'good evening': 'Good evening! Hope you had a good day!😌',
    'gud mrng': 'Good morning! Have a great day!',
    'gud aftnoon': 'Good afternoon! How are you doing?',
    'gud evng': 'Good evening! Hope you had a good day!😌',
    'howdy': 'Howdy partner!',
    'chatbot': 'Yeah, How can I help you?',
    'bot': 'Yeah, How can I help you?',
  };

  ngAfterViewChecked() {
    this.scrollToBottom();
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
    if (this.greetingResponses[input]) {
      return this.greetingResponses[input];
    }

    for (const greeting in this.greetingResponses) {
      if (input.includes(greeting)) {
        return this.greetingResponses[greeting];
      }
    }

    return "Ohh sorry 😣 I can't understand..";
  }
}