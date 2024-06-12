"use client";

import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";

function SignUp() {
  const recaptchaRef = useRef(null);
  const { t } = useTranslation();

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
      >
        <input
          type="text"
          placeholder={t("username")}
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "16px",
          }}
          required
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
          required
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
          required
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
        />
      </form>
    </div>
  );
}

export default SignUp;
