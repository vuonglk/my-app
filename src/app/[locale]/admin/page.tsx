"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";

function Admin() {
  const router = useRouter();
  const { t } = useTranslation();
  const handleLogout = async () => {
    // const response = await fetch("/api/logout");
    // const resJson = await response.json();
    router.push("/");
  };

  return (
    <>
      <h1>Admin Page</h1>
      <h2>{t("admin")}</h2>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
}

export default Admin;
