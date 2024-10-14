/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
          allowedOrigins: [
            'localhost:3000', // localhost
            'https://potential-space-barnacle-9q5474qr56qf7vj7-3000.app.github.dev', // Codespaces
          ],
        },
      },
};

export default nextConfig;
