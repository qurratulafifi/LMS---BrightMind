const params = new URLSearchParams(window.location.search);
const threadIndex = parseInt(params.get('index'), 10);
const threads = JSON.parse(localStorage.getItem('forumThreads') || '[]');
const thread = threads[threadIndex];

function renderThread() {
    const section = document.getElementById('thread-detail');

    if (!thread) {
        section.innerHTML = "<p>Thread not found.</p>";
        return;
    }

    section.innerHTML = `
    <h2>${thread.title}</h2>
    <p><strong>${thread.username}</strong> • ${thread.timestamp}</p>
    <p>${thread.content}</p>
    <hr/>
    <h3>Replies:</h3>
    <ul id="reply-list">
      ${thread.replies.map((r, i) => `
        <li id="reply-${i}">
          <strong>${r.username}</strong>: <span class="reply-content">${r.content}</span>
          <div class="reply-controls">
            <button onclick="editReply(${i})">✏️</button>
            <button onclick="deleteReply(${i})">🗑️</button>
          </div>
        </li>
      `).join('')}
    </ul>
  `;
}


function addReply() {
    const username = document.getElementById('reply-username').value.trim();
    const content = document.getElementById('reply-content').value.trim();

    if (!username || !content) {
        alert("Please fill in all reply fields.");
        return;
    }

    thread.replies.push({
        username,
        content,
        timestamp: new Date().toLocaleString()
    });

    threads[threadIndex] = thread;
    localStorage.setItem('forumThreads', JSON.stringify(threads));
    renderThread();

    document.getElementById('reply-username').value = '';
    document.getElementById('reply-content').value = '';
}

renderThread();

function deleteReply(index) {
    if (confirm("Are you sure you want to delete this reply?")) {
        thread.replies.splice(index, 1);
        threads[threadIndex] = thread;
        localStorage.setItem('forumThreads', JSON.stringify(threads));
        renderThread();
    }
}

function editReply(index) {
    const replyLi = document.getElementById(`reply-${index}`);
    const reply = thread.replies[index];

    replyLi.innerHTML = `
    <strong>${reply.username}</strong>:
    <textarea id="edit-reply-${index}" class="edit-textarea">${reply.content}</textarea>
    <div class="reply-controls">
      <button onclick="saveReply(${index})">💾 Save</button>
      <button onclick="renderThread()">❌ Cancel</button>
    </div>
  `;
}

function saveReply(index) {
    const newContent = document.getElementById(`edit-reply-${index}`).value.trim();
    if (!newContent) {
        alert("Reply cannot be empty.");
        return;
    }

    thread.replies[index].content = newContent;
    threads[threadIndex] = thread;
    localStorage.setItem('forumThreads', JSON.stringify(threads));
    renderThread();
}