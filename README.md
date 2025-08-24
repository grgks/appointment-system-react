<table border="0" cellpadding="0" cellspacing="0">
<tr>
<td><img src="./public/WorkApp2.png" alt="WorkApp Logo" width="100"></td>
<td><h3 style="margin: 0; font-weight: bold;"> Appointment/Client Management System Frontend</h3></td>
</tr>
</table>

This project initially started as a **university assignment** and has since evolved into a modern, scalable React-based frontend application for managing client appointments and user administration.  
Built with React 19, TypeScript, and TailwindCSS, it provides a clean interface for appointment scheduling, client management, and administrative tasks.  

The architecture is designed with scalability in mind, allowing easy extension to new entities and features.  
Upcoming enhancements include **user profile settings**, advanced **email reminder workflows**, and additional administrative tools.

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
- Email reminder system with status monitoring *(in progress)*
- Date and time management with validation
- Appointment history and notes
- Chronological sorting by proximity

### 👤 User Profile Settings *(planned)*
- Personal information management
- Change password & security settings
- Notification preferences
- Integration with email reminders

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

## Prerequisites

- Node.js 18.0 or higher
- npm package manager
- Running backend API (see [Backend Repository](https://github.com/grgks/system-management-RestAPI))


## Video Tutorial: WorkApp Easy Schedule QuickView (46.0 MB)
- Down to Assets -> download


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
- JWT token management
- Role-based endpoint access
- Comprehensive error handling
- Request/response data transformation

## Project Structure
```
src/
├── components/            # React components organized by feature
│   ├── appointments/      # Appointment-related components
│   ├── calendar/          # Calendar components
│   ├── clients/           # Client management components
│   ├── common/            # Shared components
│   ├── dashboard/         # Dashboard widgets
│   ├── forms/             # Form components
│   ├── layout/            # Layout components (Header, Footer)
│   └── ui/                # Base UI components (Button, Card, etc.)
├── hooks/                 # Custom React hooks
├── pages/                 # Page-level components
├── services/              # API service layer
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions and constants
```
## Authentication Flow

1. **Registration**: Users register through the client registration endpoint
2. **Login**: Authenticate with username/password to receive JWT token
3. **Token Storage**: JWT token stored securely for API requests
4. **Protected Routes**: Role-based access to different application areas

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

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in this repository
- Check the backend API documentation
- Review the Swagger UI for endpoint details

---
**Note**: This frontend application requires the backend API to be running. Please refer to the [backend repository](https://github.com/grgks/system-management-RestAPI) for setup instructions.

---
🙏 Acknowledgments

- *[Coding Factory AUEB](https://codingfactory.aueb.gr/)* for providing excellent training in modern web development technologies and inspiring this project  as part of my capstone project
- React & TypeScript communities for comprehensive documentation and best practices
- TailwindCSS team for the excellent utility-first CSS framework
- Vite team for the lightning-fast build tool that powers our development
- Lucide React for beautiful, consistent iconography
- All contributors who help improve this appointment management system
- The open source ecosystem that makes modern web development possible

⭐ Support This Project
If you find WorkApp helpful for your appointment management needs, please consider giving it a star! ⭐
Your support helps:

📈 Increase project visibility for others who might benefit
🚀 Motivate continued development and new features
🤝 Build a stronger community around the project
