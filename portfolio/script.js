/* ═══════════════════════════════════════
   ANDRÉS SARRIA — PORTFOLIO SCRIPT
   ═══════════════════════════════════════ */

(function() {
'use strict';

// ─── LOADER ─────────────────────────────
const loaderMessages = [
    '$ initializing system...',
    '$ loading modules...',
    '$ mounting interface...',
    '$ connecting github api...',
    '$ rendering portfolio...',
    '$ ready.',
];

let msgIndex = 0;
let progress = 0;
const loaderLine = document.getElementById('loader-line');
const loaderBarEl = document.querySelector('.loader-bar');
const loaderEl = document.getElementById('loader');

function advanceLoader() {
    if (msgIndex < loaderMessages.length) {
        if (loaderLine) loaderLine.textContent = loaderMessages[msgIndex];
        msgIndex++;
        progress = (msgIndex / loaderMessages.length) * 100;
        if (loaderBarEl) loaderBarEl.style.width = progress + '%';
        const delay = msgIndex === loaderMessages.length ? 600 : 320;
        setTimeout(advanceLoader, delay);
    } else {
        setTimeout(() => {
            if (loaderEl) {
                loaderEl.classList.add('hidden');
                setTimeout(() => { loaderEl.remove(); }, 800);
            }
            initAll();
        }, 400);
    }
}
setTimeout(advanceLoader, 200);

// Loader Three.js canvas
(function() {
    const canvas = document.getElementById('loader-canvas');
    if (!canvas || typeof THREE === 'undefined') return;
    const r = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    r.setPixelRatio(window.devicePixelRatio);
    r.setSize(window.innerWidth, window.innerHeight);
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, .1, 100);
    cam.position.z = 4;
    const geo = new THREE.IcosahedronGeometry(1.2, 1);
    const mat = new THREE.MeshBasicMaterial({ color: 0x6c63ff, wireframe: true, opacity: .15, transparent: true });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    function animate() {
        if (!document.getElementById('loader-canvas')) return;
        requestAnimationFrame(animate);
        mesh.rotation.x += .003;
        mesh.rotation.y += .005;
        r.render(scene, cam);
    }
    animate();
})();

// ─── MAIN INIT ───────────────────────────
function initAll() {
    initCursor();
    initNav();
    initHeroCanvas();
    initTerminal();
    initReveal();
    initHeroText();
    initCounters();
    initSkillTabs();
    initSkillBars();
    initRoleDynamic();
    initMobileMenu();
    initContactForm();
}

// ─── CUSTOM CURSOR ───────────────────────
function initCursor() {
    const outer = document.getElementById('cursor-outer');
    const inner = document.getElementById('cursor-inner');
    const text  = document.getElementById('cursor-text');
    if (!outer) return;

    let ox = 0, oy = 0, ix = 0, iy = 0;
    let tx = 0, ty = 0;

    document.addEventListener('mousemove', e => {
        ix = e.clientX; iy = e.clientY;
        inner.style.left = ix + 'px';
        inner.style.top  = iy + 'px';
        text.style.left  = ix + 'px';
        text.style.top   = iy + 'px';
    });

    function animOuter() {
        ox += (ix - ox) * .12;
        oy += (iy - oy) * .12;
        outer.style.left = ox + 'px';
        outer.style.top  = oy + 'px';
        requestAnimationFrame(animOuter);
    }
    animOuter();

    document.querySelectorAll('[data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-active');
            const label = el.dataset.cursor;
            if (label && label !== 'true') {
                text.textContent = label;
                document.body.classList.add('cursor-text-active');
            }
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-active', 'cursor-text-active');
        });
    });

    document.querySelectorAll('a, button, .skill-tab, .skill-card, .repo-card, .channel-item, .cert-item').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active', 'cursor-text-active'));
    });
}

// ─── NAV ─────────────────────────────────
function initNav() {
    const nav = document.getElementById('nav');
    const progress = document.getElementById('nav-progress');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);

        const total = document.body.scrollHeight - window.innerHeight;
        if (progress) progress.style.width = ((window.scrollY / total) * 100) + '%';

        // Active link
        document.querySelectorAll('.nav-link').forEach(link => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            const rect = target.getBoundingClientRect();
            link.classList.toggle('active', rect.top <= 80 && rect.bottom > 80);
        });
    });
}

// ─── HERO CANVAS ─────────────────────────
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(55, canvas.offsetWidth / canvas.offsetHeight, .1, 200);
    cam.position.z = 35;

    // Particles
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        positions[i*3]   = (Math.random() - .5) * 80;
        positions[i*3+1] = (Math.random() - .5) * 80;
        positions[i*3+2] = (Math.random() - .5) * 80;
        const t = Math.random();
        colors[i*3]   = .4 + t * .2;
        colors[i*3+1] = .35 + t * .2;
        colors[i*3+2] = 1;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({ size: .12, vertexColors: true, transparent: true, opacity: .7 });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Floating wireframe torus
    const torusGeo = new THREE.TorusGeometry(8, .04, 3, 100);
    const torusMat = new THREE.MeshBasicMaterial({ color: 0x6c63ff, opacity: .12, transparent: true });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(14, -4, -10);
    scene.add(torus);

    const torus2 = torus.clone();
    torus2.position.set(-14, 5, -15);
    torus2.rotation.z = Math.PI / 3;
    scene.add(torus2);

    // Mouse parallax
    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
        mx = (e.clientX / window.innerWidth  - .5) * 2;
        my = (e.clientY / window.innerHeight - .5) * 2;
    });

    let frame = 0;
    function animate() {
        requestAnimationFrame(animate);
        frame += .005;

        points.rotation.y  = frame * .08 + mx * .05;
        points.rotation.x  = my * .03;
        torus.rotation.x  += .004;
        torus.rotation.z  += .002;
        torus2.rotation.y += .003;
        torus2.rotation.x += .005;

        renderer.render(scene, cam);
    }
    animate();

    window.addEventListener('resize', () => {
        const w = canvas.offsetWidth, h = canvas.offsetHeight;
        renderer.setSize(w, h);
        cam.aspect = w / h;
        cam.updateProjectionMatrix();
    });
}

// ─── TERMINAL ────────────────────────────
function initTerminal() {
    const body = document.getElementById('terminal-body');
    if (!body) return;

    const lines = [
        { cls: 't-comment', text: '# whoami' },
        { cls: 't-prompt', text: '$ ', suffix: { cls: 't-cmd', text: 'cat ./about.json' } },
        { cls: 't-output', text: '{' },
        { cls: 't-output', text: '  <key>"name"</key>: <val>"Andrés Sarria"</val>,', tpl: true },
        { cls: 't-output', text: '  <key>"role"</key>: <val>"Full Stack Engineer"</val>,', tpl: true },
        { cls: 't-output', text: '  <key>"focus"</key>: <val>"Cybersecurity"</val>,', tpl: true },
        { cls: 't-output', text: '  <key>"semester"</key>: <val>9</val>,', tpl: true },
        { cls: 't-output', text: '  <key>"available"</key>: <val>true</val>', tpl: true },
        { cls: 't-output', text: '}' },
        { cls: 't-prompt', text: '$ ', suffix: { cls: 't-cmd', text: 'ls ./skills/' } },
        { cls: 't-section', text: 'python  java  javascript  react' },
        { cls: 't-section', text: 'security  networking  docker  sql' },
        { cls: 't-prompt', text: '$ ', suffix: { cls: 't-cmd', text: 'status --check' } },
        { cls: 't-success', text: '✓ All systems operational' },
        { cls: 't-success', text: '✓ Ready for new challenges' },
        { cls: 't-prompt', text: '$ ', suffix: { cls: 't-cmd', text: '' }, blink: true },
    ];

    lines.forEach((line, i) => {
        const span = document.createElement('span');
        span.className = `t-line ${line.cls}`;

        if (line.tpl) {
            // Replace tags
            const html = line.text
                .replace(/<key>/g, '<span class="t-key">')
                .replace(/<\/key>/g, '</span>')
                .replace(/<val>/g, '<span class="t-val">')
                .replace(/<\/val>/g, '</span>');
            span.innerHTML = html;
        } else if (line.suffix) {
            const p = document.createElement('span');
            p.className = line.cls;
            p.textContent = line.text;
            const s = document.createElement('span');
            s.className = line.suffix.cls;
            s.textContent = line.suffix.text;
            span.textContent = '';
            span.appendChild(p);
            span.appendChild(s);
            if (line.blink) {
                const cur = document.createElement('span');
                cur.className = 'cursor-blink';
                cur.textContent = '█';
                cur.style.color = 'var(--accent)';
                span.appendChild(cur);
            }
        } else {
            span.textContent = line.text;
        }

        body.appendChild(span);
        setTimeout(() => span.classList.add('show'), 300 + i * 150);
    });
}

// ─── REVEAL ON SCROLL ────────────────────
function initReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('revealed');
                io.unobserve(e.target);
            }
        });
    }, { threshold: .12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => io.observe(el));
}

// ─── HERO TEXT ANIMATION ─────────────────
function initHeroText() {
    // Staggered title reveal
    setTimeout(() => {
        document.querySelectorAll('.title-line').forEach((el, i) => {
            setTimeout(() => el.classList.add('in'), i * 200);
        });
    }, 200);

    // Badge, desc etc reveal
    const revealEls = document.querySelectorAll('.hero-content [data-reveal], .hero-badge, .hero-roles, .hero-desc, .hero-actions, .hero-socials');
    revealEls.forEach((el, i) => {
        el.style.transitionDelay = (i * .1) + 's';
        setTimeout(() => el.classList.add('revealed'), 600 + i * 100);
    });
    const statsStrip = document.querySelector('.stats-strip');
    if (statsStrip) setTimeout(() => statsStrip.classList.add('revealed'), 1200);
}

// ─── COUNTERS ────────────────────────────
function initCounters() {
    const els = document.querySelectorAll('.stat-num[data-count]');
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const target = parseInt(el.dataset.count);
            const dur = 1600;
            const start = performance.now();
            function tick(now) {
                const p = Math.min((now - start) / dur, 1);
                const ease = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(ease * target);
                if (p < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
            io.unobserve(el);
        });
    }, { threshold: .5 });
    els.forEach(el => io.observe(el));
}

// ─── SKILL TABS ──────────────────────────
function initSkillTabs() {
    document.querySelectorAll('.skill-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.skills-panel').forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const panel = document.getElementById('tab-' + tab.dataset.tab);
            if (panel) {
                panel.classList.add('active');
                // Animate skill bars in new panel
                setTimeout(() => animateSkillBarsIn(panel), 50);
            }
        });
    });
}

function animateSkillBarsIn(container) {
    container.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = (bar.dataset.w || 0) + '%';
        }, 80);
    });
}

// ─── SKILL BARS ──────────────────────────
function initSkillBars() {
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const panel = document.querySelector('.skills-panel.active');
            if (panel) animateSkillBarsIn(panel);
            io.disconnect();
        });
    }, { threshold: .2 });
    const section = document.getElementById('skills');
    if (section) io.observe(section);
}

// ─── DYNAMIC ROLES ───────────────────────
function initRoleDynamic() {
    const el = document.getElementById('role-dynamic');
    if (!el) return;
    const roles = ['Cybersecurity Expert', 'Backend Developer', 'Ethical Hacker', 'Problem Solver', 'Systems Engineer'];
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;

    function type() {
        const current = roles[roleIdx];
        if (!deleting) {
            el.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            if (charIdx === current.length) {
                deleting = true;
                setTimeout(type, 1800);
                return;
            }
        } else {
            el.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            if (charIdx === 0) {
                deleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
            }
        }
        setTimeout(type, deleting ? 60 : 100);
    }
    type();
}

// ─── MOBILE MENU ─────────────────────────
function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const menu   = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        menu.classList.toggle('open');
        document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    menu.querySelectorAll('.m-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('open');
            menu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// ─── CONTACT FORM ────────────────────────
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const orig = btn.innerHTML;
        btn.innerHTML = '<span>¡Mensaje enviado!</span><i class="fas fa-check"></i>';
        btn.style.background = 'var(--green)';
        btn.style.color = '#000';
        setTimeout(() => {
            btn.innerHTML = orig;
            btn.style.background = '';
            btn.style.color = '';
            form.reset();
        }, 3000);
    });
}

})();
