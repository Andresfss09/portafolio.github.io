/* ═══════════════════════════════════════════════════════════════
   ANDRÉS FELIPE SARRIA SABOGAL — PORTFOLIO CORE SCRIPT
   Zero-dependency, accessible, high-performance engineering UI
   ═══════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    const EMAIL = 'andressarriasabogal@gmail.com';
    const PHONE_WA = 'https://wa.me/573185753889?text=Hola%20Andr%C3%A9s%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar%20sobre%20una%20oportunidad.';
    const GITHUB_URL = 'https://github.com/Andresfss09';
    const LINKEDIN_URL = 'https://www.linkedin.com/in/andres-felipe-sarria-sabogal-7839a4302/';

    /* ─── I18N DICTIONARY (ES / EN) ─────────────────────────── */
    const TRANSLATIONS = {
        es: {
            'a11y.skip': 'Saltar al contenido principal',
            'nav.subtitle': 'Systems & Web Engineer',
            'nav.about': 'Perfil',
            'nav.skills': 'Capacidades',
            'nav.projects': 'Proyectos',
            'nav.trajectory': 'Trayectoria',
            'nav.contact': 'Contacto',
            'nav.hire': 'Contratar',

            'hero.availability': 'Disponible para incorporación inmediata · Remoto / Híbrido / Cali, CO',
            'hero.eyebrow': 'Ingeniería de Sistemas · Desarrollo Web & QA',
            'hero.lead': 'Diseño y construyo aplicaciones web funcionales, limpias y centradas en el usuario. Combino <strong>desarrollo Full Stack</strong>, <strong>bases de datos SQL &amp; NoSQL</strong>, experiencia en <strong>QA bajo Scrum y Kanban</strong>, y una base sólida en <strong>redes, ciberseguridad e IoT</strong> para entregar soluciones confiables de principio a fin.',
            'hero.ctaHire': 'Contactar para contratación',
            'hero.downloadCv': 'Descargar CV',
            'hero.copyEmail': 'Copiar email',
            'hero.viewCv': 'Ver CV',

            'proof.degree': 'Ingeniería de Sistemas · Univ. Santiago de Cali',
            'proof.certs': 'Certificaciones en Ciberseguridad & Redes',
            'proof.agile': 'Experiencia como Tester · Scrum & Kanban',
            'proof.lang': 'Lectura y escritura técnica profesional',

            'about.kicker': 'PERFIL PROFESIONAL',
            'about.title': 'Visión de ingeniería aplicada al producto web.',
            'about.subtitle': 'No solo escribo código que compila: entiendo cómo interactúan la interfaz, los datos, la red, la seguridad y la calidad del software en producción.',
            'about.roleCard': 'Ingeniería de Sistemas · 10° Semestre',
            'about.factsTitle': 'Resumen para reclutadores',
            'about.factRoleK': 'Roles objetivo',
            'about.factRoleV': 'Full Stack · Frontend · Backend · QA',
            'about.factModalityK': 'Modalidad',
            'about.factModalityV': 'Remoto · Híbrido · Presencial',
            'about.factLocationK': 'Ubicación',
            'about.factLangK': 'Idiomas',
            'about.factLangV': 'Español (Nativo) · Inglés (B1)',
            'about.factStatusK': 'Disponibilidad',
            'about.factStatusV': 'Inmediata',
            'about.p1': 'Soy <strong>Andrés Felipe Sarria Sabogal</strong>, estudiante de <strong>décimo semestre de Ingeniería de Sistemas</strong> en la <strong>Universidad Santiago de Cali</strong>, con formación integral orientada al desarrollo de software y enfoque especializado en <strong>desarrollo web</strong>.',
            'about.p2': 'Cuento con experiencia práctica construyendo aplicaciones e interfaces funcionales, modernas y centradas en la experiencia del usuario, respaldada por conocimientos transversales en <strong>bases de datos relacionales y no relacionales</strong>, <strong>redes de computadores y redes inalámbricas</strong>, <strong>ciberseguridad y seguridad de redes</strong>, <strong>sistemas operativos</strong> e <strong>Internet de las Cosas (IoT)</strong>.',
            'about.p3': 'He integrado equipos universitarios de TI desempeñando el rol de <strong>QA / Tester</strong> bajo metodologías ágiles <strong>Scrum y Kanban</strong>, fortaleciendo mi criterio analítico, comunicación efectiva y capacidad para integrarme rápidamente a equipos multidisciplinarios orientados a resultados de negocio.',
            'about.pillar1Title': 'Desarrollo Web End-to-End',
            'about.pillar1Desc': 'Interfaces limpias, responsivas y mantenibles conectadas con lógica de servidor robusta y APIs bien estructuradas.',
            'about.pillar2Title': 'Calidad (QA) & Metodologías Ágiles',
            'about.pillar2Desc': 'Experiencia como Tester en equipos de TI aplicando Scrum y Kanban: prevención de fallos, validación rigurosa y entregas iterativas.',
            'about.pillar3Title': 'Datos, Sistemas & IoT',
            'about.pillar3Desc': 'Comprensión transversal de bases de datos SQL/NoSQL, sistemas operativos e Internet de las Cosas para aportar valor en cada capa.',
            'about.pillar4Title': 'Redes & Ciberseguridad',
            'about.pillar4Desc': 'Formación certificada por Cisco en redes y ciberseguridad para diseñar software consciente de riesgos y buenas prácticas de seguridad.',

            'skills.kicker': 'ARQUITECTURA DE CAPACIDADES',
            'skills.title': 'Stack técnico y dominios de ingeniería.',
            'skills.subtitle': 'Organizado por capas reales de software — sin porcentajes arbitrarios, enfocado en cómo aporto valor en un equipo de producción.',
            'skills.tabAll': 'Todas',
            'skills.tabInfra': 'Redes & Seguridad',
            'skills.badgeCore': 'Enfoque Principal',
            'skills.badgeExp': 'Experiencia Práctica',
            'skills.badgeCisco': 'Respaldo Cisco',
            'skills.c1Title': 'Desarrollo Frontend & UI/UX',
            'skills.c1Desc': 'Construcción de interfaces modernas, semánticas, accesibles y responsivas priorizando rendimiento y experiencia de usuario.',
            'skills.c2Title': 'Backend, APIs & Bases de Datos',
            'skills.c2Desc': 'Diseño de servicios web, integración de APIs REST y modelado eficiente en bases de datos relacionales y no relacionales.',
            'skills.c3Title': 'Aseguramiento de Calidad (QA) & Ágil',
            'skills.c3Desc': 'Experiencia real en rol de Tester en equipos de TI, aplicando pruebas funcionales, documentación de bugs y gestión ágil del flujo de entrega.',
            'skills.c4Title': 'Redes, Ciberseguridad, SO & IoT',
            'skills.c4Desc': 'Base transversal de Ingeniería de Sistemas en conectividad, seguridad de redes, administración de sistemas operativos e IoT.',

            'projects.kicker': 'PROYECTOS & CÓDIGO ABIERTO',
            'projects.title': 'Repositorios en vivo desde GitHub.',
            'projects.subtitle': 'Sincronizados automáticamente con mi cuenta <code>@Andresfss09</code>. Filtra por lenguaje o busca proyectos específicos para inspeccionar mi código.',
            'projects.viewGithub': 'Explorar GitHub',
            'projects.all': 'Todos',
            'projects.sortRecent': 'Más recientes',
            'projects.sortStars': 'Más destacados',
            'projects.sortName': 'Alfabético',

            'traj.kicker': 'TRAYECTORIA & CREDENCIALES',
            'traj.title': 'Formación académica, experiencia en equipos y certificaciones.',
            'traj.subtitle': 'Información 100% alineada y verificable con mi Hoja de Vida oficial.',
            'traj.expEduTitle': 'Experiencia en TI & Formación',
            'traj.item1Date': 'Equipos TI Universitarios',
            'traj.item1Title': 'QA Tester & Colaborador en Equipos de TI',
            'traj.item1Desc': 'Participación activa en proyectos de desarrollo desempeñando el rol de tester bajo metodologías ágiles Scrum y Kanban. Validación funcional, detección temprana de errores, comunicación efectiva con desarrolladores y adaptación rápida a diferentes tecnologías.',
            'traj.item2Tag': '10° Semestre',
            'traj.item2Title': 'Ingeniería de Sistemas',
            'traj.item2Desc': 'Formación profesional integral en ingeniería de software, desarrollo web moderno, bases de datos SQL y NoSQL, redes de computadores, seguridad informática, redes inalámbricas, sistemas operativos e Internet de las Cosas (IoT).',
            'traj.item3Tag': 'Graduado',
            'traj.item3Title': 'Bachiller Académico',
            'traj.certsTitle': 'Certificaciones & Idiomas',
            'traj.cert1Title': 'Introducción a la Ciberseguridad',
            'traj.cert1Meta': 'Graduado · 6 horas',
            'traj.cert1Desc': 'Principios de seguridad de la información, identificación de amenazas, protección de datos y vulnerabilidades comunes en sistemas y redes.',
            'traj.cert2Title': 'Exploración de Redes',
            'traj.cert2Meta': 'Graduado · 4 semanas',
            'traj.cert2Desc': 'Arquitectura de redes de computadores, protocolos de comunicación, conectividad inalámbrica y fundamentos de seguridad de red.',
            'traj.langTitle': 'Competencia en Idiomas',
            'traj.spanish': 'Español',
            'traj.spanishDesc': 'Comunicación técnica y ejecutiva nativa',
            'traj.native': 'Nativo',
            'traj.english': 'Inglés (English)',
            'traj.englishDesc': 'Lectura y escritura: Bien · Habla y comprensión: Intermedio',
            'traj.refTitle': 'Referencia Profesional Verificable',
            'traj.refDesc': '<strong>Nicolás Chávez Oliveros</strong> — Ingeniero de Sistemas. Datos de contacto disponibles en la Hoja de Vida descargable o bajo solicitud directa durante el proceso de selección.',

            'contact.kicker': 'CONTACTO & CONTRATACIÓN',
            'contact.title': 'Listo para integrarme a tu equipo de ingeniería.',
            'contact.subtitle': '¿Buscas un desarrollador web o ingeniero de sistemas en último semestre con mentalidad analítica, enfoque en calidad y aprendizaje rápido? Conversemos.',
            'contact.whyTitle': '¿Qué aporto desde el día uno?',
            'contact.why1': 'Desarrollo web limpio, estructurado y enfocado en experiencia de usuario.',
            'contact.why2': 'Criterio de QA y experiencia colaborativa con Scrum y Kanban.',
            'contact.why3': 'Visión integral de sistemas: bases de datos, redes, ciberseguridad e IoT.',
            'contact.why4': 'Proactividad, documentación clara y rápida adaptación a tu stack.',
            'contact.formTitle': 'Enviar propuesta o solicitud de entrevista',
            'contact.formHint': 'Al enviar se abrirá tu cliente de correo pre-llenado y podrás copiar el resumen con un clic.',
            'contact.labelName': 'Nombre / Empresa *',
            'contact.labelEmail': 'Correo electrónico *',
            'contact.labelType': 'Tipo de oportunidad',
            'contact.opt1': 'Vacante Desarrollador Web / Full Stack',
            'contact.opt2': 'Práctica Profesional / Pasantía TI',
            'contact.opt3': 'Rol QA / Testing',
            'contact.opt4': 'Proyecto Freelance / Consultoría',
            'contact.opt5': 'Otro asunto',
            'contact.labelMsg': 'Detalles de la oportunidad o mensaje *',
            'contact.submit': 'Preparar y enviar correo',
            'contact.copyComposed': 'Copiar mensaje',

            'footer.sub': 'Ingeniería de Sistemas · Santiago de Cali, Colombia',
            'footer.shortcuts': 'Accesos rápidos'
        },
        en: {
            'a11y.skip': 'Skip to main content',
            'nav.subtitle': 'Systems & Web Engineer',
            'nav.about': 'Profile',
            'nav.skills': 'Capabilities',
            'nav.projects': 'Projects',
            'nav.trajectory': 'Background',
            'nav.contact': 'Contact',
            'nav.hire': 'Hire me',

            'hero.availability': 'Available immediately · Remote / Hybrid / Cali, Colombia',
            'hero.eyebrow': 'Systems Engineering · Web Development & QA',
            'hero.lead': 'I design and engineer clean, functional, user-centered web applications. Combining <strong>Full Stack web development</strong>, <strong>SQL &amp; NoSQL databases</strong>, hands-on <strong>QA experience with Scrum &amp; Kanban</strong>, and strong foundations in <strong>networking, cybersecurity, and IoT</strong> to deliver reliable end-to-end software.',
            'hero.ctaHire': 'Schedule an interview',
            'hero.downloadCv': 'Download Resume',
            'hero.copyEmail': 'Copy email',
            'hero.viewCv': 'View PDF',

            'proof.degree': 'Systems Engineering · Universidad Santiago de Cali',
            'proof.certs': 'Cisco Certifications in Cybersecurity & Networking',
            'proof.agile': 'Hands-on QA Tester · Scrum & Kanban workflows',
            'proof.lang': 'Strong technical reading & writing proficiency',

            'about.kicker': 'PROFESSIONAL PROFILE',
            'about.title': 'Systems engineering mindset applied to web products.',
            'about.subtitle': 'Beyond writing code that runs: I understand how interfaces, data models, networks, security, and quality assurance work together in production.',
            'about.roleCard': 'Systems Engineering · 10th Semester',
            'about.factsTitle': 'Recruiter Snapshot',
            'about.factRoleK': 'Target Roles',
            'about.factRoleV': 'Full Stack · Frontend · Backend · QA',
            'about.factModalityK': 'Work Mode',
            'about.factModalityV': 'Remote · Hybrid · On-site',
            'about.factLocationK': 'Location',
            'about.factLangK': 'Languages',
            'about.factLangV': 'Spanish (Native) · English (B1)',
            'about.factStatusK': 'Availability',
            'about.factStatusV': 'Immediate',
            'about.p1': 'I am <strong>Andrés Felipe Sarria Sabogal</strong>, a <strong>10th-semester Systems Engineering student</strong> at <strong>Universidad Santiago de Cali</strong>, with comprehensive software engineering training and a focused specialization in <strong>web development</strong>.',
            'about.p2': 'I bring practical experience building modern, responsive, user-focused web applications, backed by cross-cutting knowledge across <strong>relational and non-relational databases</strong>, <strong>computer &amp; wireless networks</strong>, <strong>cybersecurity and network security</strong>, <strong>operating systems</strong>, and <strong>Internet of Things (IoT)</strong>.',
            'about.p3': 'I have collaborated within university IT teams in the <strong>QA / Tester</strong> role applying agile frameworks (<strong>Scrum and Kanban</strong>), strengthening my analytical troubleshooting, technical communication, and ability to ramp up quickly inside multidisciplinary engineering teams.',
            'about.pillar1Title': 'End-to-End Web Development',
            'about.pillar1Desc': 'Clean, responsive, maintainable UI connected to dependable server-side logic and structured REST APIs.',
            'about.pillar2Title': 'Quality Assurance (QA) & Agile',
            'about.pillar2Desc': 'Real Tester experience in IT teams using Scrum and Kanban: defect prevention, functional validation, and iterative delivery.',
            'about.pillar3Title': 'Data, Systems & IoT',
            'about.pillar3Desc': 'Cross-layer understanding of SQL/NoSQL databases, operating systems, and IoT to contribute across the full technical stack.',
            'about.pillar4Title': 'Networking & Cybersecurity',
            'about.pillar4Desc': 'Cisco-certified networking and cybersecurity foundations to build resilient, security-aware web software.',

            'skills.kicker': 'CAPABILITY ARCHITECTURE',
            'skills.title': 'Technical stack & engineering domains.',
            'skills.subtitle': 'Structured by real software architecture layers — no arbitrary percentages, focused on how I deliver value to engineering teams.',
            'skills.tabAll': 'All',
            'skills.tabInfra': 'Networks & Security',
            'skills.badgeCore': 'Core Focus',
            'skills.badgeExp': 'Hands-on Experience',
            'skills.badgeCisco': 'Cisco Backed',
            'skills.c1Title': 'Frontend & UI/UX Engineering',
            'skills.c1Desc': 'Building semantic, accessible, responsive web interfaces focused on performance, clarity, and user experience.',
            'skills.c2Title': 'Backend, APIs & Databases',
            'skills.c2Desc': 'Designing web services, integrating REST APIs, and modeling data across relational and non-relational databases.',
            'skills.c3Title': 'Quality Assurance (QA) & Agile Delivery',
            'skills.c3Desc': 'Hands-on Tester role within IT teams applying functional testing, bug reporting, and agile delivery workflows.',
            'skills.c4Title': 'Networks, Cybersecurity, OS & IoT',
            'skills.c4Desc': 'Cross-disciplinary Systems Engineering base in computer & wireless networks, security principles, operating systems, and IoT.',

            'projects.kicker': 'PROJECTS & OPEN SOURCE',
            'projects.title': 'Live repositories from GitHub.',
            'projects.subtitle': 'Automatically synced from <code>@Andresfss09</code>. Filter by language or search repositories to inspect code quality directly.',
            'projects.viewGithub': 'Explore GitHub',
            'projects.all': 'All',
            'projects.sortRecent': 'Most recent',
            'projects.sortStars': 'Most starred',
            'projects.sortName': 'Alphabetical',

            'traj.kicker': 'BACKGROUND & CREDENTIALS',
            'traj.title': 'Education, IT team experience & certifications.',
            'traj.subtitle': '100% aligned and verifiable with my official Resume.',
            'traj.expEduTitle': 'IT Experience & Education',
            'traj.item1Date': 'University IT Teams',
            'traj.item1Title': 'QA Tester & IT Team Contributor',
            'traj.item1Desc': 'Active member in software development teams acting as QA Tester under Scrum and Kanban. Functional verification, early bug detection, effective developer communication, and rapid adaptation across stacks.',
            'traj.item2Tag': '10th Semester',
            'traj.item2Title': 'B.S. in Systems Engineering',
            'traj.item2Desc': 'Comprehensive training in software engineering, modern web development, SQL & NoSQL databases, computer & wireless networks, cybersecurity, operating systems, and IoT.',
            'traj.item3Tag': 'Graduated',
            'traj.item3Title': 'High School Diploma',
            'traj.certsTitle': 'Certifications & Languages',
            'traj.cert1Title': 'Introduction to Cybersecurity',
            'traj.cert1Meta': 'Completed · 6 hours',
            'traj.cert1Desc': 'Information security fundamentals, threat analysis, data protection, and common system & network vulnerabilities.',
            'traj.cert2Title': 'Networking Basics (Exploración de Redes)',
            'traj.cert2Meta': 'Completed · 4 weeks',
            'traj.cert2Desc': 'Network architecture, communication protocols, wireless connectivity, and core network security concepts.',
            'traj.langTitle': 'Language Proficiency',
            'traj.spanish': 'Spanish',
            'traj.spanishDesc': 'Native technical & executive communication',
            'traj.native': 'Native',
            'traj.english': 'English',
            'traj.englishDesc': 'Reading & writing: Good · Speaking & listening: Intermediate',
            'traj.refTitle': 'Verifiable Professional Reference',
            'traj.refDesc': '<strong>Nicolás Chávez Oliveros</strong> — Systems Engineer. Contact details available in the downloadable Resume or upon request during hiring stages.',

            'contact.kicker': 'CONTACT & HIRING',
            'contact.title': 'Ready to join your engineering team.',
            'contact.subtitle': 'Looking for a final-semester Systems Engineer / Web Developer with strong analytical thinking, QA discipline, and fast ramp-up? Let’s talk.',
            'contact.whyTitle': 'What I bring from day one',
            'contact.why1': 'Clean, maintainable web development centered on user experience.',
            'contact.why2': 'QA discipline and collaborative agile experience (Scrum & Kanban).',
            'contact.why3': 'Cross-layer systems mindset: databases, networking, security & IoT.',
            'contact.why4': 'Proactive ownership, clear communication, and rapid stack adaptation.',
            'contact.formTitle': 'Send an interview request or opportunity',
            'contact.formHint': 'Submitting opens your email client pre-filled and lets you copy the formatted summary in one click.',
            'contact.labelName': 'Name / Company *',
            'contact.labelEmail': 'Work email *',
            'contact.labelType': 'Opportunity type',
            'contact.opt1': 'Web / Full Stack Developer Role',
            'contact.opt2': 'IT Internship / Practicum',
            'contact.opt3': 'QA / Testing Role',
            'contact.opt4': 'Freelance / Consulting Project',
            'contact.opt5': 'Other inquiry',
            'contact.labelMsg': 'Role details or message *',
            'contact.submit': 'Compose & send email',
            'contact.copyComposed': 'Copy message',

            'footer.sub': 'Systems Engineering · Santiago de Cali, Colombia',
            'footer.shortcuts': 'Quick shortcuts'
        }
    };

    const DYNAMIC_COPY = {
        es: {
            copiedEmail: 'Correo copiado: ' + EMAIL,
            copiedMsg: 'Resumen del mensaje copiado al portapapeles.',
            themeDark: 'Tema oscuro activado',
            themeLight: 'Tema claro activado',
            langChanged: 'Idioma cambiado a Español',
            searchRepoPlaceholder: 'Buscar repositorio...',
            cmdPlaceholder: 'Escribe un comando o sección...',
            phName: 'Ej. Laura Gómez · TechCorp',
            phEmail: 'nombre@empresa.com',
            phMsg: 'Cuéntame sobre el rol, stack del equipo o fecha ideal para conversar...',
            errName: 'Ingresa tu nombre o el nombre de tu empresa.',
            errEmail: 'Ingresa un correo electrónico válido.',
            errMsg: 'Cuéntame brevemente sobre el rol o proyecto (mín. 10 caracteres).',
            formReady: 'Correo preparado en tu cliente. Si no se abrió, copia el mensaje aquí:'
        },
        en: {
            copiedEmail: 'Email copied: ' + EMAIL,
            copiedMsg: 'Formatted message copied to clipboard.',
            themeDark: 'Dark theme enabled',
            themeLight: 'Light theme enabled',
            langChanged: 'Language switched to English',
            searchRepoPlaceholder: 'Search repositories...',
            cmdPlaceholder: 'Type a command or section...',
            phName: 'e.g. Sarah Miller · TechCorp',
            phEmail: 'name@company.com',
            phMsg: 'Share details about the role, team stack, or best time to connect...',
            errName: 'Please enter your name or company.',
            errEmail: 'Please enter a valid email address.',
            errMsg: 'Please share a brief overview of the role or project (min. 10 chars).',
            formReady: 'Email draft opened in your mail client. If it didn’t open, copy it here:'
        }
    };

    let currentLang = 'es';
    let toastTimer = null;

    function tDyn(key) {
        return (DYNAMIC_COPY[currentLang] && DYNAMIC_COPY[currentLang][key]) || DYNAMIC_COPY.es[key] || '';
    }

    /* ─── TOAST ─────────────────────────────────────────────── */
    function showToast(message) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.innerHTML = `<i class="fas fa-circle-check" aria-hidden="true"></i><span></span>`;
        toast.querySelector('span').textContent = message;
        toast.hidden = false;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.hidden = true;
        }, 3200);
    }

    /* ─── CLIPBOARD HELPER ──────────────────────────────────── */
    async function copyText(text, successMsg) {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                const ta = document.createElement('textarea');
                ta.value = text;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                ta.remove();
            }
            showToast(successMsg);
        } catch (e) {
            showToast(text);
        }
    }

    /* ─── I18N ENGINE ───────────────────────────────────────── */
    function applyLanguage(lang, announce) {
        currentLang = lang === 'en' ? 'en' : 'es';
        document.documentElement.lang = currentLang;

        const dict = TRANSLATIONS[currentLang];
        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) {
                el.innerHTML = dict[key];
            }
        });

        const langLabel = document.getElementById('lang-label');
        if (langLabel) langLabel.textContent = currentLang === 'es' ? 'EN' : 'ES';

        const repoSearch = document.getElementById('repo-search');
        if (repoSearch) repoSearch.placeholder = tDyn('searchRepoPlaceholder');

        const cfName = document.getElementById('cf-name');
        if (cfName) cfName.placeholder = tDyn('phName');
        const cfEmail = document.getElementById('cf-email');
        if (cfEmail) cfEmail.placeholder = tDyn('phEmail');
        const cfMsg = document.getElementById('cf-message');
        if (cfMsg) cfMsg.placeholder = tDyn('phMsg');

        try { localStorage.setItem('as_lang', currentLang); } catch (e) {}

        window.dispatchEvent(new CustomEvent('portfolio:langchange', { detail: { lang: currentLang } }));

        if (announce) showToast(tDyn('langChanged'));
    }

    function initLanguage() {
        let saved = 'es';
        try {
            const s = localStorage.getItem('as_lang');
            if (s === 'en' || s === 'es') saved = s;
        } catch (e) {}
        applyLanguage(saved, false);

        const btn = document.getElementById('lang-toggle');
        if (btn) {
            btn.addEventListener('click', () => {
                applyLanguage(currentLang === 'es' ? 'en' : 'es', true);
            });
        }
    }

    /* ─── THEME MANAGER ─────────────────────────────────────── */
    function applyTheme(theme, announce) {
        const next = theme === 'light' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);

        const icon = document.getElementById('theme-icon');
        if (icon) {
            icon.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.setAttribute('content', next === 'dark' ? '#090b10' : '#f8fafc');
        }
        try { localStorage.setItem('as_theme', next); } catch (e) {}
        if (announce) showToast(tDyn(next === 'dark' ? 'themeDark' : 'themeLight'));
    }

    function initTheme() {
        const initial = document.documentElement.getAttribute('data-theme') || 'dark';
        applyTheme(initial, false);

        const btn = document.getElementById('theme-toggle');
        if (btn) {
            btn.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme') || 'dark';
                applyTheme(current === 'dark' ? 'light' : 'dark', true);
            });
        }
    }

    /* ─── HEADER, SCROLLSPY & PROGRESS ──────────────────────── */
    function initNavigation() {
        const header = document.getElementById('site-header');
        const progress = document.getElementById('scroll-progress');
        const navLinks = Array.from(document.querySelectorAll('.nav-desktop .nav-link'));
        const sections = navLinks
            .map((a) => document.querySelector(a.getAttribute('href')))
            .filter(Boolean);

        function onScroll() {
            const y = window.scrollY;
            if (header) header.classList.toggle('scrolled', y > 24);

            if (progress) {
                const docH = document.documentElement.scrollHeight - window.innerHeight;
                const pct = docH > 0 ? Math.min((y / docH) * 100, 100) : 0;
                progress.style.width = pct + '%';
            }

            let activeId = '';
            for (const sec of sections) {
                const rect = sec.getBoundingClientRect();
                if (rect.top <= 140 && rect.bottom > 140) {
                    activeId = '#' + sec.id;
                    break;
                }
            }
            navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === activeId);
            });
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ─── MOBILE DRAWER ─────────────────────────────────────── */
    function initMobileDrawer() {
        const toggle = document.getElementById('menu-toggle');
        const drawer = document.getElementById('mobile-drawer');
        if (!toggle || !drawer) return;

        function setOpen(open) {
            toggle.setAttribute('aria-expanded', String(open));
            drawer.classList.toggle('open', open);
            drawer.setAttribute('aria-hidden', String(!open));
            document.body.style.overflow = open ? 'hidden' : '';
        }

        toggle.addEventListener('click', () => {
            const isOpen = toggle.getAttribute('aria-expanded') === 'true';
            setOpen(!isOpen);
        });

        drawer.querySelectorAll('.mobile-link, .mobile-close-trigger').forEach((el) => {
            el.addEventListener('click', () => setOpen(false));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && drawer.classList.contains('open')) {
                setOpen(false);
            }
        });
    }

    /* ─── INTERACTIVE HERO NETWORK CANVAS (LIGHTWEIGHT) ─────── */
    function initNetworkCanvas() {
        const canvas = document.getElementById('hero-network');
        if (!canvas) return;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let nodes = [];
        let rafId = null;
        let visible = true;

        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = Math.min(Math.max(Math.floor((width * height) / 26000), 18), 46);
            nodes = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.6 + 1.1
            }));
        }

        function draw() {
            if (!visible || document.hidden) {
                rafId = null;
                return;
            }
            ctx.clearRect(0, 0, width, height);

            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            const nodeColor = isLight ? 'rgba(2, 132, 199, 0.55)' : 'rgba(56, 189, 248, 0.55)';
            const maxDist = 145;

            for (let i = 0; i < nodes.length; i++) {
                const a = nodes[i];
                a.x += a.vx;
                a.y += a.vy;

                if (a.x < 0 || a.x > width) a.vx *= -1;
                if (a.y < 0 || a.y > height) a.vy *= -1;

                for (let j = i + 1; j < nodes.length; j++) {
                    const b = nodes[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * (isLight ? 0.22 : 0.24);
                        ctx.strokeStyle = isLight
                            ? `rgba(2, 132, 199, ${alpha.toFixed(3)})`
                            : `rgba(99, 102, 241, ${alpha.toFixed(3)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }

                ctx.fillStyle = nodeColor;
                ctx.beginPath();
                ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
                ctx.fill();
            }

            rafId = requestAnimationFrame(draw);
        }

        function start() {
            if (!rafId && visible && !document.hidden) {
                rafId = requestAnimationFrame(draw);
            }
        }

        const io = new IntersectionObserver((entries) => {
            visible = entries[0].isIntersecting;
            if (visible) start();
        }, { threshold: 0.05 });

        io.observe(canvas);
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) start();
        });
        window.addEventListener('resize', resize, { passive: true });

        resize();
        start();
    }

    /* ─── INTERACTIVE DOSSIER TABS ──────────────────────────── */
    function initDossierTabs() {
        const tabs = document.querySelectorAll('[data-dossier-tab]');
        const panels = document.querySelectorAll('.dossier-panel');
        if (!tabs.length) return;

        tabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-dossier-tab');
                tabs.forEach((t) => {
                    const active = t === tab;
                    t.classList.toggle('active', active);
                    t.setAttribute('aria-selected', String(active));
                });
                panels.forEach((p) => {
                    const match = p.id === 'dossier-' + target;
                    p.classList.toggle('active', match);
                    p.hidden = !match;
                });
            });
        });
    }

    /* ─── CAPABILITY FILTERING ──────────────────────────────── */
    function initCapabilityFilters() {
        const buttons = document.querySelectorAll('[data-skill-filter]');
        const cards = document.querySelectorAll('#capabilities-grid .cap-card');
        if (!buttons.length || !cards.length) return;

        buttons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-skill-filter');
                buttons.forEach((b) => {
                    const active = b === btn;
                    b.classList.toggle('active', active);
                    b.setAttribute('aria-selected', String(active));
                });
                cards.forEach((card) => {
                    const cat = card.getAttribute('data-category');
                    const show = filter === 'all' || cat === filter;
                    card.classList.toggle('is-hidden', !show);
                });
            });
        });
    }

    /* ─── SCROLL REVEAL ─────────────────────────────────────── */
    function initReveal() {
        const elements = document.querySelectorAll('[data-reveal]');
        if (!elements.length) return;

        if (!('IntersectionObserver' in window)) {
            elements.forEach((el) => el.classList.add('revealed'));
            return;
        }

        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        elements.forEach((el) => io.observe(el));
    }

    /* ─── COPY EMAIL BUTTONS ────────────────────────────────── */
    function initCopyButtons() {
        document.querySelectorAll('[data-copy-email]').forEach((btn) => {
            btn.addEventListener('click', () => {
                const addr = btn.getAttribute('data-copy-email') || EMAIL;
                copyText(addr, tDyn('copiedEmail'));
            });
        });
    }

    /* ─── RECRUITER CONTACT FORM ────────────────────────────── */
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const nameInput = document.getElementById('cf-name');
        const emailInput = document.getElementById('cf-email');
        const typeSelect = document.getElementById('cf-type');
        const msgInput = document.getElementById('cf-message');
        const resultBox = document.getElementById('form-result');
        const resultMsg = document.getElementById('form-result-msg');
        const copyBtn = document.getElementById('copy-composed-btn');

        let lastComposedText = '';

        function setFieldError(input, message) {
            const wrap = input.closest('.field');
            if (!wrap) return;
            const errEl = wrap.querySelector('.field-error');
            wrap.classList.toggle('invalid', Boolean(message));
            if (errEl) errEl.textContent = message || '';
        }

        [nameInput, emailInput, msgInput].forEach((input) => {
            input.addEventListener('input', () => setFieldError(input, ''));
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const type = typeSelect.value;
            const message = msgInput.value.trim();

            let valid = true;
            if (name.length < 2) {
                setFieldError(nameInput, tDyn('errName'));
                valid = false;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setFieldError(emailInput, tDyn('errEmail'));
                valid = false;
            }
            if (message.length < 10) {
                setFieldError(msgInput, tDyn('errMsg'));
                valid = false;
            }
            if (!valid) return;

            const subject = `[Portafolio] ${type} — ${name}`;
            const body = [
                `Hola Andrés,`,
                ``,
                `Contacto desde tu portafolio profesional:`,
                `- Nombre / Empresa: ${name}`,
                `- Correo de respuesta: ${email}`,
                `- Tipo de oportunidad: ${type}`,
                ``,
                `Mensaje:`,
                message
            ].join('\n');

            lastComposedText = `Para: ${EMAIL}\nAsunto: ${subject}\n\n${body}`;

            const mailtoUrl = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoUrl;

            if (resultBox && resultMsg) {
                resultMsg.textContent = tDyn('formReady');
                resultBox.hidden = false;
            }
        });

        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                if (lastComposedText) {
                    copyText(lastComposedText, tDyn('copiedMsg'));
                }
            });
        }
    }

    /* ─── FOOTER YEAR ───────────────────────────────────────── */
    function initYear() {
        const y = document.getElementById('footer-year');
        if (y) y.textContent = String(new Date().getFullYear());
    }

    /* ─── BOOTSTRAP ─────────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        initLanguage();
        initNavigation();
        initMobileDrawer();
        initNetworkCanvas();
        initDossierTabs();
        initCapabilityFilters();
        initReveal();
        initCopyButtons();
        initContactForm();
        initYear();
    });
})();
