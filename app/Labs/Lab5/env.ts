// Helper to get environment variables that works with both Vite and Next.js
// In Next.js, client-side env vars must be prefixed with NEXT_PUBLIC_
// But we'll support both VITE_ and NEXT_PUBLIC_ prefixes
export const getEnvVar = (key: string): string => {
  if (typeof window === 'undefined') {
    // Server-side: use process.env
    const nextKey = key.replace('VITE_', 'NEXT_PUBLIC_');
    return process.env[nextKey] || process.env[key] || '';
  }
  
  // Client-side: try both import.meta.env (Vite) and process.env (Next.js)
  try {
    if ((import.meta as any).env && (import.meta as any).env[key]) {
      return (import.meta as any).env[key];
    }
  } catch (e) {
    // import.meta.env not available
  }
  
  // Fallback to process.env (Next.js)
  if (typeof process !== 'undefined' && process.env) {
    const nextKey = key.replace('VITE_', 'NEXT_PUBLIC_');
    return process.env[nextKey] || process.env[key] || '';
  }
  
  return '';
};

export const HTTP_SERVER = getEnvVar('VITE_HTTP_SERVER') || 'http://localhost:4000';

