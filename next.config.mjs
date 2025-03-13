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
        '@fluentui/react-datepicker-compat',
        '@fluentui/react-timepicker-compat',
        '@fluentui/react-nav-preview',
        ...config.externals,
      ];
    }
    config.resolve.alias['@tanstack/react-query'] = path.resolve(
      './node_modules/@tanstack/react-query'
    );
    config.resolve.alias['@fluentui/react-components'] = path.resolve(
      './node_modules/@fluentui/react-components'
    );
    config.resolve.alias['@fluentui/react-datepicker-compat'] = path.resolve(
      './node_modules/@fluentui/react-datepicker-compat'
    );
    config.resolve.alias['@fluentui/react-timepicker-compat'] = path.resolve(
      './node_modules/@fluentui/react-timepicker-compat'
    );
    config.resolve.alias['@fluentui/react-nav-preview'] = path.resolve(
      './node_modules/@fluentui/react-nav-preview'
    );

    return config;
  },
};

export default nextConfig;
