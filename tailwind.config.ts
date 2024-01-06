import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-inter)',
      },
      gridTemplateRows: {
        app: 'min-content max-content',
      },
      keyframes: {
        overlayShow: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },

        cartShow: {
          '0%': {
            opacity: '0',
            right: '-50%',
          },
          '100%': {
            opacity: '1',
            right: '0',
          },
        },

        cartHide: {
          '0%': {
            opacity: '1',
            right: '0',
          },
          '100%': {
            opacity: '0',
            right: '-50%',
          },
        },
      },
      animation: {
        overlayShow: 'overlayShow 400ms ease-in-out',
        cartShow: 'cartShow 400ms ease-in-out',
        cartHide: 'cartHide 400ms ease-in-out',
      },
    },
  },
  plugins: [],
}
export default config
