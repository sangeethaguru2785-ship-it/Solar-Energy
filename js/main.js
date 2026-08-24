(function () {
    var header = document.getElementById('siteHeader');
    var menuBtn = document.getElementById('menuBtn');
    var mobileNav = document.getElementById('mobileNav');
    var backToTop = document.getElementById('backToTop');
    var yearEl = document.getElementById('year');
    var navLinks = document.querySelectorAll('.desktop-nav a[href^="#"]');
    var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
    var contactFooter = document.querySelector('footer[id]');
    if (contactFooter) sections.push(contactFooter);

    if (yearEl) yearEl.textContent = new Date().getFullYear();

    function onScroll() {
        var y = window.scrollY || window.pageYOffset;
        header.classList.toggle('scrolled', y > 60);
        backToTop.classList.toggle('visible', y > 520);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    function closeNav() {
        mobileNav.classList.remove('active');
        mobileNav.setAttribute('aria-hidden', 'true');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        document.body.style.overflow = '';
    }

    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', function () {
            var open = mobileNav.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', String(open));
            mobileNav.setAttribute('aria-hidden', String(!open));
            menuBtn.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
            document.body.style.overflow = open ? 'hidden' : '';
        });
        Array.prototype.forEach.call(mobileNav.querySelectorAll('a'), function (a) {
            a.addEventListener('click', closeNav);
        });
    }

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if ('IntersectionObserver' in window && navLinks.length) {
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var id = entry.target.id;
                Array.prototype.forEach.call(navLinks, function (link) {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            });
        }, { rootMargin: '-38% 0px -55% 0px', threshold: 0 });
        sections.forEach(function (s) { spy.observe(s); });
    }

    var nlForm = document.getElementById('nlForm');
    var nlMsg = document.getElementById('nlMsg');
    if (nlForm && nlMsg) {
        nlForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var input = nlForm.querySelector('input[type="email"]');
            var value = input.value.trim();
            var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            if (valid) {
                nlMsg.textContent = 'Thanks! You are on the list - welcome to the sunny side.';
                nlMsg.style.color = '#EDA408';
                input.value = '';
                setTimeout(function () { nlMsg.textContent = ''; }, 6000);
            } else {
                nlMsg.textContent = 'Please enter a valid email address.';
                nlMsg.style.color = '#ff9d73';
            }
        });
    }
})();
