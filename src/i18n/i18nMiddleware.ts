import { i18nRouter } from "next-i18n-router";
import i18nConfig from "@/i18n/i18nConfig";

export function i18nMiddleware(request) {
  return i18nRouter(request, i18nConfig);
}
