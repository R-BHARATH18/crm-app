import { ObjectId } from "mongodb";
import clientPromise from "../db";
import { ServiceRequest } from "../types";

export default async function getServiceRequestsByCustomerId(
  customerId: string
): Promise<ServiceRequest[]> {
  try {
    const client = await clientPromise;
    const collection = client.db("crm").collection("serviceRequest");

    const serviceRequests = await collection
      .find({ customerId: new ObjectId(customerId) })
      .toArray();

    return serviceRequests;
  } catch (err) {
    console.log(err);
    return [];
  }
}
