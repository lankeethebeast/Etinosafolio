// --- Custom Cursor ---
const initCursor = () => {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    const animateFollower = () => {
        posX += (mouseX - posX) / 8;
        posY += (mouseY - posY) / 8;

        follower.style.left = `${posX - 20}px`;
        follower.style.top = `${posY - 20}px`;

        requestAnimationFrame(animateFollower);
    };
    animateFollower();

    // Hover effect on interactable elements
    const interactables = document.querySelectorAll('a, button, input, textarea, .project-card');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => follower.classList.add('cursor-active'));
        el.addEventListener('mouseleave', () => follower.classList.remove('cursor-active'));
    });
};

// --- Magnetic Effect ---
const initMagnetic = () => {
    const magnets = document.querySelectorAll('.magnetic');

    magnets.forEach(m => {
        m.addEventListener('mousemove', (e) => {
            const rect = m.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            m.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        m.addEventListener('mouseleave', () => {
            m.style.transform = 'translate(0, 0)';
        });
    });
};

// --- 3D Tilt Effect ---
const initTilt = () => {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    });
};

// --- Typing Effect ---
const initTyping = () => {
    const textElement = document.querySelector('.typing');
    const words = ['Scalable Reality', 'Modern Web Experiences', 'Digital Excellence', 'Creative Solutions'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const type = () => {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 1500; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    };

    type();
};

// --- Enhanced Scroll Reveals ---
const initReveals = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    const revealedElements = document.querySelectorAll('.skill-card, .project-card, .hero-content, .section-title, .contact-box');
    revealedElements.forEach(el => {
        el.classList.add('reveal-init');
        observer.observe(el);
    });
};

// --- Animation Styles helper ---
const addAnimationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .reveal-init {
            opacity: 0;
            transform: translateY(50px);
            transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
        .skill-card:nth-child(1) { transition-delay: 0.1s; }
        .skill-card:nth-child(2) { transition-delay: 0.2s; }
        .skill-card:nth-child(3) { transition-delay: 0.3s; }
        .skill-card:nth-child(4) { transition-delay: 0.4s; }
    `;
    document.head.appendChild(style);
};

// Handle Form
const handleForm = () => {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalBtnText = btn.textContent;
            btn.textContent = 'Sending...';

            // Replace these with your actual Service ID and Template ID
            const serviceID = 'service_wner2ge';
            const templateID = 'template_v0gc4gt';

            emailjs.sendForm(serviceID, templateID, form)
                .then(() => {
                    btn.textContent = 'Message Sent! ✨';
                    form.reset();
                    setTimeout(() => btn.textContent = originalBtnText, 3000);
                }, (err) => {
                    btn.textContent = 'Failed to Send';
                    alert(JSON.stringify(err));
                    setTimeout(() => btn.textContent = originalBtnText, 3000);
                });
        });
    }
};

// Smooth Scroll
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
};

// Initialize All
document.addEventListener('DOMContentLoaded', () => {
    addAnimationStyles();
    initCursor();
    initMagnetic();
    initTilt();
    initTyping();
    initReveals();
    handleForm();
    initSmoothScroll();
});
