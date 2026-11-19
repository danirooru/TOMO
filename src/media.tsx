import type { ImgHTMLAttributes } from "react";
/** Los assets embebidos solo se usan en la entrega HTML portátil. */
export function Image({ src, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const embedded = (window as Window & { TOMO_ASSETS?: Record<string, string> })
    .TOMO_ASSETS;
  return <img {...props} src={(src && embedded?.[src]) || src} />;
}
