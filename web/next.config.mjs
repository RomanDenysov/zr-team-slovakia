import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Vercel Blob — used once BLOB_READ_WRITE_TOKEN is set.
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
  async redirects() {
    // The default locale is served unprefixed; /sk/* is a permanent alias.
    return [
      { source: '/sk', destination: '/', permanent: true },
      { source: '/sk/:path*', destination: '/:path*', permanent: true },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
