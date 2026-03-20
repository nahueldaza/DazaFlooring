// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    
    // Esperar un mínimo de 2 segundos para mostrar la animación
    setTimeout(function() {
        preloader.classList.add('hidden');
        
        // Remover el preloader del DOM después de la transición
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);
});

// WhatsApp Click Confirmation Message
document.addEventListener('DOMContentLoaded', function() {
    const whatsappLinks = document.querySelectorAll('.whatsapp-link');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Mostrar notificación
            showNotification('¡Tu solicitud fue enviada! Pronto nos pondremos en contacto.');
            
            // Registrar evento en Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    'message': 'Solicitud de cotización vía WhatsApp'
                });
            }
        });
    });
});

// Función para mostrar notificación
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #25D366;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.4s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(notification);
    
    // Auto remover después de 4 segundos
    setTimeout(function() {
        notification.style.animation = 'slideOut 0.4s ease';
        setTimeout(function() {
            notification.remove();
        }, 400);
    }, 4000);
}

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== GOOGLE ANALYTICS EVENTS ====================

// Track clicks en llamadas telefónicas
document.addEventListener('DOMContentLoaded', function() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call_click', {
                    'event_category': 'engagement',
                    'event_label': 'Phone Call Button',
                    'value': 1
                });
            }
        });
    });
});

// Track navegación por secciones
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const section = this.getAttribute('href').replace('#', '');
            if (typeof gtag !== 'undefined') {
                gtag('event', 'section_navigation', {
                    'event_category': 'navigation',
                    'event_label': section,
                    'value': 1
                });
            }
        });
    });
});

// Track clicks en galería
document.addEventListener('DOMContentLoaded', function() {
    const galeriaItems = document.querySelectorAll('.galeria-item');
    galeriaItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'gallery_image_click', {
                    'event_category': 'engagement',
                    'event_label': `Image ${index + 1}`,
                    'value': 1
                });
            }
        });
    });
});

// Track scroll profundo (usuarios que leen todo)
let scrollTracked = false;
window.addEventListener('scroll', function() {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    if (scrollPercentage > 75 && !scrollTracked) {
        scrollTracked = true;
        if (typeof gtag !== 'undefined') {
            gtag('event', 'deep_scroll', {
                'event_category': 'engagement',
                'event_label': 'Scrolled 75%',
                'value': 75
            });
        }
    }
});

// Track tiempo en página (5 minutos)
setTimeout(function() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'time_on_page', {
            'event_category': 'engagement',
            'event_label': '5 minutes',
            'value': 5
        });
    }
}, 300000); // 5 minutos

// Track botón flotante de WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    const floatButton = document.querySelector('.whatsapp-float');
    if (floatButton) {
        floatButton.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_float_click', {
                    'event_category': 'conversion',
                    'event_label': 'Floating WhatsApp Button',
                    'value': 1
                });
            }
        });
    }
});

// Smooth scroll para los enlaces de navegación - ANIMACIÓN PERSONALIZADA CON VELOCIDAD CONSISTENTE
function smoothScroll(target, duration = 350) {
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const scrollMargin = 140; // Respeta el scroll-margin-top
    const finalPosition = targetPosition - scrollMargin;
    const startPosition = window.scrollY;
    const distance = finalPosition - startPosition;
    
    let start = null;
    
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Curva de easing para un movimiento suave (ease-in-out)
        const easeProgress = progress < 0.5 
            ? 2 * progress * progress 
            : -1 + (4 - 2 * progress) * progress;
        
        window.scrollTo(0, startPosition + distance * easeProgress);
        
        if (elapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            // Usar la función de scroll personalizada con duración de 0.35 segundos
            smoothScroll(target, 350);
        }
    });
});

// Animación al hacer scroll (reveal elements)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos que queremos animar
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.servicio-card, .galeria-item, .stat-card');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ==================== CARRUSEL NUESTROS TRABAJOS - MÚLTIPLES OBRAS ====================

document.addEventListener('DOMContentLoaded', function() {
    
    // Selector de Obras
    const obraBtns = document.querySelectorAll('.obra-btn');
    const obraContainers = document.querySelectorAll('.obra-container');
    
    obraBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const obraId = this.getAttribute('data-obra');
            
            // Remover active de todos los botones y contenedores
            obraBtns.forEach(b => b.classList.remove('active'));
            obraContainers.forEach(c => c.classList.remove('active'));
            
            // Agregar active al botón y contenedor seleccionado
            this.classList.add('active');
            document.getElementById(`obra-${obraId}`).classList.add('active');
            
            // Registrar en Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'work_selection', {
                    'event_category': 'engagement',
                    'event_label': `Obra ${obraId}`,
                    'value': parseInt(obraId)
                });
            }
        });
    });
    
    // Inicializar carrusel para cada obra
    initCarousel('carouselWrapper1', 'carouselDots1');
    initCarousel('carouselWrapper2', 'carouselDots2');
});

function initCarousel(wrapperId, dotsId) {
    const carousel = document.getElementById(wrapperId);
    const dotsContainer = document.getElementById(dotsId);
    const items = carousel.querySelectorAll('.carousel-item');
    
    if (!carousel || !items.length) return;
    
    let currentIndex = 0;
    const itemCount = items.length;
    let isScrolling = false;
    
    // Crear puntos indicadores
    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < itemCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => scrollToItem(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Desplazarse a un item específico
    function scrollToItem(index) {
        currentIndex = Math.max(0, Math.min(index, itemCount - 1));
        const item = items[currentIndex];
        
        isScrolling = true;
        carousel.scrollLeft = item.offsetLeft;
        updateDots();
        
        setTimeout(() => {
            isScrolling = false;
        }, 500);
        
        // Registrar en Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'carousel_step_view', {
                'event_category': 'engagement',
                'event_label': `Paso ${currentIndex + 1}`,
                'value': currentIndex + 1
            });
        }
    }
    
    // Actualizar puntos activos
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    // Detectar scroll y actualizar índice actual
    let scrollTimeout;
    carousel.addEventListener('scroll', () => {
        if (isScrolling) return;
        
        clearTimeout(scrollTimeout);
        
        const scrollLeft = carousel.scrollLeft;
        
        // Encontrar el item más cercano que está siendo visto
        let closestIndex = 0;
        let closestDistance = Math.abs(items[0].offsetLeft - scrollLeft);
        
        items.forEach((item, index) => {
            const distance = Math.abs(item.offsetLeft - scrollLeft);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });
        
        if (closestIndex !== currentIndex) {
            currentIndex = closestIndex;
            updateDots();
        }
    }, { passive: true });
    
    // Inicializar
    createDots();
    
    // Touch support para móvil - mejorar experiencia de swipe
    let touchStartX = 0;
    let touchStartTime = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartTime = Date.now();
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndTime = Date.now();
        const duration = touchEndTime - touchStartTime;
        const diff = touchStartX - touchEndX;
        
        // Si el swipe es significativo y rápido
        if (Math.abs(diff) > 30 && duration < 300) {
            if (diff > 0 && currentIndex < itemCount - 1) {
                scrollToItem(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                scrollToItem(currentIndex - 1);
            }
        }
    }, { passive: true });
}
