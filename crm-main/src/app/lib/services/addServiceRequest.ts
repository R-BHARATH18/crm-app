import { ObjectId } from "mongodb";
import clientPromise from "../db";
import ServiceR, { ServiceRequest } from "../types";

export default async function addServiceRequest(
  customerId: string
): Promise<string | null> {
  try {
    const client = await clientPromise;
    const collection = client.db("crm").collection("serviceRequest");

    const result = await collection.insertOne({
      status: "new",
      customerId: new ObjectId(customerId),
      createdAt: new Date(),
    });

    return result.insertedId.toString();
  } catch (err) {
    console.log(err);
    return null;
  }
}
