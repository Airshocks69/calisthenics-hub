# Calisthenics Hub - Frontend

Modern React/Next.js web application für die Calisthenics Hub Plattform.

## Features

- ✅ Next.js 14 with React 18
- ✅ TypeScript for type safety
- ✅ Responsive Design with Tailwind CSS
- ✅ Member Authentication & Dashboard
- ✅ Training Reports & Progress Tracking
- ✅ E-Commerce Shop Integration
- ✅ SEO Optimized
- ✅ Mobile First Approach
- ✅ Comprehensive Testing
- ✅ Docker Support
- ✅ CI/CD Ready

## Quick Start

### With Docker

```bash
docker-compose up frontend
```

### Local Development

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run lint` - ESLint and Prettier check
- `npm run format` - Format code with Prettier
- `npm run type-check` - TypeScript type checking
- `npm test` - Run tests with coverage
- `npm run test:watch` - Watch mode tests

## Project Structure

```
src/
├── components/      # Reusable React components
│   ├── Header/
│   ├── Footer/
│   ├── Navigation/
│   └── ...
├── pages/          # Next.js pages and routes
│   ├── index.tsx          # Landing page
│   ├── login.tsx          # Login page
│   ├── dashboard.tsx      # Member dashboard
│   ├── admin.tsx          # Admin panel
│   ├── shop.tsx           # Shop page
│   ├── training/          # Training pages
│   └── api/               # API routes
├── hooks/          # Custom React hooks
│   ├── useAuth.ts
│   ├── useFetch.ts
│   └── ...
├── services/       # API service layer
│   ├── api.ts       # Axios instance
│   ├── auth.ts      # Auth endpoints
│   ├── training.ts  # Training endpoints
│   └── ...
├── types/          # TypeScript types
│   └── index.ts
├── utils/          # Helper functions
│   ├── validation.ts
│   ├── formatting.ts
│   └── ...
└── styles/         # Global CSS
    └── globals.css
```

## Environment Variables

Create `.env.local` based on `.env.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Pages

### Public Pages

- `/` - Landing Page (Calisthenics Info, Features)
- `/login` - User Login
- `/register` - User Registration
- `/shop` - Product Shop
- `/product/:id` - Product Details

### Protected Pages (Members)

- `/dashboard` - Member Dashboard
- `/training` - Training Reports & History
- `/exercises` - Exercise Library
- `/progress` - Progress Analytics
- `/profile` - User Profile Settings

### Admin Pages

- `/admin` - Admin Dashboard
- `/admin/users` - User Management
- `/admin/exercises` - Exercise Management
- `/admin/products` - Product Management
- `/admin/orders` - Order Management
- `/admin/analytics` - Analytics & Reports

## Components

### Layout Components

- `Header` - Navigation header
- `Footer` - Footer section
- `Sidebar` - Navigation sidebar
- `Container` - Responsive container

### Feature Components

- `LoginForm` - User login form
- `RegisterForm` - User registration form
- `TrainingReportCard` - Training report display
- `ExerciseCard` - Exercise display
- `ProductCard` - Product display
- `OrderCard` - Order display

### UI Components

- `Button` - Reusable button
- `Input` - Form input field
- `Select` - Select/dropdown
- `Modal` - Modal dialog
- `Toast` - Notification toast
- `Spinner` - Loading spinner

## Authentication

Uses JWT tokens stored in HTTP-only cookies:

1. User logs in with email/password
2. Backend returns JWT token
3. Token automatically included in API requests
4. Automatic logout on token expiration
5. Refresh token mechanism for extended sessions

## Styling

- **Tailwind CSS** for utility-first styling
- **PostCSS** for CSS processing
- **Dark mode** support
- **Responsive** breakpoints for mobile, tablet, desktop

## Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test -- components/Button

# Watch mode
npm run test:watch

# Coverage report
npm test -- --coverage
```

### Test Files Structure

```
tests/
├── components/    # Component tests
├── pages/        # Page tests
├── hooks/        # Hook tests
└── utils/        # Utility tests
```

## Performance Optimization

- Image optimization with Next.js Image
- Lazy loading for routes with dynamic imports
- Code splitting per page
- Service Worker for offline support
- Minification and compression
- Caching strategies for API responses

## SEO Optimization

- Meta tags for all pages
- Open Graph tags for social sharing
- Structured data (JSON-LD)
- Sitemap generation
- robots.txt configuration
- Next.js built-in SEO features

## API Integration

### Service Layer

```typescript
// services/training.ts
import { apiClient } from './api';

export const getTrainingReports = async (page: number) => {
  const response = await apiClient.get('/training/reports', {
    params: { page }
  });
  return response.data;
};
```

### Using in Components

```typescript
import { getTrainingReports } from '@services/training';

export default function TrainingPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getTrainingReports(1).then(setReports);
  }, []);

  return (
    <div>
      {reports.map(report => (
        <TrainingReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}
```

## Deployment

### Build

```bash
npm run build
```

### Production Start

```bash
npm start
```

### Docker Image

```bash
docker build -t calisthenics-hub:frontend-1.0.0 .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://api.example.com \
  calisthenics-hub:frontend-1.0.0
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## Troubleshooting

### Port 3000 in use

```bash
lsof -ti:3000 | xargs kill -9
```

### Clear cache and reinstall

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Build fails

```bash
npm run type-check    # Check for type errors
npm run lint          # Check linting
npm run build         # Try rebuilding
```

## Support

For issues and questions:
- GitHub Issues: https://github.com/calisthenics-hub/issues
- Documentation: See `docs/` folder

## License

MIT License - See [LICENSE](../LICENSE)
