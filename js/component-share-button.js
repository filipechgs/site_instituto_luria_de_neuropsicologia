class ShareButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['url'];
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        /* html */
        this.shadowRoot.innerHTML = `
            <style>
                button {                    
                    color: white;
                    background-color: #3D8424;;
                    padding: 6px;
                    border-radius: 4px;
                    border: none;
                    margin-top: 1rem;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                button:hover {
                    background-color: #1A6C14;;
                }
            </style>
            <button part="button">
                <slot>Compartilhar</slot>
            </button>
        `;
    }

    addEventListeners() {
        const button = this.shadowRoot.querySelector('button');
        button.addEventListener('click', async () => {
            const url = this.getAttribute('url');
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: document.title,
                        url: url,
                    });
                    console.log('Compartilhamento bem-sucedido');
                } catch (error) {
                    console.log('Erro ao compartilhar:', error);
                }
            } else {
                // Fallback para navegadores que não suportam a API de compartilhamento
                navigator.clipboard.writeText(url)
                    .then(() => {
                        alert('Link copiado para a área de transferência!');
                    })
                    .catch(err => {
                        console.error('Erro ao copiar:', err);
                        alert('Não foi possível copiar o link.');
                    });
            }
        });
    }
}

// Registra o componente
customElements.define('share-button', ShareButton);
