# Luma · Basic Shop

Tienda online profesional construida con React, TypeScript, Vite y buenas prácticas de desarrollo. Catálogo de productos, carrito, favoritos y flujo de pago simulado.

## ✨ Características

- **Catálogo dinámico**: Productos desde Fake Store API con búsqueda y filtro por categoría
- **Carrito de compras**: Añadir, restar cantidad y vaciar. Drawer lateral con total y resumen
- **Favoritos**: Marcar productos como favoritos desde la card o el header
- **Detalle de producto**: Modal al hacer clic en la card; cierre con X o clic fuera
- **Resumen y pago**: Modal tipo Amazon con artículos y total; simulación de pago con loader y pantalla de éxito; descarga JSON y vaciado del carrito
- **Diseño responsive**: Header con búsqueda e iconos, menú en drawer (tres líneas), slider hero con productos del catálogo, grid de cards adaptable
- **Clean Code**: Código limpio, organizado y tipado con TypeScript
- **Tests**: Suite de tests con Vitest y React Testing Library
- **CI/CD**: Pipeline en GitHub Actions (lint y tests)

## 🛠️ Tecnologías Utilizadas

- **React 18** — Biblioteca de UI
- **TypeScript** — Tipado estático
- **Vite 4** — Build tool y dev server
- **Ant Design 4** — Componentes UI e iconos
- **Zustand** — Estado global (carrito, favoritos, filtros)
- **TanStack React Query** — Datos del catálogo (cache y fetching)
- **Vitest** — Tests unitarios
- **Fake Store API** — Catálogo de productos

## 📦 Instalación

1. **Verificar versión de Node**

   ```bash
   node --version   # Recomendado: v18 o superior
   ```

2. **Clonar el repositorio**

   ```bash
   git clone https://github.com/EfeDeveloper/basic-shop.git
   cd basic-shop
   ```

3. **Instalar dependencias**

   ```bash
   npm install
   ```

4. **Configurar variables de entorno**

   ```bash
   cp .env.example .env
   ```

   Edita `.env` si quieres cambiar la API o las imágenes del slider (opcional). Por defecto usa Fake Store API.

5. **Iniciar el servidor de desarrollo**

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en la URL que indique Vite (normalmente `http://localhost:5173`).

## 📜 Scripts Disponibles

### `npm run dev`

Ejecuta la aplicación en modo desarrollo. La página se recargará al hacer cambios.

### `npm run build`

Compila TypeScript y construye la aplicación para producción en la carpeta `dist`.

### `npm run preview`

Sirve el build de producción para previsualizarlo localmente.

### `npm test`

Ejecuta los tests con Vitest (modo watch).

### `npm run test:run`

Ejecuta los tests una vez (útil para CI).

## 🎨 Personalización

### Variables de entorno

En `.env` puedes configurar:

| Variable | Descripción | Por defecto |
|----------|-------------|-------------|
| `VITE_API_URL` | URL de la API de productos | Fake Store API |
| `VITE_PLACEHOLDER_IMAGE` | Imagen cuando el producto no tiene imagen | URL de placeholder |
| `VITE_HERO_SLIDE_1` | Imagen del primer slide del hero (opcional) | Imagen de Unsplash |
| `VITE_HERO_SLIDE_2` | Imagen del segundo slide del hero (opcional) | Imagen de Unsplash |

### Estilos

Los estilos globales y variables de diseño (colores, espaciado, tipografía) están en `src/index.css` usando variables CSS (`--color-primary`, `--space-4`, etc.).

## 📁 Estructura del Proyecto

```
src/
├── api/              # Cliente API y mapeo de productos
│   └── products.ts
├── components/       # Componentes React
│   ├── drawer/       # Carrito (CartDrawer)
│   ├── header/       # Header con búsqueda e iconos
│   ├── hero/         # Slider hero (HeroSlider)
│   ├── products/     # Cards, lista, descripción
│   ├── sidebar/      # Menú Explore (drawer)
│   ├── search/       # Búsqueda
│   └── ui/           # AppModal (modales unificados)
├── screens/          # Pantallas
│   └── HomeScreen.tsx
├── stores/           # Zustand (carrito, favoritos, filtros)
├── interfaces/       # Tipos TypeScript
├── utils/            # Formateo, export JSON, fecha
├── App.tsx
├── index.css         # Estilos globales
└── main.tsx          # Punto de entrada
```

## 🚀 Deployment

El proyecto genera un build estático en `dist/` con `npm run build`. Puedes desplegarlo en Vercel, Netlify, GitHub Pages o cualquier host de archivos estáticos. Las variables de entorno deben configurarse en la plataforma con el prefijo `VITE_`.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Edwin Villa** — [@EfeDeveloper](https://github.com/EfeDeveloper)

---

⭐ Si te gustó este proyecto, dale una estrella en GitHub.
