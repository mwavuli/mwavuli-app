import type { APIRoute } from 'astro';
import { appleTouchIcon } from '../icons';

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await appleTouchIcon()), { headers: { 'Content-Type': 'image/png' } });
