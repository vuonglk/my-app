"use client";

import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import { DefaultApi, Configuration } from "@/services/openapi";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const recaptchaRef = useRef(null);
  const { t } = useTranslation();
  // const { locale } = useParams<{ locale: string }>();

  const handleSubmit = (event) => {
    event.preventDefault();

    // config api
    const config = new Configuration({
      basePath: "http://localhost:15889/api",
    });
    const api = new DefaultApi(config);

    api.loginPost({ email: "test@email.com", password: "123" }).then(() => {
      router.push(`/admin`);
    });

    const recaptchaValue = recaptchaRef.current.getValue();
    if (recaptchaValue) {
      // console.log("reCAPTCHA Value:", recaptchaValue);
    } else {
      recaptchaRef.current.execute();
    }
  };

  const onReCAPTCHAChange = () => {
    // console.log("Captcha value:", value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f7f7f7",
      }}
    >
      <form
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder={t("email")}
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        />
        <input
          type="password"
          placeholder={t("password")}
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          {t("submit")}
        </button>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LcT4fIpAAAAAB9p8RSge2QKsggzpjBD_izFcbyx"
          size="invisible"
          onChange={onReCAPTCHAChange}
        />
      </form>
    </div>
  );
};

export default Login;
