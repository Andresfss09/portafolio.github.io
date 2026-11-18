/* ═══════════════════════════════════════════════════════════════
   GITHUB REPOSITORIES EXPLORER — ANDRÉS SARRIA (@Andresfss09)
   Cached, XSS-safe, filterable & bilingual live GitHub client
   ═══════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    const USERNAME = 'Andresfss09';
    const API_URL = `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`;
    const CACHE_KEY = `gh_repos_${USERNAME}_v2`;
    const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

    const LANG_COLORS = {
        JavaScript: '#f7df1e',
        TypeScript: '#3178c6',
        Python:     '#3572a5',
        Java:       '#b07219',
        HTML:       '#e34c26',
        CSS:        '#563d7c',
        PHP:        '#4f5d95',
        Go:         '#00add8',
        Rust:       '#dea584',
        Shell:      '#89e051',
        C:          '#64748b',
        'C++':      '#f34b7d',
        'C#':       '#178600',
        Kotlin:     '#a97bff',
        SQL:        '#38bdf8'
    };

    const COPY = {
        es: {
            all: 'Todos',
            other: 'Otro',
            fallbackDesc: 'Repositorio de desarrollo de software e ingeniería de sistemas.',
            viewCode: 'Código fuente',
            liveDemo: 'Demo',
            today: 'Hoy',
            yesterday: 'Ayer',
            daysAgo: (n) => `hace ${n}d`,
            weeksAgo: (n) => `hace ${n}sem`,
            monthsAgo: (n) => `hace ${n}m`,
            yearsAgo: (n) => `hace ${n}a`,
            telemetry: (shown, total) => `Mostrando ${shown} de ${total} repositorios públicos`,
            syncedLive: 'Sincronizado en vivo con GitHub',
            syncedCache: 'Cargado desde caché reciente',
            noMatchesTitle: 'Sin coincidencias para este filtro',
            noMatchesDesc: 'Prueba limpiando la búsqueda o seleccionando otro lenguaje.',
            clearFilters: 'Limpiar filtros',
            emptyTitle: 'Repositorios en preparación',
            emptyDesc: 'Visita directamente mi perfil de GitHub para explorar mi actividad más reciente.',
            errorTitle: 'No se pudo consultar la API de GitHub',
            errorRateLimit: 'Límite temporal de consultas a GitHub API alcanzado. Puedes ver los repositorios directamente en GitHub.',
            errorGeneric: 'No hay conexión disponible con GitHub API en este momento.',
            retry: 'Reintentar',
            openGithub: 'Abrir GitHub'
        },
        en: {
            all: 'All',
            other: 'Other',
            fallbackDesc: 'Software development and systems engineering repository.',
            viewCode: 'Source code',
            liveDemo: 'Live demo',
            today: 'Today',
            yesterday: 'Yesterday',
            daysAgo: (n) => `${n}d ago`,
            weeksAgo: (n) => `${n}w ago`,
            monthsAgo: (n) => `${n}mo ago`,
            yearsAgo: (n) => `${n}y ago`,
            telemetry: (shown, total) => `Showing ${shown} of ${total} public repositories`,
            syncedLive: 'Live synced from GitHub',
            syncedCache: 'Served from recent cache',
            noMatchesTitle: 'No repositories match this filter',
            noMatchesDesc: 'Try clearing your search query or switching the language filter.',
            clearFilters: 'Reset filters',
            emptyTitle: 'Repositories coming soon',
            emptyDesc: 'Visit my GitHub profile directly to explore my latest public activity.',
            errorTitle: 'Could not reach GitHub API',
            errorRateLimit: 'GitHub API rate limit reached temporarily. You can inspect all repositories directly on GitHub.',
            errorGeneric: 'Unable to connect to GitHub API right now.',
            retry: 'Retry',
            openGithub: 'Open GitHub'
        }
    };

    let allRepos = [];
    let activeLang = 'all';
    let searchQuery = '';
    let sortBy = 'updated';
    let loadedFromCache = false;

    function getLang() {
        return document.documentElement.lang === 'en' ? 'en' : 'es';
    }

    function t(key) {
        return COPY[getLang()][key];
    }

    function escapeHtml(str) {
        return String(str == null ? '' : str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function safeUrl(raw) {
        if (!raw || typeof raw !== 'string') return '';
        const trimmed = raw.trim();
        try {
            const url = new URL(trimmed.startsWith('http') ? trimmed : 'https://' + trimmed);
            if (url.protocol === 'https:' || url.protocol === 'http:') {
                return url.href;
            }
        } catch (e) {}
        return '';
    }

    function pickIcon(name, desc) {
        const text = `${name || ''} ${desc || ''}`.toLowerCase();
        if (/cyber|sec|owasp|net|cisco|hack/.test(text)) return 'fa-shield-halved';
        if (/api|backend|server|spring|fastapi|node/.test(text)) return 'fa-server';
        if (/db|sql|mongo|data|postgres/.test(text)) return 'fa-database';
        if (/iot|sensor|arduino|esp/.test(text)) return 'fa-microchip';
        if (/qa|test|selenium|cypress|jest/.test(text)) return 'fa-vial-circle-check';
        if (/web|ui|front|react|next|portafolio|portfolio/.test(text)) return 'fa-globe';
        return 'fa-code-branch';
    }

    function formatRelativeDate(iso) {
        const date = new Date(iso);
        if (Number.isNaN(date.getTime())) return '';
        const days = Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
        if (days === 0) return t('today');
        if (days === 1) return t('yesterday');
        if (days < 7) return t('daysAgo')(days);
        if (days < 30) return t('weeksAgo')(Math.floor(days / 7));
        if (days < 365) return t('monthsAgo')(Math.floor(days / 30));
        return t('yearsAgo')(Math.floor(days / 365));
    }

    function formatRepoTitle(name) {
        return String(name || '')
            .replace(/[-_]+/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase());
    }

    function readCache() {
        try {
            const raw = sessionStorage.getItem(CACHE_KEY);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (parsed && Array.isArray(parsed.data) && (Date.now() - parsed.ts) < CACHE_TTL_MS) {
                return parsed.data;
            }
        } catch (e) {}
        return null;
    }

    function writeCache(data) {
        try {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
        } catch (e) {}
    }

    function renderFilterChips() {
        const wrap = document.getElementById('repo-lang-filters');
        if (!wrap) return;

        const counts = new Map();
        allRepos.forEach((r) => {
            const l = r.language || t('other');
            counts.set(l, (counts.get(l) || 0) + 1);
        });

        const sortedLangs = Array.from(counts.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6);

        const chips = [
            `<button type="button" class="filter-chip${activeLang === 'all' ? ' active' : ''}" data-lang="all">${escapeHtml(t('all'))} (${allRepos.length})</button>`
        ];

        sortedLangs.forEach(([lang, count]) => {
            const isActive = activeLang === lang;
            chips.push(
                `<button type="button" class="filter-chip${isActive ? ' active' : ''}" data-lang="${escapeHtml(lang)}">${escapeHtml(lang)} (${count})</button>`
            );
        });

        wrap.innerHTML = chips.join('');
        wrap.querySelectorAll('.filter-chip').forEach((btn) => {
            btn.addEventListener('click', () => {
                activeLang = btn.getAttribute('data-lang') || 'all';
                renderFilterChips();
                renderGrid();
            });
        });
    }

    function renderCard(repo) {
        const lang = repo.language || t('other');
        const langColor = LANG_COLORS[repo.language] || '#38bdf8';
        const icon = pickIcon(repo.name, repo.description);
        const desc = repo.description ? repo.description : t('fallbackDesc');
        const repoUrl = safeUrl(repo.html_url);
        const demoUrl = safeUrl(repo.homepage);
        const topics = Array.isArray(repo.topics) ? repo.topics.slice(0, 4) : [];

        return `
        <article class="repo-card">
            <div class="repo-head">
                <div class="repo-title-group">
                    <div class="repo-icon" aria-hidden="true"><i class="fas ${icon}"></i></div>
                    <h3 class="repo-name">${escapeHtml(formatRepoTitle(repo.name))}</h3>
                </div>
            </div>

            <p class="repo-desc">${escapeHtml(desc)}</p>

            ${topics.length ? `
            <div class="repo-topics">
                ${topics.map((tp) => `<span class="repo-topic">#${escapeHtml(tp)}</span>`).join('')}
            </div>` : ''}

            <div class="repo-meta">
                <span class="repo-lang">
                    <span class="lang-dot" style="background:${langColor}"></span>
                    ${escapeHtml(lang)}
                </span>
                ${repo.stargazers_count > 0 ? `<span><i class="far fa-star" aria-hidden="true"></i> ${Number(repo.stargazers_count)}</span>` : ''}
                ${repo.forks_count > 0 ? `<span><i class="fas fa-code-branch" aria-hidden="true"></i> ${Number(repo.forks_count)}</span>` : ''}
                <span class="repo-updated">${escapeHtml(formatRelativeDate(repo.updated_at))}</span>
            </div>

            <div class="repo-actions">
                <a href="${escapeHtml(repoUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                    <i class="fab fa-github" aria-hidden="true"></i>
                    <span>${escapeHtml(t('viewCode'))}</span>
                </a>
                ${demoUrl ? `
                <a href="${escapeHtml(demoUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                    <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
                    <span>${escapeHtml(t('liveDemo'))}</span>
                </a>` : ''}
            </div>
        </article>`;
    }

    function renderGrid() {
        const grid = document.getElementById('repos-grid');
        const telemetry = document.getElementById('github-telemetry');
        const countEl = document.getElementById('telemetry-count');
        const syncEl = document.getElementById('telemetry-sync');
        if (!grid) return;

        if (!allRepos.length) {
            if (telemetry) telemetry.hidden = true;
            grid.innerHTML = `
                <div class="repos-state-card">
                    <i class="fab fa-github" aria-hidden="true"></i>
                    <h3>${escapeHtml(t('emptyTitle'))}</h3>
                    <p>${escapeHtml(t('emptyDesc'))}</p>
                    <div class="repos-state-actions">
                        <a href="https://github.com/${USERNAME}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                            <i class="fab fa-github" aria-hidden="true"></i> ${escapeHtml(t('openGithub'))}
                        </a>
                    </div>
                </div>`;
            return;
        }

        const q = searchQuery.trim().toLowerCase();
        let list = allRepos.filter((r) => {
            const langName = r.language || t('other');
            const matchesLang = activeLang === 'all' || langName === activeLang;
            if (!matchesLang) return false;
            if (!q) return true;
            const hay = `${r.name} ${r.description || ''} ${(r.topics || []).join(' ')} ${langName}`.toLowerCase();
            return hay.includes(q);
        });

        if (sortBy === 'stars') {
            list.sort((a, b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.updated_at) - new Date(a.updated_at)));
        } else if (sortBy === 'name') {
            list.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            list.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        }

        const visible = list.slice(0, 9);

        if (telemetry && countEl && syncEl) {
            telemetry.hidden = false;
            countEl.textContent = t('telemetry')(visible.length, allRepos.length);
            syncEl.textContent = loadedFromCache ? t('syncedCache') : t('syncedLive');
        }

        if (!visible.length) {
            grid.innerHTML = `
                <div class="repos-state-card">
                    <i class="fas fa-filter-circle-xmark" aria-hidden="true"></i>
                    <h3>${escapeHtml(t('noMatchesTitle'))}</h3>
                    <p>${escapeHtml(t('noMatchesDesc'))}</p>
                    <div class="repos-state-actions">
                        <button type="button" id="reset-repo-filters" class="btn btn-secondary btn-sm">${escapeHtml(t('clearFilters'))}</button>
                    </div>
                </div>`;
            const resetBtn = document.getElementById('reset-repo-filters');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    activeLang = 'all';
                    searchQuery = '';
                    const searchInput = document.getElementById('repo-search');
                    if (searchInput) searchInput.value = '';
                    renderFilterChips();
                    renderGrid();
                });
            }
            return;
        }

        grid.innerHTML = visible.map(renderCard).join('');
    }

    function renderError(isRateLimit) {
        const grid = document.getElementById('repos-grid');
        const telemetry = document.getElementById('github-telemetry');
        if (telemetry) telemetry.hidden = true;
        if (!grid) return;

        grid.innerHTML = `
            <div class="repos-state-card">
                <i class="fab fa-github" aria-hidden="true"></i>
                <h3>${escapeHtml(t('errorTitle'))}</h3>
                <p>${escapeHtml(isRateLimit ? t('errorRateLimit') : t('errorGeneric'))}</p>
                <div class="repos-state-actions">
                    <button type="button" id="retry-github-btn" class="btn btn-secondary btn-sm">
                        <i class="fas fa-rotate-right" aria-hidden="true"></i> ${escapeHtml(t('retry'))}
                    </button>
                    <a href="https://github.com/${USERNAME}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                        <i class="fab fa-github" aria-hidden="true"></i> ${escapeHtml(t('openGithub'))}
                    </a>
                </div>
            </div>`;

        const retryBtn = document.getElementById('retry-github-btn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => loadGitHub(true));
        }
    }

    async function loadGitHub(forceRefresh) {
        const grid = document.getElementById('repos-grid');
        if (!grid) return;

        if (!forceRefresh) {
            const cached = readCache();
            if (cached) {
                allRepos = cached;
                loadedFromCache = true;
                renderFilterChips();
                renderGrid();
                return;
            }
        }

        grid.innerHTML = `
            <div class="repo-skeleton" aria-hidden="true"></div>
            <div class="repo-skeleton" aria-hidden="true"></div>
            <div class="repo-skeleton" aria-hidden="true"></div>`;

        try {
            const res = await fetch(API_URL, {
                headers: { Accept: 'application/vnd.github.v3+json' }
            });

            if (!res.ok) {
                renderError(res.status === 403);
                return;
            }

            const data = await res.json();
            allRepos = Array.isArray(data)
                ? data.filter((r) => !r.fork && !r.private)
                : [];
            loadedFromCache = false;
            writeCache(allRepos);
            renderFilterChips();
            renderGrid();
        } catch (err) {
            renderError(false);
        }
    }

    function initControls() {
        const searchInput = document.getElementById('repo-search');
        const sortSelect = document.getElementById('repo-sort');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value || '';
                renderGrid();
            });
        }
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                sortBy = e.target.value || 'updated';
                renderGrid();
            });
        }

        window.addEventListener('portfolio:langchange', () => {
            if (allRepos.length) {
                renderFilterChips();
                renderGrid();
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initControls();
        loadGitHub(false);
    });
})();
