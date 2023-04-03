import { ObjectId } from "mongodb";
import clientPromise from "../db";

export default async function deleteCustomer(id: string): Promise<boolean> {
  try {
    const client = await clientPromise;
    const collection = client.db("crm").collection("customer");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}
