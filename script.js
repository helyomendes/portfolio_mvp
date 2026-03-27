/**
 * ============================================================
 * PORTFÓLIO - Hélio Mendes da Silva
 * JavaScript Vanilla - Renderização dinâmica, animações e interatividade
 * ============================================================
 */

// ==================== DADOS DOS PROJETOS ====================
// Array de objetos contendo os projetos do portfólio
const projetos = [
    {
        nome: "Carros",
        descricao: "Projeto de venda de carros online",
        tecnologias: ["Django", "Python", "PostgreSQL"],
        link: "https://github.com/heliomendes/carros-demo",
        icone: "🚗"
    },
    {
        nome: "Sistema Financeiro",
        descricao: "Sistema de gestão financeira e controle de despesas",
        tecnologias: ["Python", "Flask", "SQLite"],
        link: "https://github.com/heliomendes/sistema-financeiro",
        icone: "💰"
    },
    {
        nome: "API REST Estoque",
        descricao: "API RESTful para controle de estoque e inventário",
        tecnologias: ["Node.js", "Express", "MongoDB"],
        link: "https://github.com/heliomendes/api-estoque",
        icone: "📦"
    },
    {
        nome: "Dashboard Contábil",
        descricao: "Dashboard interativo para análise de dados contábeis",
        tecnologias: ["React", "Chart.js", "TailwindCSS"],
        link: "https://github.com/heliomendes/dashboard-contabil",
        icone: "📊"
    }
];

// ==================== RENDERIZAÇÃO DINÂMICA DE PROJETOS ====================
/**
 * Renderiza os cards de projeto no DOM a partir do array de objetos.
 * Utiliza forEach para iterar sobre cada projeto e criar o HTML dinamicamente.
 */
function renderizarProjetos() {
    const grid = document.getElementById('projetosGrid');
    if (!grid) return;

    // Limpa o container antes de renderizar
    grid.innerHTML = '';

    // Itera sobre cada projeto e cria o card correspondente
    projetos.forEach(function(projeto, index) {
        // Cria o elemento do card
        const card = document.createElement('article');
        card.className = 'projeto-card animate-on-scroll';
        card.style.animationDelay = (index * 0.15) + 's';

        // Gera as tags de tecnologia
        const tagsHTML = projeto.tecnologias
            .map(function(tech) {
                return '<span class="tech-tag">' + tech + '</span>';
            })
            .join('');

        // Monta o HTML interno do card
        card.innerHTML =
            '<div class="projeto-icon">' + projeto.icone + '</div>' +
            '<h3>' + projeto.nome + '</h3>' +
            '<p class="descricao">' + projeto.descricao + '</p>' +
            '<div class="projeto-tech-tags">' + tagsHTML + '</div>' +
            '<a href="' + projeto.link + '" target="_blank" rel="noopener noreferrer" class="projeto-link">' +
                'Ver no GitHub ' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                    '<path d="M7 17l9.2-9.2M17 17V7H7"/>' +
                '</svg>' +
            '</a>';

        // Adiciona o card ao grid
        grid.appendChild(card);
    });
}

// ==================== EFEITO DE DIGITAÇÃO (TYPING) ====================
/**
 * Cria o efeito de texto sendo digitado no hero.
 */
function iniciarTypingEffect() {
    const textos = [
        'Desenvolvedor Back-end',
        'Contador',
        'Estudante de Tecnologia em Sistema para Internet',
        'Pós-Graduando FIAP'
    ];
    const elemento = document.getElementById('typingText');
    if (!elemento) return;

    let textoIndex = 0;
    let charIndex = 0;
    let apagando = false;
    let pausaAnteDeApagar = 2500;
    let velocidadeDigitar = 60;
    let velocidadeApagar = 40;

    function digitar() {
        var textoAtual = textos[textoIndex];

        if (!apagando) {
            // Digitando
            elemento.textContent = textoAtual.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === textoAtual.length) {
                // Terminou de digitar, pausa antes de apagar
                apagando = true;
                setTimeout(digitar, pausaAnteDeApagar);
                return;
            }
            setTimeout(digitar, velocidadeDigitar);
        } else {
            // Apagando
            elemento.textContent = textoAtual.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                // Terminou de apagar, próximo texto
                apagando = false;
                textoIndex = (textoIndex + 1) % textos.length;
                setTimeout(digitar, 500);
                return;
            }
            setTimeout(digitar, velocidadeApagar);
        }
    }

    // Inicia após um breve delay
    setTimeout(digitar, 1000);
}

// ==================== PARTÍCULAS ANIMADAS ====================
/**
 * Gera partículas de fundo animadas para o hero.
 */
function criarParticulas() {
    var container = document.getElementById('particles');
    if (!container) return;

    var numParticulas = 900;

    for (var i = 0; i < numParticulas; i++) {
        var particula = document.createElement('div');
        particula.className = 'particle';

        // Propriedades aleatórias
        var tamanho = Math.random() * 8 + 2;
        var posX = Math.random() * 100;
        var duracao = Math.random() * 45 + 25;
        var delay = Math.random() * 5;

        particula.style.width = tamanho + 'px';
        particula.style.height = tamanho + 'px';
        particula.style.left = posX + '%';
        particula.style.animationDuration = duracao + 's';
        particula.style.animationDelay = delay + 's';

        // Cores variadas
        var cores = ['var(--color-primary)', 'var(--color-accent)', 'var(--color-accent-2)'];
        particula.style.background = cores[Math.floor(Math.random() * cores.length)];

        container.appendChild(particula);
    }
}

// ==================== ANIMAÇÃO AO SCROLL (INTERSECTION OBSERVER) ====================
/**
 * Utiliza a Intersection Observer API para animar elementos ao entrarem na viewport.
 */
function iniciarAnimacoesScroll() {
    var elementos = document.querySelectorAll('.animate-on-scroll');

    // Verifica suporte à API
    if (!('IntersectionObserver' in window)) {
        // Fallback: mostra tudo sem animação
        elementos.forEach(function(el) {
            el.classList.add('visible');
        });
        return;
    }

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Para de observar após animação
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elementos.forEach(function(el) {
        observer.observe(el);
    });
}

// ==================== HEADER SCROLL EFFECT ====================
/**
 * Altera a aparência do header ao rolar a página.
 */
function iniciarHeaderScroll() {
    var header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ==================== MENU MOBILE (HAMBÚRGUER) ====================
/**
 * Controla a abertura e fechamento do menu mobile.
 */
function iniciarMenuMobile() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function() {
        toggle.classList.toggle('active');
        menu.classList.toggle('open');
    });

    // Fecha o menu ao clicar em um link
    var links = menu.querySelectorAll('.nav-link');
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            toggle.classList.remove('active');
            menu.classList.remove('open');
        });
    });
}

// ==================== NAVEGAÇÃO ATIVA (HIGHLIGHT) ====================
/**
 * Destaca o link de navegação da seção atualmente visível.
 */
function iniciarNavAtiva() {
    var secoes = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        var scrollY = window.scrollY + 100;

        secoes.forEach(function(secao) {
            var topo = secao.offsetTop;
            var altura = secao.offsetHeight;
            var id = secao.getAttribute('id');

            if (scrollY >= topo && scrollY < topo + altura) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ==================== INICIALIZAÇÃO ====================
/**
 * Ponto de entrada principal. Executa todas as funções após o DOM carregar.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Renderiza os projetos dinamicamente
    renderizarProjetos();

    // Inicia as animações e interações
    criarParticulas();
    iniciarTypingEffect();
    iniciarAnimacoesScroll();
    iniciarHeaderScroll();
    iniciarMenuMobile();
    iniciarNavAtiva();

    console.log('Portfólio de Hélio Mendes carregado com sucesso!');
});
