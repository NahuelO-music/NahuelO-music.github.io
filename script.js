// ========================================
// NahuelO Music - Website Scripts
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavbar();
    initMobileMenu();
    initParticles();
    initScrollAnimations();
    initSmoothScroll();
    initSupportModal();
});

// Support Modal Logic
// ========================================
function initSupportModal() {
    const supportBtn = document.querySelector('.btn-support');
    const modalOverlay = document.getElementById('support-modal');
    const modalClose = document.querySelector('.modal-close');
    const copyBtns = document.querySelectorAll('.copy-btn');

    if (!supportBtn || !modalOverlay) return;

    // Open Modal
    supportBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close Modal
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        // Reset to main options when closing
        setTimeout(() => {
            document.getElementById('main-support-options').style.display = 'block';
            document.getElementById('crypto-list').style.display = 'none';
            document.getElementById('mercadopago-list').style.display = 'none';
        }, 300);
    };

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Toggle Crypto & Mercado Pago Views
    const showCryptoBtn = document.getElementById('show-crypto');
    const showMPBtn = document.getElementById('show-mercadopago');
    const backCryptoBtn = document.getElementById('back-to-options');
    const backMPBtn = document.getElementById('back-from-mp');

    const mainOptions = document.getElementById('main-support-options');
    const cryptoList = document.getElementById('crypto-list');
    const mpList = document.getElementById('mercadopago-list');

    // Show Views
    showCryptoBtn?.addEventListener('click', () => {
        mainOptions.style.display = 'none';
        cryptoList.style.display = 'block';
    });

    showMPBtn?.addEventListener('click', () => {
        mainOptions.style.display = 'none';
        mpList.style.display = 'block';
    });

    // Back to main
    backCryptoBtn?.addEventListener('click', () => {
        cryptoList.style.display = 'none';
        mainOptions.style.display = 'block';
    });

    backMPBtn?.addEventListener('click', () => {
        mpList.style.display = 'none';
        mainOptions.style.display = 'block';
    });

    // Copy Content Logic
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const address = btn.dataset.address;
            navigator.clipboard.writeText(address).then(() => {
                const originalContent = btn.innerHTML;
                btn.innerHTML = '✅';
                btn.classList.add('copied');

                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.classList.remove('copied');
                }, 2000);
            });
        });
    });
}
// Navbar Scroll Effect
// ========================================
function initNavbar() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========================================
// Mobile Menu Toggle
// ========================================
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ========================================
// Floating Particles Background
// ========================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';

    // Random size
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // Random animation duration and delay
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 10;
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';

    container.appendChild(particle);
}

// ========================================
// Scroll Animations (Intersection Observer)
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll(
        '.album-card, .video-card, .social-card, .about-content, .support-section'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// Lazy Load Images (Optional Enhancement)
// ========================================
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// Console Easter Egg
// ========================================
console.log(`
%c🎵 NahuelO Music
%cLetras humanas • IA como instrumento
%c
Lo que estaba adentro, ahora resuena afuera.

🔗 https://nahuelo-music.github.io
`,
    'font-size: 24px; font-weight: bold; color: #8b5cf6;',
    'font-size: 14px; color: #06b6d4;',
    'font-size: 12px; color: #888;'
);
