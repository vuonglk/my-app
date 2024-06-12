import "./globals.css";
import { Manrope } from "next/font/google";
import i18nConfig from "@/i18n/i18nConfig";
import { dir } from "i18next";
import initTranslations from "@/i18n/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import HeaderPage from "@/components/HeaderPage/HeaderPage";
import type { Metadata } from "next";
import "./globals.css";
import { ConfigProvider } from "antd";

const i18nNamespaces = ["home"];

const inter = Manrope({ subsets: ["latin"] });

export async function generateMetadata({ params }): Promise<Metadata> {
  const { t } = await initTranslations(params.locale, i18nNamespaces);

  return {
    title: t("greeting"),
    openGraph: {
      title: t("greeting"),
    },
  };
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params: { locale } }) {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={inter.className}>
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={locale}
          resources={resources}
        >
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: "#F3B822",
                  colorPrimaryHover: "#F3B822",
                  borderRadius: 4,
                  colorBorder: "#F3B822",
                  colorBgContainer: "#fff",
                  colorText: "#F3B822",
                },
              },
            }}
          >
            <HeaderPage />

            <main className="mx-7"> {children}</main>
          </ConfigProvider>
          <footer>
            <h2>Footer</h2>
          </footer>
        </TranslationsProvider>
      </body>
    </html>
  );
}
