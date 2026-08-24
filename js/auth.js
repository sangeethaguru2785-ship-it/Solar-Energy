(function () {
    'use strict';

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PHONE_RE = /^\+?[0-9\s\-()]{7,18}$/;

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    function showToast(msg, icon) {
        const old = document.querySelector('.auth-toast');
        if (old) old.remove();
        const el = document.createElement('div');
        el.className = 'auth-toast';
        el.innerHTML = '<i class="fa-solid ' + (icon || 'fa-circle-check') + '"></i><span>' + msg + '</span>';
        document.body.appendChild(el);
        setTimeout(() => {
            el.classList.add('leaving');
            setTimeout(() => el.remove(), 360);
        }, 2600);
    }

    function initRoleCards(formType) {
        const cards = $$('#' + formType + 'Form').length ? $$('.role-cards .role-card') : [];
        let current = 'user';
        cards.forEach(card => {
            card.addEventListener('click', () => {
                cards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                current = card.dataset.role;
            });
        });
        return () => {
            const active = document.querySelector('.role-cards .role-card.active');
            return active ? active.dataset.role : 'user';
        };
    }

    function initPwEyes() {
        $$('.pw-eye').forEach(btn => {
            btn.addEventListener('click', () => {
                const input = btn.parentElement.querySelector('input');
                const showing = input.type === 'text';
                input.type = showing ? 'password' : 'text';
                btn.innerHTML = '<i class="fa-solid ' + (showing ? 'fa-eye' : 'fa-eye-slash') + '"></i>';
            });
        });
    }

    function setErr(input, msg) {
        const group = input.closest('.f-group') || input.closest('.terms-wrap') || input.parentElement;
        const err = group.querySelector('.err-msg');
        input.classList.add('is-invalid');
        if (err) {
            err.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>' + msg;
            err.classList.add('show');
        }
    }

    function clearErr(input) {
        const group = input.closest('.f-group') || input.closest('.terms-wrap') || input.parentElement;
        const err = group ? group.querySelector('.err-msg') : null;
        input.classList.remove('is-invalid');
        if (err) err.classList.remove('show');
    }

    function watchClear(ids) {
        ids.forEach(id => {
            const el = $(id);
            if (!el) return;
            el.addEventListener('input', () => clearErr(el));
            el.addEventListener('change', () => clearErr(el));
        });
    }

    function scorePassword(v) {
        let s = 0;
        if (v.length >= 8) s++;
        if (v.length >= 12) s++;
        if (/[A-Z]/.test(v) && /[a-z]/.test(v)) s++;
        if (/[0-9]/.test(v)) s++;
        if (/[^A-Za-z0-9]/.test(v)) s++;
        return Math.min(s, 4);
    }

    function initStrength() {
        const input = $('#suPass');
        if (!input) return;
        const fill = $('#strengthFill');
        const txt = $('#strengthTxt');
        const levels = [
            ['12%', '#D23B3B', 'Weak'],
            ['34%', '#D23B3B', 'Weak'],
            ['58%', '#EDA408', 'Fair'],
            ['80%', '#7BAE3F', 'Good'],
            ['100%', '#1C4A2E', 'Strong']
        ];
        input.addEventListener('input', () => {
            const v = input.value;
            if (!v) {
                fill.style.width = '0%';
                txt.textContent = '';
                return;
            }
            const [w, c, label] = levels[scorePassword(v)];
            fill.style.width = w;
            fill.style.background = c;
            txt.textContent = label;
            txt.style.color = c;
        });
    }

    function shakeCard() {
        const card = document.querySelector('.auth-card');
        card.classList.remove('shake');
        void card.offsetWidth;
        card.classList.add('shake');
    }

    function setLoading(btn, text) {
        btn.disabled = true;
        btn.dataset.orig = btn.innerHTML;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>' + text;
    }

    function saveSession(name, role, remember) {
        const session = JSON.stringify({ name, role, at: Date.now() });
        if (remember) {
            localStorage.setItem('st_session', session);
        } else {
            sessionStorage.setItem('st_session', session);
        }
    }

    function redirectByRole(role) {
        window.location.href = role === 'admin' ? 'admin.html' : 'user-dashboard.html';
    }

    function initLogin() {
        const form = $('#loginForm');
        if (!form) return;

        const getRole = initRoleCards('login');

        form.addEventListener('submit', e => {
            e.preventDefault();
            const email = $('#lgEmail');
            const pass = $('#lgPass');
            let ok = true;

            if (!email.value.trim()) {
                setErr(email, 'Email address is required');
                ok = false;
            } else if (!EMAIL_RE.test(email.value.trim())) {
                setErr(email, 'Enter a valid email address');
                ok = false;
            }
            if (!pass.value) {
                setErr(pass, 'Password is required');
                ok = false;
            } else if (pass.value.length < 8) {
                setErr(pass, 'Password must be at least 8 characters');
                ok = false;
            }

            if (!ok) {
                shakeCard();
                return;
            }

            const role = getRole();
            const remember = $('#rememberMe').checked;
            setLoading($('#loginBtn'), 'Signing you in...');
            saveSession(email.value.trim().split('@')[0], role, remember);

            setTimeout(() => {
                showToast('Login successful. Redirecting...', 'fa-right-to-bracket');
                setTimeout(() => redirectByRole(role), 700);
            }, 900);
        });

        const fpForm = $('#forgotForm');
        if (fpForm) {
            fpForm.addEventListener('submit', e => {
                e.preventDefault();
                const em = $('#fpEmail');
                if (!em.value.trim() || !EMAIL_RE.test(em.value.trim())) {
                    setErr(em, 'Enter a valid email address');
                    return;
                }
                bootstrap.Modal.getInstance($('#forgotModal')).hide();
                fpForm.reset();
                showToast('Password reset link sent to your inbox', 'fa-envelope-circle-check');
            });
            watchClear(['#fpEmail']);
        }
    }

    function initSignup() {
        const form = $('#signupForm');
        if (!form) return;

        const getRole = initRoleCards('signup');

        form.addEventListener('submit', e => {
            e.preventDefault();
            const name = $('#suName');
            const email = $('#suEmail');
            const phone = $('#suPhone');
            const pass = $('#suPass');
            const conf = $('#suConf');
            const terms = $('#agreeTerms');
            let ok = true;

            if (name.value.trim().length < 3) {
                setErr(name, 'Please enter your full name');
                ok = false;
            }
            if (!email.value.trim()) {
                setErr(email, 'Email address is required');
                ok = false;
            } else if (!EMAIL_RE.test(email.value.trim())) {
                setErr(email, 'Enter a valid email address');
                ok = false;
            }
            if (!phone.value.trim()) {
                setErr(phone, 'Phone number is required');
                ok = false;
            } else if (!PHONE_RE.test(phone.value.trim())) {
                setErr(phone, 'Enter a valid phone number');
                ok = false;
            }
            if (!pass.value) {
                setErr(pass, 'Password is required');
                ok = false;
            } else if (pass.value.length < 8) {
                setErr(pass, 'Use at least 8 characters');
                ok = false;
            }
            if (conf.value !== pass.value || !conf.value) {
                setErr(conf, 'Passwords do not match');
                ok = false;
            }
            if (!terms.checked) {
                setErr(terms, 'You must accept the Terms & Conditions');
                ok = false;
            }

            if (!ok) {
                shakeCard();
                return;
            }

            const role = getRole();
            setLoading($('#signupBtn'), 'Creating your account...');
            saveSession(name.value.trim(), role, true);

            setTimeout(() => {
                showToast('Account created. Welcome aboard!', 'fa-party-horn');
                setTimeout(() => redirectByRole(role), 700);
            }, 1000);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initRoleCards('login');
        initPwEyes();
        initStrength();
        watchClear(['#lgEmail', '#lgPass', '#suName', '#suEmail', '#suPhone', '#suPass', '#suConf']);
        initLogin();
        initSignup();
    });
})();
