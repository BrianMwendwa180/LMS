# LMS Project

## Overview
This project is a Learning Management System (LMS) web application that allows users to browse courses, enroll, and track their progress. It supports roles such as students and educators, with educators able to create and manage courses.

## Technologies Used
- Frontend:
  - React with Vite
  - Clerk for authentication
  - Axios for API requests
  - Tailwind CSS for styling
  - React Router for navigation
- Backend:
  - Node.js with Express
  - MongoDB with Mongoose for database
  - Clerk for authentication middleware
  - Stripe for payment processing
  - Cloudinary for image uploads

## Project Structure
- `client/`: Frontend React application
  - `src/`: React components, pages, context, assets
- `server/`: Backend Express application
  - `controllers/`: API route handlers
  - `middlewares/`: Express middlewares including authentication
  - `models/`: Mongoose models for User, Course, Purchase, etc.
  - `routes/`: Express route definitions
  - `configs/`: Configuration files for MongoDB, Cloudinary, Multer, etc.

## Setup Instructions

### Prerequisites
- Node.js and npm/yarn/pnpm installed
- MongoDB instance running
- Clerk account and API keys
- Stripe account and API keys
- Cloudinary account and API keys

### Backend Setup
1. Navigate to the `server` directory:
   ```
   cd server
   ```
2. Install dependencies:
   ```
   pnpm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   STRIPE_SECRET_KEY=your_stripe_secret_key
   CURRENCY=usd
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
4. Start the backend server:
   ```
   pnpm run dev
   ```

### Frontend Setup
1. Navigate to the `client` directory:
   ```
   cd client
   ```
2. Install dependencies:
   ```
   pnpm install
   ```
3. Create a `.env` file with the following variables:
   ```
   VITE_BACKEND_URL=http://localhost:5000
   VITE_CURRENCY=USD
   ```
4. Start the frontend development server:
   ```
   pnpm run dev
   ```

## Usage
- Register and login using Clerk authentication.
- Browse available courses on the homepage.
- Enroll in courses and track progress.
- Educators can update their role and add new courses.
- Payments are handled via Stripe checkout.

## API Endpoints
- `GET /api/user/data`: Get authenticated user data.
- `GET /api/user/enrolled-courses`: Get courses the user is enrolled in.
- `POST /api/user/purchase`: Purchase a course.
- `POST /api/user/update-course-progress`: Update progress in a course.
- `POST /api/user/get-course-progress`: Get progress in a course.
- `POST /api/user/add-rating`: Add rating to a course.
- `GET /api/course/all`: Get all courses.
- `GET /api/educator/update-role`: Update user role to educator.
- `POST /api/educator/add-course`: Add a new course (educator only).
- `GET /api/educator/courses`: Get courses by educator.
- `GET /api/educator/dashboard`: Get educator dashboard data.
- `GET /api/educator/enrolled-students`: Get enrolled students data.

## Testing
- Test authentication flows with Clerk.
- Test course browsing, enrollment, and progress tracking.
- Test educator role update and course creation.
- Test payment flow with Stripe.

## Notes
- Ensure environment variables are correctly set.
- Backend uses Clerk middleware for authentication.
- Frontend sends Bearer token in Authorization header for protected routes.

## License
MIT License
