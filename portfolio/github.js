/* ═══════════════════════════════════════
   GITHUB REPOS — ANDRÉS SARRIA
   ═══════════════════════════════════════ */

(function() {
'use strict';

const USERNAME = 'Andresfss09';
const API_URL  = `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`;

const LANG_CONFIG = {
    'JavaScript': { color: '#f7df1e', icon: 'fab fa-js' },
    'TypeScript': { color: '#3178c6', icon: 'fab fa-js' },
    'Python':     { color: '#3572a5', icon: 'fab fa-python' },
    'Java':       { color: '#b07219', icon: 'fab fa-java' },
    'HTML':       { color: '#e34c26', icon: 'fab fa-html5' },
    'CSS':        { color: '#563d7c', icon: 'fab fa-css3-alt' },
    'PHP':        { color: '#4f5d95', icon: 'fab fa-php' },
    'Ruby':       { color: '#701516', icon: 'fas fa-gem' },
    'Go':         { color: '#00add8', icon: 'fas fa-code' },
    'Rust':       { color: '#dea584', icon: 'fas fa-cog' },
    'Shell':      { color: '#89e051', icon: 'fas fa-terminal' },
    'C':          { color: '#555555', icon: 'fas fa-code' },
    'C++':        { color: '#f34b7d', icon: 'fas fa-code' },
    'Kotlin':     { color: '#a97bff', icon: 'fas fa-code' },
};

const REPO_ICONS = {
    'security': 'fa-shield-alt',
    'hack':     'fa-bug',
    'cyber':    'fa-terminal',
    'web':      'fa-globe',
    'api':      'fa-server',
    'app':      'fa-mobile-alt',
    'bot':      'fa-robot',
    'scraper':  'fa-spider',
    'db':       'fa-database',
    'tool':     'fa-tools',
    'game':     'fa-gamepad',
    'portfolio':'fa-briefcase',
};

function getRepoIcon(name = '', desc = '') {
    const text = (name + desc).toLowerCase();
    for (const [key, icon] of Object.entries(REPO_ICONS)) {
        if (text.includes(key)) return icon;
    }
    return 'fa-code-branch';
}

function formatDate(iso) {
    const d = new Date(iso);
    const now = new Date();
    const diff = now - d;
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Hoy';
    if (days === 1) return 'Ayer';
    if (days < 7)  return `${days}d atrás`;
    if (days < 30) return `${Math.floor(days/7)}sem atrás`;
    if (days < 365) return `${Math.floor(days/30)}mes atrás`;
    return `${Math.floor(days/365)}a atrás`;
}

function renderCard(repo, index) {
    const lang = repo.language || 'Otro';
    const langConf = LANG_CONFIG[lang] || { color: '#6c63ff', icon: 'fas fa-code' };
    const icon = getRepoIcon(repo.name, repo.description || '');
    const desc = repo.description || 'Proyecto de ingeniería de sistemas y ciberseguridad.';

    return `
    <div class="repo-card" style="animation-delay:${index * 80}ms">
        <div class="repo-card-top">
            <div class="repo-icon"><i class="fas ${icon}"></i></div>
            <div class="repo-name">${repo.name.replace(/-/g, ' ')}</div>
            <a href="${repo.html_url}" target="_blank" rel="noopener" class="repo-link" title="Ver en GitHub">
                <i class="fas fa-arrow-up-right-from-square"></i>
            </a>
        </div>

        <p class="repo-desc">${desc}</p>

        <div class="repo-meta">
            <span class="repo-lang">
                <span class="lang-dot" style="background:${langConf.color}"></span>
                <i class="${langConf.icon}" style="color:${langConf.color}; font-size:.8rem"></i>
                ${lang}
            </span>

            ${repo.stargazers_count > 0 ? `
            <span class="repo-stat">
                <i class="far fa-star" style="color:#ffd700"></i>
                ${repo.stargazers_count}
            </span>` : ''}

            ${repo.forks_count > 0 ? `
            <span class="repo-stat">
                <i class="fas fa-code-branch" style="color:var(--accent-2)"></i>
                ${repo.forks_count}
            </span>` : ''}

            <span class="repo-date font-mono">${formatDate(repo.updated_at)}</span>
        </div>
    </div>`;
}

function renderError(message) {
    return `
    <div style="grid-column:1/-1; text-align:center; padding:4rem 0; color:var(--text-3)">
        <i class="fas fa-exclamation-triangle" style="font-size:2rem;color:var(--red);display:block;margin-bottom:1rem"></i>
        <p class="font-mono" style="font-size:.85rem;margin-bottom:1.5rem">${message}</p>
        <button onclick="window.loadGitHub()" style="font-family:var(--font-mono);font-size:.82rem;color:var(--accent);border:1.5px solid var(--accent);padding:.5rem 1.1rem;border-radius:8px;background:transparent;cursor:pointer;transition:background .2s" onmouseover="this.style.background='rgba(108,99,255,.1)'" onmouseout="this.style.background='transparent'">
            <i class="fas fa-sync-alt" style="margin-right:.5rem"></i>Reintentar
        </button>
    </div>`;
}

function renderEmpty() {
    return `
    <div style="grid-column:1/-1; text-align:center; padding:4rem 0; color:var(--text-3)">
        <i class="fas fa-folder-open" style="font-size:2rem;color:var(--accent);display:block;margin-bottom:1rem"></i>
        <p class="font-mono" style="font-size:.85rem">No hay repositorios públicos aún.</p>
    </div>`;
}

async function loadGitHub() {
    const grid = document.getElementById('repos-grid');
    if (!grid) return;

    grid.innerHTML = `
        <div class="repos-loading">
            <div class="loading-spinner"></div>
            <span class="font-mono" style="font-size:.82rem">Conectando con GitHub API...</span>
        </div>`;

    try {
        const res = await fetch(API_URL, {
            headers: { 'Accept': 'application/vnd.github.v3+json' }
        });

        if (!res.ok) {
            if (res.status === 403) throw new Error('API rate limit alcanzado. Intenta en unos minutos.');
            if (res.status === 404) throw new Error('Usuario no encontrado.');
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const all = await res.json();
        const repos = all
            .filter(r => !r.fork && !r.private)
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 9);

        if (!repos.length) {
            grid.innerHTML = renderEmpty();
            return;
        }

        grid.innerHTML = repos.map((r, i) => renderCard(r, i)).join('');

        // Cursor pointer on new links
        grid.querySelectorAll('.repo-link').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
        });

    } catch (err) {
        grid.innerHTML = renderError(err.message);
    }
}

// Expose for retry button
window.loadGitHub = loadGitHub;

document.addEventListener('DOMContentLoaded', loadGitHub);
})();
