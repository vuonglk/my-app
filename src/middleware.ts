import { i18nRouter } from "next-i18n-router";
import i18nConfig from "@/i18n/i18nConfig";
import authMiddleware from "./authMiddleware";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // Thực hiện xử lý authResponse
  const authResponse = await authMiddleware(request);

  // Kiểm tra và xử lý authResponse
  // if (authResponse) {
  //   const locationHeader = authResponse.headers.get("location");
  //   if (locationHeader) {
  //     const redirectTo = new URL(locationHeader);
  //     return NextResponse.redirect(redirectTo);
  //   }
  // }

  // Nếu không có location header hoặc authResponse, tiếp tục xử lý middleware khác
  const i18nResponse = i18nRouter(request, i18nConfig);
  const mergedResponse = mergeResponses(i18nResponse, authResponse);

  // Trả về phản hồi kết hợp
  return mergedResponse;
}

function mergeResponses(
  response1: NextResponse,
  response2: NextResponse
): NextResponse {
  // If either response is null or undefined, return the other response
  if (!response1) {
    return response2;
  }
  if (!response2) {
    return response1;
  }

  // Create a new NextResponse based on response1
  const mergedResponse = new NextResponse(response1.body, {
    status: response1.status,
    statusText: response1.statusText,
    headers: response1.headers,
  });

  // Merge cookies from response2 into mergedResponse
  response2.cookies.getAll().forEach((cookie) => {
    mergedResponse.cookies.set(cookie);
  });

  // Return the merged response
  return mergedResponse;
}

// Apply this middleware to relevant paths
export const config = {
  matcher: [
    "/((?!api|static|\\..*|_next).*)", // Matches all routes except api, static files, hidden files, and Next.js internals
    // "/[locale]/admin/:path*",
    // "/[locale]/login",
  ],
};
