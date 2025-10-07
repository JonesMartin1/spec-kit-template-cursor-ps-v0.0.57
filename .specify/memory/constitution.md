# Web Estática Constitution
<!-- Constitución para desarrollo de sitios web estáticos simples y eficientes -->

## Principios Fundamentales

### I. Simplicidad Primero
Cada componente debe ser lo más simple posible; Evitar complejidad innecesaria; Priorizar HTML semántico y CSS puro; Solo agregar JavaScript cuando sea absolutamente necesario

### II. Performance y Velocidad
Optimización automática de imágenes y assets; Minificación de CSS y JavaScript; Compresión gzip habilitada; Tiempo de carga objetivo: < 3 segundos

### III. Responsive Design (OBLIGATORIO)
Diseño mobile-first obligatorio; Breakpoints estándar: 320px, 768px, 1024px, 1440px; Testing en dispositivos reales requerido; Flexbox y Grid como estándares

### IV. Accesibilidad Web
Cumplimiento WCAG 2.1 AA mínimo; Alt text en todas las imágenes; Navegación por teclado funcional; Contraste de colores validado; Estructura semántica HTML

### V. SEO y Meta Tags
Meta tags optimizados; Open Graph y Twitter Cards; Sitemap.xml generado automáticamente; Schema markup cuando aplique; URLs limpias y descriptivas

## Stack Tecnológico

### Tecnologías Principales
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Flexbox, Grid, Custom Properties, Animaciones
- **JavaScript ES6+**: Solo cuando sea necesario para interactividad
- **Build Tools**: Vite o Parcel para desarrollo rápido
- **Deployment**: Netlify, Vercel, o GitHub Pages

### Herramientas de Desarrollo
- **Linting**: ESLint para JS, Stylelint para CSS
- **Formatting**: Prettier con configuración consistente
- **Testing**: Jest para JS, Lighthouse para performance
- **Versionado**: Git con commits semánticos

## Flujo de Desarrollo

### Workflow Básico
1. **Planificación**: Wireframes y diseño en Figma/Adobe XD
2. **Desarrollo**: HTML → CSS → JavaScript (solo si necesario)
3. **Testing**: Cross-browser testing + Lighthouse audit
4. **Deploy**: Automático via Git hooks
5. **Mantenimiento**: Monitoreo de performance y errores

### Estándares de Código
- CSS: BEM methodology para naming
- HTML: Validación W3C obligatoria
- JavaScript: Funcional programming preferido
- Imágenes: WebP con fallback a JPEG/PNG

## Gobernanza

### Cumplimiento de Estándares
Esta constitución supera todas las demás prácticas del proyecto; Las modificaciones requieren documentación, aprobación y plan de migración; Todos los PRs deben verificar cumplimiento de accesibilidad y performance

### Control de Calidad
- Lighthouse score mínimo: 90/100 en todas las categorías
- Validación HTML obligatoria antes de merge
- Testing cross-browser en Chrome, Firefox, Safari, Edge
- Revisión de código enfocada en simplicidad y mantenibilidad

### Principio de Simplicidad
La complejidad debe estar justificada; Preferir soluciones nativas del navegador; Evitar frameworks pesados para sitios estáticos; YAGNI (You Aren't Gonna Need It) aplicado estrictamente

**Versión**: 1.0.0 | **Ratificada**: 2025-01-16 | **Última Modificación**: 2025-01-16