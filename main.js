// js/main.js

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.reveal-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate-in');
                }, index * 150); 
            });
        }
    });
}, { threshold: 0.1 });

function initAnimations() {
    // List of every container that holds your cards/items
    const containerIds = ['experience-container', 'testimonials-grid', 'projects-container'];
    
    containerIds.forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            Array.from(container.children).forEach(child => {
                child.classList.add('reveal-item');
            });
            scrollObserver.observe(container);
        }
    });
}

// Wrap everything in a check to make sure the elements exist
const pointer = document.getElementById('custom-pointer');
let mouseX = 0, mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Instant show
    pointer.style.opacity = "1";
});

// INSTANT HIDE when leaving the window
document.addEventListener('mouseleave', () => {
    pointer.style.opacity = "0";
});

// INSTANT SHOW when entering
document.addEventListener('mouseenter', () => {
    pointer.style.opacity = "1";
});

// Also hide if the mouse moves over the browser's UI (like tabs)
// 'mouseout' on the HTML tag is the most aggressive way to detect exits
document.documentElement.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget || e.relatedTarget === Array.from(document.children)[0]) {
        pointer.style.opacity = "0";
    }
});

function updateCursor() {
    pointer.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    requestAnimationFrame(updateCursor);
}
updateCursor();
