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
        '@fluentui/react-shared-contexts',
        ...config.externals,
      ];
    }
    config.resolve.alias['@fluentui/react-shared-contexts'] = path.resolve(
      './node_modules/@fluentui/react-shared-contexts'
    );

    return config;
  },
};

export default nextConfig;
