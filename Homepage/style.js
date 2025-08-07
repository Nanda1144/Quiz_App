
// asking the user name and stored 
function saveUserName() {
  const username = document.getElementById("username").value.trim();
  if (!username) {
    alert("Please enter your name!");
    return;
  }
  localStorage.setItem("username", username);
  showCategories();
}

// display the user name wher ever it required.
function showCategories() {
  const username = localStorage.getItem("username");
  if (username) {
    document.getElementById("username-section").style.display = "none";
    document.getElementById("categories-section").style.display = "block";
    document.getElementById("welcome-message").textContent = `Welcome to Quiz website, ${username}!`;
  }
}

// changing the webpages from home to user required webpage.
function goToQuiz(category) {
  window.location.href = `${category}.html`;
}

// display the stored username in the webpage dynamically.
window.onload = function() {
  if (localStorage.getItem("username")) {
    showCategories();
  }
};

/**transtions for hamburger menu with the 3 lines and display the 
details in column wise*/
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("show");
}

const buttons = document.querySelectorAll('.quiz-category-btn');

buttons.forEach(btn => {
    btn.addEventListener('click', function() {
        buttons.forEach(b => b.classList.remove('selected')); // optional: for single selection
        this.classList.add('selected');
    });
});
      
