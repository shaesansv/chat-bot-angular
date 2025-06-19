import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Add this import

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class Chatbot {
  userInput: string = '';
  messages: { text: string, isUser: boolean }[] = [];
  greetingResponses: { [key: string]: string } = {
    'hello': 'Hello there! How can I help you today?',
    'hi': 'Hi! Nice to meet you!',
    'hey': 'Hey! What can I do for you?',
    // 'good morning': 'Good morning! Have a great day!',
    // 'good afternoon': 'Good afternoon! How are you doing?',
    // 'good evening': 'Good evening! Hope you had a good day!',
    // 'howdy': 'Howdy partner!',
  };

  sendMessage() {
    if (this.userInput.trim() === '') return;

    // Add user message to chat
    this.messages.push({ text: this.userInput, isUser: true });

    // Get bot response
    const response = this.getBotResponse(this.userInput.toLowerCase());
    setTimeout(() => {
      this.messages.push({ text: response, isUser: false });
    }, 500);

    // Clear input
    this.userInput = '';
  }

  private getBotResponse(input: string): string {
    // Check for exact matches
    if (this.greetingResponses[input]) {
      return this.greetingResponses[input];
    }

    // Check for partial matches
    for (const greeting in this.greetingResponses) {
      if (input.includes(greeting)) {
        return this.greetingResponses[greeting];
      }
    }

    // Default response
    return "I'm a simple chatbot. I mainly respond to greetings like 'hello', 'hi', etc.";
  }
}