(function () {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var animOK = !prefersReduced && typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

    if (animOK) {
        gsap.registerPlugin(ScrollTrigger);
        document.documentElement.classList.add('anim');
    }

    document.addEventListener('DOMContentLoaded', function () {
        initHero();
        initServicesCarousel();
        initTechTabs();
    });

    function initHero() {
        if (!animOK) return;
        var lines = gsap.utils.toArray('.split-line-inner');
        if (!lines.length) return;
        gsap.set(lines, { yPercent: 115 });
        var tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.25 });
        tl.fromTo('.hero-eyebrow-light', { y: 18 }, { y: 0, opacity: 1, duration: 0.7 })
            .to(lines, { yPercent: 0, duration: 1.15, stagger: 0.13 }, '-=0.35')
            .fromTo('.hero-sub', { y: 34 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.6')
            .fromTo('.hero-cta', { y: 30 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.65')
            .fromTo('.hero-orb-container', { scale: 0.55, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.3, ease: 'elastic.out(1, 0.72)' }, '-=1')
            .fromTo('.scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.4');
    }

    function initServicesCarousel() {
        var track = document.getElementById('servicesCarousel');
        if (!track) return;
        var cards = Array.prototype.slice.call(track.children);
        var prevBtn = document.getElementById('svcPrev');
        var nextBtn = document.getElementById('svcNext');
        var index = 0;

        function visibleCount() {
            var w = window.innerWidth;
            if (w >= 1200) return 3;
            if (w >= 768) return 2;
            return 1;
        }
        function maxIndex() {
            return Math.max(0, cards.length - visibleCount());
        }
        function update() {
            index = Math.min(index, maxIndex());
            var step = cards[0].getBoundingClientRect().width + 30;
            track.style.transform = 'translateX(' + (-index * step) + 'px)';
            prevBtn.disabled = index === 0;
            nextBtn.disabled = index === maxIndex();
        }
        prevBtn.addEventListener('click', function () {
            index = Math.max(0, index - 1);
            update();
        });
        nextBtn.addEventListener('click', function () {
            index = Math.min(maxIndex(), index + 1);
            update();
        });
        var resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(update, 150);
        });
        update();
    }

    function initTechTabs() {
        var tabs = document.querySelectorAll('.tech-tab[data-index]');
        if (!tabs.length) return;
        var inner = document.getElementById('techInner');
        var img = document.getElementById('techImg');
        var label = document.getElementById('techLabel');
        var title = document.getElementById('techTitle');
        var desc = document.getElementById('techDesc');
        var features = document.getElementById('techFeatures');

        var data = [
            {
                img: 'images/hero-solar-closeup.webp',
                label: 'Photovoltaic Technology',
                title: 'Next-Gen N-Type Cells',
                desc: 'Engineered like diamonds. Our N-type monocrystalline cells squeeze power from the faintest rays of dawn and keep producing long after the evening glow.',
                features: ['22.8% conversion efficiency', 'Anti-reflective storm glass', '25-year performance warranty']
            },
            {
                img: 'images/engineer-inspect.webp',
                label: 'Power Electronics',
                title: 'Smart Hybrid Inverters',
                desc: 'The intelligent heart of your system. Hybrid inverters orchestrate panels, batteries and the grid in real time for maximum self-consumption.',
                features: ['97.8% peak efficiency', 'Seamless 10ms blackout switchover', 'Built-in emergency backup power']
            },
            {
                img: 'images/battery-wall.webp',
                label: 'Energy Storage',
                title: 'Modular Lithium Walls',
                desc: 'Bank your sunshine behind an elegant wall-mounted reservoir that powers your nights and shields you from rising tariffs.',
                features: ['10-40kWh scalable capacity', '6,000+ cycle lifespan', 'Storm-watch automatic charging']
            },
            {
                img: 'images/modern-home.webp',
                label: 'Smart Living',
                title: 'AI Energy Monitoring',
                desc: 'A digital brain for your roof. Panel-level analytics learn your habits, predict issues before they happen and optimize every watt you produce.',
                features: ['Panel-level real-time analytics', 'Predictive maintenance alerts', 'Automatic surplus grid selling']
            }
        ];

        data.forEach(function (d) {
            var pre = new Image();
            pre.src = d.img;
        });

        var current = 0;
        var timer = null;

        function apply(i) {
            var d = data[i];
            img.src = d.img;
            img.alt = d.title;
            label.textContent = d.label;
            title.textContent = d.title;
            desc.textContent = d.desc;
            features.innerHTML = d.features.map(function (f) {
                return '<li><i class="fa-solid fa-check"></i> <span>' + f + '</span></li>';
            }).join('');
        }

        function swap(i) {
            if (i === current) return;
            current = i;
            Array.prototype.forEach.call(tabs, function (t, ti) {
                t.classList.toggle('active', ti === i);
                t.setAttribute('aria-selected', String(ti === i));
            });
            var doSwap = function () {
                apply(i);
                if (animOK && inner) {
                    gsap.fromTo(inner, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
                }
            };
            if (animOK && inner) {
                gsap.to(inner, { opacity: 0, y: 18, duration: 0.28, ease: 'power2.in', onComplete: doSwap });
            } else {
                doSwap();
            }
        }

        function restart() {
            clearInterval(timer);
            timer = setInterval(function () {
                swap((current + 1) % data.length);
            }, 6500);
        }

        Array.prototype.forEach.call(tabs, function (tab) {
            tab.addEventListener('click', function () {
                swap(parseInt(tab.getAttribute('data-index'), 10));
                restart();
            });
        });

        restart();
    }
})();
