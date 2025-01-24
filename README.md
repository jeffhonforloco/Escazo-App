ESCAZO App & ESCAZO Driver App Cloud Infrastructure Setup Guide
Overview
ESCAZO is an all-in-one travel platform offering flight bookings, hotels, short stays, car rentals, cruises, and a rideshare system (both for users and drivers). This setup guide will assist in configuring the cloud infrastructure for both the ESCAZO App (user-facing app) and ESCAZO Driver App (rideshare app for drivers). This will cover the technology stack, dependencies, environment variables, and deployment process.
Tech Stack
Backend
Node.js (or Python/Java) for backend services.
Node.js Version: v16.x (Recommended)
Python Version: 3.9 or newer (if applicable).
Java Version: 11 or newer (if applicable).
Frontend
ESCAZO User App: React (or Next.js) for the user interface.
ESCAZO Driver App: React Native (or Flutter) for mobile app development.
Database
PostgreSQL for transactional data (e.g., user data, booking info).
MongoDB for unstructured data (e.g., reviews, media).
Redis for caching and session management.
Cloud Services
Compute: AWS EC2, Google Cloud Compute Engine, or Docker containers with Kubernetes.
Storage: AWS S3 (or GCP equivalent) for storing media files.
Database: AWS RDS (or GCP Cloud SQL) for relational database, MongoDB Atlas for NoSQL.
Containerization: Docker (for microservices) and Kubernetes for orchestration.
Setup Instructions
1. Clone the Repository
Start by cloning the ESCAZO repository for both the ESCAZO App and the ESCAZO Driver App.
bash
CopyEdit
git clone https://github.com/your-repo/escazo.git
cd escazo

2. Install Dependencies
Backend (Node.js):
For the backend (API server), run:
bash
CopyEdit
npm install

Frontend (ESCAZO App - React/Next.js):
For the user-facing app:
bash
CopyEdit
npm install

Driver App (React Native/Flutter):
For the ESCAZO Driver App, run the following:
bash
CopyEdit
npm install

(For React Native, make sure to install the necessary packages for Android/iOS builds as well.)
3. Build and Start the Application
Backend (Node.js):
To build and start the Node.js backend, run:
Build:
bash
CopyEdit
npm run build


Start:
bash
CopyEdit
npm start


User App (ESCAZO Frontend):
To run the ESCAZO user interface, run:
Build:
bash
CopyEdit
npm run build


Start:
bash
CopyEdit
npm run start


Driver App:
To run the ESCAZO Driver App, use the following commands for React Native:
For Android:
bash
CopyEdit
npm run android


For iOS:
bash
CopyEdit
npm run ios


Note: Ensure that the backend API is up and running before starting the frontend and driver apps.
4. Dependencies
Below is a list of essential dependencies required for both apps:
Backend Dependencies:
bash
CopyEdit
npm install pg redis mongoose sequelize axios

pg: PostgreSQL client for Node.js.
redis: Redis client for caching and session storage.
mongoose: MongoDB client for Node.js.
sequelize: ORM for PostgreSQL (optional if using an ORM for relational databases).
axios: HTTP client for making API requests.
Frontend Dependencies:
React or Next.js for the ESCAZO user-facing platform.
React Native or Flutter for the ESCAZO Driver App.
bash
CopyEdit
npm install react react-dom next
npm install react-native react-navigation axios

5. Environment Variables
Environment variables help manage sensitive data and configurations across different environments (development, staging, production).
Example .env file for ESCAZO App and Driver App:
env
CopyEdit
# Database Configuration
DB_HOST=your-database-host
DB_PORT=5432
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=escazo_db
DB_CONNECTION_STRING=postgresql://user:password@localhost:5432/dbname

# MongoDB Configuration
MONGO_URI=mongodb://your-mongodb-uri

# Redis Configuration
REDIS_HOST=your-redis-host
REDIS_PORT=6379

# JWT and Authentication Secrets
JWT_SECRET=your-jwt-secret-key

# Cloud Storage (S3) Configuration
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
S3_BUCKET_NAME=escazo-bucket-name

# Application Port (Optional)
PORT=3000

# ESCAZO Driver App Settings
DRIVER_APP_SECRET=driver-app-secret
DRIVER_APP_API_URL=https://your-driver-app-api-url

Passing Environment Variables to the App:
In Node.js, use the dotenv package to load environment variables:
Install dotenv:
bash
CopyEdit
npm install dotenv

At the top of your server.js (or entry point):
javascript
CopyEdit
require('dotenv').config();

Access the variables as follows:
javascript
CopyEdit
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;

6. Shared Storage and Deployment Considerations
Media Storage:
Both the ESCAZO App and ESCAZO Driver App will require cloud-based storage for media files (e.g., user profile pictures, media from rides, etc.).
AWS S3 or Google Cloud Storage can be used for storing images, videos, and other media.
Example for uploading files to AWS S3:
javascript
CopyEdit
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1', // or your region
});

const uploadFile = (file) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: file.filename,
    Body: file.data,
  };

  return s3.upload(params).promise();
};

7. Deployment Requirements
Database Backups: Set up automated backups for PostgreSQL (or MySQL) and MongoDB.
Load Balancing: Use load balancing services like AWS ELB or GCP Load Balancer to ensure availability and distribute traffic efficiently.
Scaling: Implement auto-scaling to handle traffic spikes.
CI/CD: Set up a CI/CD pipeline using tools like GitHub Actions, Jenkins, or CircleCI for automated deployment to the cloud.
8. Cloud Storage Use Cases
Image/Video Hosting: Store media files in cloud storage such as AWS S3 or Google Cloud Storage.
User Profiles and Reviews: Save user-generated content like profile pictures, reviews, and ride-related images to cloud storage.
Shared Storage: The ESCAZO Driver App will require access to the cloud storage for uploading ride-related photos or documents.
9. Monitoring and Maintenance
Set up monitoring and logging services like AWS CloudWatch or GCP Operations to track the health of the app. Additionally, implement Sentry or Datadog for error tracking.

Conclusion
This guide provides the necessary steps to set up the cloud infrastructure for both the ESCAZO App (user-facing platform) and the ESCAZO Driver App (rideshare driver app). By following this guide, you ensure a secure, scalable, and maintainable infrastructure that supports the complex needs of the ESCAZO platform.
