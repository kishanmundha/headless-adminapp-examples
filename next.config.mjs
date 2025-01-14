import path from 'path';

const nextConfig = {
  /* config options here */
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  eslint: {
    dirs: ['app'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [
        '@tanstack/react-query',
        '@fluentui/react-components',
        ...config.externals,
      ];
    }
    config.resolve.alias['@tanstack/react-query'] = path.resolve(
      './node_modules/@tanstack/react-query'
    );
    config.resolve.alias['@fluentui/react-components'] = path.resolve(
      './node_modules/@fluentui/react-components'
    );

    return config;
  },
};

export default nextConfig;
