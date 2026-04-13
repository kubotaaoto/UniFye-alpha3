// js/script.js
const friends = [
    { id: 1, name: "Chris", avatar: "images/chris.jpg", status: "online", lastMsg: "Sure, that sounds good", time: "9:07 AM", active: true },
    { id: 2, name: "Oliver Williams", avatar: "https://randomuser.me/api/portraits/men/32.jpg", status: "online", lastMsg: "Good morning!" },
    { id: 3, name: "Kevin Brown", avatar: "https://randomuser.me/api/portraits/men/45.jpg", status: "online", lastMsg: "Talk to you later" },
    { id: 4, name: "Emma Davis", avatar: "https://randomuser.me/api/portraits/women/44.jpg", status: "offline", lastMsg: "Did you finish home..." },
    { id: 5, name: "Lucas Miller", avatar: "https://randomuser.me/api/portraits/men/67.jpg", status: "offline", lastMsg: "Please review the..." },
    { id: 6, name: "Ava Martin", avatar: "https://randomuser.me/api/portraits/women/65.jpg", status: "online", lastMsg: "Are you joining..." },
    { id: 7, name: "Benjamin Clark", avatar: "https://randomuser.me/api/portraits/men/22.jpg", status: "offline", lastMsg: "Have a great week..." },
    { id: 8, name: "Natalie Johnson", avatar: "https://randomuser.me/api/portraits/women/33.jpg", status: "offline", lastMsg: "" }
];

const initialMessages = [
    { type: "received", text: "Good morning!", time: "9:00 AM" },
    { type: "received", text: "Can we meet at 4pm", time: "9:00 AM" },
    { type: "sent", text: "Sure, that sounds good", time: "9:07 AM" }
];

// Render Friends List
function renderFriends() {
    const container = document.querySelector('.friends-list');
    container.innerHTML = `<div class="friends-header"><span>Friends</span></div>`;
    
    friends.forEach(friend => {
        const div = document.createElement('div');
        div.className = `friend-item ${friend.active ? 'active' : ''}`;
        div.innerHTML = `
            <div class="avatar ${friend.status}">
                <img src="${friend.avatar}" alt="${friend.name}">
                <span class="status-dot"></span>
            </div>
            <div class="friend-info">
                <div class="friend-name">${friend.name}</div>
                <div class="friend-lastmsg">${friend.lastMsg}</div>
            </div>
        `;
        container.appendChild(div);
    });
}

// Render Messages
function renderMessages() {
    const container = document.getElementById('messages-container');
    container.innerHTML = '';
    
    initialMessages.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${msg.type}`;
        msgDiv.innerHTML = `
            ${msg.text}
            <div class="message-time">${msg.time}</div>
        `;
        container.appendChild(msgDiv);
    });
    
    container.scrollTop = container.scrollHeight;
}

// Send Message
function sendMessage() {
    const input = document.getElementById('message-input');
    const text = input.value.trim();
    
    if (!text) return;
    
    const container = document.getElementById('messages-container');
    
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message sent';
    msgDiv.innerHTML = `
        ${text}
        <div class="message-time">just now</div>
    `;
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
    
    input.value = '';
}

// Event Listeners
function init() {
    renderFriends();
    renderMessages();
    
    // Send button
    document.getElementById('send-btn').addEventListener('click', sendMessage);
    
    // Enter key
    const messageInput = document.getElementById('message-input');
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Search functionality
    document.getElementById('search-input').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const items = document.querySelectorAll('.friend-item');
        
        items.forEach(item => {
            const name = item.querySelector('.friend-name').textContent.toLowerCase();
            item.style.display = name.includes(term) ? 'flex' : 'none';
        });
    });
}

// Initialize the app
window.onload = init;