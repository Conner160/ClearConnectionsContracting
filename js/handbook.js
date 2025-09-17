// Handbook JavaScript for dynamic content loading
(function() {
    'use strict';

    // Handbook configuration
    const HANDBOOK_CONFIG = {
        contentPath: '../handbook/',
        topics: [
            { id: 'basic-fibre-splicing', title: 'Basic Fibre Splicing' },
            { id: 'advanced-modem-provisioning', title: 'Advanced Modem Provisioning' },
            { id: 'troubleshooting', title: 'Troubleshooting Guide' },
            { id: 'safety-procedures', title: 'Safety Procedures' }
        ]
    };

    // State management
    let currentTopic = 'basic-fibre-splicing';
    let topicsData = {};
    let searchIndex = [];

    // DOM elements
    let elements = {};

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeElements();
        setupEventListeners();
        loadInitialContent();
        buildSearchIndex();
    });

    /**
     * Initialize DOM element references
     */
    function initializeElements() {
        elements = {
            sidebar: document.querySelector('.handbook-sidebar'),
            mobileMenuBtn: document.getElementById('mobile-menu-toggle'),
            searchInput: document.getElementById('handbook-search'),
            searchClear: document.getElementById('search-clear'),
            topicList: document.getElementById('topic-list'),
            contentArea: document.getElementById('content-area'),
            currentTopicSpan: document.getElementById('current-topic'),
            loadingIndicator: document.querySelector('.loading-indicator')
        };
    }

    /**
     * Set up event listeners
     */
    function setupEventListeners() {
        // Mobile menu toggle
        elements.mobileMenuBtn?.addEventListener('click', toggleMobileMenu);

        // Search functionality
        elements.searchInput?.addEventListener('input', handleSearch);
        elements.searchClear?.addEventListener('click', clearSearch);

        // Topic navigation
        elements.topicList?.addEventListener('click', handleTopicClick);

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboardNavigation);

        // Close mobile menu when clicking outside
        document.addEventListener('click', handleOutsideClick);

        // Handle escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }

    /**
     * Load initial content
     */
    function loadInitialContent() {
        loadTopic(currentTopic);
    }

    /**
     * Toggle mobile menu
     */
    function toggleMobileMenu() {
        elements.sidebar?.classList.toggle('active');
        
        // Update ARIA attributes
        const isOpen = elements.sidebar?.classList.contains('active');
        elements.mobileMenuBtn?.setAttribute('aria-expanded', isOpen);
    }

    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        elements.sidebar?.classList.remove('active');
        elements.mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    }

    /**
     * Handle clicks outside mobile menu
     */
    function handleOutsideClick(e) {
        if (window.innerWidth < 768) {
            const sidebar = elements.sidebar;
            const menuBtn = elements.mobileMenuBtn;
            
            if (sidebar?.classList.contains('active') && 
                !sidebar.contains(e.target) && 
                !menuBtn?.contains(e.target)) {
                closeMobileMenu();
            }
        }
    }

    /**
     * Handle topic button clicks
     */
    function handleTopicClick(e) {
        if (e.target.classList.contains('topic-btn')) {
            const topicId = e.target.dataset.topic;
            if (topicId) {
                selectTopic(topicId);
                closeMobileMenu();
            }
        }
    }

    /**
     * Select and load a topic
     */
    function selectTopic(topicId) {
        if (topicId === currentTopic) return;

        // Update UI
        updateActiveButton(topicId);
        updateBreadcrumb(topicId);
        
        // Load content
        loadTopic(topicId);
        
        currentTopic = topicId;

        // Analytics tracking
        if (window.clearConnectionsAnalytics) {
            window.clearConnectionsAnalytics.trackEvent('Handbook', 'topic_view', topicId);
        }
    }

    /**
     * Update active button state
     */
    function updateActiveButton(topicId) {
        // Remove active class from all buttons
        document.querySelectorAll('.topic-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });

        // Add active class to selected button
        const activeBtn = document.querySelector(`[data-topic="${topicId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
            activeBtn.setAttribute('aria-pressed', 'true');
        }
    }

    /**
     * Update breadcrumb
     */
    function updateBreadcrumb(topicId) {
        const topic = HANDBOOK_CONFIG.topics.find(t => t.id === topicId);
        if (topic && elements.currentTopicSpan) {
            elements.currentTopicSpan.textContent = topic.title;
        }
    }

    /**
     * Load topic content
     */
    async function loadTopic(topicId) {
        try {
            showLoading(true);
            
            // Check if content is already cached
            if (topicsData[topicId]) {
                displayContent(topicsData[topicId]);
                showLoading(false);
                return;
            }

            const response = await fetch(`${HANDBOOK_CONFIG.contentPath}${topicId}.md`);
            
            if (!response.ok) {
                throw new Error(`Failed to load topic: ${response.status}`);
            }

            const markdown = await response.text();
            const html = parseMarkdown(markdown);
            
            // Cache the content
            topicsData[topicId] = html;
            
            displayContent(html);
            showLoading(false);

        } catch (error) {
            console.error('Error loading topic:', error);
            displayError(`Failed to load topic content. Please try again.`);
            showLoading(false);
        }
    }

    /**
     * Simple Markdown to HTML parser
     */
    function parseMarkdown(markdown) {
        let html = markdown;

        // Headers
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');

        // Bold
        html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');

        // Italic
        html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');

        // Code blocks
        html = html.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');

        // Inline code
        html = html.replace(/`([^`]*)`/gim, '<code>$1</code>');

        // Lists
        html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
        html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');

        // Wrap consecutive list items
        html = html.replace(/(<li>.*<\/li>\s*)+/gim, '<ul>$&</ul>');
        html = html.replace(/<ul>\s*(<li>.*<\/li>)\s*<\/ul>/gim, '<ul>$1</ul>');

        // Paragraphs
        const lines = html.split('\n');
        const paragraphs = [];
        let currentParagraph = '';

        for (let line of lines) {
            line = line.trim();
            if (line === '') {
                if (currentParagraph.trim() !== '') {
                    if (!currentParagraph.startsWith('<') || currentParagraph.startsWith('<li>') || currentParagraph.startsWith('<code>')) {
                        paragraphs.push(`<p>${currentParagraph.trim()}</p>`);
                    } else {
                        paragraphs.push(currentParagraph.trim());
                    }
                    currentParagraph = '';
                }
            } else {
                if (line.startsWith('<h') || line.startsWith('<ul>') || line.startsWith('<pre>')) {
                    if (currentParagraph.trim() !== '') {
                        paragraphs.push(`<p>${currentParagraph.trim()}</p>`);
                        currentParagraph = '';
                    }
                    paragraphs.push(line);
                } else {
                    currentParagraph += (currentParagraph ? ' ' : '') + line;
                }
            }
        }

        if (currentParagraph.trim() !== '') {
            paragraphs.push(`<p>${currentParagraph.trim()}</p>`);
        }

        return paragraphs.join('\n');
    }

    /**
     * Display content in the content area
     */
    function displayContent(html) {
        if (elements.contentArea) {
            elements.contentArea.innerHTML = html;
            elements.contentArea.scrollTop = 0;
        }
    }

    /**
     * Display error message
     */
    function displayError(message) {
        if (elements.contentArea) {
            elements.contentArea.innerHTML = `
                <div class="error-message">
                    <h2>Error</h2>
                    <p>${message}</p>
                </div>
            `;
        }
    }

    /**
     * Show/hide loading indicator
     */
    function showLoading(show) {
        if (elements.loadingIndicator) {
            elements.loadingIndicator.style.display = show ? 'flex' : 'none';
        }
    }

    /**
     * Build search index
     */
    function buildSearchIndex() {
        HANDBOOK_CONFIG.topics.forEach(topic => {
            searchIndex.push({
                id: topic.id,
                title: topic.title,
                keywords: topic.title.toLowerCase().split(' ')
            });
        });
    }

    /**
     * Handle search input
     */
    function handleSearch(e) {
        const query = e.target.value.trim().toLowerCase();
        
        // Show/hide clear button
        elements.searchClear.style.display = query ? 'block' : 'none';

        if (query === '') {
            showAllTopics();
            return;
        }

        filterTopics(query);
    }

    /**
     * Filter topics based on search query
     */
    function filterTopics(query) {
        const topicButtons = document.querySelectorAll('.topic-btn');
        let visibleCount = 0;

        topicButtons.forEach(btn => {
            const title = btn.textContent.toLowerCase();
            const isMatch = title.includes(query);
            
            btn.parentElement.style.display = isMatch ? 'block' : 'none';
            if (isMatch) visibleCount++;
        });

        // Show no results message if needed
        updateNoResultsMessage(visibleCount === 0, query);
    }

    /**
     * Show all topics
     */
    function showAllTopics() {
        document.querySelectorAll('.topic-btn').forEach(btn => {
            btn.parentElement.style.display = 'block';
        });
        
        updateNoResultsMessage(false);
    }

    /**
     * Update no results message
     */
    function updateNoResultsMessage(show, query = '') {
        let noResultsEl = document.querySelector('.no-results');
        
        if (show && !noResultsEl) {
            noResultsEl = document.createElement('div');
            noResultsEl.className = 'no-results';
            noResultsEl.innerHTML = `
                <h3>No results found</h3>
                <p>No topics match "${query}". Try different search terms.</p>
            `;
            elements.topicList?.appendChild(noResultsEl);
        } else if (!show && noResultsEl) {
            noResultsEl.remove();
        }
    }

    /**
     * Clear search
     */
    function clearSearch() {
        if (elements.searchInput) {
            elements.searchInput.value = '';
            elements.searchInput.focus();
        }
        
        elements.searchClear.style.display = 'none';
        showAllTopics();
    }

    /**
     * Handle keyboard navigation
     */
    function handleKeyboardNavigation(e) {
        if (e.target.matches('.topic-btn')) {
            const buttons = Array.from(document.querySelectorAll('.topic-btn:not([style*="display: none"])'));
            const currentIndex = buttons.indexOf(e.target);
            
            let nextIndex;
            
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    nextIndex = (currentIndex + 1) % buttons.length;
                    buttons[nextIndex].focus();
                    break;
                    
                case 'ArrowUp':
                    e.preventDefault();
                    nextIndex = currentIndex === 0 ? buttons.length - 1 : currentIndex - 1;
                    buttons[nextIndex].focus();
                    break;
                    
                case 'Home':
                    e.preventDefault();
                    buttons[0].focus();
                    break;
                    
                case 'End':
                    e.preventDefault();
                    buttons[buttons.length - 1].focus();
                    break;
            }
        }
    }

    // Export for potential external use
    window.HandbookManager = {
        loadTopic: loadTopic,
        selectTopic: selectTopic,
        getCurrentTopic: () => currentTopic
    };

})();