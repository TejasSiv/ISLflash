import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Design System Colors - Light Mode
				primary: {
					50: '#f0f9ff',
					100: '#e0f2fe', 
					200: '#bae6fd',
					300: '#7dd3fc',
					400: '#38bdf8',
					500: '#0ea5e9', // Main primary
					600: '#0284c7',
					700: '#0369a1',
					800: '#075985',
					900: '#0c4a6e',
					DEFAULT: '#0ea5e9',
					foreground: '#ffffff'
				},
				secondary: {
					50: '#f8fafc',
					100: '#f1f5f9',
					200: '#e2e8f0',
					300: '#cbd5e1',
					400: '#94a3b8',
					500: '#64748b', // Main secondary
					600: '#475569',
					700: '#334155',
					800: '#1e293b',
					900: '#0f172a',
					DEFAULT: '#64748b',
					foreground: '#ffffff'
				},
				accent: {
					50: '#f0fdf4',
					100: '#dcfce7',
					200: '#bbf7d0',
					300: '#86efac',
					400: '#4ade80',
					500: '#22c55e', // Main accent
					600: '#16a34a',
					700: '#15803d',
					800: '#166534',
					900: '#14532d',
					DEFAULT: '#22c55e',
					foreground: '#ffffff'
				},
				success: {
					50: '#f0fdf4',
					100: '#dcfce7',
					200: '#bbf7d0',
					300: '#86efac',
					400: '#4ade80',
					500: '#22c55e',
					600: '#16a34a',
					700: '#15803d',
					800: '#166534',
					900: '#14532d',
					DEFAULT: '#22c55e',
					foreground: '#ffffff'
				},
				warning: {
					50: '#fffbeb',
					100: '#fef3c7',
					200: '#fde68a',
					300: '#fcd34d',
					400: '#fbbf24',
					500: '#f59e0b',
					600: '#d97706',
					700: '#b45309',
					800: '#92400e',
					900: '#78350f',
					DEFAULT: '#f59e0b',
					foreground: '#ffffff'
				},
				error: {
					50: '#fef2f2',
					100: '#fee2e2',
					200: '#fecaca',
					300: '#fca5a5',
					400: '#f87171',
					500: '#ef4444',
					600: '#dc2626',
					700: '#b91c1c',
					800: '#991b1b',
					900: '#7f1d1d',
					DEFAULT: '#ef4444',
					foreground: '#ffffff'
				},
				info: {
					50: '#eff6ff',
					100: '#dbeafe',
					200: '#bfdbfe',
					300: '#93c5fd',
					400: '#60a5fa',
					500: '#3b82f6',
					600: '#2563eb',
					700: '#1d4ed8',
					800: '#1e40af',
					900: '#1e3a8a',
					DEFAULT: '#3b82f6',
					foreground: '#ffffff'
				},
				// Surface Colors
				surface: {
					primary: '#ffffff',
					secondary: '#f8fafc',
					tertiary: '#f1f5f9',
					elevated: '#ffffff'
				},
				// Text Colors
				text: {
					primary: '#0f172a',
					secondary: '#475569',
					tertiary: '#64748b',
					disabled: '#94a3b8',
					inverse: '#ffffff'
				},
				// Border Colors
				border: {
					DEFAULT: '#e2e8f0',
					subtle: '#f1f5f9',
					strong: '#cbd5e1',
					interactive: '#0ea5e9'
				},
				// Existing shadcn colors
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))'
			},
			// Typography Scale
			fontSize: {
				'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '700' }],
				'display-xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.025em', fontWeight: '700' }],
				'display-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
				'display-md': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: '600' }],
				'display-sm': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
				'display-xs': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '600' }],
				'text-xl': ['1.25rem', { lineHeight: '1.5', fontWeight: '400' }],
				'text-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
				'text-md': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
				'text-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
				'text-xs': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }]
			},
			// Spacing Scale
			spacing: {
				'px': '1px',
				'0': '0px',
				'0.5': '0.125rem', // 2px
				'1': '0.25rem',    // 4px
				'1.5': '0.375rem', // 6px
				'2': '0.5rem',     // 8px
				'2.5': '0.625rem', // 10px
				'3': '0.75rem',    // 12px
				'3.5': '0.875rem', // 14px
				'4': '1rem',       // 16px
				'5': '1.25rem',    // 20px
				'6': '1.5rem',     // 24px
				'7': '1.75rem',    // 28px
				'8': '2rem',       // 32px
				'9': '2.25rem',    // 36px
				'10': '2.5rem',    // 40px
				'11': '2.75rem',   // 44px
				'12': '3rem',      // 48px
				'14': '3.5rem',    // 56px
				'16': '4rem',      // 64px
				'20': '5rem',      // 80px
				'24': '6rem',      // 96px
				'28': '7rem',      // 112px
				'32': '8rem',      // 128px
				'36': '9rem',      // 144px
				'40': '10rem',     // 160px
				'44': '11rem',     // 176px
				'48': '12rem',     // 192px
				'52': '13rem',     // 208px
				'56': '14rem',     // 224px
				'60': '15rem',     // 240px
				'64': '16rem',     // 256px
				'72': '18rem',     // 288px
				'80': '20rem',     // 320px
				'96': '24rem'      // 384px
			},
			// Border Radius
			borderRadius: {
				'none': '0px',
				'sm': '0.25rem',   // 4px
				'DEFAULT': '0.5rem', // 8px
				'md': '0.75rem',   // 12px
				'lg': '1rem',      // 16px
				'xl': '1.5rem',    // 24px
				'2xl': '2rem',     // 32px
				'3xl': '3rem',     // 48px
				'full': '9999px'
			},
			// Box Shadows
			boxShadow: {
				'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
				'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
				'DEFAULT': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
				'md': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
				'lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
				'xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
				'2xl': '0 50px 100px -20px rgba(0, 0, 0, 0.25)',
				'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
				'focus': '0 0 0 3px rgba(14, 165, 233, 0.1)',
				'interactive': '0 0 0 2px rgba(14, 165, 233, 0.2)'
			},
			// Enhanced Animations
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					'0%': { transform: 'scale(1)', opacity: '1' },
					'100%': { transform: 'scale(0.95)', opacity: '0' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out-right': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'bounce-gentle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-4px)' }
				},
				'pulse-gentle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'shake': {
					'0%, 100%': { transform: 'translateX(0)' },
					'10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
					'20%, 40%, 60%, 80%': { transform: 'translateX(2px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
				'fade-out': 'fade-out 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
				'scale-in': 'scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
				'scale-out': 'scale-out 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
				'slide-in-right': 'slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
				'slide-out-right': 'slide-out-right 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
				'bounce-gentle': 'bounce-gentle 1s ease-in-out infinite',
				'pulse-gentle': 'pulse-gentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'shake': 'shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)'
			},
			// Motion Timing Functions
			transitionTimingFunction: {
				'ease-in-quad': 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
				'ease-in-cubic': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
				'ease-out-quad': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'ease-out-cubic': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
				'ease-in-out-quad': 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
				'ease-in-out-cubic': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
				'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
				'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
			},
			// Motion Durations
			transitionDuration: {
				'75': '75ms',
				'100': '100ms',
				'150': '150ms',
				'200': '200ms',
				'300': '300ms',
				'500': '500ms',
				'700': '700ms',
				'1000': '1000ms'
			},
			// 3D Transform Utilities
			perspective: {
				'1000': '1000px'
			},
			transformStyle: {
				'preserve-3d': 'preserve-3d'
			},
			backfaceVisibility: {
				'hidden': 'hidden'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }) {
			addUtilities({
				// 3D Transform Utilities
				'.perspective-1000': {
					perspective: '1000px',
				},
				'.transform-style-preserve-3d': {
					transformStyle: 'preserve-3d',
				},
				'.backface-hidden': {
					backfaceVisibility: 'hidden',
				},
				'.rotate-y-180': {
					transform: 'rotateY(180deg)',
				},
				// Interactive States
				'.hover-lift': {
					'&:hover': {
						transform: 'translateY(-2px)',
						boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
					}
				},
				'.hover-scale': {
					'&:hover': {
						transform: 'scale(1.02)'
					}
				},
				// Focus States
				'.focus-ring': {
					'&:focus': {
						outline: 'none',
						boxShadow: '0 0 0 3px rgba(14, 165, 233, 0.1)'
					}
				},
				// Text Utilities
				'.text-balance': {
					textWrap: 'balance'
				}
			});
		}
	],
} satisfies Config;
