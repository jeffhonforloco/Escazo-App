export const securityConfig = {
  auth: {
    tokenExpiration: '1d',
    refreshTokenExpiration: '7d',
    passwordMinLength: 8,
    passwordRequirements: {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true
    }
  },
  
  encryption: {
    algorithm: 'aes-256-gcm',
    keyLength: 32,
    ivLength: 16,
    saltLength: 16
  },
  
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  },
  
  cors: {
    allowedOrigins: [
      'https://escazo.com',
      'https://staging.escazo.com',
      'http://localhost:3000'
    ],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  },
  
  twoFactor: {
    enabled: true,
    issuer: 'Escazo',
    digits: 6,
    window: 1
  }
};