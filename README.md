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
  CURRENCY = 'USD'

MONGODB_URI = 'mongodb+srv://academy:academy123@cluster0.rwwzbuv.mongodb.net'

CLERK_WEBHOOK_SECRET = 'whsec_nrRdjmLBkVKCtft8XTmu3KPLp9f/B7xK'

CLERK_PUBLISHABLE_KEY=pk_test_cm9idXN0LWdvc2hhd2stNzcuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_IG76WCFPXg4LTwlHgu52oVraoOAwtZoIiKcgnkxTX0


CLOUDINARY_NAME = "drtg9x8bz"
CLOUDINARY_API_KEY = "924646812877224"
CLOUDINARY_SECRET_KEY = "tEK2BniibHSRryRy-sGy2Lm2waI"

STRIPE_PUBLISHABLE_KEY = 'pk_test_51RyowFIOk6GRMCa8ekkUmoad40kyVbmQUPI
ZnyjwktC0UUtuj5K25krm4QKszQXKXRgL0ZsdVAkPZWGSmWhZ6mP600jilqqJFs'

STRIPE_SECRET_KEY = 'sk_test_51RyowFIOk6GRMCa8w1FL2H5o5h8f
T43y5KOw2kvz86TUeziiQOGWdVjEBLwD5QtmRSbei6iykOS2vg1vdHECzAg300YK1ibpVf'

STRIPE_WEBHOOK_SECRET = "whsec_gtnv7f7OKtTtERJkZnOannds3ejEDn6k"
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
