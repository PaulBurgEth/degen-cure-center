/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.{html,js}"],
    theme: {
        extend: {
            colors: {
                'tox-green': '#39FF14', // The main brand color
                'cyber-purple': '#BC13FE',
                'void-black': '#050505',
                // Keeping legacy brand colors for backward compatibility if needed during transition, 
                // but void-black replaces brand-dark
                brand: {
                    dark: '#050505',
                    primary: '#39FF14',
                    accent: '#BC13FE',
                    surface: '#0A0A0A',
                }
            },
            fontFamily: {
                display: ['Syne', 'sans-serif'],
                body: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
                'scanline': 'scanline 8s linear infinite',
                'flicker': 'flicker 3s infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'marquee': 'marquee 20s linear infinite',
            },
            keyframes: {
                heartbeat: {
                    '0%, 100%': { transform: 'scale(1)', filter: 'brightness(1)' },
                    '15%': { transform: 'scale(1.05)', filter: 'brightness(1.3)', boxShadow: '0 0 20px #39FF14' },
                    '30%': { transform: 'scale(1)', filter: 'brightness(1)' },
                    '45%': { transform: 'scale(1.05)', filter: 'brightness(1.3)', boxShadow: '0 0 20px #39FF14' },
                },
                scanline: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' },
                },
                flicker: {
                    '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
                    '20%, 24%, 55%': { opacity: '0.5' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'glow': {
                    '0%': { boxShadow: '0 0 5px rgba(0, 255, 163, 0.2)' },
                    '100%': { boxShadow: '0 0 20px rgba(0, 255, 163, 0.6)' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            }
        },
    },
    plugins: [],
}
