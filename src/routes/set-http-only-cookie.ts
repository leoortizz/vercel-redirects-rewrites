import type { RequestEvent, RequestHandlerOutput } from '@sveltejs/kit/types/internal'
import { parse, serialize } from 'cookie'

export async function get({ request }: RequestEvent): Promise<RequestHandlerOutput> {
	const cookies = parse(request.headers.get('cookie') ?? '')
	const headers = new Headers()

	const httpOnlyCookie = serialize('httpOnly', cookies['my-router-cookie'], {
		httpOnly: true,
		maxAge: 60 * 60 // 1h
	})

	headers.set('Set-Cookie', httpOnlyCookie)

	return {
		status: 200,
		headers
	}
}
