import { ObjectId } from "mongodb";
import clientPromise from "../db";

interface updatedData {
  name: string;
  email: string;
  phone: string;
}

export default async function updateCustomerInfo(
  id: string,
  updatedCustomerData: updatedData
): Promise<boolean> {
  try {
    const { name, email, phone } = updatedCustomerData;

    const client = await clientPromise;
    const collection = client.db("crm").collection("customer");

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { name: name, email: email, phone: phone, updatedAt: new Date() },
      }
    );

    return result.modifiedCount === 1;
  } catch (err) {
    console.log(err);
    return false;
  }
}
