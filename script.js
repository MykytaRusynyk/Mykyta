document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Smooth Scrolling for Nav Links with Active State
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Skill Filtering Logic
    const skillChips = document.querySelectorAll('.skill-chip');
    const expCards = document.querySelectorAll('.exp-card');

    skillChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const skill = chip.getAttribute('data-skill');
            
            // Toggle active chip
            if (chip.classList.contains('active')) {
                chip.classList.remove('active');
                resetFilters();
            } else {
                skillChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                filterExperience(skill);
            }
        });
    });

    function filterExperience(skill) {
        expCards.forEach(card => {
            const skills = card.getAttribute('data-skills').split(',');
            if (skills.includes(skill)) {
                card.classList.remove('dimmed');
                card.style.transform = 'scale(1.02)';
                card.style.borderColor = 'var(--accent-primary)';
            } else {
                card.classList.add('dimmed');
                card.style.transform = 'scale(0.98)';
                card.style.borderColor = 'var(--glass-border)';
            }
        });
    }

    function resetFilters() {
        expCards.forEach(card => {
            card.classList.remove('dimmed');
            card.style.transform = 'scale(1)';
            card.style.borderColor = 'var(--glass-border)';
        });
    }

    // 4. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.section, .exp-card, .skill-category, .stat-card');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('reveal', 'active');
            }
        });
    };

    // Initial check and scroll event
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on load

    // 5. Mobile Menu Toggle (Basic)
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-active');
            // Add styling for mobile-active in CSS if needed
        });
    }

    // 6. Intersection Observer for Header Fade
    const hero = document.querySelector('.hero-content');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scroll = window.scrollY;
            hero.style.opacity = 1 - (scroll / 600);
            hero.style.transform = `translateY(${scroll * 0.4}px)`;
        });
    }
});
