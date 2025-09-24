document.addEventListener('DOMContentLoaded', () => {
  const togglers = document.querySelectorAll('.navbar-toggler[data-bs-target], .navbar-toggler[data-target]');

  togglers.forEach(toggler => {
    const selector = toggler.getAttribute('data-bs-target') || toggler.getAttribute('data-target');
    if (!selector) return;
    const target = document.querySelector(selector);
    if (!target) return;

    toggler.setAttribute('aria-expanded', target.classList.contains('show') ? 'true' : 'false');

    toggler.addEventListener('click', (e) => {
      e.preventDefault();
      if (target.classList.contains('collapsing')) return;

      const syncTogglers = () => {
        document.querySelectorAll('[data-bs-target="'+selector+'"], [data-target="'+selector+'"]').forEach(t => {
          t.setAttribute('aria-expanded', target.classList.contains('show') ? 'true' : 'false');
        });
      };

      if (target.classList.contains('show')) {
        const currentHeight = target.getBoundingClientRect().height;
        target.style.height = currentHeight + 'px';
        target.offsetHeight;

        target.classList.remove('collapse', 'show');
        target.classList.add('collapsing');

        requestAnimationFrame(() => {
          target.style.height = '0px';
        });

        target.addEventListener('transitionend', function handler(ev) {
          if (ev.target !== target) return;
          target.classList.remove('collapsing');
          target.classList.add('collapse');
          target.style.height = '';
          target.removeEventListener('transitionend', handler);
          syncTogglers();
        }, { once: true });

      } else {
        target.classList.remove('collapse');
        const fullHeight = target.scrollHeight;
        target.style.height = '0px';
        target.offsetHeight;

        target.classList.add('collapsing');

        requestAnimationFrame(() => {
          target.style.height = fullHeight + 'px';
        });

        target.addEventListener('transitionend', function handler(ev) {
          if (ev.target !== target) return;
          target.classList.remove('collapsing');
          target.classList.add('collapse', 'show');
          target.style.height = '';
          target.removeEventListener('transitionend', handler);
          syncTogglers();
        }, { once: true });
      }
    });
  });
});