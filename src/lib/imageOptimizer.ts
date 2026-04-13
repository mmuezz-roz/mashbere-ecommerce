/**
 * Automatically injects Cloudinary optimization parameters into the URL.
 * Adds f_auto (automatic format) and q_auto (automatic quality).
 */
export function optimizeCloudinaryUrl(url: string = ''): string {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  // If parameters like f_auto are already present, return as is
  if (url.includes('f_auto') || url.includes('q_auto')) return url;

  // Find the /upload/ part and inject parameters after it
  const parts = url.split('/upload/');
  if (parts.length === 2) {
    return `${parts[0]}/upload/f_auto,q_auto/${parts[1]}`;
  }

  return url;
}
