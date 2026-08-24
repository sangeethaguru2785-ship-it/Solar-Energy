const seedUsers = [
    { id: 1, name: 'Robert Fox', email: 'robert.fox@email.com', role: 'customer', status: 'active', projects: 2, joined: 'Jan 14, 2026' },
    { id: 2, name: 'Jenny Wilson', email: 'jenny.w@email.com', role: 'customer', status: 'active', projects: 1, joined: 'Feb 03, 2026' },
    { id: 3, name: 'Devon Lane', email: 'devon.lane@email.com', role: 'installer', status: 'active', projects: 7, joined: 'Mar 22, 2025' },
    { id: 4, name: 'Courtney Henry', email: 'c.henry@email.com', role: 'admin', status: 'active', projects: 0, joined: 'Jun 11, 2024' },
    { id: 5, name: 'Wade Warren', email: 'wade.w@email.com', role: 'customer', status: 'pending', projects: 1, joined: 'Aug 01, 2026' },
    { id: 6, name: 'Kristin Watson', email: 'k.watson@email.com', role: 'installer', status: 'suspended', projects: 3, joined: 'Nov 30, 2025' },
    { id: 7, name: 'Cameron Williamson', email: 'cam.w@email.com', role: 'customer', status: 'active', projects: 4, joined: 'Apr 19, 2026' },
    { id: 8, name: 'Esther Howard', email: 'esther.h@email.com', role: 'customer', status: 'pending', projects: 1, joined: 'Aug 18, 2026' }
];

let users = JSON.parse(JSON.stringify(seedUsers));
let nextUserId = 9;

const seedProjects = [
    { id: 1, name: 'Horizon Logistics Hub', client: 'Horizon Corp', capacity: 1200, progress: 100, status: 'completed', output: '1.9 GWh' },
    { id: 2, name: 'Maple Residence', client: 'Robert Fox', capacity: 9.6, progress: 72, status: 'active', output: '14.2 MWh' },
    { id: 3, name: 'Sunfield Community Farm', client: 'City of Austin', capacity: 450, progress: 38, status: 'active', output: '310 MWh' },
    { id: 4, name: 'Oakwood Rooftop Retrofit', client: 'Sarah Mitchell', capacity: 12.4, progress: 15, status: 'pending', output: '-' },
    { id: 5, name: 'Riverside Storage Pairing', client: 'GreenGrid LLC', capacity: 300, progress: 88, status: 'active', output: '520 MWh' },
    { id: 6, name: 'Desert Peak Microgrid', client: 'Peak Utilities', capacity: 800, progress: 100, status: 'completed', output: '1.3 GWh' }
];
let projects = JSON.parse(JSON.stringify(seedProjects));
let nextProjectId = 7;

const seedServices = [
    { id: 1, icon: 'fa-house-signal', name: 'Residential Solar', desc: 'End-to-end rooftop design and installation for homes.', price: '$12k+', active: true },
    { id: 2, icon: 'fa-building', name: 'Commercial Program', desc: 'Utility-scale systems for business campuses and warehouses.', price: '$80k+', active: true },
    { id: 3, icon: 'fa-battery-full', name: 'Battery Storage', desc: 'Backup power and peak-shaving storage solutions.', price: '$6k+', active: true },
    { id: 4, icon: 'fa-charging-station', name: 'EV Charging', desc: 'Smart home and fleet charging infrastructure.', price: '$1.2k+', active: true },
    { id: 5, icon: 'fa-mountain-sun', name: 'Off-Grid Kits', desc: 'Complete independence packages for remote sites.', price: '$9k+', active: false },
    { id: 6, icon: 'fa-people-group', name: 'Community Solar', desc: 'Shared solar gardens for neighborhoods and co-ops.', price: 'Varies', active: true }
];
let services = JSON.parse(JSON.stringify(seedServices));

const activities = [
    { icon: 'fa-user-plus', tone: 'green', text: '<b>Wade Warren</b> registered as a new customer', time: '12 minutes ago' },
    { icon: 'fa-file-invoice-dollar', tone: 'yellow', text: 'Quote #Q-2841 generated for <b>Maple Residence</b>', time: '48 minutes ago' },
    { icon: 'fa-solar-panel', tone: 'green', text: '<b>Sunfield Community Farm</b> reached 38% completion', time: '2 hours ago' },
    { icon: 'fa-battery-full', tone: 'yellow', text: 'Battery inventory restocked - <b>42 units</b> received', time: '5 hours ago' },
    { icon: 'fa-user-shield', tone: 'green', text: '<b>Courtney Henry</b> updated billing permissions', time: 'Yesterday' },
    { icon: 'fa-truck-fast', tone: 'yellow', text: 'Installation crew dispatched to <b>Oakwood Rooftop</b>', time: 'Yesterday' }
];

let notifications = [
    { id: 1, icon: 'fa-user-plus', tone: 'nd-green', title: 'New user registered', body: 'Esther Howard created a customer account.', time: '10 min ago', unread: true },
    { id: 2, icon: 'fa-circle-exclamation', tone: 'nd-yellow', title: 'Quote awaiting approval', body: 'Quote Q-2841 for Maple Residence needs review.', time: '1 hour ago', unread: true },
    { id: 3, icon: 'fa-plug-circle-bolt', tone: 'nd-green', title: 'System export complete', body: 'Monthly production report is ready to download.', time: 'Today, 08:20', unread: true },
    { id: 4, icon: 'fa-screwdriver-wrench', tone: 'nd-yellow', title: 'Maintenance scheduled', body: 'Inverter firmware update this Sunday 02:00 UTC.', time: 'Mon', unread: false }
];

const revenueData = {
    '12M': {
        labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        data: [118, 132, 126, 149, 158, 171, 164, 189, 203, 214, 231, 248]
    },
    '6M': {
        labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        data: [164, 189, 203, 214, 231, 248]
    },
    '30D': {
        labels: ['W1', 'W2', 'W3', 'W4'],
        data: [52, 61, 58, 77]
    }
};

const userGrowth = {
    labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    data: [142, 168, 187, 224, 261, 298, 342]
};

const sectionTitles = {
    dashboard: ['Dashboard Overview', "Here's what's happening across your solar platform today."],
    users: ['User Management', 'Manage customers, installers and administrators.'],
    projects: ['Solar Projects', 'Track installations, capacity and delivery progress.'],
    solutions: ['Solutions', 'Performance across every solution line offered on the platform.'],
    services: ['Service Management', 'Toggle offerings live on the public website instantly.'],
    payments: ['Payments', 'Transactions, payouts and billing health at a glance.'],
    reports: ['Reports', 'Generate and download operational and performance reports.'],
    messages: ['Messages', 'Customer inquiries and internal conversations.'],
    notifications: ['Notifications', 'Everything that needs your attention, in one stream.'],
    settings: ['Settings', 'Manage your administrator account and platform preferences.']
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function initials(name) {
    return name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
}

function avatarClass(id) {
    return 'ua-' + ((id - 1) % 5 + 1);
}

function showToast(msg, icon) {
    const box = $('#toastBox');
    const el = document.createElement('div');
    el.className = 'adm-toast';
    el.innerHTML = '<i class="fa-solid ' + (icon || 'fa-circle-check') + '"></i><span>' + msg + '</span>';
    box.appendChild(el);
    setTimeout(() => {
        el.classList.add('leaving');
        setTimeout(() => el.remove(), 380);
    }, 2600);
}

function switchSection(key) {
    if (!sectionTitles[key]) return;
    $$('.adm-section').forEach(s => s.classList.remove('active'));
    $('#sec-' + key).classList.add('active');
    $$('.sb-link[data-section]').forEach(l => l.classList.toggle('active', l.dataset.section === key));
    closeSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeSidebar() {
    $('#admSidebar').classList.remove('open');
    $('#sbBackdrop').classList.remove('show');
}

function animateCount(el, target, fmt) {
    const dur = 1400;
    const start = performance.now();
    function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

function refreshStats() {
    const rev = 2480000;
    animateCount($('#stUsers'), users.length, n => n.toString());
    animateCount($('#stProjects'), projects.length, n => n.toString());
    animateCount($('#stServices'), services.filter(s => s.active).length, n => n.toString());
    animateCount($('#stRevenue'), rev / 1000, n => '$' + n.toLocaleString() + 'k');
    $('#navUserCount').textContent = users.length;
}

function userRow(u) {
    const roleLabel = u.role.charAt(0).toUpperCase() + u.role.slice(1);
    return '<tr data-id="' + u.id + '">' +
        '<td><div class="u-cell"><span class="u-avatar ' + avatarClass(u.id) + '">' + initials(u.name) + '</span>' +
        '<div><strong>' + u.name + '</strong><small>' + u.email + '</small></div></div></td>' +
        '<td>' + roleLabel + '</td>' +
        '<td>' + u.projects + '</td>' +
        '<td>' + u.joined + '</td>' +
        '<td><span class="badge-st bs-' + u.status + '">' + u.status.charAt(0).toUpperCase() + u.status.slice(1) + '</span></td>' +
        '<td class="text-end"><div class="row-act">' +
        '<button class="ra-btn view" data-action="cycle" title="Cycle status"><i class="fa-solid fa-arrows-rotate"></i></button>' +
        '<button class="ra-btn del" data-action="delete" title="Delete user"><i class="fa-solid fa-trash"></i></button>' +
        '</div></td></tr>';
}

function renderUsers() {
    const q = $('#userSearch').value.trim().toLowerCase();
    const rf = $('#userRoleFilter').value;
    const sf = $('#userStatusFilter').value;
    const list = users.filter(u =>
        (rf === 'all' || u.role === rf) &&
        (sf === 'all' || u.status === sf) &&
        (!q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
    );
    $('#userTableBody').innerHTML = list.length
        ? list.map(userRow).join('')
        : '<tr><td colspan="6" class="text-center py-4" style="color:var(--muted)">No users match your filters.</td></tr>';
    $('#userCountInfo').textContent = 'Showing ' + list.length + ' of ' + users.length + ' users';
}

function projCard(p) {
    const stCls = p.status === 'active' ? 'bs-active' : p.status === 'pending' ? 'bs-pending' : 'bs-suspended';
    return '<div class="proj-card" data-status="' + p.status + '">' +
        '<div class="proj-top"><div><h5>' + p.name + '</h5><small>' + p.client + '</small></div>' +
        '<span class="badge-st ' + stCls + '">' + p.status + '</span></div>' +
        '<div class="proj-kv"><span>Capacity</span><b>' + p.capacity + ' kWp</b></div>' +
        '<div class="proj-kv"><span>Energy Output</span><b>' + p.output + '</b></div>' +
        '<div class="prog-wrap"><div class="prog-meta"><span>Progress</span><span>' + p.progress + '%</span></div>' +
        '<div class="prog-track"><div class="prog-fill-adm" data-w="' + p.progress + '"></div></div></div></div>';
}

function renderProjects(filter) {
    const f = filter || 'all';
    const list = projects.filter(p => f === 'all' || p.status === f);
    $('#projectGrid').innerHTML = list.map(projCard).join('');
    requestAnimationFrame(() => {
        setTimeout(() => {
            $$('#projectGrid .prog-fill-adm').forEach(bar => {
                bar.style.width = bar.dataset.w + '%';
            });
        }, 60);
    });
}

function svcCard(s) {
    return '<div class="svc-card" data-id="' + s.id + '">' +
        '<div class="svc-head"><span class="svc-ico"><i class="fa-solid ' + s.icon + '"></i></span>' +
        '<div><h5>' + s.name + '</h5><small>ID: SVC-0' + s.id + '</small></div></div>' +
        '<p class="svc-desc">' + s.desc + '</p>' +
        '<div class="svc-foot"><span class="svc-price">' + s.price + ' <small>/ project</small></span>' +
        '<span style="display:flex;align-items:center;gap:10px">' +
        '<span class="svc-state ' + (s.active ? 'on' : 'off') + '" data-state>' + (s.active ? 'Live' : 'Paused') + '</span>' +
        '<span class="form-check form-switch m-0"><input class="form-check-input adm-switch js-svc-toggle" type="checkbox" ' + (s.active ? 'checked' : '') + ' aria-label="Toggle service"></span>' +
        '</span></div></div>';
}

function renderServices() {
    $('#serviceGrid').innerHTML = services.map(svcCard).join('');
}

function renderActivities() {
    $('#actList').innerHTML = activities.slice(0, 6).map(a =>
        '<li class="act-item"><span class="act-ico ai-' + a.tone + '"><i class="fa-solid ' + a.icon + '"></i></span>' +
        '<div class="act-body"><p>' + a.text + '</p><small>' + a.time + '</small></div></li>'
    ).join('');
}

function renderTopProjects() {
    const ranked = [...projects].sort((a, b) => b.capacity - a.capacity).slice(0, 5);
    $('#topProjects').innerHTML = ranked.map((p, i) =>
        '<li class="top-item"><span class="top-rank">' + (i + 1) + '</span>' +
        '<div class="top-info"><strong>' + p.name + '</strong><small>' + p.client + ' &bull; ' + p.capacity + ' kWp</small></div>' +
        '<span class="top-val">' + p.output + '</span></li>'
    ).join('');
}

function notifItem(n) {
    return '<div class="notif-item ' + (n.unread ? 'unread' : '') + '" data-id="' + n.id + '">' +
        '<span class="notif-dot ' + n.tone + '"><i class="fa-solid ' + n.icon + '"></i></span>' +
        '<div class="notif-body"><strong>' + n.title + '</strong><small>' + n.body + '</small>' +
        '<small class="notif-time">' + n.time + '</small></div></div>';
}

function renderNotifs() {
    $('#notifList').innerHTML = notifications.map(notifItem).join('');
    const unread = notifications.filter(n => n.unread).length;
    const badge = $('#notifBadge');
    badge.textContent = unread;
    badge.style.display = unread ? '' : 'none';
}

function initCharts() {
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#5F6F5A';

    const yCtx = $('#revenueChart').getContext('2d');
    const gradYellow = yCtx.createLinearGradient(0, 0, 0, 300);
    gradYellow.addColorStop(0, 'rgba(255, 201, 60, 0.45)');
    gradYellow.addColorStop(1, 'rgba(255, 201, 60, 0)');

    revenueChartInstance = new Chart(yCtx, {
        type: 'line',
        data: {
            labels: revenueData['12M'].labels,
            datasets: [{
                label: 'Revenue ($k)',
                data: revenueData['12M'].data,
                borderColor: '#EDA408',
                backgroundColor: gradYellow,
                fill: true,
                tension: 0.42,
                borderWidth: 3,
                pointRadius: 4,
                pointBackgroundColor: '#FFC93C',
                pointBorderColor: '#0F2E1D',
                pointBorderWidth: 2,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#0F2E1D',
                    padding: 12,
                    cornerRadius: 10,
                    titleFont: { family: "'Outfit', sans-serif", weight: '700' },
                    callbacks: { label: ctx => ' $' + ctx.parsed.y + 'k revenue' }
                }
            },
            scales: {
                x: { grid: { display: false }, ticks: { font: { size: 12 } } },
                y: {
                    border: { display: false },
                    grid: { color: 'rgba(28, 74, 46, 0.07)' },
                    ticks: { callback: v => '$' + v + 'k' }
                }
            }
        }
    });

    new Chart($('#usersChart'), {
        type: 'bar',
        data: {
            labels: userGrowth.labels,
            datasets: [{
                label: 'New Users',
                data: userGrowth.data,
                backgroundColor: [
                    'rgba(28, 74, 46, 0.25)', 'rgba(28, 74, 46, 0.35)', 'rgba(28, 74, 46, 0.45)',
                    'rgba(28, 74, 46, 0.55)', 'rgba(28, 74, 46, 0.7)', 'rgba(28, 74, 46, 0.85)',
                    '#FFC93C'
                ],
                borderRadius: 9,
                borderSkipped: false,
                barThickness: 'flex',
                maxBarThickness: 40
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#0F2E1D',
                    padding: 12,
                    cornerRadius: 10,
                    callbacks: { label: ctx => ' ' + ctx.parsed.y + ' new users' }
                }
            },
            scales: {
                x: { grid: { display: false } },
                y: {
                    border: { display: false },
                    grid: { color: 'rgba(28, 74, 46, 0.07)' }
                }
            }
        }
    });
}

let revenueChartInstance;

document.addEventListener('DOMContentLoaded', () => {
    refreshStats();
    renderUsers();
    renderProjects('all');
    renderServices();
    renderActivities();
    renderTopProjects();
    renderNotifs();
    initCharts();

    $$('.sb-link[data-section]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            switchSection(link.dataset.section);
        });
    });

    $$('.tb-user-menu [data-section]').forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            switchSection(item.dataset.section);
        });
    });

    $('#menuToggle').addEventListener('click', () => {
        const sb = $('#admSidebar');
        const open = sb.classList.toggle('open');
        $('#sbBackdrop').classList.toggle('show', open);
    });

    $('#sbBackdrop').addEventListener('click', closeSidebar);

    $('#revTabs').addEventListener('click', e => {
        const btn = e.target.closest('.ctab');
        if (!btn) return;
        $$('#revTabs .ctab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const d = revenueData[btn.dataset.range];
        revenueChartInstance.data.labels = d.labels;
        revenueChartInstance.data.datasets[0].data = d.data;
        revenueChartInstance.update();
    });

    $('#actRefresh').addEventListener('click', () => {
        activities.unshift({ ...activities[Math.floor(Math.random() * activities.length)], time: 'Just now' });
        renderActivities();
        showToast('Activity feed refreshed', 'fa-rotate');
    });

    function unreadMsgs() {
        return document.querySelectorAll('#msgList .msg-item.unread').length;
    }

    function syncMsgBadge() {
        const badge = $('#navMsgCount');
        const n = unreadMsgs();
        badge.textContent = n;
        badge.style.display = n ? '' : 'none';
    }

    syncMsgBadge();

    $('#msgList').addEventListener('click', e => {
        const item = e.target.closest('.msg-item');
        if (item && item.classList.contains('unread')) {
            item.classList.remove('unread');
            syncMsgBadge();
            showToast('Conversation marked as read', 'fa-envelope-open');
        }
    });

    $('#msgAllRead').addEventListener('click', () => {
        document.querySelectorAll('#msgList .msg-item.unread').forEach(m => m.classList.remove('unread'));
        syncMsgBadge();
        showToast('All messages marked read', 'fa-check-double');
    });

    $('#pgMarkAllRead').addEventListener('click', () => {
        document.querySelectorAll('#pgNotifList .ntf-row.unread').forEach(n => n.classList.remove('unread'));
        notifications.forEach(n => n.unread = false);
        renderNotifs();
        showToast('All notifications marked read', 'fa-bell-slash');
    });

    $$('.js-dl').forEach(btn => {
        btn.addEventListener('click', () => showToast('Report download started', 'fa-download'));
    });

    $$('.js-export').forEach(btn => {
        btn.addEventListener('click', () => showToast('Transactions exported to CSV', 'fa-file-csv'));
    });

    $('#userSearch').addEventListener('input', renderUsers);
    $('#userRoleFilter').addEventListener('change', renderUsers);
    $('#userStatusFilter').addEventListener('change', renderUsers);

    $('#addUserForm').addEventListener('submit', e => {
        e.preventDefault();
        const name = $('#nuName').value.trim();
        const email = $('#nuEmail').value.trim();
        if (!name || !email) {
            showToast('Please fill in name and email', 'fa-triangle-exclamation');
            return;
        }
        users.unshift({
            id: nextUserId++,
            name,
            email,
            role: $('#nuRole').value,
            status: $('#nuStatus').value,
            projects: 0,
            joined: 'Just now'
        });
        bootstrap.Modal.getInstance($('#addUserModal')).hide();
        e.target.reset();
        renderUsers();
        refreshStats();
        showToast('User "' + name + '" created');
    });

    $('#userTableBody').addEventListener('click', e => {
        const btn = e.target.closest('.ra-btn');
        if (!btn) return;
        const tr = btn.closest('tr');
        const id = Number(tr.dataset.id);
        const user = users.find(u => u.id === id);
        if (btn.dataset.action === 'delete') {
            users = users.filter(u => u.id !== id);
            tr.style.transition = 'opacity .3s ease';
            tr.style.opacity = '0';
            setTimeout(() => {
                renderUsers();
                refreshStats();
                showToast('User deleted', 'fa-trash');
            }, 280);
        } else {
            const order = ['active', 'pending', 'suspended'];
            user.status = order[(order.indexOf(user.status) + 1) % order.length];
            renderUsers();
            showToast(user.name + ' is now ' + user.status, 'fa-arrows-rotate');
        }
    });

    $('#projChips').addEventListener('click', e => {
        const chip = e.target.closest('.fchip');
        if (!chip) return;
        $$('#projChips .fchip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderProjects(chip.dataset.filter);
    });

    $('#addProjectForm').addEventListener('submit', e => {
        e.preventDefault();
        const name = $('#pjName').value.trim();
        const client = $('#pjClient').value.trim();
        if (!name || !client) {
            showToast('Please fill in project name and client', 'fa-triangle-exclamation');
            return;
        }
        projects.unshift({
            id: nextProjectId++,
            name,
            client,
            capacity: Number($('#pjCap').value) || 1,
            progress: 0,
            status: $('#pjStatus').value,
            output: '-'
        });
        bootstrap.Modal.getInstance($('#addProjectModal')).hide();
        e.target.reset();
        $('#pjCap').value = 8;
        renderProjects($$('#projChips .fchip.active')[0].dataset.filter);
        refreshStats();
        renderTopProjects();
        showToast('Project "' + name + '" created');
    });

    $('#serviceGrid').addEventListener('change', e => {
        if (!e.target.classList.contains('js-svc-toggle')) return;
        const card = e.target.closest('.svc-card');
        const svc = services.find(s => s.id === Number(card.dataset.id));
        svc.active = e.target.checked;
        card.querySelector('[data-state]').textContent = svc.active ? 'Live' : 'Paused';
        card.querySelector('[data-state]').className = 'svc-state ' + (svc.active ? 'on' : 'off');
        refreshStats();
        showToast(svc.name + (svc.active ? ' is now live' : ' paused'), svc.active ? 'fa-play' : 'fa-pause');
    });

    $('#profileForm').addEventListener('submit', e => {
        e.preventDefault();
        showToast('Profile updated successfully');
    });

    $('#passForm').addEventListener('submit', e => {
        e.preventDefault();
        const nw = $('#pwNew').value;
        const cf = $('#pwConf').value;
        if (!nw || nw.length < 8) {
            showToast('Password must be at least 8 characters', 'fa-triangle-exclamation');
            return;
        }
        if (nw !== cf) {
            showToast('Passwords do not match', 'fa-triangle-exclamation');
            return;
        }
        e.target.reset();
        showToast('Password updated securely', 'fa-lock');
    });

    $$('.pref-toggle').forEach(t => {
        const saved = localStorage.getItem(t.dataset.key);
        if (saved !== null) t.checked = saved === '1';
        t.addEventListener('change', () => {
            localStorage.setItem(t.dataset.key, t.checked ? '1' : '0');
            showToast('Preference saved');
        });
    });

    $('#markAllRead').addEventListener('click', () => {
        notifications.forEach(n => n.unread = false);
        renderNotifs();
        showToast('All notifications marked read', 'fa-bell-slash');
    });

    $('#notifList').addEventListener('click', e => {
        const item = e.target.closest('.notif-item');
        if (!item) return;
        const n = notifications.find(x => x.id === Number(item.dataset.id));
        if (n && n.unread) {
            n.unread = false;
            renderNotifs();
        }
    });

    const openLogout = e => {
        e.preventDefault();
        new bootstrap.Modal($('#confirmLogoutModal')).show();
    };
    $('#logoutBtn').addEventListener('click', openLogout);
    $('#logoutBtn2').addEventListener('click', openLogout);

    $('#confirmLogoutModal a[href="login.html"]').addEventListener('click', () => {
        localStorage.removeItem('st_session');
        sessionStorage.removeItem('st_session');
    });

    const hour = new Date().getHours();
    $('#greetTitle').textContent = 'Good ' + (hour < 12 ? 'Morning' : hour < 18 ? 'Afternoon' : 'Evening') + ', Maya';
});
