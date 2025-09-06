/**
 * Clear Connections Contracting - Main JavaScript
 * Mobile-first modular website functionality
 */

// Main application object for modular organization
const ClearConnections = {
    // Configuration
    config: {
        animationDuration: 300,
        mobileBreakpoint: 768
    },

    // Initialize the application
    init() {
        this.setupEventListeners();
        this.setupAccessibility();
        this.loadComponents();
        console.log('Clear Connections Contracting website initialized');
    },

    // Set up event listeners
    setupEventListeners() {
        // Handle link card interactions
        this.setupLinkCards();
        
        // Handle window resize for responsive features
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
        
        // Handle page visibility changes
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    },

    // Setup link card functionality
    setupLinkCards() {
        const linkCards = document.querySelectorAll('.link-card');
        
        linkCards.forEach(card => {
            const link = card.querySelector('.link-card__link');
            
            // Add click analytics (placeholder for future)
            link.addEventListener('click', (e) => {
                const title = card.querySelector('.link-card__title').textContent;
                this.trackLinkClick(title, link.href);
            });

            // Add hover effects for non-touch devices
            if (!this.isTouchDevice()) {
                card.addEventListener('mouseenter', () => {
                    this.animateCardHover(card, true);
                });
                
                card.addEventListener('mouseleave', () => {
                    this.animateCardHover(card, false);
                });
            }

            // Add loading state when clicked
            link.addEventListener('click', () => {
                this.addLoadingState(card);
                // Remove loading state after a delay (in case the link doesn't navigate)
                setTimeout(() => {
                    this.removeLoadingState(card);
                }, 2000);
            });
        });
    },

    // Setup accessibility features
    setupAccessibility() {
        // Add skip link for keyboard navigation
        this.addSkipLink();
        
        // Improve focus management
        this.setupFocusManagement();
    },

    // Add loading state to card
    addLoadingState(card) {
        card.classList.add('loading');
    },

    // Remove loading state from card
    removeLoadingState(card) {
        card.classList.remove('loading');
    },

    // Animate card hover effects
    animateCardHover(card, isHovering) {
        const image = card.querySelector('.link-card__image');
        if (image) {
            image.style.transform = isHovering ? 'scale(1.1)' : 'scale(1)';
        }
    },

    // Track link clicks (placeholder for analytics)
    trackLinkClick(title, url) {
        console.log(`Link clicked: ${title} -> ${url}`);
        // This is where you would integrate with analytics services
        // Example: gtag('event', 'click', { 'link_title': title, 'link_url': url });
    },

    // Handle window resize
    handleResize() {
        const width = window.innerWidth;
        const isMobile = width < this.config.mobileBreakpoint;
        
        // Update mobile state
        document.body.classList.toggle('is-mobile', isMobile);
        document.body.classList.toggle('is-desktop', !isMobile);
        
        console.log(`Window resized: ${width}px (${isMobile ? 'mobile' : 'desktop'})`);
    },

    // Handle page visibility changes
    handleVisibilityChange() {
        if (document.hidden) {
            console.log('Page hidden');
        } else {
            console.log('Page visible');
        }
    },

    // Add skip link for accessibility
    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #3498db;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add id to main element
        const main = document.querySelector('.main');
        if (main) {
            main.id = 'main';
        }
    },

    // Setup focus management
    setupFocusManagement() {
        // Improve focus visibility for keyboard users
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    },

    // Check if device supports touch
    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },

    // Debounce utility function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Load additional components (for future modular expansion)
    loadComponents() {
        // This is where future components would be loaded
        // Example: this.loadComponent('newsletter');
        console.log('Base components loaded');
    },

    // Utility method for loading future components
    loadComponent(componentName) {
        // Placeholder for dynamic component loading
        console.log(`Loading component: ${componentName}`);
        // Future implementation might load CSS and JS files dynamically
    }
};

// Initialize the application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        ClearConnections.init();
    });
} else {
    ClearConnections.init();
}

// Make ClearConnections available globally for future modules
window.ClearConnections = ClearConnections;