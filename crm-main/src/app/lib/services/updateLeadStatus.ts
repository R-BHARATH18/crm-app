import { ObjectId } from "mongodb";
import clientPromise from "../db";
import { LeadStatus } from "../types";

export default async function updateLeadStatus(
  id: string,
  leadStatus: LeadStatus
): Promise<boolean> {
  try {
    const client = await clientPromise;
    const collection = client.db("crm").collection("customer");

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { leadStatus: leadStatus, updatedAt: new Date() } }
    );

    console.log(result);

    return result.modifiedCount === 1;
  } catch (err) {
    console.log(err);
    return false;
  }
}
