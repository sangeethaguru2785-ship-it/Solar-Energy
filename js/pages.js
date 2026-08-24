(function () {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var animOK = !prefersReduced && typeof window.gsap !== 'undefined';

    document.addEventListener('DOMContentLoaded', function () {
        initPageHero();
        initSpotlights();
        initFilters();
        initSolutionModal();
        initEstimator();
        initContactForm();
        initDeepLinks();
        initBeforeAfter();
    });

    function initPageHero() {
        var hero = document.querySelector('.page-hero');
        if (!hero) return;
        if (!animOK) return;
        gsap.from('.breadcrumbs, .page-title, .page-sub', {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
            delay: 0.15
        });
    }

    function initSpotlights() {
        var cards = document.querySelectorAll('.info-card');
        Array.prototype.forEach.call(cards, function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
                card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
            });
        });
    }

    function initFilters() {
        var bars = document.querySelectorAll('[data-filter-group]');
        Array.prototype.forEach.call(bars, function (bar) {
            var chips = bar.querySelectorAll('[data-filter]');
            var gridId = bar.getAttribute('data-filter-group');
            var grid = document.getElementById(gridId);
            if (!grid) return;
            var items = grid.querySelectorAll('[data-category]');
            Array.prototype.forEach.call(chips, function (chip) {
                chip.addEventListener('click', function () {
                    var filter = chip.getAttribute('data-filter');
                    Array.prototype.forEach.call(chips, function (c) {
                        c.classList.toggle('active', c === chip);
                        c.setAttribute('aria-selected', String(c === chip));
                    });
                    Array.prototype.forEach.call(items, function (item) {
                        var show = filter === 'all' || item.getAttribute('data-category') === filter;
                        item.classList.toggle('card-hide', !show);
                        if (show && animOK) {
                            gsap.fromTo(item, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' });
                        }
                    });
                });
            });
        });
    }

    var SOL_DATA = {
        'sol-residential': {
            tag: 'Residential',
            img: 'images/modern-home.jpg',
            title: 'Home Solar Bundle',
            desc: 'A complete rooftop ecosystem: Tier-1 black panels, a smart hybrid inverter and real-time app control - engineered to erase your household bill and installed in a single day.',
            specs: ['fa-bolt|4-12 kW systems', 'fa-piggy-bank|5-7 yr payback', 'fa-shield-halved|25 yr warranty'],
            features: ['Sleek all-black premium panels', 'Critter guard & roof-leak-proof mounting', 'Live production + consumption app', 'Panel-level performance analytics']
        },
        'sol-storage': {
            tag: 'Storage',
            img: 'images/battery-wall.jpg',
            title: 'Solar + Battery Backup',
            desc: 'Bank your sunshine in an elegant wall-mounted lithium reservoir. When the grid blinks, your home does not - switchover is faster than a light bulb flicker.',
            specs: ['fa-battery-full|10-40 kWh modular', 'fa-plug-circle-bolt|10 ms switchover', 'fa-arrows-rotate|6,000 cycles'],
            features: ['Whole-home or essential-loads backup', 'Storm-watch automatic pre-charging', 'Time-of-use tariff optimization', 'Stackable, whisper-quiet modules']
        },
        'sol-commercial': {
            tag: 'Commercial',
            img: 'images/hero-solar-aerial.jpg',
            title: 'Business Rooftop Program',
            desc: 'Turn idle rooftops and parking into inflation-proof power plants. We handle engineering, incentives and interconnection while you watch operating costs fall.',
            specs: ['fa-industry|50 kW - 5 MW', 'fa-file-contract|PPA or lease', 'fa-percent|30% ITC handled'],
            features: ['Zero-capex financing options', 'Demand-charge reduction strategy', 'Full O&M included for 10 years', 'Multi-site portfolio rollouts']
        },
        'sol-ev': {
            tag: 'EV',
            img: 'images/ev-charging.jpg',
            title: 'Carport & EV Hub',
            desc: 'Fuel your vehicles with pure sunlight. Solar canopies with load-balanced Level 2 or DC-fast charging for homes, workplaces and fleets.',
            specs: ['fa-charging-station|7-22 kW chargers', 'fa-scale-balanced|Load balanced', 'fa-solar-panel|Solar paired'],
            features: ['Level 2 & DC fast options', 'Tap-to-charge app payments', 'Fleet-ready energy reporting', 'Shade-generating structures']
        },
        'sol-offgrid': {
            tag: 'Off-Grid',
            img: 'images/hero-solar-closeup.jpg',
            title: 'Off-Grid & Cabin Kits',
            desc: 'Total independence in a crate. Pre-engineered hybrid kits with lithium storage and generator sync, delivered anywhere the grid forgot to go.',
            specs: ['fa-mountain-sun|3-15 kW hybrid', 'fa-generator|Generator sync', 'fa-snowflake|All-climate rated'],
            features: ['Complete kit, delivered ready-to-install', 'Winterized racking & wiring', 'Satellite remote monitoring', 'Silent overnight battery operation']
        },
        'sol-community': {
            tag: 'Utility',
            img: 'images/hero-sun-flare.jpg',
            title: 'Community & Utility Solar',
            desc: 'Gigawatt thinking, community sized. Subscription-based solar gardens that let any renter or business buy into clean power - no roof required.',
            specs: ['fa-city|1-80 MW gardens', 'fa-users|Subscription model', 'fa-map-location-dot|GIS siting'],
            features: ['Subscriber management & billing', 'Interconnection handled end-to-end', 'Tax-equity investment ready', 'Agrivoltaics land-sharing options']
        }
    };

    function initSolutionModal() {
        var modalEl = document.getElementById('solModal');
        if (!modalEl) return;
        var cards = document.querySelectorAll('.sol-card[data-solution]');
        var mImg = document.getElementById('smImg');
        var mTag = document.getElementById('smTag');
        var mTitle = document.getElementById('smTitle');
        var mDesc = document.getElementById('smDesc');
        var mSpecs = document.getElementById('smSpecs');
        var mFeatures = document.getElementById('smFeatures');

        Array.prototype.forEach.call(cards, function (card) {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            function open() {
                var d = SOL_DATA[card.getAttribute('data-solution')];
                if (!d) return;
                mImg.src = d.img;
                mImg.alt = d.title;
                mTag.textContent = d.tag;
                mTitle.textContent = d.title;
                mDesc.textContent = d.desc;
                mSpecs.innerHTML = d.specs.map(function (s) {
                    var parts = s.split('|');
                    return '<span class="spec"><i class="fa-solid ' + parts[0] + '"></i>' + parts[1] + '</span>';
                }).join('');
                mFeatures.innerHTML = d.features.map(function (f) {
                    return '<li><i class="fa-solid fa-check"></i> <span>' + f + '</span></li>';
                }).join('');
                var modal = bootstrap.Modal.getOrCreateInstance(modalEl);
                modal.show();
            }
            card.addEventListener('click', open);
            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    open();
                }
            });
        });
    }

    function initEstimator() {
        var bill = document.getElementById('estBill');
        var sun = document.getElementById('estSun');
        if (!bill || !sun) return;
        var outSize = document.getElementById('estSizeOut');
        var outYearly = document.getElementById('estYearlyOut');
        var out25 = document.getElementById('est25Out');
        var outCo2 = document.getElementById('estCo2Out');
        var coverageMap = { fair: 0.62, good: 0.78, great: 0.92 };
        var TARIFF = 0.17;

        function fmt(n) {
            return '$' + Math.round(n).toLocaleString('en-US');
        }

        function update() {
            bill.style.setProperty('--fill', ((bill.value - bill.min) / (bill.max - bill.min)) * 100 + '%');
            var coverage = coverageMap[sun.value];
            var monthlyKwh = bill.value / TARIFF;
            var sizeKw = Math.max(2, (monthlyKwh / 118) * coverage);
            var yearlySave = bill.value * 12 * coverage * 0.93;
            var co2Tons = (monthlyKwh * 12 * coverage * 0.00073);

            outSize.textContent = sizeKw.toFixed(1) + ' kW';
            outYearly.textContent = fmt(yearlySave);
            out25.textContent = fmt(yearlySave * 25);
            outCo2.textContent = co2Tons.toFixed(1) + ' tons';
        }

        bill.addEventListener('input', update);
        sun.addEventListener('change', update);
        update();
    }

    function initContactForm() {
        var form = document.getElementById('contactForm');
        if (!form) return;
        var status = document.getElementById('cfStatus');
        var submitBtn = document.getElementById('cfSubmit');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var valid = true;
            var required = form.querySelectorAll('[required]');
            Array.prototype.forEach.call(required, function (field) {
                var ok = field.value.trim() !== '';
                if (ok && field.type === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
                field.classList.toggle('is-invalid', !ok);
                if (!ok) valid = false;
            });
            if (!valid) {
                status.textContent = 'Please fill in the highlighted fields correctly.';
                status.style.color = '#e5484d';
                return;
            }
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Sending...';
            status.textContent = '';
            setTimeout(function () {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
                status.textContent = 'Thanks! A solar advisor will reach out within one business day.';
                status.style.color = '#1C4A2E';
                form.reset();
            }, 1100);
        });

        Array.prototype.forEach.call(form.querySelectorAll('.form-control-c'), function (field) {
            field.addEventListener('input', function () {
                field.classList.remove('is-invalid');
            });
        });
    }

    function initBeforeAfter() {
        var compares = document.querySelectorAll('.ba-compare');
        if (!compares.length) return;
        Array.prototype.forEach.call(compares, function (wrap) {
            var range = wrap.querySelector('.ba-range');
            function set(v) {
                wrap.style.setProperty('--pos', v + '%');
            }
            if (!range) return;
            range.addEventListener('input', function () {
                set(range.value);
            });
            set(range.value);
            if (animOK && 'IntersectionObserver' in window) {
                var io = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (!entry.isIntersecting) return;
                        io.unobserve(entry.target);
                        var obj = { p: parseFloat(range.value) || 50 };
                        gsap.to(obj, {
                            p: 72,
                            duration: 1,
                            ease: 'power2.inOut',
                            onUpdate: function () { set(obj.p); },
                            onComplete: function () {
                                gsap.to(obj, {
                                    p: 34,
                                    duration: 1,
                                    ease: 'power2.inOut',
                                    onUpdate: function () { set(obj.p); }
                                });
                            }
                        });
                    });
                }, { threshold: 0.5 });
                io.observe(wrap);
            }
        });
    }

    function initDeepLinks() {
        if (!window.location.hash) return;
        var target = document.querySelector(window.location.hash);
        if (target && animOK) {
            setTimeout(function () {
                gsap.fromTo(target, { scale: 0.985 }, { scale: 1, duration: 0.8, ease: 'power2.out' });
            }, 400);
        }
    }
})();
