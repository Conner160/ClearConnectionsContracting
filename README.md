# Clear Connections Contracting Website

A mobile-first, modular website for Clear Connections Contracting that serves as a landing page with clickable thumbnails directing users to various services.

## Features

- **Mobile-First Design**: Optimized for mobile devices with responsive layout
- **Modular Architecture**: Organized codebase for easy expansion and maintenance
- **Accessible**: Keyboard navigation support and screen reader friendly
- **Modern Web Standards**: Semantic HTML5, CSS Grid/Flexbox, ES6+ JavaScript

## Project Structure

```
/
├── index.html                 # Main landing page
├── assets/
│   ├── css/
│   │   ├── main.css          # Main stylesheet with mobile-first design
│   │   └── components/       # Future component-specific styles
│   ├── images/
│   │   └── thumbnails/       # Placeholder thumbnail images
│   │       ├── residential.svg
│   │       ├── commercial.svg
│   │       ├── renovations.svg
│   │       └── contact.svg
│   └── js/
│       ├── main.js           # Main JavaScript functionality
│       └── components/       # Future component-specific scripts
├── pages/                    # Future additional pages
└── README.md                # This file
```

## Design System

### Breakpoints
- Mobile: < 768px (default)
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Large Desktop: ≥ 1440px

### Color Palette
- Primary Blue: #3498db
- Dark Blue: #2c3e50
- Success Green: #27ae60
- Warning Orange: #f39c12
- Danger Red: #e74c3c
- Light Background: #f8f9fa
- Text: #333

## Getting Started

1. Open `index.html` in a web browser
2. The site is fully static and requires no build process
3. All assets are self-contained

## Future Expansion

The modular structure allows for easy addition of:
- New pages in the `pages/` directory
- Component-specific styles in `assets/css/components/`
- Component-specific scripts in `assets/js/components/`
- Additional images and assets

## Browser Support

- Modern browsers (Chrome 60+, Firefox 60+, Safari 12+, Edge 79+)
- Mobile browsers (iOS Safari 12+, Chrome Mobile 60+)
- Progressive enhancement for older browsers

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Skip links for screen readers
- Focus management
- Alt text for images
- ARIA labels where appropriate