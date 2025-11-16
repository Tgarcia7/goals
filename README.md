![Deploy to GitHub Pages](https://github.com/Tgarcia7/goals/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)

# Goals

Vue.js Progressive Web Application (PWA) to manage and track your life or everyday goals.

## Features

- **Three Goal Types**: Simple, Objective-based (numeric targets), and Step-based (task lists)
- **Full Lifecycle Management**: Create, edit, complete, archive, and restore goals
- **Analytics Dashboard**: Statistics with charts and year-based filtering
- **OAuth Authentication**: Google, Facebook, and GitHub login support
- **PWA Features**: Offline capability, installable, responsive design
- **Touch Gestures**: Swipe to archive or complete (mobile-friendly)

## Tech Stack

- Vue.js 2.6
- Vue Router
- Bootstrap Vue
- Chart.js
- Axios
- SweetAlert2
- FontAwesome

## Getting Started

### Prerequisites

- Node.js 18+ (or 16+)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Tgarcia7/goals.git
cd goals
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your API credentials:
   - `VUE_APP_API_TOKEN`: Your backend API token
   - OAuth credentials for Google, Facebook, and GitHub (if using social login)

### Development

Run the development server:
```bash
npm run serve
```

The app will be available at `http://localhost:8080/goals/`

### Build

Build for production:
```bash
npm run build
```

The built files will be in the `dist/` directory.

### Lint

Run ESLint:
```bash
npm run lint
```

## Deployment

This project is configured to automatically deploy to GitHub Pages when changes are pushed to the `master` branch.

### GitHub Secrets Required

Make sure the following secrets are configured in your GitHub repository settings:
- `VUE_APP_API_TOKEN`
- `VUE_APP_GOOGLE_ID`
- `VUE_APP_GOOGLE_SECRET`
- `VUE_APP_FACEBOOK_ID`
- `VUE_APP_FACEBOOK_SECRET`
- `VUE_APP_GH_ID`
- `VUE_APP_GH_SECRET`

### Manual Deployment

To deploy manually:
```bash
npm run build
# Then push the dist/ folder to the gh-pages branch
```

## Project Structure

```
src/
├── assets/          # Static assets (CSS, images, fonts)
├── components/      # Reusable Vue components
├── views/           # Page-level components (routes)
├── services/        # API client and business logic
├── mixins/          # Shared component logic
├── App.vue          # Root component
├── main.js          # Application entry point
├── router.js        # Route configuration
└── config.js        # Environment configuration
```

## Backend API

This project requires a separate backend API. The API base URL is configured in `src/config.js` and points to:
- Production: `https://goals-api-production.herokuapp.com`
- Staging: `https://goals-api-staging.herokuapp.com`

## Known Issues

- The project uses Vue 2, which has reached End of Life. Consider upgrading to Vue 3 in the future.
- Some dependencies have security vulnerabilities. Run `npm audit` for details.
- The PWA asset generator has been removed due to installation issues. PWA icons are pre-generated.

## License

MIT

## Author

Tey García (tgarciamiranda@gmail.com) 
