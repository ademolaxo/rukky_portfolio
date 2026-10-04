const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-img').forEach((img) => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.classList.add('lightbox-open');
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.classList.remove('lightbox-open');
  lightboxImg.src = '';
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox(); // click outside image = close
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
function setupMarquee(row, direction, speed = 60) {
  const tracks = row.querySelectorAll('.marquee-track');
  const firstTrack = tracks[0];
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
}

document.querySelectorAll('.marquee-row').forEach((row) => {
  const direction = row.querySelector('.scroll-left') ? 'left' : 'right';
  setupMarquee(row, direction, 45); // 45 = speed, matches your old animation duration
});