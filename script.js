/**
 * Portfólio - Douglas Moura
 * Script principal: Navegação responsiva, Swiper, Scrollspy e interações modernas.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 1. Elementos Principais
    // --------------------------------------------------------------------------
    const header = document.getElementById('header');
    const navbar = document.getElementById('navbar');
    const menuHamburguer = document.getElementById('menu-hamburguer');
    const navbarBackdrop = document.getElementById('navbar-backdrop');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('back-to-top');
    const yearSpan = document.getElementById('current-year');

    // --------------------------------------------------------------------------
    // 2. Ano dinâmico no Rodapé
    // --------------------------------------------------------------------------
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --------------------------------------------------------------------------
    // 3. Inicialização do Swiper com Breakpoints Nativos
    // --------------------------------------------------------------------------
    const swiperContainer = document.querySelector('.mySwiper');
    if (swiperContainer && typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.mySwiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            grabCursor: true,
            speed: 500,
            watchOverflow: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            // Breakpoints responsivos para cada faixa de resolução
            breakpoints: {
                // Smartphones em paisagem e telas intermediárias
                580: {
                    slidesPerView: 1.3,
                    spaceBetween: 20,
                },
                // Tablets (iPad, Galaxy Tab)
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
                // Desktops e Notebooks
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 28,
                },
                // Telas Ultrawide
                1440: {
                    slidesPerView: 3,
                    spaceBetween: 32,
                }
            }
        });
    }

    // --------------------------------------------------------------------------
    // 4. Menu Mobile (Drawer, Acessibilidade e Fechamento Inteligente)
    // --------------------------------------------------------------------------
    function openMenu() {
        navbar.classList.add('active');
        menuHamburguer.setAttribute('aria-expanded', 'true');
        menuHamburguer.setAttribute('aria-label', 'Fechar menu de navegação');
        document.body.style.overflow = 'hidden'; // Impede rolagem de fundo
    }

    function closeMenu() {
        navbar.classList.remove('active');
        menuHamburguer.setAttribute('aria-expanded', 'false');
        menuHamburguer.setAttribute('aria-label', 'Abrir menu de navegação');
        document.body.style.overflow = '';
    }

    function toggleMenu() {
        const isActive = navbar.classList.contains('active');
        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    if (menuHamburguer) {
        menuHamburguer.addEventListener('click', toggleMenu);
    }

    if (navbarBackdrop) {
        navbarBackdrop.addEventListener('click', closeMenu);
    }

    // Fecha o menu ao clicar em qualquer link de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                closeMenu();
            }
        });
    });

    // Tecla ESC fecha o menu móvel
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbar.classList.contains('active')) {
            closeMenu();
        }
    });

    // --------------------------------------------------------------------------
    // 5. Scroll do Header e Botão Voltar ao Topo
    // --------------------------------------------------------------------------
    let ticking = false;

    function handleScroll() {
        const scrollY = window.scrollY;

        // Estilização do cabeçalho ao rolar
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Visibilidade do botão voltar ao topo
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }, { passive: true });

    // Dispara uma vez no carregamento para caso a página já inicie rolada
    handleScroll();

    // --------------------------------------------------------------------------
    // 6. Scrollspy: Destaque do Link Ativo na Navegação
    // --------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');

    if ('IntersectionObserver' in window && sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${currentId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }
});