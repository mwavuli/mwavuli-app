/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tailwind 3 reads only the files listed here: this app, and each portal it can mount.
  content: [
    './App.tsx',
    './src/**/*.{ts,tsx}',
    '../tenant/src/**/*.{ts,tsx}',
    '../landlord/src/**/*.{ts,tsx}',
    '../ops/src/**/*.{ts,tsx}',
  ],
  // The brand (colours, type steps, radii, shadows) comes from the shared preset, which reads the brand
  // tokens: the same ones the web theme reads.
  presets: [require('nativewind/preset'), require('@mwavuli/theme/native')],
};
