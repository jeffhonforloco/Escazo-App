export class AppError extends Error {
  constructor(
    public message: string,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const ErrorUtils = {
  handleApiError(error: any): AppError {
    if (error.response) {
      return new AppError(
        error.response.data.message || 'An error occurred',
        error.response.data.code,
        error.response.data
      );
    }
    return new AppError('Network error occurred');
  },

  handleAuthError(error: any): AppError {
    if (error.response?.status === 401) {
      return new AppError('Authentication failed', 'AUTH_ERROR');
    }
    return this.handleApiError(error);
  }
};