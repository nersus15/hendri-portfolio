
// Mobile menu toggle (guarded)
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Smooth scroll for internal anchors
document.addEventListener('click', function(e){
        const a = e.target.closest('a[href^="#"]');
        if(!a) return;
        const href = a.getAttribute('href');
        if(href === '#' || href === '') return;
        const target = document.querySelector(href);
        if(target){
                e.preventDefault();
                const offset = 36;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({top, behavior: 'smooth'});
        }
});

// Fade in/out sections on scroll using IntersectionObserver
document.addEventListener('DOMContentLoaded', function(){
    const sections = Array.from(document.querySelectorAll('main > section'));
    if(!sections.length) return;

    // Initialize reveal class and stagger delays
    sections.forEach((el, idx) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${Math.min(idx * 80, 240)}ms`;
    });

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            if(entry.isIntersecting){
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
    }, { threshold: 0.12 });

    sections.forEach(s => io.observe(s));
});
