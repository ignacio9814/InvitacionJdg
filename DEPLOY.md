# 🚀 Guía de Despliegue - GitHub y Netlify

## 📋 Pasos para subir a GitHub

### 1. Inicializar Git (si no está inicializado)

```bash
# Inicializar repositorio
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: Invitación digital JDG Neumáticos"
```

### 2. Crear repositorio en GitHub

1. Ve a [GitHub](https://github.com) y crea un nuevo repositorio
2. **NO** inicialices con README, .gitignore o licencia (ya los tenemos)
3. Copia la URL del repositorio (ejemplo: `https://github.com/tu-usuario/jdg-invitacion.git`)

### 3. Conectar y subir a GitHub

```bash
# Agregar el repositorio remoto (reemplaza con tu URL)
git remote add origin https://github.com/tu-usuario/jdg-invitacion.git

# Cambiar a la rama main
git branch -M main

# Subir el código
git push -u origin main
```

### 4. Actualizar package.json con tu URL de GitHub

Edita `package.json` y reemplaza `USERNAME` con tu usuario de GitHub:

```json
"repository": {
  "type": "git",
  "url": "https://github.com/TU-USUARIO/jdg-invitacion.git"
}
```

Luego haz commit:

```bash
git add package.json
git commit -m "Update repository URL"
git push
```

---

## 🌐 Despliegue en Netlify

### Opción 1: Desde GitHub (Recomendado)

1. **Inicia sesión en Netlify**
   - Ve a [netlify.com](https://www.netlify.com)
   - Inicia sesión con tu cuenta de GitHub

2. **Conectar repositorio**
   - Click en "Add new site" → "Import an existing project"
   - Selecciona "GitHub" y autoriza Netlify
   - Busca y selecciona tu repositorio `jdg-invitacion`

3. **Configuración de build** (ya está configurado en `netlify.toml`)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - Netlify detectará automáticamente el archivo `netlify.toml`

4. **Desplegar**
   - Click en "Deploy site"
   - Netlify construirá y desplegará tu sitio automáticamente
   - Obtendrás una URL como: `https://random-name-123.netlify.app`

5. **Configurar dominio personalizado (opcional)**
   - Ve a "Site settings" → "Domain management"
   - Agrega tu dominio personalizado

### Opción 2: Desde la línea de comandos

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Iniciar sesión
netlify login

# Desplegar
netlify deploy --prod
```

---

## ✅ Verificación Post-Despliegue

Después del despliegue, verifica:

- [ ] El sitio carga correctamente
- [ ] Las animaciones funcionan
- [ ] Los enlaces de Google Calendar funcionan
- [ ] Los botones de ubicación y confirmación funcionan
- [ ] El logo con enlace a Instagram funciona
- [ ] El diseño se ve bien en móviles

---

## 🔧 Comandos Útiles

### Git

```bash
# Ver estado
git status

# Agregar cambios
git add .

# Hacer commit
git commit -m "Descripción del cambio"

# Subir cambios
git push

# Ver historial
git log
```

### Build Local

```bash
# Construir para producción
npm run build

# Preview del build
npm run preview
```

### Netlify

```bash
# Ver sitios
netlify sites:list

# Ver logs
netlify logs

# Abrir dashboard
netlify open
```

---

## 📝 Notas Importantes

1. **Variables de Entorno**: Si necesitas variables de entorno, créalas en Netlify:
   - Site settings → Build & deploy → Environment variables

2. **Build Settings**: El archivo `netlify.toml` ya está configurado, pero puedes ajustarlo si es necesario

3. **Actualizaciones**: Cada vez que hagas `git push`, Netlify reconstruirá y desplegará automáticamente

4. **Branch Deploys**: Netlify puede desplegar branches específicos para testing

---

## 🆘 Solución de Problemas

### Error en el build

```bash
# Verificar que el build funciona localmente
npm run build

# Si hay errores, revisar los logs en Netlify
```

### Problemas con rutas

- El archivo `netlify.toml` ya incluye redirects para SPA
- Si hay problemas, verifica que el redirect esté configurado

### Assets no cargan

- Verifica que los archivos estén en la carpeta `public/`
- Las rutas deben ser relativas desde la raíz: `/assets/...`

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs de Netlify
2. Verifica que el build local funcione
3. Revisa la documentación de [Netlify](https://docs.netlify.com)

---

¡Listo para desplegar! 🎉

