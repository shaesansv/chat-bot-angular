import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotLogin } from './chatbot-login';

describe('ChatbotLogin', () => {
  let component: ChatbotLogin;
  let fixture: ComponentFixture<ChatbotLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatbotLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatbotLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
