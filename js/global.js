(function () {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var animOK = !prefersReduced && typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

    if (animOK) {
        gsap.registerPlugin(ScrollTrigger);
        document.documentElement.classList.add('anim');
    }

    document.addEventListener('DOMContentLoaded', function () {
        initReveals();
        initCounters();
        initProgressCircles();
    });

    function initReveals() {
        if (!animOK) return;
        var variants = [
            { selector: '.fade-up', prop: 'y', value: 56 },
            { selector: '.fade-left', prop: 'x', value: 64 },
            { selector: '.fade-right', prop: 'x', value: -64 }
        ];
        variants.forEach(function (variant) {
            gsap.utils.toArray(variant.selector).forEach(function (el) {
                var from = { opacity: 0 };
                from[variant.prop] = variant.value;
                var to = { opacity: 1, duration: 1, ease: 'power3.out' };
                to[variant.prop] = 0;
                to.delay = parseFloat(el.getAttribute('data-delay')) || 0;
                to.scrollTrigger = { trigger: el, start: 'top 88%', once: true };
                gsap.fromTo(el, from, to);
            });
        });
    }

    function initCounters() {
        var counters = document.querySelectorAll('.counter[data-target]');
        if (!counters.length) return;
        if (!('IntersectionObserver' in window)) {
            Array.prototype.forEach.call(counters, setFinal);
            return;
        }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                io.unobserve(entry.target);
                if (prefersReduced) setFinal(entry.target);
                else animateCounter(entry.target);
            });
        }, { threshold: 0.4 });
        Array.prototype.forEach.call(counters, function (el) { io.observe(el); });

        function decimals(el) {
            var raw = el.getAttribute('data-target');
            return (raw.split('.')[1] || '').length;
        }
        function setFinal(el) {
            el.textContent = parseFloat(el.getAttribute('data-target')).toFixed(decimals(el));
        }
        function animateCounter(el) {
            var target = parseFloat(el.getAttribute('data-target'));
            var dec = decimals(el);
            var duration = 2000;
            var start = null;
            function frame(ts) {
                if (start === null) start = ts;
                var p = Math.min((ts - start) / duration, 1);
                var eased = 1 - Math.pow(1 - p, 3);
                el.textContent = (target * eased).toFixed(dec);
                if (p < 1) requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
        }
    }

    function initProgressCircles() {
        var CIRC = 339.3;
        var circles = document.querySelectorAll('.progress-circle[data-value]');
        if (!circles.length) return;
        var fill = function (circle) {
            var f = circle.querySelector('.prog-fill');
            if (!f) return;
            var value = parseFloat(circle.getAttribute('data-value'));
            f.style.strokeDashoffset = CIRC * (1 - value / 100);
        };
        if (!('IntersectionObserver' in window)) {
            Array.prototype.forEach.call(circles, fill);
            return;
        }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                io.unobserve(entry.target);
                fill(entry.target);
            });
        }, { threshold: 0.5 });
        Array.prototype.forEach.call(circles, function (c) { io.observe(c); });
    }
})();
