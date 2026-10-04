const hamburger = document.querySelector('#navHamburger');
const navLinks = document.querySelector('#navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.classList.toggle('open', !isOpen);
  hamburger.setAttribute('aria-expanded', String(!isOpen));
  hamburger.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  navLinks.classList.toggle('mobile-open', !isOpen);
  navLinks.setAttribute('aria-hidden', String(isOpen));
  document.body.classList.toggle('menu-open', !isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    navLinks.classList.remove('mobile-open');
    navLinks.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 45, 360)}ms`;
  observer.observe(element);
});

/* =============================
   Infinite icon marquee (homepage hero)
============================= */
/* =============================
   Infinite icon marquee (homepage hero)
============================= */
function waitForImages(container) {
  const images = container.querySelectorAll('img');
  return Promise.all(Array.from(images).map((img) => {
    if (img.complete && img.naturalWidth !== 0) return Promise.resolve();
    return new Promise((resolve) => {
      img.addEventListener('load', resolve);
      img.addEventListener('error', resolve);
    });
  }));
}

function setupMarquee(row, direction, speed = 45) {
  const tracks = row.querySelectorAll('.icon-track');
  const firstTrack = tracks[0];

  waitForImages(row).then(() => {
    requestAnimationFrame(() => {
      const trackWidth = firstTrack.getBoundingClientRect().width;

      let position = direction === 'left' ? 0 : -trackWidth;
      const pxPerSecond = trackWidth / speed;
      let lastTime = null;
      let paused = false;

      row.addEventListener('mouseenter', () => paused = true);
      row.addEventListener('mouseleave', () => paused = false);

      function frame(time) {
        if (lastTime === null) lastTime = time;
        const delta = (time - lastTime) / 1000;
        lastTime = time;

        if (!paused) {
          if (direction === 'left') {
            position -= pxPerSecond * delta;
            if (position <= -trackWidth) position += trackWidth;
          } else {
            position += pxPerSecond * delta;
            if (position >= 0) position -= trackWidth;
          }
          row.style.transform = `translateX(${position}px)`;
        }

        requestAnimationFrame(frame);
      }

      requestAnimationFrame(frame);
    });
  });
}

document.querySelectorAll('.icon-marquee').forEach((row) => {
  const direction = row.querySelector('.scroll-left') ? 'left' : 'right';
  setupMarquee(row, direction, 45);
});

