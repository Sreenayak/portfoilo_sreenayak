// ==================== EDIT FUNCTIONALITY ====================
// Load saved data from localStorage
window.addEventListener('load', () => {
    const savedName = localStorage.getItem('portfolioName');
    if (savedName) {
        document.querySelectorAll('.highlight').forEach(el => {
            el.textContent = savedName;
        });
    }
});

// Edit caption click handler
document.addEventListener('click', (e) => {
    if (e.target.closest('.edit-caption')) {
        const nameElements = document.querySelectorAll('.highlight');
        const currentName = nameElements[0].textContent;
        
        const newName = prompt('Edit your name:', currentName);
        
        if (newName && newName.trim()) {
            const trimmedName = newName.trim();
            nameElements.forEach(el => {
                el.textContent = trimmedName;
            });
            localStorage.setItem('portfolioName', trimmedName);
            showNotification('✨ Name updated successfully!', 'success');
        }
    }
});

// ==================== DOM ELEMENTS ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.querySelector('.contact-form');

// ==================== HAMBURGER MENU ====================
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==================== NAVIGATION ACTIVE LINK ====================
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skills and projects for fade-in animations
document.querySelectorAll('.skill-hexagon, .flip-card').forEach(el => {
    observer.observe(el);
});

// ==================== FLOATING STARS ANIMATION ====================
function createStars() {
    const starsContainer = document.querySelector('.stars-2');
    if (!starsContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = Math.random() * 0.5 + 0.3;
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
        starsContainer.appendChild(star);
    }
}

createStars();

// ==================== CAROUSEL FUNCTIONALITY ====================
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
const carouselTrack = document.querySelector('.carousel-track');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');

function updateCarousel() {
    if (carouselTrack && slides.length > 0) {
        const offset = -currentSlide * 100;
        carouselTrack.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
}

function goToSlide(n) {
    currentSlide = n;
    updateCarousel();
}

// Carousel autoplay
let autoplayInterval;
function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
}

function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
}

// Event listeners for carousel
if (carouselNext) {
    carouselNext.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });
}

if (carouselPrev) {
    carouselPrev.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
        resetAutoplay();
    });
});

// Start carousel autoplay
if (slides.length > 0) {
    startAutoplay();
}

// ==================== HEXAGON SKILL HOVER EFFECTS ====================
const skillHexagons = document.querySelectorAll('.skill-hexagon');
skillHexagons.forEach(hexagon => {
    hexagon.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

// ==================== PROJECT DETAILS MODAL HANDLER ====================
const projectModal = document.getElementById('projectDetailsModal');
const modalTitle = document.getElementById('modalProjectTitle');
const modalType = document.getElementById('modalProjectType');
const modalDescription = document.getElementById('modalProjectDescription');
const modalTech = document.getElementById('modalProjectTech');
const modalBackend = document.getElementById('modalProjectBackend');
const modalCloseBtn = document.getElementById('projectModalClose');
const modalCloseBottom = document.getElementById('projectModalCloseBottom');

function openProjectModal(card) {
    const titleText = card.dataset.title || card.querySelector('.flip-card-back h3')?.textContent || 'Project Details';
    const descriptionText = card.dataset.description || card.querySelector('.flip-card-back p')?.textContent || 'Detailed description will be added soon.';
    const techText = card.dataset.tech || '';
    const backendText = card.dataset.backend || '';

    modalTitle.textContent = titleText;
    modalType.textContent = card.querySelector('.project-type')?.textContent || '';
    modalDescription.textContent = descriptionText;

    modalTech.innerHTML = '';
    if (techText) {
        techText.split(',').forEach(tag => {
            const span = document.createElement('span');
            span.textContent = tag.trim();
            modalTech.appendChild(span);
        });
    }

    modalBackend.innerHTML = '';
    if (backendText) {
        const backendLabel = document.createElement('span');
        backendLabel.textContent = backendText;
        modalBackend.appendChild(backendLabel);
    }

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeProjectModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

// Add click events to view details buttons
const projectDetailButtons = document.querySelectorAll('.view-details');
projectDetailButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const card = button.closest('.flip-card');
        if (card) {
            openProjectModal(card);
        }
    });
});

// Close modal events
if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
if (modalCloseBottom) modalCloseBottom.addEventListener('click', closeProjectModal);
projectModal?.addEventListener('click', (event) => {
    if (event.target === projectModal) {
        closeProjectModal();
    }
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
    }
});

// ==================== FLIP CARD ANIMATIONS ====================
// Initialize EmailJS (you need to sign up at https://www.emailjs.com/)
// Replace 'YOUR_PUBLIC_KEY' with your actual public key from EmailJS dashboard
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Validate form
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Send email using EmailJS
        const templateParams = {
            to_email: 'your-email@gmail.com', // Replace with your email
            from_name: name,
            from_email: email,
            message: message,
            reply_to_email: email
        };

        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then((response) => {
                console.log('Email sent successfully!', response.status, response.text);
                showNotification('✨ Message sent successfully! I will get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }, (error) => {
                console.error('Failed to send email:', error);
                showNotification('Failed to send message. Please try again or contact directly.', 'error');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.padding = '20px 30px';
    notification.style.borderRadius = '8px';
    notification.style.fontWeight = '600';
    notification.style.zIndex = '9999';
    notification.style.animation = `slideInRight 0.4s ease-out`;
    notification.style.maxWidth = '400px';
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)';
        notification.style.color = 'white';
    } else {
        notification.style.background = '#1e293b';
        notification.style.color = '#cbd5e1';
        notification.style.border = '1px solid #334155';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = `slideOutRight 0.4s ease-out forwards`;
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 4000);
}

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
    }
});

// ==================== SKILL CARDS INTERACTION ====================
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ==================== PROJECT CARDS INTERACTION ====================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.zIndex = '10';
        
        // Slight delay for staggered effect
        setTimeout(() => {
            card.style.transform = 'translateY(-10px)';
        }, index * 50);
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// ==================== STAT COUNTER ANIMATION ====================
function animateCounters() {
    const stats = document.querySelectorAll('.stat h3');
    
    const observerStats = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = element.getAttribute('data-count');
                
                if (!finalValue) {
                    observerStats.unobserve(element);
                    return;
                }
                
                let currentValue = 0;
                const increment = parseInt(finalValue) / 50;
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= parseInt(finalValue)) {
                        element.textContent = finalValue;
                        clearInterval(counter);
                    } else {
                        element.textContent = Math.floor(currentValue) + '+';
                    }
                }, 30);
                
                observerStats.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        // Store the original text as data attribute
        const text = stat.textContent;
        const number = parseInt(text);
        stat.setAttribute('data-count', number);
        observerStats.observe(stat);
    });
}

animateCounters();

// ==================== TYPING EFFECT ====================
function typeWriter(element, text, speed = 100) {
    if (!element) return;
    
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ==================== SCROLL PROGRESS INDICATOR ====================
function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const windowScroll = window.pageYOffset;
    const scrollPercent = (windowScroll / windowHeight) * 100;
    
    // You can use this to update a progress bar if needed
    document.documentElement.style.setProperty('--scroll-percent', scrollPercent + '%');
}

window.addEventListener('scroll', updateScrollProgress);

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', () => {
    // Add fade-in animation to body
    document.body.style.animation = 'fadeIn 0.8s ease-out';
});

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    // Press 'H' to scroll to Home
    if (e.key === 'h' || e.key === 'H') {
        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Press 'C' to scroll to Contact
    if (e.key === 'c' || e.key === 'C') {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
});

// ==================== DARK MODE ENHANCEMENT ====================
// Detect system preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
}

// Listen for changes in system preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (e.matches) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

// ==================== PERFORMANCE: LAZY LOADING ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== CONSOLE EASTER EGG ====================
console.log('%c🚀 Welcome to Sreenayak Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%c💡 This portfolio was created with HTML, CSS, and JavaScript', 'color: #ec4899; font-size: 14px;');
console.log('%c📧 Feel free to reach out for collaborations!', 'color: #06b6d4; font-size: 14px;');
console.log('%cPress H for Home or C for Contact (keyboard shortcuts)', 'color: #cbd5e1; font-style: italic;');

// ==================== RESPONSIVE CONTAINER QUERIES ====================
// Add support for responsive behavior
const resizeObserver = new ResizeObserver(() => {
    const container = document.querySelector('.container');
    if (container) {
        const width = container.offsetWidth;
        if (width < 768) {
            document.body.classList.add('small-screen');
        } else {
            document.body.classList.remove('small-screen');
        }
    }
});

const container = document.querySelector('.container');
if (container) {
    resizeObserver.observe(container);
}

// ==================== ANIMATION KEYFRAMES INJECTION ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes twinkle {
        0%, 100% {
            opacity: 0.3;
        }
        50% {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ==================== BACK TO TOP BUTTON ====================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== HAMBURGER MENU ANIMATION ====================
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
    });
}

// ==================== NAVBAR SCROLL EFFECT ====================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(8, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(8, 14, 39, 0.7)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
    }
});

// ==================== SCROLL TO SECTION WITH OFFSET ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const offset = 100;
            const targetPos = targetElement.offsetTop - offset;
            window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== ENHANCED FORM VALIDATION ====================
if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.boxShadow = '0 0 0 4px rgba(0, 212, 255, 0.2)';
        });
        
        input.addEventListener('blur', () => {
            input.style.boxShadow = 'none';
        });
    });
}

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
            animationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.timeline-item, .testimonial-card, .section-title').forEach(el => {
    animationObserver.observe(el);
});

console.log('%c✨ All interactive features loaded!', 'color: #06b6d4; font-weight: bold;');
console.log('%cScroll down or use navigation to explore the portfolio', 'color: #00ff88; font-style: italic;');
