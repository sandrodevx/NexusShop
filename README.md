# 🚀 NexusShop - Premium E-commerce Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.3.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.0.8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Framer%20Motion-10.16.5-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</div>

<div align="center">
  <h3>🎯 E-commerce premium con tecnologías de vanguardia</h3>
  <p>Minimalismo inspirado en Apple.com • Animaciones fluidas • Experiencia premium</p>
  
  <a href="https://nexusshop-demo.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
</div>

---

## ✨ Características Premium

### 🛒 **Carrito Inteligente**
- **Persistencia automática** en localStorage
- **Contador dinámico** con animaciones
- **Estado reactivo** con Zustand

### 🎨 **Diseño Moderno**
- **Glassmorphism** y efectos de backdrop-blur
- **Gradientes animados** y microinteracciones
- **Responsive design** mobile-first
- **Paleta de colores** inspirada en marcas premium

### ⚡ **Performance Optimizada**
- **Vite + SWC** para builds ultra-rápidos
- **Code splitting** automático
- **Lazy loading** de componentes
- **PWA ready** para experiencia nativa

### 🎭 **Animaciones Premium**
- **Framer Motion** para transiciones suaves
- **Hover effects** interactivos
- **Loading states** elegantes
- **3D transforms** y efectos visuales

---

## 🚀 Inicio Rápido

### 📋 Prerrequisitos
- **Node.js** 18+
- **npm** 9+

### ⚡ Instalación Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/nexusshop.git
cd nexusshop

# 2. Instalar dependencias del frontend
npm run install-frontend

# 3. Ejecutar en modo desarrollo
npm run dev

# 🌐 Abrir http://localhost:3000
```

### 🔗 Despliegue en Vercel

1. **Fork** este repositorio
2. Conecta tu repo con **Vercel**
3. ¡Despliega automáticamente! ✨

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/nexusshop)

---

## 📦 Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.2.0 | UI Framework |
| **TypeScript** | 5.3.3 | Type Safety |
| **Vite** | 5.0.8 | Build Tool |
| **TailwindCSS** | 3.4.0 | Styling |
| **Framer Motion** | 10.16.5 | Animations |
| **Zustand** | 4.4.7 | State Management |
| **Lucide React** | 0.293.0 | Icons |

---

## 🎨 Características Visuales

### 🎯 **Paleta de Colores**
```css
/* Brand Colors */
Primary: #3a86ff    /* Blue */
Secondary: #8338ec  /* Purple */
Accent: #06b6d4     /* Cyan */

/* Gradients */
Hero: linear-gradient(135deg, #3a86ff, #8338ec)
Background: linear-gradient(135deg, #f0f9ff, #faf5ff)
```

### 📐 **Design System**
- **Espaciado**: Grid de 8px
- **Tipografía**: Inter (sistema)
- **Bordes**: Radius de 8px-24px
- **Sombras**: Glassmorphism + depth layers

---

## 🌟 Características Demo

### 🛍️ **Funcionalidades Activas**
- ✅ Carrito interactivo con contador
- ✅ Animaciones fluidas en hover
- ✅ Producto demo con ratings
- ✅ Header sticky con blur effect
- ✅ Responsive design completo

### 🔮 **Próximas Funcionalidades**
- [ ] 🔐 Sistema de autenticación
- [ ] 🎨 Visualizador 3D de productos
- [ ] 🤖 Recomendaciones IA
- [ ] 💳 Integración con Stripe
- [ ] 🔍 Búsqueda avanzada

---

## 📱 Screenshots

### 🖥️ Desktop
![Desktop View](https://via.placeholder.com/800x600/3a86ff/ffffff?text=NexusShop+Desktop)

### 📱 Mobile
![Mobile View](https://via.placeholder.com/375x812/8338ec/ffffff?text=NexusShop+Mobile)

---

## 🛠️ Desarrollo

### 📁 Estructura del Proyecto
```
NexusShop/
├── 📁 apps/frontend/          # React App Principal
│   ├── 📁 src/
│   │   ├── 📁 components/     # Componentes reutilizables
│   │   ├── 📁 stores/         # Zustand stores
│   │   ├── 📁 utils/          # Utilidades
│   │   └── 📄 App.tsx         # Componente principal
│   ├── 📄 package.json
│   ├── 📄 vite.config.ts
│   └── 📄 tailwind.config.js
├── 📄 package.json           # Scripts principales
├── 📄 vercel.json           # Configuración Vercel
└── 📄 README.md
```

### 🧪 Scripts Disponibles
```bash
# Desarrollo
npm run dev                 # Inicia servidor desarrollo

# Build
npm run build              # Build para producción
npm run preview           # Preview del build

# Utilidades
npm run install-frontend  # Instala dependencias
npm run clean            # Limpia node_modules
```

---

## 🌐 Despliegue

### 🔄 **Automatic Deployment**
- **Push to main** → Auto deploy a producción
- **Pull Request** → Preview deployment
- **Custom domains** disponibles

### ⚙️ **Variables de Entorno** (Futuras)
```bash
# Para funcionalidades avanzadas
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=https://api.nexusshop.com
```

---

## 🤝 Contribuir

1. **Fork** el proyecto
2. **Create** una rama feature (`git checkout -b feature/amazing-feature`)
3. **Commit** tus cambios (`git commit -m 'Add amazing feature'`)
4. **Push** a la rama (`git push origin feature/amazing-feature`)
5. **Open** un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

## 🌟 Roadmap

### 🎯 **Versión 1.1**
- [ ] 🔐 Autenticación completa
- [ ] 🛒 Checkout flow
- [ ] 📱 PWA installation

### 🚀 **Versión 2.0**
- [ ] 🎨 Visualizador 3D real
- [ ] 🤖 IA recommendations
- [ ] 📊 Analytics dashboard

---

<div align="center">
  <h3>🎯 Hecho con ❤️ para demostrar habilidades modernas de desarrollo</h3>
  <p>Un proyecto que destaca en cualquier portfolio de desarrollo frontend</p>
  
  **⭐ Si te gusta este proyecto, dale una estrella ⭐**
  
  <br />
  
  <a href="https://github.com/tu-usuario">
    <img src="https://img.shields.io/badge/👨‍💻-SandroDevX-blue?style=flat-square" alt="Developer" />
  </a>
  <a href="https://twitter.com/tu-usuario">
    <img src="https://img.shields.io/badge/🐦-Twitter-1DA1F2?style=flat-square" alt="Twitter" />
  </a>
  <a href="https://linkedin.com/in/tu-usuario">
    <img src="https://img.shields.io/badge/💼-LinkedIn-0077B5?style=flat-square" alt="LinkedIn" />
  </a>
</div> 