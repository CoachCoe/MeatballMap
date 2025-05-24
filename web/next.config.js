/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['undici'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/undici/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-private-methods']
        }
      }
    });
    return config;
  }
};

module.exports = nextConfig; 