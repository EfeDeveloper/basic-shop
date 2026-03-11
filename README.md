# Luma · Basic Shop

Tienda online profesional construida con React, TypeScript, Vite y buenas prácticas de desarrollo. Catálogo de productos, carrito, favoritos y flujo de pago simulado.

## ✨ Características

- **Catálogo dinámico**: Productos desde Fake Store API con búsqueda en header y filtro por categoría
- **Ordenación**: Por precio (asc/desc) y rating (mayor/menor)
- **Carrito de compras**: Añadir, ajustar cantidad y vaciar. Drawer lateral con total y resumen; persiste en `localStorage`
- **Favoritos**: Marcar productos como favoritos desde la card, el modal de detalle o el header. Drawer lateral con listado; persiste en `localStorage`
- **Detalle de producto**: Modal unificado al hacer clic en la card o en el item de favoritos; acción de añadir al carrito y toggle favorito incluidos
- **Resumen y pago**: Modal tipo Amazon con artículos y total; simulación de pago con loader y pantalla de éxito; descarga JSON de la orden
- **Hero slider**: Carousel con productos aleatorios del catálogo
- **Footer profesional**: Perks bar, columnas de links, contacto, newsletter y métodos de pago
- **Diseño responsive**: Header con búsqueda e iconos, menú en drawer (hamburguesa), grid de cards adaptable
- **CSS por componente**: Estilos divididos en archivos `*.css` colocados junto a cada componente, con design tokens globales en `src/styles/tokens.css`
- **Clean Code**: Código limpio, organizado y tipado con TypeScript
- **Tests**: Suite de tests con Vitest y React Testing Library

## 🛠️ Tecnologías Utilizadas

- **React 18** — Biblioteca de UI
- **TypeScript** — Tipado estático
- **Vite 4** — Build tool y dev server
- **Ant Design 4** — Componentes UI e iconos
- **Zustand** — Estado global (carrito, favoritos, filtros) con persistencia `localStorage`
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

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con HMR |
| `npm run build` | Compila TypeScript y genera el bundle de producción en `dist/` |
| `npm run preview` | Sirve el build de producción localmente |
| `npm test` | Ejecuta los tests en modo watch |
| `npm run test:run` | Ejecuta los tests una sola vez (ideal para CI) |

## 🎨 Personalización

### Variables de entorno

En `.env` puedes configurar:

| Variable | Descripción | Por defecto |
|----------|-------------|-------------|
| `VITE_API_URL` | URL de la API de productos | Fake Store API |
| `VITE_PLACEHOLDER_IMAGE` | Imagen cuando el producto no tiene imagen | URL de placeholder |

### Estilos

Los design tokens (colores, espaciado, tipografía) están en `src/styles/tokens.css` usando variables CSS (`--color-primary`, `--space-4`, etc.). Cada componente tiene su propio archivo CSS colocado junto a él. El punto de entrada `src/index.css` únicamente contiene `@import`s.

## 📁 Estructura del Proyecto

```
src/
├── api/
│   └── products.ts           # Fetch y mapeo desde Fake Store API
├── components/
│   ├── drawer/
│   │   ├── CartDrawer.tsx    # Drawer del carrito + modal de resumen
│   │   ├── CartDrawer.css
│   │   ├── Drawers.css       # Estilos compartidos entre drawers
│   │   ├── FavoritesDrawer.tsx
│   │   └── FavoritesDrawer.css
│   ├── header/
│   │   ├── HeaderShop.tsx    # Header con búsqueda, carrito y favoritos
│   │   └── HeaderShop.css
│   ├── hero/
│   │   ├── HeroSlider.tsx    # Carousel con productos del catálogo
│   │   └── HeroSlider.css
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductCard.css
│   │   ├── ProductDescription.tsx
│   │   ├── ProductDescription.css
│   │   ├── ProductDetailModal.tsx  # Modal de detalle reutilizable
│   │   ├── ProductDetailModal.css
│   │   ├── ProductsList.tsx
│   │   └── ProductsList.css
│   ├── sidebar/
│   │   ├── ExploreSidebar.tsx  # Menú drawer (hamburguesa)
│   │   └── ExploreSidebar.css
│   └── ui/
│       ├── AddToCartButton.tsx  # Botón reutilizable añadir al carrito
│       ├── Buttons.css
│       ├── AppModal.tsx         # Modal base compartido
│       └── AppModal.css
├── screens/
│   ├── HomeScreen.tsx
│   └── Footer.css
├── stores/
│   ├── cartStore.ts       # Zustand: carrito + persistencia
│   ├── favoritesStore.ts  # Zustand: favoritos + persistencia
│   └── filtersStore.ts    # Zustand: búsqueda, categorías, orden
├── styles/
│   ├── tokens.css         # Variables CSS y reset global
│   └── layout.css         # app-layout, app-body, app-content
├── interfaces/
│   ├── productsInterfaces.ts
│   └── utilsInterfaces.ts
├── utils/
│   └── index.ts           # currencyFormatter, exportDataToJSON, fecha
├── App.tsx
├── index.css              # Solo @imports
└── main.tsx
```

## 🚀 Deployment

El proyecto genera un build estático en `dist/` con `npm run build`. Puedes desplegarlo en Vercel, Netlify, GitHub Pages o cualquier host de archivos estáticos. Configura las variables de entorno en la plataforma con el prefijo `VITE_`.

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
