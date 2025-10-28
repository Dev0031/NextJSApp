# Firebase Authentication App

A modern Next.js application with Firebase Authentication featuring user registration, login, and protected routes.

## Features

- ✅ User Registration with Full Name, Email, and Password
- ✅ User Login with Email and Password
- ✅ Form Validation for all input fields
- ✅ Protected Homepage accessible only to authenticated users
- ✅ Personalized greeting with user's full name
- ✅ Logout functionality
- ✅ Toast notifications for user feedback
- ✅ Loading states and error handling
- ✅ Modern, responsive UI with dark mode support

## Setup Instructions

### 1. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Navigate to Project Settings > General
4. Under "Your apps", click the web icon (</>) to add a web app
5. Register your app and copy the Firebase configuration

### 2. Environment Variables

Create a `.env.local` file in the root directory and add your Firebase configuration:

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

### 3. Enable Authentication

1. In Firebase Console, go to Authentication > Sign-in method
2. Enable "Email/Password" authentication
3. Save your changes

### 4. Install and Run

\`\`\`bash
npm install
npm run dev
\`\`\`

Visit `http://localhost:3000` to see your app!

## How It Works

### Authentication Flow

1. **New Users**: Enter full name, email, and password to create an account
2. **Existing Users**: Sign in with email and password
3. **Protected Routes**: Authenticated users are redirected to the home page
4. **Logout**: Users can sign out and return to the login page

### File Structure

- `app/login/page.tsx` - Login/Registration page with form validation
- `app/home/page.tsx` - Protected homepage with user greeting
- `lib/firebase.ts` - Firebase configuration and initialization
- `app/layout.tsx` - Root layout with toast notifications

## Technologies Used

- **Next.js 16** - React framework with App Router
- **Firebase Authentication** - User authentication service
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **TypeScript** - Type-safe development

## Future Improvements

- Add password reset functionality
- Implement email verification
- Add OAuth providers (Google, GitHub, etc.)
- Create user profile management
- Add remember me functionality
- Implement rate limiting for security
