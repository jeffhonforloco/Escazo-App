
# Escazo Overview

Escazo is an all-in-one travel platform designed to streamline the travel experience by combining flight, hotel, car rental, and short-stay bookings, alongside rideshare services, AI-powered trip planning, and coffee product integration. Escazo provides a unified solution where users can manage their entire trip in a seamless, efficient, and user-friendly environment.

## Core Features

### Comprehensive Booking System
- **Flights, Hotels, Car Rentals, and Short Stays**: Integrated APIs from platforms like Travelpayouts, Booking.com, Amadeus, Travelfusion, and Skyscanner enable a wide range of booking options in one place.
- **Unified Search Bar**: A single search interface for destinations, providing results for all travel needs.

### AI Budget Travel Planning
- **AI Trip Planning Bot**: Users can input preferences such as dates, budget, and activities to receive personalized itineraries, recommendations, and travel deals.

### Rideshare Integration
- Travelers can book rideshares directly for airport pickups, hotel transfers, or general transport. Pricing adjusts dynamically based on the number of passengers.
- Rideshare options are integrated with other bookings, allowing users to add transportation seamlessly during checkout.

### Escazo Café and Coffee Products
- **Pre-Order Coffee**: Users can pre-order coffee at Escazo Cafés for pick-up during their trips.
- **E-Commerce Integration**: An online store for coffee products (e.g., beans, accessories) with delivery options to customers' homes or trip destinations.

### Unified Checkout Experience
A single payment interface that consolidates all selected services, including flights, accommodations, rideshares, and coffee orders, with support for multiple payment gateways like credit cards and PayPal.

### Mobile-Friendly Design
- Fully responsive layouts optimized for mobile devices, ensuring a smooth experience for users on the go.
- Simplified navigation with quick access to Flights, Hotels, Short Stays, Rideshare, and Café sections.

### Advanced Personalization
- AI-powered recommendations for travel deals, activities, and accommodations based on user behavior and preferences.
- Real-time notifications for flight delays, offering alternative solutions like discounted hotel stays or car rentals.

### Short-Stay Platform
- Integrated short-stay bookings (via APIs or Escazo-hosted properties) to provide unique vacation homes or third-party listings.
- Bundled trip packages that combine homes, flights, and rentals for a complete travel experience.

### Community Engagement and Loyalty
- A rewards system where users earn points for bookings, redeemable at Escazo Cafés or on coffee products.

## Differentiating Factors

### Unified Platform Experience:
- Seamlessly integrate multiple travel services, providing a cohesive experience where users can plan, book, and manage all aspects of their trips in one session.

### Exclusive Rideshare Features:
- Customizable rideshare options tailored for travelers, offering convenience and transparency for airport pickups or group transportation.

### Specialized Travel Offerings:
- Personalized travel experiences, such as tours, cruises, and cultural events, alongside traditional booking options.

### Escazo Coffee Tie-In:
- Innovative loyalty programs and pre-order options enhance the travel experience by blending hospitality and convenience.

## Technical Highlights
- **API Integration**: Leverages APIs from top travel platforms to provide diverse booking options.
- **AI and Machine Learning**: Drives intelligent trip planning, personalization, and notifications.
- **Scalability**: Built to handle high user volumes and support for complex multi-service bookings.
- **E-Commerce Capabilities**: Supports seamless transactions for physical products alongside digital services.

Escazo aims to redefine travel planning by delivering a unified, intuitive, and personalized platform, making it a one-stop solution for travelers worldwide.


======================================================================================================


# ESCAZO App & ESCAZO Driver App Cloud Infrastructure Setup Guide

## Overview
ESCAZO is an all-in-one travel platform offering flight bookings, hotels, short stays, car rentals, cruises, and a rideshare system (both for users and drivers). This setup guide will assist in configuring the cloud infrastructure for both the ESCAZO App (user-facing app) and ESCAZO Driver App (rideshare app for drivers). This will cover the technology stack, dependencies, environment variables, and deployment process.

## Tech Stack

### Backend
- **Node.js** (or Python/Java) for backend services.
  - Node.js Version: v16.x (Recommended)
  - Python Version: 3.9 or newer (if applicable)
  - Java Version: 11 or newer (if applicable)

### Frontend
- **ESCAZO User App**: React (or Next.js) for the user interface.
- **ESCAZO Driver App**: React Native (or Flutter) for mobile app development.

### Database
- **PostgreSQL** for transactional data (e.g., user data, booking info).
- **MongoDB** for unstructured data (e.g., reviews, media).
- **Redis** for caching and session management.

### Cloud Services
- **Compute**: AWS EC2, Google Cloud Compute Engine, or Docker containers with Kubernetes.
- **Storage**: AWS S3 (or GCP equivalent) for storing media files.
- **Database**: AWS RDS (or GCP Cloud SQL) for relational databases, MongoDB Atlas for NoSQL.
- **Containerization**: Docker (for microservices) and Kubernetes for orchestration.

## Setup Instructions

### 1. Clone the Repository
Start by cloning the ESCAZO repository for both the ESCAZO App and the ESCAZO Driver App:

```bash
git clone https://github.com/your-repo/escazo.git
cd escazo
```

### 2. Install Dependencies

#### Backend (Node.js):
For the backend (API server), run:

```bash
npm install
```

#### Frontend (ESCAZO App - React/Next.js):
For the user-facing app:

```bash
npm install
```

#### Driver App (React Native/Flutter):
For the ESCAZO Driver App, run the following:

```bash
npm install
```

> **Note**: For React Native, ensure that the necessary packages for Android/iOS builds are installed.

### 3. Build and Start the Application

#### Backend (Node.js):
To build and start the Node.js backend, run the following commands:

- Build:
  ```bash
  npm run build
  ```

- Start:
  ```bash
  npm start
  ```

#### User App (ESCAZO Frontend):
To run the ESCAZO user interface, run the following:

- Build:
  ```bash
  npm run build
  ```

- Start:
  ```bash
  npm run start
  ```

#### Driver App:
To run the ESCAZO Driver App, use the following commands for React Native:

- For Android:
  ```bash
  npm run android
  ```

- For iOS:
  ```bash
  npm run ios
  ```

> **Note**: Ensure that the backend API is up and running before starting the frontend and driver apps.

### 4. Dependencies
Below is a list of essential dependencies required for both apps:

#### Backend Dependencies:

```bash
npm install pg redis mongoose sequelize axios
```

- `pg`: PostgreSQL client for Node.js.
- `redis`: Redis client for caching and session storage.
- `mongoose`: MongoDB client for Node.js.
- `sequelize`: ORM for PostgreSQL (optional if using an ORM for relational databases).
- `axios`: HTTP client for making API requests.

#### Frontend Dependencies:
React or Next.js for the ESCAZO user-facing platform.
React Native or Flutter for the ESCAZO Driver App.

```bash
npm install react react-dom next
npm install react-native react-navigation axios
```

### 5. Environment Variables
Environment variables help manage sensitive data and configurations across different environments (development, staging, production).

Example .env file for ESCAZO App and Driver App:

```env
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
```

#### Passing Environment Variables to the App:
In Node.js, use the dotenv package to load environment variables.

Install dotenv:

```bash
npm install dotenv
```

At the top of your server.js (or entry point):

```javascript
require('dotenv').config();
```

Access the variables as follows:

```javascript
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
```

### 6. Shared Storage and Deployment Considerations
#### Media Storage:
Both the ESCAZO App and ESCAZO Driver App will require cloud-based storage for media files (e.g., user profile pictures, media from rides, etc.).
AWS S3 or Google Cloud Storage can be used for storing images, videos, and other media.

Example for uploading files to AWS S3:

```javascript
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
```

# Save file as .md text file

