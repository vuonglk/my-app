import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";
import "./style.scss";
import LanguageChanger from "../LanguageChanger";

function HeaderPage() {
  return (
    <header className="header-page flex justify-center">
      <div className="container flex justify-between items-center">
        <div className="">
          <Image src={""} alt="logo" />
        </div>
        <ul className="flex">
          <li>
            <Link href={"#Home"}>Home</Link>
          </li>
          <li>
            <Link href={"#Features"}>Features</Link>
          </li>
          <li>
            <Link href={"#Publishers"}>Publishers</Link>
          </li>
          <li>
            <Link href={"#Advertiser"}>Advertiser</Link>
          </li>
          <li>
            <Link className="bg-red-700" href={"/admin"}>
              GO ADMIN
            </Link>
          </li>
          <li>
            <LanguageChanger />
          </li>
        </ul>
        <div>
          <Link href={"/login"}>
            <Button className="mr-2">SIGN IN</Button>
          </Link>
          <Link href={"#AdFormats"}>
            <Button type="primary">SIGN UP</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HeaderPage;
