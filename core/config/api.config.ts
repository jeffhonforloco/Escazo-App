import { config } from './config';

export const API_CONFIG = {
  BASE_URL: config.apiUrl,
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password'
    },
    USER: {
      PROFILE: '/user/profile',
      PREFERENCES: '/user/preferences',
      PROFILE_IMAGE: '/user/profile/image'
    },
    BOOKINGS: {
      LIST: '/bookings',
      UPCOMING: '/bookings/upcoming',
      PAST: '/bookings/past',
      CREATE: '/bookings/create',
      CANCEL: '/bookings/cancel'
    },
    SEARCH: {
      FLIGHTS: '/search/flights',
      HOTELS: '/search/hotels',
      CARS: '/search/cars',
      RIDES: '/search/rides',
      STAYS: '/search/stays'
    }
  }
};