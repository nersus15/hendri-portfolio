
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

    // Fade-in on scroll for elements with `.fade-in` class
    const fades = Array.from(document.querySelectorAll('.fade-in'));
    if(fades.length){
        // Auto-assign staggered data-delay attributes when not present
        fades.forEach((el, i) => {
            if(!el.dataset.delay){
                const delay = Math.min(i * 80, 480); // cap at 480ms
                el.dataset.delay = `${delay}ms`;
            }
        });
        const ioFade = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    const el = entry.target;
                    const delay = el.dataset.delay;
                    if(delay) el.style.animationDelay = delay;
                    el.classList.add('is-visible');
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

        fades.forEach(f => ioFade.observe(f));
    }
});
