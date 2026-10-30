// ═══════════════════════════════════════════════════════════════
//   VINTAGE RESORT DANDELI — Main JavaScript
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  /* ── Navbar Scroll Effect ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  /* ── Mobile Hamburger Menu ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  /* ── Hero Slideshow ── */
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.dot');
  let current  = 0;
  let slideTimer;

  function goToSlide(index) {
    slides[current].classList.remove('active');
    dots[current] && dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current] && dots[current].classList.add('active');
  }

  function nextSlide() { goToSlide(current + 1); }
  function prevSlide() { goToSlide(current - 1); }

  function startTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, 5000);
  }

  if (slides.length) {
    document.getElementById('slide-next') &&
      document.getElementById('slide-next').addEventListener('click', () => { nextSlide(); startTimer(); });
    document.getElementById('slide-prev') &&
      document.getElementById('slide-prev').addEventListener('click', () => { prevSlide(); startTimer(); });

    const nextBtn = document.querySelector('.slide-next');
    const prevBtn = document.querySelector('.slide-prev');
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startTimer(); });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToSlide(i); startTimer(); });
    });

    startTimer();
  }

  /* ── Testimonials Slider ── */
  const track    = document.getElementById('testiTrack');
  const prevBtn  = document.getElementById('testiPrev');
  const nextBtn  = document.getElementById('testiNext');

  if (track) {
    let tCurrent = 0;
    const cards  = track.querySelectorAll('.testi-card');
    const visible = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const maxIdx = cards.length - visible;

    function slideTesti(dir) {
      tCurrent = Math.max(0, Math.min(tCurrent + dir, maxIdx));
      const cardWidth = cards[0].offsetWidth + 32; // gap = 2rem = 32px
      track.style.transform = `translateX(-${tCurrent * cardWidth}px)`;
    }

    prevBtn && prevBtn.addEventListener('click', () => slideTesti(-1));
    nextBtn && nextBtn.addEventListener('click', () => slideTesti(1));
  }

  /* ── Scroll Animations (IntersectionObserver) ── */
  const animEls = document.querySelectorAll('[data-anim]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    animEls.forEach(el => observer.observe(el));
  } else {
    animEls.forEach(el => el.classList.add('animated'));
  }

  /* ── Back to Top ── */
  const backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 500);
    });
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Set today's date as min for booking inputs ── */
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(input => {
    input.min = today;
    if (!input.value) {
      if (input.name === 'checkin') {
        input.value = today;
      } else if (input.name === 'checkout') {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        input.value = tomorrow.toISOString().split('T')[0];
      }
    }
  });

  /* ── Newsletter Form ── */
  document.querySelectorAll('.nl-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        input.value = '';
        input.placeholder = 'Thank you for subscribing! ✓';
        setTimeout(() => { input.placeholder = 'Your email address'; }, 3000);
      }
    });
  });

})();