# Dynamic Product Dashboard

A responsive, component-driven **Product Dashboard** built with **React** and **Vite**. It allows users to browse a list of products, filter them by availability, and remove items - all powered by a clean component architecture, CSS Modules, and a lightweight JSON mock API.

---

## Preview

```
+----------------------------------------------------+
|              Product Dashboard                     |
|  [ All ]  [ In Stock ]  [ Out of Stock ]           |
|                                                    |
|  +----------+  +----------+  +----------+         |
|  | Laptop   |  | Phone    |  | Tablet   |         |
|  | $999     |  | $699     |  | $499     |         |
|  | IN STOCK |  | OUT OF   |  | IN STOCK |         |
|  | [Remove] |  | STOCK    |  | [Remove] |         |
|  +----------+  | [Remove] |  +----------+         |
|                +----------+                        |
+----------------------------------------------------+
```

---

## Features

- **Product listing** - Renders all products in a responsive grid
- **Filter controls** - Filter products by: `All`, `In Stock`, `Out of Stock`
- **Remove product** - Dynamically removes a product from the dashboard
- **Stock status badges** - Visual `IN STOCK` / `OUT OF STOCK` badges per product
- **Conditional card styling** - Out-of-stock products display with distinct muted styling
- **Empty state** - Gracefully shows a message when no products match the filter
- **Hover animations** - Smooth card lift and button colour transitions
- **Mock REST API** - `json-server` serves product data on port `4000`
- **Unit tests** - Vitest + React Testing Library test suite included

---

## Project Structure

```
Dynamic_product_dashboard/
├── index.html                      # App HTML shell
├── vite.config.js                  # Vite + Vitest configuration
├── jest.config.js                  # Legacy Jest config (reference)
├── package.json                    # Dependencies & scripts
├── db.json                         # Mock database for json-server
├── public/
│   └── vite.svg                    # Favicon
└── src/
    ├── main.jsx                    # React DOM entry point
    ├── App.jsx                     # Root component — state, filtering, layout
    ├── App.css                     # Dashboard layout & filter bar styles
    ├── index.css                   # Global reset & body styles
    ├── assets/
    │   └── react.svg               # React logo asset
    ├── components/
    │   ├── ProductCard.jsx         # Individual product card with badge & remove button
    │   └── ProductList.jsx         # Grid container — maps products to cards
    ├── styles/
    │   └── ProductCard.module.css  # Scoped CSS Module for product cards
    └── __tests__/
        ├── setup.js                # Vitest global setup (cleanup, polyfills)
        └── indexTest.test.jsx      # Unit tests for App behaviour
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | [React 18](https://reactjs.org/) |
| Build Tool | [Vite 5](https://vitejs.dev/) |
| Styling | CSS Modules + Plain CSS |
| UI Components | [MUI (Material UI) v6](https://mui.com/) |
| Routing | [React Router DOM v6](https://reactrouter.com/) |
| Mock API | [json-server](https://github.com/typicode/json-server) |
| Testing | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) |
| Linting | [ESLint 9](https://eslint.org/) with React plugins |

---

## Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/iankinoti-cloud/Dynamic_product_dashboard.git

# Navigate into the project directory
cd Dynamic_product_dashboard

# Install all dependencies
npm install
```

---

## Running the App

### Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Start the mock API (json-server)

In a separate terminal:

```bash
npm run server
```

The mock REST API will be available at [http://localhost:4000/products](http://localhost:4000/products).

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Builds the app for production |
| `npm run preview` | Previews the production build locally |
| `npm run server` | Starts `json-server` on port 4000 |
| `npm run lint` | Runs ESLint on all source files |
| `npm test` | Runs all Vitest unit tests once |
| `npm run test:watch` | Runs Vitest in interactive watch mode |

---

## Component Breakdown

### `App.jsx`

The **root component** that owns all application state.

- Maintains a `products` array in `useState` seeded with initial product data
- Maintains a `filter` state (`'all'`, `'inStock'`, `'outOfStock'`)
- Derives `filteredProducts` from both states — no external store required
- Passes `filteredProducts` and the `handleRemove` callback down to `ProductList`

```jsx
const [products, setProducts] = useState(initialProducts);
const [filter, setFilter] = useState('all');
```

---

### `ProductList.jsx`

A **presentational container** component.

- Accepts `products` (array) and `onRemove` (function) as props
- Renders an empty-state message when the list is empty
- Maps each product to a `<ProductCard>` inside a responsive CSS grid

---

### `ProductCard.jsx`

An **individual product tile** component.

- Accepts a `product` object and `onRemove` callback
- Displays: product name, price, stock status badge, and a Remove button
- Applies the `outOfStockClass` CSS Module class when `product.inStock === false`
- Badge dynamically switches between `inStockBadge` and `outOfStockBadge` styles

---

## Styling Architecture

### Global styles (`src/index.css`)

- Universal box-sizing reset
- Body background: warm off-white (`#f5f0e8`)
- Font: `Segoe UI`, Arial, sans-serif
- `#root` capped at `1200px` with responsive padding

### Dashboard layout (`src/App.css`)

- Centred heading with warm brown typography (`#5c4a32`)
- Filter bar: flexbox, pill-shaped buttons with hover transitions
- Product grid: `repeat(auto-fill, minmax(240px, 1fr))` — fully responsive

### Card styles (`src/styles/ProductCard.module.css` — CSS Modules)

- Warm cream card backgrounds with subtle shadow and hover lift
- `.outOfStockClass` - muted palette (reduced opacity + greyed text)
- `.inStockBadge` - green background (`#d4edda`)
- `.outOfStockBadge` - soft red background (`#f5dbd0`)
- `.removeBtn` - pill-shaped, outlined; fills with amber on hover

---

## Mock Database (`db.json`)

`json-server` watches `db.json` and automatically exposes a full REST API:

```json
{
  "products": [
    { "id": 1, "name": "Laptop", "price": "$999", "inStock": true },
    { "id": 2, "name": "Phone",  "price": "$699", "inStock": false },
    { "id": 3, "name": "Tablet", "price": "$499", "inStock": true }
  ]
}
```

| Endpoint | Method | Description |
|---|---|---|
| `/products` | GET | Fetch all products |
| `/products/:id` | GET | Fetch a single product |
| `/products` | POST | Add a new product |
| `/products/:id` | PATCH | Update a product |
| `/products/:id` | DELETE | Delete a product |

---

## Tests

Tests are written with **Vitest** and **React Testing Library** and live in `src/__tests__/indexTest.test.jsx`.

```bash
npm test
```

### Test Coverage

| Test | Description |
|---|---|
| `renders product dashboard title` | Verifies the `<h1>` heading renders correctly |
| `displays all products initially` | Confirms all 3 seed products are shown on load |
| `applies conditional styling for out-of-stock products` | Checks `outOfStockClass` is applied to Phone |
| `removes product from the dashboard when "Remove" button is clicked` | Simulates click and asserts product is removed |

### Test Setup (`src/__tests__/setup.js`)

- Runs `cleanup()` after each test to unmount components
- Imports `@testing-library/jest-dom/vitest` matchers
- Polyfills `fetch` via `whatwg-fetch` for CodeGrade compatibility

---

## Configuration

### Vite (`vite.config.js`)

```js
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',        // Browser-like test environment
    globals: true,               // Use describe/test/expect globally
    setupFiles: './src/__tests__/setup.js',
    css: {
      modules: {
        classNameStrategy: 'non-scoped',  // CSS Module class names kept as-is in tests
      },
    },
  },
})
```

---

## Data Flow

```
App (state: products, filter)
 |
 +-- filterBar buttons --> setFilter()
 |
 +-- ProductList (props: filteredProducts, onRemove)
      |
      +-- ProductCard x N (props: product, onRemove)
           |
           +-- Remove button --> onRemove(id) --> setProducts() [in App]
```

---

## License

This project is open source and available for educational use.

---

## Author

**Ian Kinoti**
GitHub: [@iankinoti-cloud](https://github.com/iankinoti-cloud)
