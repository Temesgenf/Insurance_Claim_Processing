import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        icon: true,
        // This will transform your SVG to a React component
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ];

  // Add bundle analyzer for analyze mode
  if (mode === 'analyze') {
    import('rollup-plugin-visualizer').then(({ visualizer }) => {
      plugins.push(
        visualizer({
          filename: 'dist/stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
          template: 'treemap', // Better visualization
        })
      );
    });
  }

  return {
    plugins,
    build: {
      // Enable source maps for debugging
      sourcemap: false, // Set to true for development debugging
      // Optimize chunk size
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          // Enhanced manual chunk splitting for better caching and dynamic imports
          manualChunks: (id) => {
            // React core
            if (id.includes('react') && !id.includes('react-')) {
              return 'react-core';
            }
            
            // Router
            if (id.includes('react-router')) {
              return 'router';
            }
            
            // UI libraries
            if (id.includes('@heroicons') || id.includes('lucide') || id.includes('react-icons')) {
              return 'ui-icons';
            }
            
            // Charts
            if (id.includes('chart') || id.includes('apexcharts')) {
              return 'charts';
            }
            
            // Forms and validation
            if (id.includes('react-datepicker') || id.includes('class-transformer')) {
              return 'forms';
            }
            
            // Animations
            if (id.includes('framer-motion')) {
              return 'animations';
            }
            
            // Real-time features
            if (id.includes('socket.io')) {
              return 'realtime';
            }
            
            // Utilities
            if (id.includes('axios') || id.includes('sweetalert2')) {
              return 'utils';
            }
            
            // Page-specific chunks for better dynamic imports
            if (id.includes('/pages/HomePage')) return 'page-home';
            if (id.includes('/pages/Login')) return 'page-auth';
            if (id.includes('/pages/UserDashboard')) return 'page-user-dashboard';
            if (id.includes('/pages/ClaimsPage')) return 'page-claims';
            if (id.includes('/pages/PoliciesPage')) return 'page-policies';
            if (id.includes('/pages/ProductsPage')) return 'page-products';
            if (id.includes('/pages/AdminPage')) return 'page-admin-dashboard';
            if (id.includes('/pages/AdminUsersPage')) return 'page-admin-users';
            if (id.includes('/pages/AdminClaimsPage')) return 'page-admin-claims';
            if (id.includes('/pages/AdminPoliciesPage')) return 'page-admin-policies';
            if (id.includes('/pages/AdminProductPage')) return 'page-admin-products';
            if (id.includes('/pages/Register') || id.includes('/pages/OnboardingRegister')) return 'page-register';
            if (id.includes('/pages/NewClaimPage')) return 'page-new-claim';
            if (id.includes('/pages/ClaimDetailPage')) return 'page-claim-detail';
            if (id.includes('/pages/ProductDetail')) return 'page-product-detail';
          },
          // Optimize chunk naming for better caching
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
            return `js/${facadeModuleId}-[hash].js`;
          },
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name;
            if (!name) return 'assets/[name]-[hash].[ext]';
            
            const info = name.split('.');
            const ext = info[info.length - 1];
            if (/\.(css)$/.test(name)) {
              return `css/[name]-[hash].${ext}`;
            }
            if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(name)) {
              return `images/[name]-[hash].${ext}`;
            }
            return `assets/[name]-[hash].${ext}`;
          },
        },
      },
      // Enable minification with advanced options
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.log in production
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
          passes: 2,
        },
        mangle: {
          safari10: true,
        },
        format: {
          comments: false,
        },
      },
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Optimize assets
      assetsInlineLimit: 4096, // 4kb
    },
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@heroicons/react',
        'lucide-react',
        'react-icons',
        'chart.js',
        'react-chartjs-2',
        'apexcharts',
        'react-apexcharts',
        'react-datepicker',
        'framer-motion',
        'socket.io-client',
        'sweetalert2',
        'axios',
        'class-transformer',
        'react-helmet-async',
      ],
      exclude: ['@vite/client', '@vite/env'],
    },
    // Server optimizations
    server: {
      hmr: {
        overlay: false, // Disable HMR overlay for better performance
      },
      
    },
  };
});
