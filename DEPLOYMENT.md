# Guía de Deployment a Producción

## 📋 Pre-requisitos

- ✅ Cuenta en [Vercel](https://vercel.com) o [Netlify](https://netlify.com)
- ✅ Cuenta en [Supabase](https://supabase.com)
- ✅ Repositorio Git (GitHub, GitLab, o Bitbucket)
- ✅ Node.js instalado localmente

---

## 🚀 Deployment con Vercel (Recomendado)

### 1. Preparar el proyecto

```bash
# Instalar dependencias
npm install

# Verificar que el build funcione
npm run build

# Preview del build localmente
npm run preview
```

### 2. Configurar Supabase

#### A. Crear proyecto en Supabase
1. Ve a https://supabase.com/dashboard
2. Click en "New Project"
3. Nombre: `wedding-reservations` (o el que prefieras)
4. Password: Genera una contraseña segura
5. Region: Elige la más cercana a tus usuarios
6. Click en "Create new project"

#### B. Ejecutar schema SQL
1. En tu proyecto Supabase, ve a "SQL Editor"
2. Click en "New query"
3. Copia **TODO** el contenido de `supabase/schema.sql`
4. Pega y click en "Run"
5. Verifica que no haya errores

#### C. Crear usuario administrador
1. Ve a "Authentication" → "Users"
2. Click en "Add user" → "Create new user"
3. Email: `admin@example.com` (o el que prefieras)
4. Password: Contraseña segura
5. **Importante**: Activa "Auto Confirm User"
6. Click en "Create user"

Ver más detalles en: `supabase/auth-setup.md`

#### D. Obtener credenciales
1. Ve a "Settings" → "API"
2. Copia:
   - **Project URL**: `https://xxx.supabase.co`
   - **anon public key**: `eyJ...`

### 3. Subir a GitHub

```bash
# Inicializar git (si no lo has hecho)
git init

# Agregar archivos
git add .
git commit -m "feat: Wedding reservation system ready for deployment"

# Crear repositorio en GitHub y conectarlo
git remote add origin https://github.com/tu-usuario/tu-repo.git
git branch -M main
git push -u origin main
```

### 4. Deployment en Vercel

#### A. Importar proyecto
1. Ve a https://vercel.com/new
2. Click en "Import Git Repository"
3. Selecciona tu repositorio de GitHub
4. Click en "Import"

#### B. Configurar variables de entorno
En la sección "Environment Variables", agrega:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | Tu Project URL de Supabase |
| `VITE_SUPABASE_ANON_KEY` | Tu anon key de Supabase |

#### C. Configurar Build
Vercel detectará automáticamente Vite. Verifica:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

#### D. Deploy
1. Click en "Deploy"
2. Espera a que termine el deployment (1-2 minutos)
3. ¡Listo! Tu app estará en `https://tu-proyecto.vercel.app`

### 5. Post-Deployment

#### A. Actualizar URL en configuración
1. Abre `src/config/eventConfig.ts`
2. Cambia:
   ```typescript
   appUrl: "https://tu-proyecto.vercel.app"
   ```
3. Commit y push:
   ```bash
   git add src/config/eventConfig.ts
   git commit -m "chore: Update production URL"
   git push
   ```
4. Vercel auto-deployará los cambios

#### B. Configurar dominio personalizado (Opcional)
1. En Vercel, ve a tu proyecto → "Settings" → "Domains"
2. Agrega tu dominio personalizado
3. Sigue las instrucciones para configurar DNS

#### C. Verificar HTTPS
- Vercel provee HTTPS automáticamente
- Necesario para QR scanner (acceso a cámara)

---

## 🌐 Deployment con Netlify (Alternativa)

### 1. Crear `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Deployment
1. Ve a https://app.netlify.com
2. "Add new site" → "Import an existing project"
3. Conecta tu repositorio Git
4. Configura variables de entorno:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click en "Deploy site"

---

## ✅ Checklist de Producción

### Seguridad
- [ ] Cambiar `eventConfig.admin.credentials` (aunque ya no se usan)
- [ ] Crear usuario admin en Supabase con password fuerte
- [ ] Verificar RLS en Supabase está activo
- [ ] HTTPS habilitado (automático en Vercel/Netlify)
- [ ] Variables de entorno configuradas correctamente

### Funcionalidad
- [ ] Crear una reservación de prueba desde admin
- [ ] Verificar QR code funciona
- [ ] Abrir pase digital de invitado
- [ ] Confirmar asistencia
- [ ] Agregar nombres de acompañantes
- [ ] Hacer check-in con QR scanner
- [ ] Exportar CSV
- [ ] Cambiar entre temas

### Rendimiento
- [ ] Build optimizado (`npm run build` sin errores)
- [ ] Imágenes optimizadas
- [ ] Lighthouse score > 90

### Contenido
- [ ] Actualizar `eventConfig.ts` con datos reales
- [ ] Subir fotos reales a la galería (si aplica)
- [ ] Verificar textos y fechas correctas
- [ ] Probar en móvil y desktop

---

## 🔧 Troubleshooting

### Error: "Failed to load resource"
- Verifica variables de entorno en Vercel/Netlify
- Asegúrate de que empiecen con `VITE_`
- Redeploy después de agregar variables

### Error: "Invalid login credentials"
- Verifica que creaste el usuario en Supabase
- Verifica que "Auto Confirm User" esté activado
- Revisa Supabase logs: Authentication → Logs

### QR Scanner no funciona
- Requiere HTTPS (Vercel/Netlify lo proveen automáticamente)
- Verifica permisos de cámara en el navegador
- Prueba en móvil (algunos navegadores desktop tienen restricciones)

### Cambios no se reflejan
- Verifica que hiciste `git push`
- Espera a que Vercel/Netlify redeploy automáticamente
- Clear cache del navegador (Ctrl+Shift+R)

### Database errors
- Verifica que ejecutaste `supabase/schema.sql`
- Verifica RLS policies en Supabase
- Revisa Supabase logs: Database → Logs

---

## 📊 Monitoring

### Vercel Analytics (Gratis)
1. En tu proyecto → "Analytics"
2. Ver tráfico, performance, errores

### Supabase Dashboard
1. "Table Editor" → Ver datos en tiempo real
2. "Database" → "Logs" → Ver queries y errores
3. "Authentication" → "Users" → Gestionar usuarios

---

## 🔄 CI/CD Automático

Con Vercel/Netlify, cada push a `main` hace auto-deploy:

```bash
git add .
git commit -m "feat: Nueva funcionalidad"
git push
# Vercel/Netlify despliega automáticamente
```

---

## 💡 Tips de Producción

1. **Backup de datos**: Exporta CSV regularmente
2. **Monitoreo**: Revisa Supabase logs semanalmente
3. **Testing**: Prueba en múltiples dispositivos y navegadores
4. **Performance**: Usa Lighthouse para optimizar
5. **Seguridad**: Revisa RLS policies periódicamente

---

## 🆘 Soporte

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Vite Docs**: https://vitejs.dev/guide/

---

## 🎉 ¡Listo para producción!

Tu aplicación de bodas está lista para recibir invitados. ¡Felicidades! 🎊
