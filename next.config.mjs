/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env.mjs'

/** @type {import("next").NextConfig} */
const config = {
  eslint: {
    ignoreDuringBuilds: true
  },
  outputFileTracingIncludes: {
    '/blocks/*': ['./src/**/*'],
    registry: ['./src/registry/**/*']
  },
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/r/:path*',
        destination: '/r/:path*.json'
      }
    ]
  }
}

export default config
