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
    <div className="card-3d community-chat-container" style={{ maxWidth: 700, margin: '48px auto', padding: 0 }}>
      <h2 style={{ textAlign: 'center', margin: '24px 0 12px 0', fontWeight: 700, color: '#7b6cf6', letterSpacing: '1px' }}>Community Chat</h2>
      <div className="chat-messages glossy-card" style={{ height: 350, overflowY: 'auto', border: 'none', padding: 18, margin: '0 24px 18px 24px', background: 'linear-gradient(120deg, #f8fafc 60%, #f6e7f7 100%)', borderRadius: 18, boxShadow: '0 2px 8px 0 rgba(123, 108, 246, 0.07)' }}>
        {messages.map(msg => (
          <div key={msg.id} className="chat-message" style={{ marginBottom: 18, padding: 10, borderRadius: 10, background: '#fff', boxShadow: '0 1px 4px 0 rgba(123, 108, 246, 0.07)' }}>
            <b style={{ color: '#7b6cf6' }}>{msg.user}</b>
            <span style={{ color: '#888', fontSize: 12, marginLeft: 8 }}>{msg.timestamp ? new Date(msg.timestamp).toLocaleString() : ''}</span>
            <div style={{ marginTop: 4 }}>{msg.message}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="chat-form" style={{ display: 'flex', gap: 12, margin: '0 24px 24px 24px' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          className="glossy-input"
          style={{ flex: 1, padding: '12px 18px', borderRadius: 12, border: '2px solid #e0c3fc', background: '#f8fafc', fontSize: '1.08em', boxShadow: '0 2px 8px 0 rgba(123, 108, 246, 0.07)' }}
        />
        <button type="submit" className="glossy-btn" style={{ padding: '12px 32px', fontSize: '1.08em' }}>Send</button>
      </form>
    </div>
  );
}
