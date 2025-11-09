    // Theme Toggle functionality
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

    // Typing Animation
    class TypeWriter {
        constructor(element) {
            this.element = element;
            this.words = JSON.parse(element.getAttribute('data-words'));
            this.wait = parseInt(element.getAttribute('data-wait'), 10);
            this.current = 0;
            this.isDeleting = false;
            this.text = '';
            this.typeSpeed = 80; // Base typing speed
            // If element has data-once="true" then type the provided text only once (no delete/loop)
            this.once = element.getAttribute('data-once') === 'true';
            this.element.classList.add('reveal-text');
            this.type();
        }

        type() {
            const fullWord = this.words[this.current];
            let newTypeSpeed = this.typeSpeed;

            if (this.isDeleting) {
                // Faster deletion speed
                this.text = fullWord.substring(0, this.text.length - 1);
                newTypeSpeed = this.typeSpeed / 2;
            } else {
                // Normal typing speed with slight randomness
                this.text = fullWord.substring(0, this.text.length + 1);
                newTypeSpeed = this.typeSpeed + Math.random() * 50;
            }

            // Remove old class and add new for animation
            this.element.classList.remove('reveal-text');
            void this.element.offsetWidth; // Trigger reflow
            this.element.textContent = this.text;
            this.element.classList.add('reveal-text');

            // Calculate speeds for different states
            if (!this.isDeleting && this.text === fullWord) {
                // Pause at the end of typing
                newTypeSpeed = this.wait;
                // If the element requested a one-time write, stop here (don't delete or loop)
                if (this.once) {
                    return; // stop further typing calls
                }
                this.isDeleting = true;
            } else if (this.isDeleting && this.text === '') {
                this.isDeleting = false;
                // Move to next word
                this.current = (this.current + 1) % this.words.length;
                // Pause before starting new word
                newTypeSpeed = 700;
            }

            setTimeout(() => this.type(), newTypeSpeed);
        }
    }

    // Initialize when document is loaded
    document.addEventListener('DOMContentLoaded', () => {
        // Apply theme
        applySavedTheme();
        
        // Initialize typing animation
        // Initialize typing animation for all elements that have data-words
        const typedElements = document.querySelectorAll('[data-words]');
        typedElements.forEach(el => {
            try {
                new TypeWriter(el);
            } catch (err) {
                console.error('TypeWriter init failed for element', el, err);
            }
        });
    });