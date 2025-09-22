const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Function to apply the saved theme on page load
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggleBtn.textContent = 'Dark Mode';
    } else {
        body.classList.remove('light-mode');
        themeToggleBtn.textContent = 'Light Mode';
    }
}

// Event listener for the toggle button
themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    // Save the current theme preference to localStorage
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = 'Dark Mode';
    } else {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = 'Light Mode';
    }
});

// Apply the theme when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', applySavedTheme);