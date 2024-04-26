package com.example.websocket.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/send")
    @SendTo("/chat")
    public String sendMessage(String message) {
        return "Received message: " + message;
    }
}


