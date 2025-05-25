# Basic-shop

Basic-shop is a simple yet powerful web application that allows users to select products, manage their shopping cart, and generate purchase orders. The app is designed to provide a seamless shopping experience, including inventory management and intuitive cart operations.

## Features

- **Shopping Cart**: Add products to your cart and manage them easily.
- **Remove Items**: Remove individual items or clear the entire cart with a single action.
- **Inventory Management**: Items are deducted from the general inventory as they are added to the cart.
- **Purchase Order Generation**: Create a purchase order directly from your cart.
- **Product Search**: Quickly find products using the integrated search bar.
- **Product Details**: View detailed information for each product before adding to the cart.
- **Responsive Design**: The interface adapts to different screen sizes for a better user experience.
- **Cart Drawer**: Access and manage your cart from a convenient side drawer.

## Demo

![Demo](docs/demo.gif)

## Installation

1. Make sure you have [Node.js](https://nodejs.org/) and npm installed.
2. Clone the repository:
   ```bash
   git clone <repository-url>
   cd basic-shop
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

The following npm scripts are available:

- `npm run dev`: Starts the development server using Vite.
- `npm run build`: Compiles TypeScript and builds the app for production.
- `npm run preview`: Serves the production build for preview.

To start developing:
1. Install dependencies with `npm install`.
2. Run the development server with `npm run dev`.
3. For a production build, use `npm run build` and then `npm run preview` to preview the build.

Access the app at the local address provided by the dev server (usually `http://localhost:5173`).

## Project Structure

The project is organized as follows:

- `public/` — Static assets (e.g., demo.gif, shop.svg)
- `src/` — Main source code
  - `components/` — Reusable UI components
    - `drawer/` — Cart drawer component
    - `header/` — Header component
    - `products/` — Product-related components
    - `search/` — Search bar component
  - `context/` — React context for products
  - `data/` — Static product data
  - `interfaces/` — TypeScript interfaces
  - `screens/` — App screens (e.g., HomeScreen)
  - `utils/` — Utility functions
- `index.html` — Main HTML file
- `package.json` — Project metadata, scripts, and dependencies
- `tsconfig.json` — TypeScript configuration
- `vite.config.ts` — Vite configuration

## Technologies Used

This project leverages modern web technologies. For a complete list, review the `package.json` and project files.

## Contribution

Contributions are welcome! To contribute:
- Fork the repository
- Create a new branch for your feature or fix
- Submit a pull request
- Please follow the existing coding standards
- Report issues or suggest features via GitHub Issues

## License

This project is licensed under the MIT License.

## Authors and Acknowledgements

Developed by myself. Special thanks to the open-source community for tools and libraries that made this project possible.
