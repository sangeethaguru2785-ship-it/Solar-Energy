(function () {
    'use strict';

    const backBtn = document.getElementById('goBackBtn');

    backBtn.addEventListener('click', () => {
        if (window.history.length > 1 && document.referrer !== '') {
            window.history.back();
        } else {
            window.location.href = 'index.html';
        }
    });

    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (fine && !reduced) {
        const layers = document.querySelectorAll('.plx');
        let raf = null;

        document.addEventListener('mousemove', e => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                const dx = (e.clientX / window.innerWidth - 0.5) * 2;
                const dy = (e.clientY / window.innerHeight - 0.5) * 2;
                layers.forEach(el => {
                    const d = Number(el.dataset.depth) || 10;
                    el.style.transform = 'translate3d(' + (-dx * d).toFixed(1) + 'px, ' + (-dy * d).toFixed(1) + 'px, 0)';
                });
                raf = null;
            });
        });

        document.addEventListener('mouseleave', () => {
            layers.forEach(el => {
                el.style.transform = '';
            });
        });
    }
})();
