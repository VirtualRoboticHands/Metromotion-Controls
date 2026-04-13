import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

function unauthorizedResponse() {
  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Metromotion Controls Internal"',
    },
  })
}

function decodeBasicAuthHeader(header: string) {
  const [scheme, encoded] = header.split(' ')
  if (scheme !== 'Basic' || !encoded) return null

  try {
    const decoded = atob(encoded)
    const separatorIndex = decoded.indexOf(':')
    if (separatorIndex === -1) return null

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    }
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.next()
  }

  const expectedUsername = process.env.CONTENT_GENERATOR_USERNAME
  const expectedPassword = process.env.CONTENT_GENERATOR_PASSWORD

  if (!expectedUsername || !expectedPassword) {
    return new NextResponse('Not Found', { status: 404 })
  }

  const authHeader = request.headers.get('authorization')
  if (!authHeader) {
    return unauthorizedResponse()
  }

  const credentials = decodeBasicAuthHeader(authHeader)
  if (!credentials) {
    return unauthorizedResponse()
  }

  if (
    credentials.username !== expectedUsername ||
    credentials.password !== expectedPassword
  ) {
    return unauthorizedResponse()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
