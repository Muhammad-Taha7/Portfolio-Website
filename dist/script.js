

// Preloader
window.addEventListener('load', function() {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
      document.body.style.overflow = 'visible';
      
      // Start hero animations after preloader
      initHeroAnimations();
    }, 500);
  }, 1500);
});

// Hero section animations
function initHeroAnimations() {
  const heroElements = [
    { selector: '.hero-text', delay: 200 },
    { selector: '.hero-description', delay: 400 },
    { selector: '.hero-buttons', delay: 600 },
    { selector: '.hero-social', delay: 800 },
    { selector: '.hero-stats', delay: 1000 },
    { selector: '.hero-image', delay: 1200 }
  ];
  
  heroElements.forEach(({ selector, delay }) => {
    setTimeout(() => {
      const element = document.querySelector(selector);
      if (element) {
        element.style.opacity = '1';
        element.classList.add('animate-fadeInUp');
      }
    }, delay);
  });
  
  // Start counter animation after stats appear
  setTimeout(() => {
    animateCounters();
  }, 1500);
}

// Counter animation
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 50;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + (counter.textContent === '100' ? '%' : '+');
      }
    };
    
    updateCounter();
  });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');
  
  if (window.scrollY > 100) {
    navbar.classList.add('bg-gray-900/95');
    navbar.classList.remove('bg-gray-900/80');
    backToTop.classList.remove('opacity-0', 'invisible');
  } else {
    navbar.classList.add('bg-gray-900/80');
    navbar.classList.remove('bg-gray-900/95');
    backToTop.classList.add('opacity-0', 'invisible');
  }
});

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');
const mobileOverlay = document.getElementById('mobile-overlay');

function openMobileMenu() {
  mobileMenu.style.right = '0';
  mobileOverlay.classList.remove('opacity-0', 'invisible');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.style.right = '-100%';
  mobileOverlay.classList.add('opacity-0', 'invisible');
  document.body.style.overflow = 'visible';
}

mobileMenuBtn.addEventListener('click', openMobileMenu);
closeMenu.addEventListener('click', closeMobileMenu);
mobileOverlay.addEventListener('click', closeMobileMenu);

// Close mobile menu when clicking nav links
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Typewriter effect
const texts = ['Frontend Developer', 'UI/UX Enthusiast', 'React Specialist', 'Problem Solver'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentText = texts[textIndex];
  const typewriterElement = document.getElementById('typewriter');
  
  if (isDeleting) {
    typewriterElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }
  
  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeWriter, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(typeWriter, 500);
  } else {
    setTimeout(typeWriter, isDeleting ? 50 : 100);
  }
}

// Start typewriter effect after page load
setTimeout(typeWriter, 2000);

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Active nav link highlighting
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    const span = link.querySelector('span');
    if (link.getAttribute('href') === '#' + current) {
      span.style.width = '100%';
      link.classList.add('text-amber-400');
    } else {
      span.style.width = '0%';
      link.classList.remove('text-amber-400');
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fadeInUp');
      entry.target.style.opacity = '1';
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-item, .project-card, .skill-card').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// Skills bar animation
const skillsObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll('.skill-bar');
      skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
          bar.style.width = width;
        }, 200);
      });
    }
  });
}, { threshold: 0.5 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Contact form handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(this);
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  
  // Show loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner animate-spin mr-2"></i>Sending...';
  submitBtn.disabled = true;
  
  // Simulate form submission (replace with actual form handling)
  setTimeout(() => {
    // Show success message
    submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
    submitBtn.classList.remove('bg-gradient-to-r', 'from-amber-400', 'to-yellow-500');
    submitBtn.classList.add('bg-green-500');
    
    // Reset form
    this.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      submitBtn.classList.remove('bg-green-500');
      submitBtn.classList.add('bg-gradient-to-r', 'from-amber-400', 'to-yellow-500');
    }, 3000);
  }, 2000);
});

// Back to top functionality
document.getElementById('back-to-top').addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Parallax effect for hero background elements
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.animate-float');
  
  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + (index * 0.1);
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Project cards hover effect
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Skill cards stagger animation
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

// Add loading animation to navbar links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    const span = this.querySelector('span');
    span.style.width = '100%';
    setTimeout(() => {
      if (!this.classList.contains('text-amber-400')) {
        span.style.width = '0%';
      }
    }, 300);
  });
});

// Random floating animation for background elements
function randomFloat() {
  const floatingElements = document.querySelectorAll('.animate-float');
  floatingElements.forEach(element => {
    const randomX = (Math.random() - 0.5) * 20;
    const randomY = (Math.random() - 0.5) * 20;
    element.style.transform += ` translate(${randomX}px, ${randomY}px)`;
  });
}

setInterval(randomFloat, 5000);

// Testimonials auto-scroll (if you want to add carousel functionality)
let testimonialIndex = 0;
const testimonials = document.querySelectorAll('#testimonials .bg-gray-800\\/50');

// Add smooth reveal animation for sections
const revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fadeInUp');
      entry.target.style.opacity = '1';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  revealObserver.observe(section);
});

// Add cursor trail effect
let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;

document.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function updateTrail() {
  trailX += (mouseX - trailX) * 0.1;
  trailY += (mouseY - trailY) * 0.1;
  
  // Create trail effect (optional - can be resource intensive)
  requestAnimationFrame(updateTrail);
}

// Initialize cursor trail
updateTrail();

// Add Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', function(e) {
  konamiCode.push(e.keyCode);
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    // Easter egg activated
    document.body.style.animation = 'gradient 2s ease infinite';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }
});

// Performance optimization - lazy loading for images
const imageObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.classList.add('animate-fadeIn');
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll('img').forEach(img => {
  imageObserver.observe(img);
});

// Add page load performance tracking
window.addEventListener('load', function() {
  const loadTime = performance.now();
  console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});

// Keyboard navigation accessibility
document.addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', function() {
  document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const style = document.createElement('style');
style.textContent = `
  .keyboard-navigation *:focus {
    outline: 2px solid #fbbf24 !important;
    outline-offset: 2px !important;
  }
`;
document.head.appendChild(style);

// Console message for developers
console.log(`
🚀 Welcome to Taha.Dev Portfolio!
👨‍💻 Interested in the code? Check out my GitHub: https://github.com/Muhammad-Taha7
💼 Let's connect: https://www.linkedin.com/in/muhammad-taha-zahid-385b4832b/
✨ Built with: HTML5, CSS3, JavaScript, Tailwind CSS
`);

// Service Worker registration (for PWA functionality)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    // You can register a service worker here for offline functionality
    console.log('Service Worker support detected');
  });
}

// Dark mode toggle (bonus feature)
function toggleDarkMode() {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('darkMode', !document.body.classList.contains('light-mode'));
}

// Initialize dark mode from localStorage
if (localStorage.getItem('darkMode') === 'false') {
  document.body.classList.add('light-mode');
}

// Add resize handler for responsive adjustments
window.addEventListener('resize', function() {
  // Close mobile menu on resize to desktop
  if (window.innerWidth >= 1024) {
    closeMobileMenu();
  }
});

// Add smooth page transitions
document.addEventListener('DOMContentLoaded', function() {
  // Add entrance animation to body
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease-in-out';
  
  window.addEventListener('load', function() {
    document.body.style.opacity = '1';
  });
});

// Add error handling for images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5Qjk4IiBmb250LXNpemU9IjE0Ij5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+Cjwvc3ZnPg==';
  });
});
