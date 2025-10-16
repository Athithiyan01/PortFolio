// Theme toggle with localStorage
(function initTheme() {
  var root = document.documentElement;
  var saved = localStorage.getItem('theme');
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    root.classList.add('dark');
  }
  document.getElementById('themeToggle')?.addEventListener('click', function () {
    root.classList.toggle('dark');
    localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
  });
})();

// Mobile menu toggle
(function initMobileMenu() {
  var btn = document.getElementById('mobileMenuBtn');
  var menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', function () {
    menu.classList.toggle('hidden');
  });
  // Close on link click
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { menu.classList.add('hidden'); });
  });
})();

// Smooth scroll enhancement for older browsers
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var id = this.getAttribute('href');
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Typing animation
(function initTyping() {
  var el = document.getElementById('typed');
  if (!el) return;
  var phrases = ['Java', 'SpringBoot', 'Mysql', 'Mongodb', 'Javascript', 'Docker', 'Spring AI', 'Spring MVC', 'Html', 'css'];
  var i = 0;
  var j = 0;
  var deleting = false;
  var speed = 110;
  function tick() {
    var full = phrases[i];
    if (!deleting) {
      el.textContent = full.slice(0, j + 1);
      j++;
      if (j === full.length) {
        deleting = true;
        setTimeout(tick, 1200);
        return;
      }
    } else {
      el.textContent = full.slice(0, j - 1);
      j--;
      if (j === 0) {
        deleting = false;
        i = (i + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 60 : speed);
  }
  tick();
})();

// Progress bars fill on view
(function initProgressObserve() {
  var bars = document.querySelectorAll('.bar');
  if (!('IntersectionObserver' in window) || bars.length === 0) {
    bars.forEach(function (b) { b.style.setProperty('--progress', (b.dataset.progress || 0) + '%'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var b = entry.target;
        b.style.setProperty('--progress', (b.dataset.progress || 0) + '%');
        io.unobserve(b);
      }
    });
  }, { threshold: 0.5 });
  bars.forEach(function (b) { io.observe(b); });
})();

// Reveal on scroll
(function initReveal() {
  var nodes = document.querySelectorAll('.reveal');
  if (nodes.length === 0) return;
  if (!('IntersectionObserver' in window)) {
    nodes.forEach(function (n) { n.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  nodes.forEach(function (n) { io.observe(n); });
})();

// Certificates slider
(function initCertSlider() {
  var track = document.getElementById('certTrack');
  var prev = document.getElementById('certPrev');
  var next = document.getElementById('certNext');
  var dotsContainer = document.getElementById('certDots');
  if (!track || !prev || !next || !dotsContainer) return;
  var slides = Array.from(track.children);
  var index = 0;
  function update() {
    track.style.transform = 'translateX(' + (-index * 100) + '%)';
    dotsContainer.querySelectorAll('button').forEach(function (b, i) {
      b.classList.toggle('active', i === index);
    });
  }
  slides.forEach(function (_, i) {
    var b = document.createElement('button');
    b.addEventListener('click', function () { index = i; update(); });
    dotsContainer.appendChild(b);
  });
  prev.addEventListener('click', function () { index = (index - 1 + slides.length) % slides.length; update(); });
  next.addEventListener('click', function () { index = (index + 1) % slides.length; update(); });
  update();
})();

// Contact form mailto fallback
(function initContactForm() {
  var form = document.querySelector('#contact form');
  if (!form) return;
  var submitBtn = form.querySelector('button[type="button"]');
  if (!submitBtn) return;
  submitBtn.addEventListener('click', function () {
    var inputs = form.querySelectorAll('.input');
    var status = document.getElementById('contactStatus');
    var name = inputs[0].value.trim();
    var email = inputs[1].value.trim();
    var message = inputs[2].value.trim();
    if (!name || !email || !message) {
      if (status) { status.textContent = 'Please fill out all fields.'; status.className = 'status error'; }
      return;
    }
    var subject = encodeURIComponent('Portfolio Contact from ' + name);
    var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
    if (status) { status.textContent = 'Message prepared. Opening your email app to send…'; status.className = 'status success'; }
    window.location.href = 'mailto:aathithiyan01@gmail.com?subject=' + subject + '&body=' + body;
  });
})();


