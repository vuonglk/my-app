import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18n/i18nConfig";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { NextMiddlewareResult } from "next/dist/server/web/types";

export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse
) => NextMiddlewareResult | Promise<NextMiddlewareResult>

export function withI18nMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse = NextResponse.next()) => {
    const result = await i18nMiddleware(request, response);
    return middleware(request, event, result)
  }
}

export default async function i18nMiddleware(request: NextRequest, forwardResponse: NextResponse) {
  return i18nRouter(request, i18nConfig);
}