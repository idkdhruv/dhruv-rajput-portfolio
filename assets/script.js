(() => {
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }
  document.querySelectorAll('.unavailable-link').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      showToast('Unavailable — link has not been added yet.');
    });
  });
  document.querySelectorAll('.unavailable-nav').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      showToast('Resume unavailable — add your resume link when ready.');
    });
  });
  const navItems = [...document.querySelectorAll('.nav-item')];
  function setActive(id) {
    navItems.forEach(item => item.classList.toggle('active', item.dataset.nav === id));
  }
  navItems.forEach(item => {
    item.addEventListener('click', event => {
      const targetId = item.dataset.nav;
      if (targetId === 'resume') return;
      setActive(targetId);
    });
  });
  if ('IntersectionObserver' in window) {
    const pairs = [
      ['about', document.getElementById('about')],
      ['projects', document.getElementById('projects')],
      ['contact', document.getElementById('contact')]
    ];
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, {rootMargin:'-18% 0px -65% 0px', threshold:[0,.15,.4]});
    pairs.forEach(([, section]) => section && observer.observe(section));
  }
})();
