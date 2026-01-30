// --- Configuration ---
const typewriterText = "ENTC Engineer | Frontend Developer | Android Enthusiast";
const typingSpeed = 100; // milliseconds per character
const typewriterElement = document.querySelector('.typewriter');

// 1. Typewriter Effect
let i = 0;
function typeWriter() {
    if (i < typewriterText.length) {
        typewriterElement.innerHTML += typewriterText.charAt(i);
        i++;
        setTimeout(typeWriter, typingSpeed);
    }
}

// 2. Navbar Background Blur on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// 3. Reveal Elements on Scroll
// This adds a "fade-up" effect to sections as they enter the screen
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize Section Animations
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
});

// 4. Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70, // Offset for fixed navbar
                behavior: 'smooth'
            });
        }
    });
});

// Start the typewriter effect when the page loads
window.addEventListener('load', () => {
    typewriterElement.innerHTML = ""; // Clear existing text
    typeWriter();
});