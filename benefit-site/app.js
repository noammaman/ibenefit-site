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
    if (spans.length > 1 && !reduce) {
      var i = 0;
      setInterval(function () {
        spans[i].classList.remove('is-active');
        i = (i + 1) % spans.length;
        spans[i].classList.add('is-active');
      }, 7000);
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
})();
