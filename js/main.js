// Main JavaScript for Clear Connections Contracting Website

document.addEventListener('DOMContentLoaded', function() {
    console.log('Clear Connections Contracting website loaded');
    
    // Initialize mobile optimizations
    initializeMobileOptimizations();
    
    // Initialize analytics tracking (placeholder)
    initializeAnalytics();
    
    // Initialize accessibility features
    initializeAccessibility();
});

/**
 * Initialize mobile-specific optimizations
 */
function initializeMobileOptimizations() {
    // Add touch feedback for mobile devices
    const thumbnailCards = document.querySelectorAll('.thumbnail-card');
    
    thumbnailCards.forEach(card => {
        // Add touch start feedback
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });
        
        // Reset on touch end
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, { passive: true });
        
        // Handle click events for analytics
        card.addEventListener('click', function(e) {
            const link = this.querySelector('.thumbnail-link');
            const title = this.querySelector('h4').textContent;
            
            // Log click for analytics (placeholder)
            console.log('Service clicked:', title);
            
            // Ensure link opens in new tab (backup for HTML target="_blank")
            if (link && link.href) {
                e.preventDefault();
                window.open(link.href, '_blank', 'noopener,noreferrer');
            }
        });
    });
}

/**
 * Initialize analytics tracking (placeholder for future implementation)
 */
function initializeAnalytics() {
    // Placeholder for Google Analytics or other tracking
    // This can be expanded when actual analytics are needed
    
    window.clearConnectionsAnalytics = {
        trackEvent: function(category, action, label) {
            console.log('Analytics Event:', { category, action, label });
            // Future: integrate with actual analytics service
        },
        
        trackPageView: function(page) {
            console.log('Page View:', page);
            // Future: integrate with actual analytics service
        }
    };
    
    // Track initial page load
    window.clearConnectionsAnalytics.trackPageView('home');
}

/**
 * Initialize accessibility features
 */
function initializeAccessibility() {
    // Add keyboard navigation support
    const thumbnailLinks = document.querySelectorAll('.thumbnail-link');
    
    thumbnailLinks.forEach(link => {
        // Add keyboard event handling
        link.addEventListener('keydown', function(e) {
            // Handle Enter and Space key activation
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Add focus indicators
        link.addEventListener('focus', function() {
            this.parentElement.style.outline = '2px solid #2c5aa0';
            this.parentElement.style.outlineOffset = '2px';
        });
        
        link.addEventListener('blur', function() {
            this.parentElement.style.outline = '';
            this.parentElement.style.outlineOffset = '';
        });
    });
    
    // Add reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0s');
        
        // Disable transforms for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            .thumbnail-card {
                transition: box-shadow 0.3s ease !important;
            }
            .thumbnail-card:hover {
                transform: none !important;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Utility function to check if device is mobile
 */
function isMobileDevice() {
    return window.innerWidth <= 768 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Handle responsive image loading
 */
function handleResponsiveImages() {
    // This can be expanded when actual images are added
    // For now, placeholder images will be created via CSS/SVG
    console.log('Responsive images initialized');
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeMobileOptimizations,
        initializeAnalytics,
        initializeAccessibility,
        isMobileDevice
    };
}