(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  document.querySelectorAll('[data-hero-3d]').forEach(function (hero) {
    var stage = hero.querySelector('.hero-3d__product');
    if (!stage || reduceMotion || !canHover) return;

    var maxDeg = 10;
    var raf = null;

    function onMove(event) {
      var rect = hero.getBoundingClientRect();
      var x = (event.clientX - rect.left) / rect.width - 0.5;
      var y = (event.clientY - rect.top) / rect.height - 0.5;

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        stage.style.transform =
          'rotateY(' + (x * maxDeg * 2) + 'deg) rotateX(' + (y * -maxDeg * 2) + 'deg) translateZ(10px)';
      });
    }

    function onEnter() {
      hero.classList.add('is-tilting');
    }

    function onLeave() {
      hero.classList.remove('is-tilting');
      stage.style.transform = '';
    }

    hero.addEventListener('mouseenter', onEnter);
    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
  });
})();
