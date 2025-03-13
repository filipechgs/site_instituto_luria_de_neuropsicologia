// Menu mobile toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.getElementById('main-nav');

mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    mobileMenuBtn.textContent = mobileMenuBtn.textContent === "☰"? "⛌" : "☰";
});

// Smooth scroll para links âncora
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {

        // Fechar menu mobile se estiver aberto
        if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
        }

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação de scroll para elementos
const animateOnScroll = () => {
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};

// Estilo inicial para animação
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.5s ease-out';
});

// Iniciar animação ao carregar a página
window.addEventListener('load', animateOnScroll);

// Continuar animação ao rolar a página
window.addEventListener('scroll', animateOnScroll);