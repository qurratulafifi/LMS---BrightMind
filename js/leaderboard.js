window.onload = function () {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const sorted = leaderboard.sort((a, b) => b.score - a.score);
    const container = document.getElementById("leaderboard-list");
    container.innerHTML = "";

    sorted.forEach((user, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${user.username} - ${user.score}`;
        container.appendChild(li);
    });
};
