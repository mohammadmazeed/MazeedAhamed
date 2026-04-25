// ── Navigation ──
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Sidebar links
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      scrollToSection(link.dataset.section);
    });
  });

  initCarousel();
  
  // Update sidebar links on scroll and animate skills
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
        const link = document.querySelector(`.sidebar-link[data-section="${entry.target.id}"]`);
        if (link) link.classList.add('active');
        
        if (entry.target.id === 'skills') {
          animateSkills();
        }
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });
});

// ── Carousel ──
let currentSlide = 0;
let totalSlides = 0;
let autoPlayInterval;

function initCarousel() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;
  totalSlides = track.children.length;
  updateCarousel();
  startAutoPlay();
}

function updateCarousel() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

function goToSlide(i) {
  currentSlide = i;
  updateCarousel();
}

function startAutoPlay() {
  clearInterval(autoPlayInterval);
  autoPlayInterval = setInterval(nextSlide, 5000);
}

// ── Modals ──
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// Close modal on backdrop click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('show');
    document.body.style.overflow = '';
  }
});

// Close modal on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.show').forEach(m => {
      m.classList.remove('show');
    });
    document.body.style.overflow = '';
  }
});

// ── Skill Bar Animations ──
function animateSkills() {
  setTimeout(() => {
    document.querySelectorAll('.skill-fill').forEach(bar => {
      const w = bar.getAttribute('data-width');
      bar.style.width = w + '%';
      bar.classList.add('animated');
    });
  }, 300);
}

// ── Contact Form ──
function handleContact(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const msg = document.getElementById('contact-msg').value;

  if (!name || !email || !msg) {
    alert('Please fill all fields.');
    return;
  }

  const mailto = `mailto:mohammadmazeed49@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(msg + '\n\nFrom: ' + name + '\nEmail: ' + email)}`;
  window.location.href = mailto;
}
