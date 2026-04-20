const friends = [
    { name: "Chris", avatar: "https://randomuser.me/api/portraits/men/94.jpg", status: "online", lastMsg: "Do I know you?" },
    { name: "Oliver Williams", avatar: "https://randomuser.me/api/portraits/men/32.jpg", status: "online" },
    { name: "Emma Davis", avatar: "https://randomuser.me/api/portraits/women/44.jpg", status: "offline" }
];

function renderFriends() {
    const container = document.getElementById('friends-list');
    if (!container) return;

    container.innerHTML = '';
    friends.forEach(friend => {
        const div = document.createElement('div');
        div.style.cssText = 'padding:15px 20px; display:flex; align-items:center; gap:12px; cursor:pointer; border-bottom:1px solid #eee;';
        div.innerHTML = `
            <div style="position:relative; width:45px; height:45px;">
                <img src="${friend.avatar}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">
                <span style="position:absolute; bottom:2px; right:2px; width:14px; height:14px; background:${friend.status==='online'?'#22c55e':'#999'}; border:2px solid white; border-radius:50%;"></span>
            </div>
            <div>
                <div style="font-weight:600;">${friend.name}</div>
                <div style="font-size:0.9rem; color:#666;">${friend.lastMsg || 'Tap to chat'}</div>
            </div>
        `;
        container.appendChild(div);
    });
}

// Simple chat demo
function initChat() {
    const sendBtn = document.getElementById('send-btn');
    const input = document.getElementById('message-input');
    const container = document.getElementById('messages-container');

    if (!sendBtn || !input || !container) return;

    const initialMessages = [
        { text: "Good morning!", type: "received" },
        { text: "Do I know you?", type: "sent" }
    ];

    initialMessages.forEach(msg => {
        const div = document.createElement('div');
        div.style.cssText = `align-self: ${msg.type === 'sent' ? 'flex-end' : 'flex-start'}; background: ${msg.type === 'sent' ? 'var(--ttu-red)' : 'white'}; color: ${msg.type === 'sent' ? 'white' : 'black'}; padding:12px 16px; border-radius:18px; max-width:70%;`;
        div.innerHTML = `${msg.text}<div style="font-size:0.7rem; opacity:0.7; margin-top:4px;">9:07 AM</div>`;
        container.appendChild(div);
    });

    sendBtn.addEventListener('click', () => {
        if (!input.value.trim()) return;
        const div = document.createElement('div');
        div.style.cssText = 'align-self:flex-end; background:var(--ttu-red); color:white; padding:12px 16px; border-radius:18px; max-width:70%;';
        div.innerHTML = `${input.value}<div style="font-size:0.7rem; opacity:0.7; margin-top:4px;">just now</div>`;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
        input.value = '';
    });

    input.addEventListener('keypress', e => {
        if (e.key === 'Enter') sendBtn.click();
    });
}

window.onload = () => {
    renderFriends();
    initChat();
};