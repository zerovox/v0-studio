import Link from "next/link";
import { PAGE_TITLE } from "../lib/constants";

const Header = () => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter text-center md:text-left leading-tight mt-8 mb-8 md:mb-16">
      <Link href="/">
        <a className="hover:underline">{PAGE_TITLE}</a>
      </Link>
      .
    </h2>
  );
};

export default Header;
