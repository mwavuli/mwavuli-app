/**
 * Button classes (brand A5, S3, S8): 48 px high, 12 px radius, Montserrat 600. Primary is Green with
 * white text; secondary a 1.5 px Green outline. The two `inverse` variants are for Green grounds.
 * Hover is one ramp step away, pressed two; motion uses the `--mw-motion-*` tokens and stops under
 * `prefers-reduced-motion`.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'inverse' | 'inverse-outline';

const base =
  'inline-flex min-h-12 items-center justify-center rounded-md px-6 font-display text-body font-semibold ' +
  'transition-[color,background-color,border-color] duration-(--mw-motion-duration-base) ease-(--mw-motion-easing-standard) motion-reduce:transition-none';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-deep active:bg-green-900',
  secondary: 'border-[1.5px] border-brand text-brand hover:bg-green-50 active:bg-green-100',
  inverse: 'bg-white text-brand hover:bg-green-50 active:bg-green-100',
  'inverse-outline': 'border-[1.5px] border-white text-white hover:bg-white/10 active:bg-white/20',
};

export const buttonClass = (variant: ButtonVariant = 'primary'): string => `${base} ${variants[variant]}`;
