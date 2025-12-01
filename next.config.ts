import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' https://*.clerk.com https://*.clerk.accounts.dev 'unsafe-inline' 'unsafe-eval';
              style-src 'self' 'unsafe-inline';
              img-src 'self' blob: data: https:;
              font-src 'self' https: data:;
              connect-src 'self' https://*.clerk.com https://*.clerk.accounts.dev;
              frame-src https://*.clerk.com https://*.clerk.accounts.dev;
              worker-src 'self' blob:;
            `.replace(/\n/g, "").replace(/\s\s+/g, " "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
