/**
 * Clarifind — Main JavaScript
 *
 * Sections:
 * 1. GSAP Setup & Utilities
 * 2. Header scroll behavior
 * 3. Mobile nav toggle
 * 4. Hero entrance animations
 * 5. Canvas particle system (hero background)
 * 6. ScrollTrigger section reveals
 * 7. Services cards reveal
 * 8. Projects interaction (expand/collapse)
 * 9. Experience milestones reveal
 * 10. How We Work reveal
 * 11. Approach principles reveal
 * 12. Contact + footer year
 * 13. Smooth anchor scroll
 * 14. Signal SVG animation
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     1. GSAP SETUP
  ========================================================== */
  // Wait for GSAP to load from CDN
  function waitForGSAP(callback) {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      callback();
    } else {
      setTimeout(() => waitForGSAP(callback), 50);
    }
  }

  waitForGSAP(init);


  /* ==========================================================
     2. HEADER SCROLL BEHAVIOR
  ========================================================== */
  function initHeader() {
    const header = document.getElementById('site-header');
    let lastScroll = 0;

    const onScroll = () => {
      const scroll = window.scrollY;
      if (scroll > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = scroll;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }


  /* ==========================================================
     3. MOBILE NAV TOGGLE
  ========================================================== */
  function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const nav    = document.getElementById('main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open', !isOpen);
      // Prevent body scroll when nav is open
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    });

    // Close nav when a link is clicked
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }


  /* ==========================================================
     4. HERO ENTRANCE ANIMATIONS
  ========================================================== */
  function initHeroAnimations() {
    const tl = gsap.timeline({ delay: 0.15 });

    // Badge
    tl.to('.hero-badge', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out'
    });

    // Headline lines staggered
    tl.to('.hero-headline .line', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out'
    }, '-=0.3');

    // Underline on the "em" element
    tl.add(() => {
      const em = document.querySelector('.hero-headline em');
      if (em) em.classList.add('underlined');
    }, '-=0.3');

    // Subtext
    tl.to('.hero-sub', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out'
    }, '-=0.4');

    // Actions
    tl.to('.hero-actions', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4');

    // Scroll hint
    tl.to('.hero-scroll-hint', {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.2');

    // Signal SVG
    tl.to('.signal-svg', {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'power2.out'
    }, '-=0.9');

    // Slow rotation of the signal graphic
    gsap.to('.signal-svg', {
      rotation: 360,
      duration: 90,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%'
    });
  }


  /* ==========================================================
     5. CANVAS PARTICLE SYSTEM (hero background)
  ========================================================== */
  function initCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame;
    let W, H;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    class Particle {
      constructor() { this.reset(true); }

      reset(initial = false) {
        this.x  = Math.random() * W;
        this.y  = initial ? Math.random() * H : H + 10;
        this.vy = -(0.15 + Math.random() * 0.35);
        this.vx = (Math.random() - 0.5) * 0.2;
        this.size   = 1 + Math.random() * 2;
        this.opacity = 0;
        this.maxOpacity = 0.08 + Math.random() * 0.12;
        this.life = 0;
        this.maxLife = 200 + Math.random() * 200;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        const ratio = this.life / this.maxLife;
        if (ratio < 0.2) {
          this.opacity = (ratio / 0.2) * this.maxOpacity;
        } else if (ratio > 0.7) {
          this.opacity = ((1 - ratio) / 0.3) * this.maxOpacity;
        } else {
          this.opacity = this.maxOpacity;
        }
        if (this.life >= this.maxLife || this.y < -10) this.reset();
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(42, 94, 187, ${this.opacity})`;
        ctx.fill();
      }
    }

    function init() {
      resize();
      particles = Array.from({ length: 60 }, () => new Particle());
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      animFrame = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    init();
    loop();
  }


  /* ==========================================================
     6. SCROLLTRIGGER — SERVICES
  ========================================================== */
  function initServicesReveal() {
    gsap.utils.toArray('.service-card').forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: i * 0.08,
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });
  }


  /* ==========================================================
     7. SCROLLTRIGGER — PROJECTS
  ========================================================== */
  function initProjectsReveal() {
    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        delay: i * 0.06,
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Project expand/collapse interaction
    document.querySelectorAll('.project-card').forEach(card => {
      const handleToggle = () => {
        const isExpanded = card.getAttribute('aria-expanded') === 'true';
        card.setAttribute('aria-expanded', String(!isExpanded));

        const expandArea = card.querySelector('.project-expand-area');
        if (expandArea) {
          if (!isExpanded) {
            gsap.fromTo(expandArea,
              { opacity: 0, height: 0 },
              { opacity: 1, height: 'auto', duration: 0.45, ease: 'power2.out' }
            );
            expandArea.style.display = 'flex';
          } else {
            gsap.to(expandArea, {
              opacity: 0,
              height: 0,
              duration: 0.3,
              ease: 'power2.in',
              onComplete: () => { expandArea.style.display = 'none'; }
            });
          }
        }
      };

      card.addEventListener('click', handleToggle);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle();
        }
      });
    });
  }


  /* ==========================================================
     8. SCROLLTRIGGER — EXPERIENCE MILESTONES
  ========================================================== */
  function initExperienceReveal() {
    gsap.utils.toArray('.milestone').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: i * 0.1,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Animate stat numbers (count up)
    gsap.utils.toArray('.stat-number').forEach(el => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          el.classList.add('is-visible');
          // Visual pulse
          gsap.fromTo(el,
            { scale: 0.85, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' }
          );
        }
      });
    });
  }


  /* ==========================================================
     9. SCROLLTRIGGER — HOW WE WORK
  ========================================================== */
  function initWorkReveal() {
    gsap.utils.toArray('.work-mode').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power3.out',
        delay: i * 0.1,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });
  }


  /* ==========================================================
     10. SCROLLTRIGGER — APPROACH PRINCIPLES
  ========================================================== */
  function initApproachReveal() {
    gsap.utils.toArray('.principle').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.65,
        ease: 'power3.out',
        delay: i * 0.1,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });

    gsap.to('.approach-quote', {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.approach-quote',
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });

    // Clarity graphic micro-animation
    const clarityGraphic = document.querySelector('.clarity-graphic');
    if (clarityGraphic) {
      ScrollTrigger.create({
        trigger: clarityGraphic,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.cg-chaos',
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' }
          );
          gsap.fromTo('.cg-order',
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.8, delay: 0.3, ease: 'back.out(1.4)' }
          );
          gsap.fromTo('.cg-arrow',
            { opacity: 0, scaleX: 0 },
            { opacity: 1, scaleX: 1, duration: 0.5, delay: 0.2, ease: 'power2.out', transformOrigin: 'left center' }
          );
        }
      });
    }
  }


  /* ==========================================================
     11. SMOOTH ANCHOR SCROLL
  ========================================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();
        const headerH = document.getElementById('site-header')?.offsetHeight || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;

        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }


  /* ==========================================================
     12. FOOTER YEAR
  ========================================================== */
  function initFooterYear() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }


  /* ==========================================================
     13. SIGNAL SVG — hover parallax
  ========================================================== */
  function initSignalInteraction() {
    const visual = document.querySelector('.hero-visual');
    if (!visual || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

    document.querySelector('.hero')?.addEventListener('mousemove', (e) => {
      const rect = visual.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetX = (e.clientX - cx) * 0.02;
      targetY = (e.clientY - cy) * 0.02;
    });

    function animateParallax() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      const svg = document.querySelector('.signal-svg');
      if (svg) {
        svg.style.transform = `scale(1) translate(${currentX}px, ${currentY}px) rotate(${gsap.getProperty(svg, 'rotation')}deg)`;
      }
      requestAnimationFrame(animateParallax);
    }
    // Only run parallax on desktop
    if (window.innerWidth > 900) animateParallax();
  }


  /* ==========================================================
     14. SECTION LABEL REVEAL (generic)
  ========================================================== */
  function initSectionLabels() {
    gsap.utils.toArray('.section-header').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Experience left column
    gsap.fromTo('.experience-left',
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.experience-left',
          start: 'top 86%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Contact content
    gsap.fromTo('.contact-content',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-content',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }


  /* ==========================================================
     INIT — run everything
  ========================================================== */
  function init() {
    gsap.registerPlugin(ScrollTrigger);

    initHeader();
    initMobileNav();
    initCanvas();
    initHeroAnimations();
    initServicesReveal();
    initProjectsReveal();
    initExperienceReveal();
    initWorkReveal();
    initApproachReveal();
    initSectionLabels();
    initSmoothScroll();
    initFooterYear();

    // Small delay for signal interaction (after hero loads)
    setTimeout(initSignalInteraction, 1200);
  }

});
