// reveal-on-scroll
(function () {
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // header shadow + scroll progress
  var header = document.querySelector('header');
  var prog = document.querySelector('.progress');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset || 0;
    if (header) header.classList.toggle('scrolled', y > 8);
    if (prog) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // alternating hero headline
  var rot = document.querySelector('.hrotate');
  if (rot) {
    var spans = rot.querySelectorAll(':scope > span');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var isMobile = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
    // On mobile: show only one headline (no crossfade). On desktop: alternate every 10s.
    if (spans.length > 1 && !reduce && !isMobile) {
      var i = 0;
      setInterval(function () {
        spans[i].classList.remove('is-active');
        i = (i + 1) % spans.length;
        spans[i].classList.add('is-active');
      }, 10000);
    }
  }

  // mobile menu
  var btn = document.querySelector('.navbtn');
  var panel = document.querySelector('.mobile-panel');
  if (btn && panel) {
    btn.addEventListener('click', function () {
      panel.classList.toggle('open');
      btn.classList.toggle('active');
    });
    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        panel.classList.remove('open');
        btn.classList.remove('active');
      });
    });
  }

  // Project gallery lightbox
  var galleryButtons = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
  if (galleryButtons.length) {
    var box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.innerHTML = '<button class="lightbox-close" type="button" aria-label="Close">×</button><button class="lightbox-prev" type="button" aria-label="Previous photo">‹</button><img alt=""><button class="lightbox-next" type="button" aria-label="Next photo">›</button>';
    document.body.appendChild(box);
    var boxImage = box.querySelector('img');
    var activeIndex = 0;
    var closeButton = box.querySelector('.lightbox-close');
    function showPhoto(index) {
      activeIndex = (index + galleryButtons.length) % galleryButtons.length;
      var image = galleryButtons[activeIndex].querySelector('img');
      boxImage.src = image.src;
      boxImage.alt = image.alt;
    }
    function openBox(index) {
      showPhoto(index);
      box.classList.add('open');
      document.body.style.overflow = 'hidden';
      closeButton.focus();
    }
    function closeBox() {
      box.classList.remove('open');
      document.body.style.overflow = '';
      galleryButtons[activeIndex].focus();
    }
    galleryButtons.forEach(function (button, index) {
      button.addEventListener('click', function () { openBox(index); });
    });
    closeButton.addEventListener('click', closeBox);
    box.querySelector('.lightbox-prev').addEventListener('click', function () { showPhoto(activeIndex - 1); });
    box.querySelector('.lightbox-next').addEventListener('click', function () { showPhoto(activeIndex + 1); });
    box.addEventListener('click', function (event) { if (event.target === box) closeBox(); });
    document.addEventListener('keydown', function (event) {
      if (!box.classList.contains('open')) return;
      if (event.key === 'Escape') closeBox();
      if (event.key === 'ArrowLeft') showPhoto(activeIndex - 1);
      if (event.key === 'ArrowRight') showPhoto(activeIndex + 1);
    });
  }
})();
