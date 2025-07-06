function loadThreads() {
    const threads = JSON.parse(localStorage.getItem('forumThreads') || '[]');
    const container = document.getElementById('threads-container');
    container.innerHTML = '';

    threads.forEach((thread, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
      <a href="thread.html?index=${index}">
        <h3>${thread.title}</h3>
        <p>By ${thread.username} • ${thread.timestamp}</p>
      </a>
    `;
        container.appendChild(li);
    });
}

function createThread() {
    const username = document.getElementById('username').value.trim();
    const title = document.getElementById('thread-title').value.trim();
    const content = document.getElementById('thread-content').value.trim();

    if (!username || !title || !content) {
        alert('Please fill in all fields');
        return;
    }

    const threads = JSON.parse(localStorage.getItem('forumThreads') || '[]');
    threads.unshift({
        username,
        title,
        content,
        timestamp: new Date().toLocaleString(),
        replies: []
    });

    localStorage.setItem('forumThreads', JSON.stringify(threads));
    window.location.reload();
}

window.onload = loadThreads;
