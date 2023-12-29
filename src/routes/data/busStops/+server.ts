import { BUSSTOPS } from '$lib/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	return new Response(JSON.stringify(BUSSTOPS.busStops));
};

