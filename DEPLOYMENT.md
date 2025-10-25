# Campus Complaint Tracker - Deployment Guide

## Overview
This is a full-stack Next.js application with a React frontend and Node.js backend API. The system uses an in-memory database for data persistence during the session.

## Features
- QR code scanning for location-based complaint reporting
- Complaint submission form with categories and priorities
- Real-time status tracking for submitted complaints
- Admin dashboard for managing complaints
- Notification system for complaint updates
- QR code generation for campus locations

## Project Structure
\`\`\`
├── app/
│   ├── page.tsx                 # Home page with QR scanner
│   ├── admin/page.tsx           # Admin dashboard
│   ├── track/page.tsx           # Complaint tracking page
│   ├── qr-generator/page.tsx    # QR code generator
│   ├── api/
│   │   ├── complaints/          # Complaint API endpoints
│   │   ├── locations/           # Location API endpoints
│   │   └── notifications/       # Notification API endpoints
│   └── globals.css              # Global styles
├── components/
│   ├── qr-scanner.tsx           # QR code scanner component
│   ├── complaint-form.tsx       # Complaint submission form
│   ├── complaint-status.tsx     # Complaint status tracker
│   ├── qr-generator.tsx         # QR code generator component
│   └── ui/                      # shadcn/ui components
├── lib/
│   └── db.ts                    # In-memory database store
└── public/                      # Static assets
\`\`\`

## Deployment Options

### Option 1: Deploy to Vercel (Recommended)
Vercel is the optimal platform for Next.js applications.

1. **Push to GitHub**
   - Create a GitHub repository
   - Push your code to GitHub

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js configuration

3. **Deploy**
   - Click "Deploy"
   - Your app will be live at `your-project.vercel.app`

### Option 2: Deploy to Other Platforms

#### Netlify
- Connect your GitHub repository
- Set build command: `npm run build`
- Set publish directory: `.next`

#### AWS Amplify
- Connect your GitHub repository
- Configure build settings
- Deploy with automatic CI/CD

#### Docker (Self-hosted)
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## Environment Variables
Currently, the application doesn't require environment variables as it uses an in-memory database. For production with a real database, add:

\`\`\`
DATABASE_URL=your_postgresql_connection_string
\`\`\`

## Running Locally

1. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open in browser**
   - Navigate to http://localhost:3000

## Features Overview

### Home Page (`/`)
- QR code scanner for location-based reporting
- Option to report without QR code
- Links to tracking, QR generator, and admin pages

### Complaint Tracking (`/track`)
- Enter complaint ID to track status
- View real-time updates and notifications
- See complaint details and resolution progress

### QR Code Generator (`/qr-generator`)
- Generate QR codes for all campus locations
- Download or copy QR codes
- Share with students for complaint reporting

### Admin Dashboard (`/admin`)
- View all complaints with filtering
- Update complaint status (open → in progress → resolved)
- See statistics and analytics
- Manage complaint priorities

## API Endpoints

### Complaints
- `POST /api/complaints` - Create new complaint
- `GET /api/complaints` - Get all complaints
- `GET /api/complaints/[id]` - Get specific complaint
- `PATCH /api/complaints/[id]` - Update complaint status
- `DELETE /api/complaints/[id]` - Delete complaint

### Locations
- `GET /api/locations` - Get all campus locations

### Notifications
- `GET /api/notifications/[complaintId]` - Get complaint updates

## Data Persistence
Currently, the application uses an in-memory database. Data will be lost when the server restarts. For production:

1. **Integrate PostgreSQL**
   - Use Neon or Supabase for managed PostgreSQL
   - Update `lib/db.ts` to use actual database queries

2. **Add Authentication**
   - Implement user authentication for admin access
   - Add role-based access control

3. **Email Notifications**
   - Integrate email service (SendGrid, Mailgun)
   - Send notifications to users about complaint updates

## Performance Optimization
- Images are optimized with Next.js Image component
- API routes are serverless functions
- Client-side caching with SWR
- Responsive design for mobile devices

## Security Considerations
- Validate all user inputs
- Implement rate limiting on API endpoints
- Add CORS protection
- Use HTTPS in production
- Implement admin authentication

## Troubleshooting

### Camera Permission Issues
- Ensure HTTPS is enabled (required for camera access)
- Check browser permissions for camera access
- Use "Demo Scan" button for testing without camera

### QR Code Not Scanning
- Ensure good lighting
- Hold camera steady
- Use the "Demo Scan" button to test functionality

### Data Not Persisting
- Remember that data is stored in-memory
- Refresh the page will clear all data
- For persistent storage, integrate a real database

## Next Steps
1. Deploy to Vercel
2. Test all features in production
3. Integrate real PostgreSQL database
4. Add email notifications
5. Implement admin authentication
6. Monitor performance and user feedback
