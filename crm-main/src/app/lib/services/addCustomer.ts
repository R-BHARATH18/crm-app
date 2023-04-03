import clientPromise from "../db";
import Customer from "../types";

export default async function addCustomer(
  customerData: Customer
): Promise<string | null> {
  try {
    const { name, email, phone, leadStatus } = customerData;

    const client = await clientPromise;
    const collection = client.db("crm").collection("customer");

    await collection.createIndex({ email: 1 }, { unique: true });

    const result = await collection.insertOne({
      name,
      email,
      phone,
      leadStatus,
      createdAt: new Date(),
    });
    return result.insertedId.toString();
  } catch (err) {
    console.log(err);
    return null;
  }
}
