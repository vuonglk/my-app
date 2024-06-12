import { NextFetchEvent, NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { CustomMiddleware } from "./i18nMiddleware";

const jwtSecret = new TextEncoder().encode("someJwtSecret");

export function withAuthMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse = NextResponse.next()) => {
    const result = await authMiddleware(request, response);
    return middleware(request, event, result)
  }
}

export default async function authMiddleware(request: NextRequest, forwardResponse: NextResponse) {
  if (request.nextUrl.pathname.includes("/admin")) {
    const accessToken = request.cookies.get("accessToken");

    if (!accessToken) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("refreshToken");
      return response;
    }

    try {
      await jwtVerify(accessToken.value, jwtSecret);
      return forwardResponse;
    } catch (error: any) {
      if (error.name === "JWTExpired") {
        const refreshToken = request.cookies.get("refreshToken");
        if (!refreshToken) {
          const response = NextResponse.redirect(
            new URL("/login", request.url)
          );
          response.cookies.delete("accessToken");
          response.cookies.delete("refreshToken");
          return response;
        }
        const headers = new Headers({
          Cookie: `${refreshToken.name}=${refreshToken.value}; `,
        });
        const responseAccessToken = await fetch(
          "http://localhost:3003/refresh-token",
          {
            headers,
          }
        );
        const resJson = await responseAccessToken.json();
        if (resJson.success) {
          const response = forwardResponse;
          response.cookies.set({
            name: "accessToken",
            value: resJson.accessToken,
            maxAge: 24 * 60 * 60,
            httpOnly: true,
          });
          return response;
        }

        const response = NextResponse.redirect(new URL("/login", request.url));
        return response;
      }

      const response = NextResponse.redirect(new URL("/login", request.url));
      return response;
    }
  }

  if (request.nextUrl.pathname.includes("/login")) {
    const accessToken = request.cookies.get("accessToken");

    const response = forwardResponse;
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");

    if (accessToken) {
      if (await jwtVerify(accessToken.value, jwtSecret)) {
        const response = NextResponse.redirect(new URL("/admin", request.url));
        return response;
      }
    }

    return response;
  }

  return forwardResponse;
}
