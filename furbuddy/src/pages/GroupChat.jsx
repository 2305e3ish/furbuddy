import React, { useEffect, useState, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, serverTimestamp } from 'firebase/database';

// Firebase config from your Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyADMF211TyJKNrGaeRazRNaiS-nq4WTkE0",
  authDomain: "furbuddy-7df01.firebaseapp.com",
  databaseURL: "https://furbuddy-7df01-default-rtdb.asia-southeast1.firebasedatabase.app", // Add this line for Realtime Database
  projectId: "furbuddy-7df01",
  storageBucket: "furbuddy-7df01.appspot.com",
  messagingSenderId: "100338818226",
  appId: "1:100338818226:web:6f160a0c6554926fe2bdab",
  measurementId: "G-CRNDKBLPD4"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function GroupChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail') || 'Anonymous';

  useEffect(() => {
    const messagesRef = ref(db, 'groupchat');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val() || {};
      const msgList = Object.entries(data).map(([id, msg]) => ({ id, ...msg }));
      msgList.sort((a, b) => a.timestamp - b.timestamp);
      setMessages(msgList);
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const messagesRef = ref(db, 'groupchat');
    await push(messagesRef, {
      user: userEmail,
      message: input,
      timestamp: Date.now(),
    });
    setInput('');
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', border: '1px solid #ccc', borderRadius: 8, padding: 16, background: '#fff' }}>
      <h2>Community Chat</h2>
      <div style={{ height: 350, overflowY: 'auto', border: '1px solid #eee', padding: 8, marginBottom: 12, background: '#fafafa' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ marginBottom: 10 }}>
            <b>{msg.user}</b>
            <span style={{ color: '#888', fontSize: 12, marginLeft: 8 }}>{msg.timestamp ? new Date(msg.timestamp).toLocaleString() : ''}</span>
            <div>{msg.message}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Send</button>
      </form>
    </div>
  );
}
