import { loadTailwind } from "./tailwindLoader";
loadTailwind(); // load CDN before React mounts

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "feather-icons-react";
import "./home.css";
import { nanoid } from "nanoid";
import { Head, router, Link, useForm, usePage } from "@inertiajs/react";
import { useEchoPublic } from "@laravel/echo-react";

const customerUniqueId = () => {
  const id = nanoid();
  let customer_id = `${id}__#${Date.now()}`;
  return customer_id;
};

function formatTo12Hour(datetime: string | number) {
  let date: Date;

  // Check if input is a timestamp (number or numeric string)
  if (!isNaN(Number(datetime)) && Number(datetime) > 1000000000000) {
    date = new Date(Number(datetime)); // convert timestamp to Date
  } else if (typeof datetime === "string") {
    // If it's a string like "2025-10-11 17:46:18"
    date = new Date(datetime.replace(" ", "T"));
  } else {
    throw new Error("Invalid datetime format");
  }

  // Format time to 12-hour with AM/PM
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function LiveSupportChat() {
  const [userProfileArr, setUserProfileArr] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { processing, post } = useForm({
    search: "",
  });

  // clear
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // clear
  const sendMessage = () => {
    if (!messageInput.trim()) return;

    let userMessageInfo;
    const storedData = localStorage.getItem("userMessageInfo");

    if (storedData) {
      let userData = JSON.parse(storedData);

      // If message_time is empty, update it
      if (!userData.message_time) {
        userData.message_time = Date.now().toString();
        localStorage.setItem("userMessageInfo", JSON.stringify(userData));
      }

      userMessageInfo = userData;
    } else {
      // Create new user info if not found in localStorage
      const userInfo = {
        customer_id: customerId,
        user_id: "",
        message_time: Date.now().toString(),
      };

      localStorage.setItem("userMessageInfo", JSON.stringify(userInfo));
      userMessageInfo = userInfo;
    }

    if (userMessageInfo.user_id != "") {
      // Format message payload
      const messageFormat = {
        customer_id: userMessageInfo.customer_id,
        user_id: userMessageInfo.user_id,
        message_time: Date.now(),
        role_type: "customer",
        message_seen: true,
        message_type: "text",
        message: messageInput,
        created_at: Date.now(),
      };

      post(route("home.chat.send", messageFormat), {
        preserveScroll: true,
      });

      setMessages((prev) => [...prev, messageFormat]);
      setMessageInput("");
    } else {
      // Format message payload
      const messageFormat = {
        customer_id: userMessageInfo.customer_id,
        user_id: "",
        message_time: Date.now(),
        role_type: "customer",
        message_seen: false,
        message_type: "text",
        message: messageInput,
        created_at: Date.now(),
      };

      post(route("home.store", messageFormat), {
        preserveScroll: true,
      });

      setMessages((prev) => [...prev, messageFormat]);
      setMessageInput("");

      if (messages.length == 0) {
        // Show typing indicator
        setTimeout(() => {
          setIsTyping(true);
          // Simulate response
          setTimeout(() => {
            setIsTyping(false);
            const supportResponse = {
              customer_id: customerId,
              role_type: "adminUser",
              user_id: "",
              message_seen: false,
              message_type: "text",
              message:
                "Thanks for your message! Our team will respond shortly.",
              message_time: Date.now(),
              created_at: Date.now(),
            };

            setMessages((prev) => [...prev, supportResponse]);
          }, 2000);
        }, 500);
      }
    }
  };

  // clear
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // clear
  useEchoPublic("useridset", "UserIdSetEvent", (wsStore: any) => {
    const { userId } = wsStore;

    const storedData = localStorage.getItem("userMessageInfo");
    if (storedData) {
      let userData = JSON.parse(storedData);

      userData.user_id = userId;
      localStorage.setItem("userMessageInfo", JSON.stringify(userData));
    }
  });

  useEchoPublic(`message-send`, "MessageSendEvent", (wsStore: any) => {
    const { messageInfo } = wsStore;

    if (messageInfo.role_type == "adminUser") {
      setUserProfileArr((prev) => {
        let existing = prev.find(
          (el: any) => el.user_id == messageInfo.user_id
        );
        let updatedList = prev;

        if (!existing) {
          updatedList = [
            ...prev,
            {
              user_id: messageInfo.user_id,
              user_name: messageInfo.user_name,
              user_photo: messageInfo.user_photo,
            },
          ];
        }

        return updatedList;
      });

      const storedUserInfo = JSON.parse(
        localStorage.getItem("userMessageInfo") || "{}"
      );

      if (storedUserInfo.customer_id == messageInfo.customer_id) {
        const messageFormat = {
          customer_id: messageInfo.customer_id,
          user_id: messageInfo.user_id,
          message_time: messageInfo.message_time,
          role_type: "adminUser",
          message_seen: true,
          message_type: messageInfo.message_type,
          message: messageInfo.message,
          created_at: messageInfo.created_at,
        };
        setMessages((prev) => [...prev, messageFormat]);
      }
    }
  });

  // clear
  const handleIsOpen = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);

    const userInfoKey = "userMessageInfo";
    const storedUserInfo = localStorage.getItem(userInfoKey);
    const parsedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

    // Ensure customerId is set
    if (parsedUserInfo) {
      if (!customerId) {
        setCustomerId(parsedUserInfo.customer_id);
      }
    } else {
      const newCustomerId = customerUniqueId();
      setCustomerId(newCustomerId);
    }
  };

  // clear
  useEffect(() => {
    const userInfoKey = "userMessageInfo";
    const storedUserInfo = localStorage.getItem(userInfoKey);

    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      const updatedInfo = { ...parsedUserInfo, message_time: "", user_id: "" };
      localStorage.setItem(userInfoKey, JSON.stringify(updatedInfo));
    }

    // setMessages([]);
    // isOpen
  }, []);

  useEffect(() => {
    // Generate unique tab ID for this specific tab
    const tabId =
      sessionStorage.getItem("tabId") || `tab_${Date.now()}_${Math.random()}`;
    if (!sessionStorage.getItem("tabId")) {
      sessionStorage.setItem("tabId", tabId);
    }

    // Function to send data to backend
    const sendCloseEvent = async (eventType: any) => {
      try {
        // Using sendBeacon for reliability - it works even when page is unloading
        const storedData = localStorage.getItem("userMessageInfo");

        if (storedData) {
          let userData = JSON.parse(storedData);
          const sendData = {
            message: eventType === "tab" ? "Tab closed" : "Browser closed",
            timestamp: new Date().toISOString(),
            tabId: tabId,
            route: window.location.pathname,
            customer_id: userData.customer_id,
          };

          post(route("home.chat.close", sendData), {
            preserveScroll: true,
          });
        }
      } catch (error) {
        console.error("Error sending close event:", error);
      }
    };

    // Detect tab close vs browser close
    const handleBeforeUnload = (e: any) => {
      // Mark that this tab is closing
      sessionStorage.setItem("isClosing", "true");

      // Check if browser is closing (all tabs) or just this tab
      // If localStorage still has active tabs, it's just a tab close
      const activeTabs = JSON.parse(localStorage.getItem("activeTabs") || "[]");
      const remainingTabs = activeTabs.filter((id: string) => id !== tabId);

      if (remainingTabs.length > 0) {
        // Other tabs exist - this is a TAB close
        sendCloseEvent("tab");
        localStorage.setItem("activeTabs", JSON.stringify(remainingTabs));
      } else {
        // No other tabs - this is a BROWSER close
        sendCloseEvent("browser");
        localStorage.removeItem("activeTabs");
      }
    };

    // Track active tabs in localStorage
    const activeTabs = JSON.parse(localStorage.getItem("activeTabs") || "[]");
    if (!activeTabs.includes(tabId)) {
      activeTabs.push(tabId);
      localStorage.setItem("activeTabs", JSON.stringify(activeTabs));
    }

    // Update active tabs periodically (heartbeat)
    const heartbeatInterval = setInterval(() => {
      const tabs = JSON.parse(localStorage.getItem("activeTabs") || "[]");
      if (!tabs.includes(tabId)) {
        tabs.push(tabId);
        localStorage.setItem("activeTabs", JSON.stringify(tabs));
      }
    }, 1000);

    // Listen for tab/browser close
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearInterval(heartbeatInterval);
    };
  }, []);

  

  // useEffect(() => {
  //   // এই নির্দিষ্ট ট্যাবের জন্য ইউনিক ট্যাব আইডি তৈরি করুন
  //   const tabId =
  //     sessionStorage.getItem("tabId") || `tab_${Date.now()}_${Math.random()}`;
  //   if (!sessionStorage.getItem("tabId")) {
  //     sessionStorage.setItem("tabId", tabId);
  //   }

  //   // নির্ভরযোগ্যতার জন্য sendBeacon ব্যবহার করে ব্যাকএন্ডে ডেটা পাঠানোর ফাংশন
  //   const sendCloseEvent = (eventType: "tab" | "browser") => {
  //     try {
  //       const storedData = localStorage.getItem("userMessageInfo");

  //       if (storedData) {
  //         const userData = JSON.parse(storedData);
  //         const sendData = {
  //           message: eventType === "tab" ? "Tab closed" : "Browser closed",
  //           timestamp: new Date().toISOString(),
  //           tabId: tabId,
  //           route: window.location.pathname,
  //           customer_id: userData.customer_id,
  //         };

  //         // পেজ আনলোডের সময় নির্ভরযোগ্যতার জন্য sendBeacon ব্যবহার করুন
  //         const url = route("home.chat.close");
  //         const blob = new Blob([JSON.stringify(sendData)], {
  //           type: "application/json",
  //         });

  //         // sendBeacon সফলভাবে queue হলে true রিটার্ন করে
  //         navigator.sendBeacon(url, blob);
  //       }
  //     } catch (error) {
  //       console.error("ক্লোজ ইভেন্ট পাঠাতে ত্রুটি:", error);
  //     }
  //   };

  //   // ট্যাব ক্লোজ বনাম ব্রাউজার ক্লোজ সনাক্ত করুন
  //   const handleBeforeUnload = () => {
  //     // চেক করুন ব্রাউজার বন্ধ হচ্ছে (সব ট্যাব) নাকি শুধু এই ট্যাব
  //     const activeTabs = JSON.parse(localStorage.getItem("activeTabs") || "[]");
  //     const remainingTabs = activeTabs.filter((id: string) => id !== tabId);

  //     if (remainingTabs.length > 0) {
  //       // অন্য ট্যাব আছে - এটি একটি ট্যাব ক্লোজ
  //       sendCloseEvent("tab");
  //       localStorage.setItem("activeTabs", JSON.stringify(remainingTabs));
  //     } else {
  //       // কোন ট্যাব নেই - এটি একটি ব্রাউজার ক্লোজ
  //       sendCloseEvent("browser");
  //       localStorage.removeItem("activeTabs");
  //     }

  //     // sessionStorage থেকে এই ট্যাব সরান
  //     sessionStorage.removeItem("isClosing");
  //   };

  //   // visibility change হ্যান্ডেল করুন (ট্যাব ক্লোজ সনাক্তকরণের জন্য আরও নির্ভরযোগ্য)
  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === "hidden") {
  //       // পেজ লুকানো হচ্ছে, হয়তো বন্ধ হচ্ছে
  //       const activeTabs = JSON.parse(
  //         localStorage.getItem("activeTabs") || "[]"
  //       );
  //       const remainingTabs = activeTabs.filter((id: string) => id !== tabId);

  //       if (remainingTabs.length > 0) {
  //         localStorage.setItem("activeTabs", JSON.stringify(remainingTabs));
  //       }
  //     }
  //   };

  //   // localStorage এ সক্রিয় ট্যাবগুলো ট্র্যাক করুন
  //   const activeTabs = JSON.parse(localStorage.getItem("activeTabs") || "[]");
  //   if (!activeTabs.includes(tabId)) {
  //     activeTabs.push(tabId);
  //     localStorage.setItem("activeTabs", JSON.stringify(activeTabs));
  //   }

  //   // পর্যায়ক্রমে সক্রিয় ট্যাব আপডেট করুন (heartbeat) - কম ফ্রিকোয়েন্সি
  //   const heartbeatInterval = setInterval(() => {
  //     const tabs = JSON.parse(localStorage.getItem("activeTabs") || "[]");
  //     if (!tabs.includes(tabId)) {
  //       tabs.push(tabId);
  //       localStorage.setItem("activeTabs", JSON.stringify(tabs));
  //     }
  //   }, 5000); // ওভারহেড কমাতে ৫ সেকেন্ডে বৃদ্ধি করা হয়েছে

  //   // ট্যাব/ব্রাউজার ক্লোজের জন্য শুনুন
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   document.addEventListener("visibilitychange", handleVisibilityChange);

  //   // অতিরিক্ত: pagehide ইভেন্ট হ্যান্ডেল করুন (মোবাইলে আরও নির্ভরযোগ্য)
  //   window.addEventListener("pagehide", handleBeforeUnload);

  //   // কম্পোনেন্ট আনমাউন্টে ক্লিনআপ
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //     window.removeEventListener("pagehide", handleBeforeUnload);
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //     clearInterval(heartbeatInterval);

  //     // সক্রিয় ট্যাব থেকে এই ট্যাব পরিষ্কার করুন
  //     const tabs = JSON.parse(localStorage.getItem("activeTabs") || "[]");
  //     const filtered = tabs.filter((id: string) => id !== tabId);
  //     localStorage.setItem("activeTabs", JSON.stringify(filtered));
  //   };
  // }, []);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Demo Page Content */}
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-4 text-5xl font-bold text-center text-gray-800">
          Live Support Chat Widget
        </h1>
        <p className="mb-8 text-xl text-center text-gray-600">
          Click the chat button in the bottom right to start a conversation
        </p>

        <div className="p-8 mb-8 bg-white shadow-xl rounded-2xl">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">Features</h2>
          <ul className="space-y-3">
            {[
              "Beautiful gradient design with smooth animations",
              "Real-time message bubbles for user and support",
              "Typing indicator for better UX",
              "Fully responsive and mobile-friendly",
              "Easy to customize and integrate",
            ].map((feature, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700">
                <span className="text-xl font-bold text-green-500">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chat Widget */}
      <div className="fixed z-50 bottom-6 right-6">
        {/* Chat Window */}
        <div
          className={`mb-4 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4 pointer-events-none"
          }`}
        >
          {/* Header */}
          <div className="p-4 text-white bg-gradient-to-r from-purple-600 to-pink-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Live Support</h3>
                  <p className="text-xs text-white/80">
                    We typically reply in minutes
                  </p>
                </div>
              </div>
              <button
                onClick={handleIsOpen}
                className="p-1 transition-colors rounded-full hover:bg-white/20"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 overflow-y-auto h-96 bg-gray-50">
            {messages.length != 0 &&
              messages.map((msg: any, index) => (
                <div
                  key={index + 1}
                  className={`flex gap-2 mb-4 ${
                    msg.role_type == "customer" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm ${
                      msg.role_type == "adminUser"
                        ? "bg-gradient-to-br from-purple-500 to-pink-500"
                        : "bg-gradient-to-br from-blue-500 to-cyan-500"
                    }`}
                  >
                    {msg.role_type == "adminUser" ? "S" : "U"}
                  </div>
                  <div
                    className={`flex flex-col ${
                      msg.role_type == "customer" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl max-w-xs ${
                        msg.role_type == "adminUser"
                          ? "bg-white text-gray-800 shadow-sm"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      }`}
                    >
                      {msg.message}
                    </div>
                    <span className="px-1 mt-1 text-xs text-gray-500">
                      {formatTo12Hour(msg.created_at)}
                    </span>
                  </div>
                </div>
              ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2 mb-4">
                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-semibold text-white rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                  S
                </div>
                <div className="px-4 py-3 bg-white shadow-sm rounded-2xl">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              {/* <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              /> */}

              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />

              <button
                onClick={sendMessage}
                className="p-2 text-white transition-all duration-200 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:scale-105 sendBtn"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Button */}
        <button
          onClick={handleIsOpen}
          className="flex items-center justify-center text-white transition-all duration-300 shadow-2xl closeIcon rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 w-14 h-14 hover:shadow-3xl hover:scale-110"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>
    </div>
  );
}
