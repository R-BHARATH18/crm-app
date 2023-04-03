import Link from "next/link";

export default function MainNav() {
  return (
    <header className="w-full ">
      <nav className="bg-gray-200 dark:bg-gray-900 shadow-md py-4 px-16">
        <ul className="flex justify-end items-center w-full gap-8 ">
          <li>
            <Link href={"/customers"} className="active:font-bold">
              Customers
            </Link>
          </li>
          <li>
            <Link href={"/services"} className="active:font-bold">
              Service Requests
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
