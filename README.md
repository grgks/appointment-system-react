# WorkApp - Appointment Management System Frontend

A modern React-based frontend application for managing client appointments and user administration. Built with React 19, TypeScript, and TailwindCSS, featuring a clean interface for appointment scheduling, client management, and administrative tasks.

## Features

### 🏠 Dashboard
- Overview of recent and upcoming appointments
- Quick statistics and key metrics
- Modern responsive design with intuitive navigation
- Real-time data updates

### 👥 Client Management
- Complete client profiles with personal information
- Contact details, notes, and VAT information management
- Advanced search and filtering capabilities
- CRUD operations for client records
- Client-appointment relationship tracking

### 📅 Appointment Management
- Intuitive appointment scheduling interface
- Status tracking (Pending, Confirmed, Completed, Cancelled)
- Email reminder system with status monitoring
- Date and time management with validation
- Appointment history and notes
- Chronological sorting by proximity

### 🔐 Authentication & Security
- JWT token-based authentication
- Role-based access control (CLIENT, PATIENT, SUPER_ADMIN)
- Secure API communication
- Session management

### 📱 Modern UI/UX
- Responsive design for desktop and mobile
- TailwindCSS for consistent styling
- Lucide React icons for modern interface
- Loading states and error handling
- Form validation and user feedback

## Tech Stack

- **Frontend Framework**: React 19.1.0
- **Language**: TypeScript 5.9.2
- **Build Tool**: Vite 7.0.4
- **Styling**: TailwindCSS 4.1.11
- **Routing**: React Router DOM 7.7.1
- **HTTP Client**: Axios 1.11.0
- **Icons**: Lucide React 0.536.0
- **Form Handling**: TailwindCSS Forms
- **Development**: ESLint, PostCSS, Autoprefixer

## Prerequisites

- Node.js 18.0 higher
- npm package manager
- Running backend API (see [Backend Repository](https://github.com/grgks/system-management-RestAPI))

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/grgks/appointment-system-react.git
cd appointment-system-react
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

The application will start on `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

## Backend Integration

This frontend integrates with the [System Management REST API](https://github.com/grgks/system-management-RestAPI) backend:

- **Backend Repository**: [https://github.com/grgks/system-management-RestAPI](https://github.com/grgks/system-management-RestAPI)
- **API Base URL**: `http://localhost:8080`
- **Authentication**: JWT Bearer Token
- **Database**: MySQL 8.0
- **Framework**: Spring Boot 3.4.7

### API Integration Features
- RESTful API communication via Axios
- JWT token management and automatic refresh
- Role-based endpoint access
- Comprehensive error handling
- Request/response data transformation

## Authentication Flow

1. **Registration**: Users register through the client registration endpoint
2. **Login**: Authenticate with username/password to receive JWT token
3. **Token Storage**: JWT token stored securely for API requests
4. **Protected Routes**: Role-based access to different application areas
5. **Token Refresh**: Automatic token refresh on expiration

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Documentation

For complete API documentation, visit the backend Swagger UI at:
[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html) when backend is running


## Development Guidelines

### Code Style
- TypeScript strict mode enabled
- ESLint configuration for code quality
- Consistent component structure and naming
- Custom hooks for business logic separation

### Component Architecture
- Functional components with React hooks
- Props typing with TypeScript interfaces
- Reusable UI components in `/components/ui/`
- Page-level components in `/pages/`

### State Management
- Local state with useState/useReducer
- Custom hooks for shared logic
- Context providers for global state
- No localStorage usage (as per platform restrictions)

## Related Repositories

- **Backend API**: [System Management REST API](https://github.com/grgks/system-management-RestAPI)
- **API Documentation**: Available at [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html) when backend is running

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in this repository
- Check the backend API documentation
- Review the Swagger UI for endpoint details

---

**Note**: This frontend application requires the backend API to be running. Please refer to the [backend repository](https://github.com/grgks/system-management-RestAPI) for setup instructions.
