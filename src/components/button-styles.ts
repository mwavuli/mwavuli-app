/**
 * Button classes (brand A5, S3, S8): Montserrat 600, 12 px radius (`rounded-md`), 48 px high.
 * `primary` is Green on light grounds; `inverse` is white on Green grounds. Hover is one ramp
 * step off the fill, pressed one step further (S8).
 */
export type ButtonVariant = 'primary' | 'inverse';

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-4 font-display text-body font-semibold transition-colors sm:px-6';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-deep active:bg-green-900',
  inverse: 'bg-white text-brand hover:bg-green-50 active:bg-green-100',
};

export function buttonClass(variant: ButtonVariant = 'primary'): string {
  return `${base} ${variants[variant]}`;
}
