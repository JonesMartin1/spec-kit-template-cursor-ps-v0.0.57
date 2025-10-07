# CRUD Interactivo - Spec-Driven Development Demo

Una demostración completa de **Spec-Driven Development** implementando operaciones CRUD con Next.js, TypeScript y Tailwind CSS.

## 🚀 Características

- ✅ **Operaciones CRUD completas** (Create, Read, Update, Delete)
- ✅ **Diseño moderno** con tema oscuro y gradientes animados
- ✅ **Animaciones fluidas** a 60fps con Framer Motion
- ✅ **Responsive design** optimizado para todos los dispositivos
- ✅ **Accesibilidad** WCAG 2.1 AA compliant
- ✅ **Documentación interactiva** con trazabilidad spec-to-code
- ✅ **Persistencia de datos** en localStorage
- ✅ **Validación completa** de formularios
- ✅ **Manejo de errores** con notificaciones toast

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 15.5.4, React 18.3.1, TypeScript 5.6.3
- **Styling**: Tailwind CSS 3.4.15, shadcn/ui
- **Animations**: Framer Motion 11.15.0
- **Development**: ESLint, Prettier, PostCSS
- **Deployment**: Vercel (ready)

## 📁 Estructura del Proyecto

```
crud-demo/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Página principal
│   │   ├── docs/              # Documentación
│   │   └── layout.tsx         # Layout raíz
│   ├── components/
│   │   ├── crud/              # Componentes CRUD
│   │   ├── ui/                # Componentes base
│   │   ├── layout/            # Componentes de layout
│   │   ├── animations/        # Componentes de animación
│   │   └── docs/              # Componentes de documentación
│   ├── hooks/                 # Custom hooks
│   ├── lib/                   # Utilidades y tipos
│   └── styles/                # Estilos globales
├── specs/                     # Especificaciones del proyecto
└── public/                    # Archivos estáticos
```

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd crud-demo

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### Scripts Disponibles
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting
npm run type-check   # Verificación de tipos
```

## 📋 Especificaciones

El proyecto sigue **Spec-Driven Development** con documentación completa en:

- `specs/001-estoy-construyendo-un/spec.md` - Especificaciones funcionales
- `specs/001-estoy-construyendo-un/data-model.md` - Modelo de datos
- `specs/001-estoy-construyendo-un/plan.md` - Plan de arquitectura
- `specs/001-estoy-construyendo-un/tasks.md` - Tareas de implementación

## 🎯 Funcionalidades Implementadas

### Operaciones CRUD
- **Create**: Crear nuevos elementos con validación
- **Read**: Mostrar elementos con filtros y ordenamiento
- **Update**: Editar elementos existentes
- **Delete**: Eliminar elementos con confirmación

### Características Avanzadas
- **Filtros dinámicos** por categoría, prioridad y estado
- **Persistencia automática** en localStorage
- **Notificaciones toast** para feedback del usuario
- **Animaciones escalonadas** en listas
- **Micro-interacciones** en botones y elementos

### Documentación
- **Trazabilidad spec-to-code** completa
- **Roadmap de desarrollo** interactivo
- **Especificaciones técnicas** detalladas
- **Métricas de rendimiento** en tiempo real

## 🔧 Configuración

### Variables de Entorno
```bash
# .env.local
NEXT_PUBLIC_APP_NAME="CRUD Interactivo"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

### Tailwind CSS
Configuración personalizada con:
- Tema oscuro por defecto
- Gradientes animados
- Breakpoints responsivos
- Utilidades personalizadas

## 📱 Responsive Design

Optimizado para:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px - 1920px+
- **Ultra-wide**: 1920px+

## ♿ Accesibilidad

- **WCAG 2.1 AA** compliant
- **Navegación por teclado** completa
- **Screen readers** optimizado
- **Contraste** adecuado
- **ARIA labels** en todos los elementos interactivos

## 🚀 Deployment

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Build Manual
```bash
npm run build
npm run start
```

## 📊 Métricas de Rendimiento

- **Lighthouse Score**: 90+ en todas las categorías
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 500KB

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) - Framework de React
- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI
- [Framer Motion](https://framer.com/motion/) - Biblioteca de animaciones
- [Lucide React](https://lucide.dev/) - Iconos

---

**Desarrollado con ❤️ usando Spec-Driven Development**