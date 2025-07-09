
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your hair care assistant. How can I help you today?",
      isBot: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: Date.now(),
        text: inputValue,
        isBot: false,
      };

      setMessages(prev => [...prev, newMessage]);
      setInputValue("");

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: "Thanks for your question! For personalized hair care advice, I recommend uploading a photo for analysis. Our AI can provide detailed insights about your hair health and suggest appropriate treatments.",
          isBot: true,
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-40 w-80 h-96"
          >
            <Card className="h-full bg-white/95 backdrop-blur-sm shadow-2xl border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Bot className="w-5 h-5" />
                  <span>Hair Care Assistant</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-0 h-full flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg text-sm ${
                          message.isBot
                            ? "bg-purple-50 text-gray-800 border border-purple-100"
                            : "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                        }`}
                      >
                        {message.text}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-purple-100">
                  <div className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask about hair care..."
                      className="flex-1 border-purple-200 focus:border-purple-400"
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                      onClick={handleSendMessage}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
