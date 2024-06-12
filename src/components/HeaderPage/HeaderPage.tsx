import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";
import "./style.scss";

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
            <Link href={"#AdFormats"}>Ad Formats</Link>
          </li>
        </ul>
        <div>
          <Button className="mr-2">SIGN IN</Button>
          <Button type="primary">SIGN UP</Button>
        </div>
      </div>
    </header>
  );
}

export default HeaderPage;
