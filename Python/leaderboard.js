function updateLeaderboard(username, level, score) {
  const key = `leaderboard_${level}`;
  const existing = JSON.parse(localStorage.getItem(key)) || [];
  existing.push({ username, score });
  existing.sort((a, b) => b.score - a.score);
  localStorage.setItem(key, JSON.stringify(existing.slice(0, 5))); // top 5
}

function displayLeaderboard(level) {
  const key = `leaderboard_${level}`;
  const leaderboard = JSON.parse(localStorage.getItem(key)) || [];
  let html = '<h3>🏆 Leaderboard (' + level.charAt(0).toUpperCase() + level.slice(1) + ')</h3>';
  html += '<ol>';
  leaderboard.forEach(entry => {
    html += `<li>${entry.username} - ${entry.score}</li>`;
  });
  html += '</ol>';
  document.getElementById("leaderboard").innerHTML = html;
  document.getElementById("leaderboard").style.display = "block";
}
