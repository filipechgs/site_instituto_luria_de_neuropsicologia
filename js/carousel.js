document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-control-prev');
    const nextBtn = document.querySelector('.carousel-control-next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    let currentIndex = 0;
    const totalItems = items.length;

    // Criar indicadores
    for (let i = 0; i < totalItems; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 0) {
            indicator.classList.add('active');
        }
        indicator.addEventListener('click', () => {
            goToItem(i);
        });
        indicatorsContainer.appendChild(indicator);
    }

    const indicators = document.querySelectorAll('.indicator');

    // Função para atualizar o carrossel
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Atualizar indicadores
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Ir para um item específico
    function goToItem(index) {
        currentIndex = index;
        updateCarousel();
    }

    // Ir para o próximo item
    function goToNextItem() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }

    // Ir para o item anterior
    function goToPrevItem() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    }

    // Adicionar event listeners aos botões
    nextBtn.addEventListener('click', goToNextItem);
    prevBtn.addEventListener('click', goToPrevItem);

    // Navegação por teclado
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            goToPrevItem();
        } else if (e.key === 'ArrowRight') {
            goToNextItem();
        }
    });

    // Adicionar suporte a swipe para dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe para a esquerda - próxima imagem
            goToNextItem();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe para a direita - imagem anterior
            goToPrevItem();
        }
    }
});