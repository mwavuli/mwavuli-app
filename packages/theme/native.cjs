// The Mwavuli brand as a Tailwind 3 preset for NativeWind, the mobile counterpart of theme.css.
//
// Both are read from brand/tokens/mwavuli.tokens.json, and theme.test.mjs checks that they agree: the
// same class names, the same values. Like theme.css this replaces Tailwind's defaults, so an off-brand
// utility such as `bg-blue-500` does not exist.
const tokens = require('@mwavuli/brand/tokens.json');

/** A token's value, following `{color.core.cream}`-style references. */
function value(node) {
  const raw = node.$value;
  if (typeof raw !== 'string') return raw;
  const ref = raw.match(/^\{(.+)\}$/);
  return ref ? value(ref[1].split('.').reduce((n, key) => n[key], tokens)) : raw;
}

const px = (v) => Number.parseFloat(v);
/** Letter-spacing is in em in the tokens; React Native wants pixels. */
const tracking = (v, size) => (v.endsWith('em') ? Number.parseFloat(v) * size : px(v));
const entries = (group, fn) => Object.fromEntries(Object.entries(group).map(([key, node]) => [key, fn(node)]));

const { core, ramp, role } = tokens.color;

const colors = {
  white: value(core.white),
  cream: value(core.cream),
  // Every ramp step, named like the web theme: green-500, gold-50, ...
  ...Object.fromEntries(
    Object.entries(ramp).flatMap(([name, steps]) =>
      Object.entries(steps).map(([step, node]) => [`${name}-${step}`, value(node)]),
    ),
  ),
  // Roles: reach for these first, and for a ramp step only for a tint (brand C2 and C3).
  brand: value(role.brand.primary),
  'brand-deep': value(ramp.green['700']),
  accent: value(role.brand.accent),
  page: value(role.bg.page),
  surface: value(role.bg.surface),
  subtle: value(role.bg.subtle),
  ink: value(role.text.primary),
  heading: value(role.text.heading),
  muted: value(role.text.muted),
  line: value(role.border.default),
  'line-strong': value(role.border.strong),
};

// Type steps: size, line height and tracking from the tokens. A custom face carries its weight in its
// name on React Native, so the weight is chosen with `font-*`, not here.
const fontSize = Object.fromEntries(
  ['display', 'h1', 'h2', 'h3', 'h4', 'body-lg', 'body', 'body-sm', 'label', 'caption', 'overline'].map((name) => {
    const t = value(tokens.type[name]);
    const size = px(t.fontSize);
    return [
      name,
      [`${size}px`, { lineHeight: `${px(t.lineHeight)}px`, letterSpacing: `${tracking(t.letterSpacing, size)}px` }],
    ];
  }),
);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    colors,
    fontSize,
    // Faces are loaded by name in the shell (@expo-google-fonts): Montserrat for display, Inter for text.
    fontFamily: {
      display: ['Montserrat_700Bold'],
      'display-semibold': ['Montserrat_600SemiBold'],
      sans: ['Inter_400Regular'],
      'sans-medium': ['Inter_500Medium'],
      'sans-semibold': ['Inter_600SemiBold'],
    },
    borderRadius: {
      none: '0px',
      sm: tokens.radius.sm.$value,
      md: tokens.radius.md.$value,
      lg: tokens.radius.lg.$value,
      xl: tokens.radius.xl.$value,
      full: tokens.radius.pill.$value,
    },
    boxShadow: entries(tokens.shadow, (node) => node.$value),
  },
};
