import getServiceRequestsByCustomerId from "@falconz/app/lib/services/getServiceRequests";
import { ServiceRequest } from "@falconz/app/lib/types";

interface Props {
  customerId: string;
}

export default async function ListServiceRequest({ customerId }: Props) {
  const data: ServiceRequest[] | null = await getServiceRequestsByCustomerId(
    customerId
  );

  console.log(data);
  return <div></div>;
}
