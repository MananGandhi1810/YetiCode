"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MenuIcon, Send, PlusCircle, Settings } from "lucide-react"

export default function ChatPage() {
  const [messages, setMessages] = useState([{ role: "assistant", content: "Hello! How can I assist you today?" }])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { role: "user", content: inputMessage }])
      setInputMessage("")
      // Here you would typically call an API to get the AI response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: "This is a mock response from the AI." },
        ])
      }, 1000)
    }
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border hidden md:block">
        <div className="p-4">
          <Button variant="outline" className="w-full justify-start">
            <PlusCircle className="mr-2 h-4 w-4" />
            New chat
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="p-4 space-y-2">
            {/* Chat history items would go here */}
            <Button variant="ghost" className="w-full justify-start">
              Previous chat 1
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Previous chat 2
            </Button>
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold">Chat</h1>
          <Button variant="ghost" size="icon">
            <PlusCircle className="h-6 w-6" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <Avatar>
                    <AvatarFallback>{message.role === "user" ? "U" : "AI"}</AvatarFallback>
                    <AvatarImage src={message.role === "user" ? "/user-avatar.png" : "/ai-avatar.png"} />
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input area */}
        <div className="p-4 border-t border-border">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex items-center gap-2"
          >
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

