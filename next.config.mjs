import { createMDX } from "fumadocs-mdx/next"

const withMDX = createMDX()

/** @type {import('next').NextConfig} */

const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flowbite.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "flowbite.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
    ],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
}

export default withMDX(config)
