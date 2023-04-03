import GetCustomers from "@falconz/app/lib/services/getCustomers";
import Customer, { CustomerWithId } from "@falconz/app/lib/types";
import CustomerAvatar from "./customerAvatar";
import Link from "next/link";
import LeadStatusBadge from "./leadStatusBadge";

export default async function CustomerList() {
  const data: CustomerWithId[] | null = await GetCustomers();

  if (data?.length == 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-center text-base">
          No Leads Exist yet Try adding one
        </span>
      </div>
    );
  } else {
    return (
      <div>
        <ul className="  m-4 divide-y divide-gray-500 divide-opacity-25 px-4">
          {data?.map((item) => (
            <li key={item._id.toString()}>
              <Link
                href={`/customers/${item._id.toString()}`}
                className=" my-4 flex items-center gap-4 rounded-xl p-2 py-2 transition-all duration-300 ease-in-out hover:bg-gray-500/50 hover:ring"
              >
                <CustomerAvatar name={item.name} size={32} />

                <div className="flex-row gap-2">
                  <div className="text-xl">{item.name}</div>
                  <div>
                    <LeadStatusBadge leadStatus={item.leadStatus} />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
