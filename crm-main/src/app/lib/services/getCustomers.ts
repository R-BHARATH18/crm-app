import { Console } from "console";
import clientPromise from "../db";
import Customer, { CustomerWithId } from "../types";

export default async function GetCustomers(): Promise<CustomerWithId[] | null> {
  try {
    const client = await clientPromise;
    const customers = await client
      .db("crm")
      .collection("customer")
      .find()
      .toArray();

    if (customers) {
      const formattedCustomers = customers.map((customer: any) => {
        return {
          ...customer,
          _id: customer._id.toString(),
        };
      });

      return formattedCustomers;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}
