// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Configurações de animação e interatividade
    initializeAnimations();
    initializeButtons();
    initializeScrollEffects();
    
    //console.log('📚 Página de E-books carregada com sucesso!');
});

/**
 * Inicializa animações na página
 */
function initializeAnimations() {
    // Animação de entrada das seções
    const sections = document.querySelectorAll('.ebook-section');
    
    // Observer para animações ao entrar na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplica observer às seções
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
}

/**
 * Inicializa funcionalidades dos botões
 */
function initializeButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        // Efeito de click
        button.addEventListener('click', function(e) {
            // Cria efeito ripple no botão
            createRippleEffect(e, this);
            
            // Analytics/tracking (simulado)
            const bookTitle = this.closest('.ebook-section').querySelector('.book-title').textContent;
            console.log(`📈 Clique registrado no e-book: ${bookTitle}`);
            
            // Pequeno delay para mostrar o efeito antes do redirecionamento
            setTimeout(() => {
                // O link será seguido naturalmente
            }, 150);
        });
        
        // Efeito hover aprimorado
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Cria efeito ripple nos botões
 */
function createRippleEffect(event, button) {
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    // Adiciona animação CSS se não existir
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    button.appendChild(ripple);
    
    // Remove o elemento após a animação
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Inicializa efeitos de scroll
 */
function initializeScrollEffects() {
    // Efeito parallax suave no header
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (header) {
            header.style.transform = `translateY(${parallax}px)`;
        }
        
        // Efeito de zoom suave nas imagens dos livros durante o scroll
        updateBookImageScale();
    });
    
    // Scroll suave para links internos (se houver)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Atualiza escala das imagens dos livros baseada no scroll
 */
function updateBookImageScale() {
    const bookCovers = document.querySelectorAll('.book-cover');
    
    bookCovers.forEach(cover => {
        const rect = cover.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
            const scale = 0.95 + (scrollPercent * 0.05); // Varia de 0.95 a 1.0
            cover.style.transform = `scale(${Math.min(scale, 1)})`;
        }
    });
}

/**
 * Adiciona funcionalidade de highlight nos itens da lista
 */
function initializeHighlightItems() {
    const highlightItems = document.querySelectorAll('.highlight-item');
    
    highlightItems.forEach((item, index) => {
        // Animação de entrada sequencial
        item.style.animationDelay = `${index * 0.1}s`;
        
        // Efeito hover aprimorado
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(79, 53, 41, 0.05)';
            this.style.borderRadius = '4px';
            this.style.padding = '10px 15px';
            this.style.margin = '0 -15px';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.borderRadius = '0';
            this.style.padding = '10px 0';
            this.style.margin = '0';
        });
    });
}

/**
 * Detecta mudança de orientação em dispositivos móveis
 */
function handleOrientationChange() {
    window.addEventListener('orientationchange', function() {
        // Pequeno delay para aguardar a reorientação completa
        setTimeout(() => {
            // Recalcula posições e animações se necessário
            initializeAnimations();
        }, 100);
    });
}

/**
 * Funcionalidade de loading suave
 */
function initializePageLoading() {
    // Adiciona classe de loading inicialmente
    document.body.classList.add('loading');
    
    // Remove loading após carregamento completo
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.classList.remove('loading');
            
            // Adiciona estilo de loading se não existir
            if (!document.querySelector('#loading-style')) {
                const style = document.createElement('style');
                style.id = 'loading-style';
                style.textContent = `
                    .loading .ebook-section {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    
                    .loading .header {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                `;
                document.head.appendChild(style);
            }
        }, 100);
    });
}

/**
 * Adiciona funcionalidades de acessibilidade
 */
function initializeAccessibility() {
    // Navegação por teclado aprimorada
    document.addEventListener('keydown', function(e) {
        // Esc fecha modais ou retorna ao topo
        if (e.key === 'Escape') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Enter em elementos focáveis
        if (e.key === 'Enter' && e.target.classList.contains('cta-button')) {
            e.target.click();
        }
    });
    
    // Melhora o foco para navegação por teclado
    const focusableElements = document.querySelectorAll('.cta-button, a, button');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid #C8C39E';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

/**
 * Performance: Debounce para eventos de scroll
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplica debounce ao scroll
const debouncedScrollHandler = debounce(() => {
    updateBookImageScale();
}, 10);

// Inicializa todas as funcionalidades quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    initializePageLoading();
    initializeHighlightItems();
    handleOrientationChange();
    initializeAccessibility();
    
    // Substitui o listener de scroll simples pelo debounced
    window.removeEventListener('scroll', updateBookImageScale);
    window.addEventListener('scroll', debouncedScrollHandler);
});

// Adiciona listener para mudança de tamanho de tela
window.addEventListener('resize', debounce(() => {
    // Recalcula elementos se necessário
    updateBookImageScale();
}, 250)); 