// src/components/Notification.js

import React, { useEffect } from "react";
import { messaging } from "../firebase";
import { getToken, onMessage } from "firebase/messaging";
import { notificationtoken } from "../user/services/services";

const Notification = () => {
  useEffect(() => {
    // Request notification permission
    const requestPermission = async () => {
      console.log("Requesting permission...");
      const permission = await window.Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted.");

        // 🔑 Replace with your Web Push certificate key (VAPID Key)
        getToken(messaging, {
          vapidKey: "BJQLRdB15LLv4JjKopa8qtQb1zsGUPbp_I_VuU4SNxtUUokImAUS3L6MYtfEs-zARTTxfLvUH9Tj4PNzcQG9n4Y" // 🔑
        }).then((currentToken) => {
          if (currentToken) {
            console.log("📲 FCM Token:", currentToken);
            // 👉 Send this token to your backend server if needed
            notificationtoken(currentToken)
          } else {
            console.log("No registration token available.");
          }
        }).catch((err) => {
          console.error("An error occurred while retrieving token. ", err);
        });
      } else {
        console.log("Notification permission denied.");
      }
    };

    requestPermission();

    // Handle messages when app is in foreground
    onMessage(messaging, (payload) => {
      console.log("📨 Foreground message:", payload);
      alert(`${payload.notification.title} - ${payload.notification.body}`);
    });
  }, []);

  return null;
};

export default Notification;
