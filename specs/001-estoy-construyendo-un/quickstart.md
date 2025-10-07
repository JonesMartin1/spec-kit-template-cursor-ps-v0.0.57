# Quickstart: CRUD Interactivo Demo

**Feature**: CRUD Interactivo para Demostración de Spec-Driven Development  
**Date**: 2025-01-16  
**Purpose**: Guía rápida para configurar y ejecutar el proyecto

## Prerequisites

### Required Software
- **Node.js**: v18.x o superior
- **npm**: v9.x o superior (viene con Node.js)
- **Git**: Para clonar el repositorio

### Recommended Tools
- **VS Code**: Editor recomendado
- **VS Code Extensions**:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - TypeScript Importer
  - Auto Rename Tag
  - Bracket Pair Colorizer

## Project Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd crud-interactive-demo
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
# Copy environment template (if needed)
cp .env.example .env.local

# No additional environment variables required for basic demo
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at: `http://localhost:3000`

## Project Structure Overview

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles + Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main demo page
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── crud/            # CRUD-specific components
│   ├── layout/          # Layout components
│   └── animations/      # Animation components
├── lib/                 # Utilities and configurations
├── hooks/              # Custom React hooks
└── styles/            # Additional CSS files
```

## Key Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

### Testing
```bash
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:e2e     # Run E2E tests
npm run test:coverage # Run tests with coverage
```

### Code Quality
```bash
npm run type-check   # TypeScript type checking
npm run format       # Format code with Prettier
npm run analyze      # Bundle analysis
```

## Demo Features

### CRUD Operations
1. **Create**: Click "Crear Elemento" → Fill form → Submit
2. **Read**: Items automatically displayed in list
3. **Update**: Click edit icon → Modify form → Submit
4. **Delete**: Click delete icon → Confirm deletion

### Visual Features
- **Dark Theme**: Modern gradient background
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Works on mobile, tablet, and desktop
- **Accessibility**: Keyboard navigation and screen reader support

## Configuration Files

### Tailwind CSS (`tailwind.config.js`)
```javascript
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // Custom gradients and colors
    }
  },
  plugins: [require('tailwindcss-animate')]
}
```

### Next.js (`next.config.js`)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Manual Build
```bash
npm run build
npm run start
```

## Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

#### 2. TypeScript Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 3. Tailwind Styles Not Loading
- Check `globals.css` imports
- Verify `tailwind.config.js` content paths
- Restart development server

#### 4. shadcn/ui Components Not Working
```bash
# Reinstall shadcn/ui components
npx shadcn-ui@latest add button card input dialog
```

### Performance Issues
- Check bundle size: `npm run analyze`
- Optimize images with `next/image`
- Use React.memo for expensive components
- Check Lighthouse scores: `npm run lighthouse`

## Development Workflow

### 1. Feature Development
1. Create feature branch: `git checkout -b feature/new-feature`
2. Implement changes
3. Test locally: `npm run test`
4. Commit changes: `git commit -m "feat: add new feature"`
5. Push and create PR

### 2. Code Standards
- Use TypeScript for all new files
- Follow ESLint rules
- Write tests for new components
- Use conventional commits
- Keep components small and focused

### 3. Testing Strategy
- Unit tests for hooks and utilities
- Component tests for UI components
- E2E tests for complete CRUD workflows
- Visual regression tests for animations

## Demo Script

### For Presentation (15 minutes)
1. **Introduction** (2 min): Show specification and requirements
2. **Live Demo** (8 min): 
   - Create new item
   - Edit existing item
   - Show animations and responsive design
   - Delete item with confirmation
3. **Code Walkthrough** (3 min): Show key components
4. **Spec-Driven Process** (2 min): Explain how spec guided development

### Key Demo Points
- Smooth animations at 60fps
- Responsive design across devices
- Accessibility features (keyboard navigation)
- Clean, maintainable code structure
- Performance metrics (Lighthouse scores)

## Support

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com/)
- [Framer Motion Docs](https://www.framer.com/motion/)

### Issues
- Create GitHub issue for bugs
- Use discussions for questions
- Check existing issues first

## License

This project is for educational demonstration purposes.
