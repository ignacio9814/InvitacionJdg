# 🎉 Invitación Digital JDG Neumáticos

Invitación digital moderna y animada para la inauguración de la nueva sucursal de JDG Neumáticos.

## ✨ Características

- **🎨 Diseño Profesional**: Interfaz moderna y elegante con animaciones fluidas
- **📱 Mobile-First**: Optimizado principalmente para dispositivos móviles en formato vertical
- **🎬 Animaciones Avanzadas**: 
  - Animación de rueda que cruza la pantalla al cargar
  - Efectos de revelado para las tarjetas de información
  - Transiciones suaves y profesionales
- **🎯 Interactividad**:
  - Botones de fecha y hora con enlace directo a Google Calendar
  - Botón de ubicación enlazado a Google Maps
  - Botón de confirmación de asistencia
  - Logo con enlace a Instagram
- **⚡ Rendimiento Optimizado**: Carga rápida y animaciones fluidas

## 🛠️ Tecnologías

- **React 18** - Framework de UI
- **Vite** - Build tool y dev server
- **GSAP** - Animaciones profesionales
- **CSS3** - Estilos y efectos visuales
- **Tailwind CSS** - Utilidades CSS (parcialmente)

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🚀 Despliegue

### Netlify

1. Conecta tu repositorio de GitHub a Netlify
2. Configuración automática:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. El archivo `netlify.toml` ya está configurado

### GitHub Pages

```bash
# Build del proyecto
npm run build

# Subir la carpeta dist a GitHub Pages
```

## 📱 Elementos de la Invitación

- ✅ **Título principal**: "CRECEMOS PARA ESTAR MÁS CERCA DE VOS."
- ✅ **Fecha destacada**: "📅 JUEVES 4 DE DICIEMBRE" (resaltada en amarillo)
- ✅ **Hora**: "🕒 19:00 HS"
- ✅ **Botón "📍 Ver ubicación"**: Enlace a Google Maps
- ✅ **Botón "✅ Confirmar asistencia"**: Enlace a formulario
- ✅ **Logo JDG**: Con enlace a Instagram

## 🎬 Animaciones

1. **Carga inicial**: La rueda aparece desde la izquierda y cruza la pantalla
2. **Revelado**: Las tarjetas de fecha y hora aparecen después de que pasa la rueda
3. **Resaltado**: La tarjeta de fecha queda permanentemente resaltada en amarillo
4. **Hover effects**: Efectos interactivos en botones y tarjetas

## 📂 Estructura del Proyecto

```
├── public/
│   └── assets/
│       ├── animations/  # Videos de animación
│       └── images/      # Imágenes (logo, fondos)
├── src/
│   ├── components/
│   │   ├── InfoCard.jsx    # Componente de tarjeta de información
│   │   └── InfoCard.css    # Estilos de la tarjeta
│   ├── App.jsx             # Componente principal
│   ├── App.css             # Estilos del componente principal
│   ├── main.jsx            # Punto de entrada
│   └── index.css           # Estilos globales
├── styles.css                # Estilos globales adicionales
├── index.html               # HTML principal
├── vite.config.js           # Configuración de Vite
├── netlify.toml             # Configuración de Netlify
└── package.json             # Dependencias y scripts
```

## 🌐 Compatibilidad

- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Dispositivos móviles (iOS y Android)
- ✅ Tablets y pantallas grandes (responsive)
- ✅ Soporte para `prefers-reduced-motion` (accesibilidad)

## 📝 Notas

- Las animaciones utilizan GSAP para máximo rendimiento
- El diseño está optimizado para móviles en formato vertical
- Los enlaces de Google Calendar se generan dinámicamente con la fecha correcta
- El fondo utiliza una imagen de rueda con overlay azul oscuro

## 📄 Licencia

Proyecto privado para JDG Neumáticos.

---

**Desarrollado con ❤️ para JDG Neumáticos**
