import { NextResponse } from 'next/server';

export default function middleWare(req) {
    const getCookie = req.cookies.get('bearer_token');
    function pathStrWith(redFromPath) {
        return req.nextUrl.pathname.startsWith(redFromPath);
    }
    function redirectTo(redToPath) {
        return NextResponse.redirect(new URL(redToPath, req.url));
    }
    if (pathStrWith('/login') && getCookie) {
        return redirectTo('/profile');
    } else if (pathStrWith('/signup') && getCookie) {
        return redirectTo('/profile');
    } else if (pathStrWith('/forgot') && getCookie) {
        return redirectTo('/profile');
    } else if (pathStrWith('/profile') && !getCookie) {
        return redirectTo('/login');
    } else if (pathStrWith('/orders') && !getCookie) {
        return redirectTo('/login');
    }
}
