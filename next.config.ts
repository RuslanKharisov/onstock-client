module.exports = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL, 
  },
  async redirects() {
    return [
      {
        source: '/auth/:path*',
        destination: '/api/next-auth/:path*',
        permanent: true,
      },
    ];
  },
};