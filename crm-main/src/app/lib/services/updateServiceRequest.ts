import { ObjectId } from "mongodb";
import clientPromise from "../db";
import { SrStatus } from "../types";

export default async function updateServiceRequestStatus(
  id: string,
  status: SrStatus
): Promise<boolean> {
  try {
    const client = await clientPromise;
    const collection = client.db("crm").collection("serviceRequest");

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status, updatedAt: new Date() } }
    );

    console.log(result);

    return result.modifiedCount === 1;
  } catch (err) {
    console.log(err);
    return false;
  }
}
