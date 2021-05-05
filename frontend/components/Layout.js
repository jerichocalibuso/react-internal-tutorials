import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function NavButton({ route, buttonName }) {
  const { asPath } = useRouter();

  const isActive = asPath === route ? "bg-green-600" : "";

  return (
    <button
      className={`${isActive} text-md text-white p-2 px-4 rounded hover:bg-green-600`}
    >
      <Link href={route}>
        <a>{buttonName}</a>
      </Link>
    </button>
  );
}

export function Layout({ children }) {
  return (
    <>
      <div className="flex space-x-2 px-4 py-3 bg-green-500">
        <NavButton route="/" buttonName="Home" />
        <NavButton route="/projects" buttonName="Projects" />
        <NavButton route="/about" buttonName="About" />
      </div>
      {children}
    </>
  );
}
