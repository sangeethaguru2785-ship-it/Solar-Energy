(function () {
    'use strict';

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    function getSessionName() {
        let raw = localStorage.getItem('st_session') || sessionStorage.getItem('st_session');
        if (!raw) return null;
        try {
            return JSON.parse(raw).name || null;
        } catch (e) {
            return null;
        }
    }

    function titleCase(s) {
        return s.replace(/\b\w/g, c => c.toUpperCase());
    }

    function applyIdentity() {
        const name = getSessionName();
        if (!name) return;
        const first = name.split(' ')[0];
        const initials = name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
        $('#udName').textContent = name;
        $('#udAvatar').textContent = initials;
        $('#greetLine').innerHTML = 'Good ' + timeWord() + ', <span>' + titleCase(first) + '</span>';
        const profView = $('#profNameView');
        if (profView) profView.textContent = name;
        const profInput = $('#udProfName');
        if (profInput) profInput.value = name;
    }

    function timeWord() {
        const h = new Date().getHours();
        return h < 12 ? 'Morning' : h < 18 ? 'Afternoon' : 'Evening';
    }

    function animateStats() {
        document.querySelectorAll('.sc-val[data-count]').forEach(el => {
            const target = Number(el.dataset.count);
            const fmt = el.dataset.fmt;
            const dur = 1300;
            const start = performance.now();
            function tick(now) {
                const p = Math.min((now - start) / dur, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                const val = Math.round(target * eased);
                if (fmt === 'kwh') el.textContent = val + ' kWh';
                else if (fmt === 'usd') el.textContent = '$' + val.toLocaleString();
                else if (fmt === 'kg') el.textContent = val.toLocaleString() + ' kg';
                else el.textContent = val.toString();
                if (p < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
        });
    }

    function initCharts() {
        Chart.defaults.font.family = "'Inter', sans-serif";
        Chart.defaults.color = '#5F6F5A';

        const ctx = $('#prodChart').getContext('2d');
        const grad = ctx.createLinearGradient(0, 0, 0, 280);
        grad.addColorStop(0, 'rgba(255, 201, 60, 0.45)');
        grad.addColorStop(1, 'rgba(255, 201, 60, 0)');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                datasets: [{
                    label: 'Production (kWh)',
                    data: [610, 540, 430, 380, 470, 590, 720, 810, 880, 920, 895, 842],
                    borderColor: '#EDA408',
                    backgroundColor: grad,
                    fill: true,
                    tension: 0.42,
                    borderWidth: 3,
                    pointRadius: 3.5,
                    pointBackgroundColor: '#FFC93C',
                    pointBorderColor: '#0F2E1D',
                    pointBorderWidth: 2,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#0F2E1D',
                        padding: 11,
                        cornerRadius: 10,
                        callbacks: { label: c => ' ' + c.parsed.y + ' kWh produced' }
                    }
                },
                scales: {
                    x: { grid: { display: false } },
                    y: {
                        border: { display: false },
                        grid: { color: 'rgba(28, 74, 46, 0.07)' },
                        ticks: { callback: v => v + ' kWh' }
                    }
                }
            }
        });

        new Chart($('#splitChart'), {
            type: 'doughnut',
            data: {
                labels: ['Self-use', 'Grid export', 'Battery'],
                datasets: [{
                    data: [52, 31, 17],
                    backgroundColor: ['#1C4A2E', '#FFC93C', '#EDA408'],
                    borderColor: '#FFFFFF',
                    borderWidth: 4,
                    hoverOffset: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '72%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#0F2E1D',
                        padding: 11,
                        cornerRadius: 10,
                        callbacks: { label: c => ' ' + c.label + ': ' + c.parsed + '%' }
                    }
                }
            }
        });
    }

    function initSidebar() {
        const sb = $('#udSidebar');
        const backdrop = $('#udBackdrop');
        const menuBtn = $('#udMenuBtn');
        if (!sb || !backdrop || !menuBtn) return;

        window.__closeDrawer = function close() {
            sb.classList.remove('open');
            backdrop.classList.remove('show');
        };

        menuBtn.addEventListener('click', () => {
            const open = sb.classList.toggle('open');
            backdrop.classList.toggle('show', open);
        });

        backdrop.addEventListener('click', () => window.__closeDrawer());

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') window.__closeDrawer();
        });
    }

    const udTitles = {
        dashboard: ['Dashboard', 'Your energy at a glance.'],
        profile: ['My Profile', 'Your personal details and account information.'],
        system: ['My Solar System', 'Hardware overview and live health of your installation.'],
        projects: ['My Projects', 'Every job booked at your property, from quote to switch-on.'],
        usage: ['Energy Usage', 'How much energy your home draws, uses and exports.'],
        savings: ['Energy Savings', 'What going solar is saving you, month after month.'],
        services: ['Services', 'Stackly services available to your account.'],
        payments: ['Payments', 'Invoices, payment methods and billing history.'],
        support: ['Support', 'We typically respond within 2 hours, day or night.'],
        notifications: ['Notifications', 'Alerts about your system, billing and account.'],
        settings: ['Settings', 'Choose how and when we keep you posted.']
    };

    let usageChartReady = false;
    let savingsChartReady = false;

    function initUsageChart() {
        if (usageChartReady) return;
        usageChartReady = true;
        new Chart($('#usageChart'), {
            type: 'line',
            data: {
                labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                datasets: [
                    {
                        label: 'Production',
                        data: [720, 810, 880, 920, 895, 842],
                        borderColor: '#EDA408',
                        backgroundColor: '#FFC93C',
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 3,
                        pointBackgroundColor: '#FFC93C',
                        pointBorderColor: '#0F2E1D'
                    },
                    {
                        label: 'Home Usage',
                        data: [640, 610, 580, 605, 618, 581],
                        borderColor: '#1C4A2E',
                        borderDash: [7, 5],
                        tension: 0.4,
                        borderWidth: 2.5,
                        pointRadius: 3,
                        pointBackgroundColor: '#1C4A2E'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, padding: 18 } },
                    tooltip: { backgroundColor: '#0F2E1D', padding: 11, cornerRadius: 10, callbacks: { label: c => ' ' + c.dataset.label + ': ' + c.parsed.y + ' kWh' } }
                },
                scales: {
                    x: { grid: { display: false } },
                    y: { border: { display: false }, grid: { color: 'rgba(28,74,46,0.07)' }, ticks: { callback: v => v + ' kWh' } }
                }
            }
        });
    }

    function initSavingsChart() {
        if (savingsChartReady) return;
        savingsChartReady = true;
        new Chart($('#savingsChart'), {
            type: 'bar',
            data: {
                labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                datasets: [{
                    label: 'Cumulative Savings',
                    data: [980, 1120, 1280, 1420, 1526, 1712],
                    backgroundColor: ['rgba(28,74,46,0.25)', 'rgba(28,74,46,0.35)', 'rgba(28,74,46,0.45)', 'rgba(28,74,46,0.55)', 'rgba(28,74,46,0.75)', '#FFC93C'],
                    borderRadius: 9,
                    borderSkipped: false,
                    maxBarThickness: 44
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { backgroundColor: '#0F2E1D', padding: 11, cornerRadius: 10, callbacks: { label: c => ' $' + c.parsed.y.toLocaleString() + ' saved' } }
                },
                scales: {
                    x: { grid: { display: false } },
                    y: { border: { display: false }, grid: { color: 'rgba(28,74,46,0.07)' }, ticks: { callback: v => '$' + v } }
                }
            }
        });
    }

    function switchUdSection(key) {
        if (!udTitles[key]) return;
        document.querySelectorAll('.ud-sec').forEach(s => s.classList.remove('active'));
        $('#sec-' + key).classList.add('active');
        document.querySelectorAll('.usb-link[data-section]').forEach(l => l.classList.toggle('active', l.dataset.section === key));
        if (key === 'usage') setTimeout(initUsageChart, 120);
        if (key === 'savings') setTimeout(initSavingsChart, 120);
        if (window.__closeDrawer) window.__closeDrawer();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function bindRouter() {
        $$('.usb-link[data-section]').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                switchUdSection(link.dataset.section);
            });
        });
    }

    function showToast(msg, icon) {
        const old = document.querySelector('.ud-toast');
        if (old) old.remove();
        const el = document.createElement('div');
        el.className = 'ud-toast';
        el.innerHTML = '<i class="fa-solid ' + (icon || 'fa-circle-check') + '"></i><span>' + msg + '</span>';
        document.body.appendChild(el);
        setTimeout(() => {
            el.classList.add('leaving');
            setTimeout(() => el.remove(), 360);
        }, 2600);
    }

    function bindActions() {
        $('#udProfileForm').addEventListener('submit', e => {
            e.preventDefault();
            showToast('Profile updated successfully');
        });

        $('#udPassForm').addEventListener('submit', e => {
            e.preventDefault();
            const nw = $('#udPwNew').value;
            const cf = $('#udPwConf').value;
            const PW_SPECIAL = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
            if (!nw) return showToast('Password is required', 'fa-triangle-exclamation');
            if (nw.length < 8) return showToast('Password must be at least 8 characters', 'fa-triangle-exclamation');
            if (!/[a-z]/.test(nw)) return showToast('Password must contain at least 1 lowercase letter', 'fa-triangle-exclamation');
            if (!/[A-Z]/.test(nw)) return showToast('Password must contain at least 1 uppercase letter', 'fa-triangle-exclamation');
            if (!/[0-9]/.test(nw)) return showToast('Password must contain at least 1 number', 'fa-triangle-exclamation');
            if (!PW_SPECIAL.test(nw)) return showToast('Password must contain at least 1 special character', 'fa-triangle-exclamation');
            if (nw !== cf) return showToast('Passwords do not match', 'fa-triangle-exclamation');
            e.target.reset();
            showToast('Password updated securely', 'fa-lock');
        });

        $('#udTicketForm').addEventListener('submit', e => {
            e.preventDefault();
            const sub = $('#tkSubject').value.trim();
            const cat = $('#tkCat').value;
            const msg = $('#tkMsg').value.trim();
            if (!sub || !cat || !msg) return showToast('Please complete all ticket fields', 'fa-triangle-exclamation');
            e.target.reset();
            showToast('Ticket #' + Math.floor(1000 + Math.random() * 9000) + ' submitted — we\u2019ll reply soon', 'fa-ticket');
        });

        $('#sec-payments').addEventListener('click', e => {
            const pay = e.target.closest('.js-pay');
            if (pay) {
                const row = pay.closest('tr');
                row.querySelector('.badge-st').className = 'badge-st bs-completed';
                row.querySelector('.badge-st').textContent = 'paid';
                pay.remove();
                showToast('Payment of $86.20 completed', 'fa-circle-check');
                return;
            }
            const rec = e.target.closest('.js-receipt');
            if (rec) {
                rec.preventDefault();
                showToast('Receipt download started', 'fa-download');
            }
        });

        $('#uMarkAllRead').addEventListener('click', () => {
            document.querySelectorAll('#uNotifList .ntf-row-u.unread').forEach(n => n.classList.remove('unread'));
            showToast('All notifications marked read', 'fa-bell-slash');
        });

        $$('.u-pref').forEach(t => {
            const saved = localStorage.getItem(t.dataset.key);
            if (saved !== null) t.checked = saved === '1';
            t.addEventListener('change', () => {
                localStorage.setItem(t.dataset.key, t.checked ? '1' : '0');
                showToast('Preference saved');
            });
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        applyIdentity();
        animateStats();
        initCharts();
        initSidebar();
        bindRouter();
        bindActions();

        document.addEventListener('click', function (e) {
            if (e.target.closest('.ud-sidebar') || e.target.closest('.ud-topbar') || e.target.closest('.modal')) return;
            var target = e.target.closest('a, button, [role="button"], input[type="checkbox"], input[type="submit"], select');
            if (target) {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = '404.html';
            }
        });
    });
})();
