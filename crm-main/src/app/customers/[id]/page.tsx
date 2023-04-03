import CustomerAvatar from "@falconz/app/components/Customer/customerAvatar";
import DeleteCustomer from "@falconz/app/components/Customer/deleteCustomer";
import LeaadStatusButton from "@falconz/app/components/Customer/leadStatusButton";
import UpdateCustomerInfo from "@falconz/app/components/Customer/updateCustomerInfo";
import { AddServiceRequest } from "@falconz/app/components/serviceRequest/addServiceRequest";
import ListServiceRequest from "@falconz/app/components/serviceRequest/listServiceRequests";
import GetCustomerDetails from "@falconz/app/lib/services/getCustomerDetails";
import { CustomerWithId } from "@falconz/app/lib/types";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CustomerDetail({ params }) {
  const data: CustomerWithId | null = await GetCustomerDetails(params.id);

  if (!data) {
    notFound();
  } else {
    return (
      <section className="container m-16 w-full">
        <div className="grid place-items-center gap-8 self-start">
          <div>
            <CustomerAvatar name={data?.name || "someone"} size={128} />
          </div>
          <div className="">
            <h1 className="text-4xl">{data?.name}</h1>
          </div>
          <div className=" flex w-full items-center justify-center gap-4  ">
            <Link href={`mailto:${data?.email}`} className=" p-2 text-lg">
              {data.email}
            </Link>
            <Link href={`tel:${data?.phone}`} className="p-2 text-lg">
              {data.phone}
            </Link>
          </div>
          <div>
            <LeaadStatusButton
              customerId={data._id.toString()}
              currentStatus={data.leadStatus}
            />
          </div>
          <div>
            <UpdateCustomerInfo
              customerId={data._id.toString()}
              name={data.name}
              email={data.email}
              phone={data.phone}
            />
          </div>
          <div>
            <AddServiceRequest customerId={data._id.toString()} />
          </div>
          <div>
            {/* @ts-expect-error Async Server Component */}
            <ListServiceRequest customerId={data._id.toString()} />
          </div>
        </div>
      </section>
    );
  }
}
