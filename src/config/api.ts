// API Configuration
export const API_CONFIG = {
  // Backend base URL from environment variable
  BASE_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000',
  
  // API endpoints
  ENDPOINTS: {
    EVENTS: '/events',
    SEND: '/send'
  }
} as const;

// Helper function to get full API URL
export const getApiUrl = (endpoint: string, sessionId?: string): string => {
  const baseUrl = API_CONFIG.BASE_URL;
  const endpointPath = API_CONFIG.ENDPOINTS[endpoint as keyof typeof API_CONFIG.ENDPOINTS] || endpoint;
  
  if (sessionId) {
    return `${baseUrl}${endpointPath}/${sessionId}`;
  }
  
  return `${baseUrl}${endpointPath}`;
};

// Helper function to get SSE URL
export const getSseUrl = (sessionId: string, params?: URLSearchParams): string => {
  const baseUrl = getApiUrl('EVENTS', sessionId);
  return params ? `${baseUrl}?${params.toString()}` : baseUrl;
};

// Helper function to get send URL
export const getSendUrl = (sessionId: string): string => {
  return getApiUrl('SEND', sessionId);
};
