document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const sideNav = document.querySelector('.side-nav');
    const hero = document.querySelector('.hero');

    // Função para verificar visibilidade do banner
    function checkHeroVisibility() {
        const heroRect = hero.getBoundingClientRect();
        const heroIsVisible = heroRect.bottom > 0;

        if (sideNav === null || sideNav === undefined) return;

        if (heroIsVisible) {
            sideNav.classList.remove('visible');
        } else {
            sideNav.classList.add('visible');
        }
    }

    // Função para verificar qual seção está visível
    function highlightNavigation() {
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                        // Rolar a navegação lateral suavemente para o link ativo
                        const linkRect = link.getBoundingClientRect();
                        const navRect = sideNav.getBoundingClientRect();

                        const scrollLeft = linkRect.left - navRect.left - (navRect.width / 2) + (linkRect.width / 2);
                        sideNav.scrollTo({
                            left: sideNav.scrollLeft + scrollLeft,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });
    }

    // Smooth scroll para as seções
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 100, // Ajuste para o header fixo
                behavior: 'smooth'
            });
        });
    });

    // Atualizar navegação durante o scroll
    window.addEventListener('scroll', highlightNavigation);
    // Executar uma vez quando a página carrega
    highlightNavigation();
    checkHeroVisibility();

    // Verificar visibilidade do banner durante o scroll
    window.addEventListener('scroll', checkHeroVisibility);
});
