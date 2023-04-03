import clientPromise from "../db";
import Customer, { CustomerWithId } from "../types";
import { ObjectId } from "mongodb";

async function getCustomerById(id: string): Promise<CustomerWithId | null> {
  try {
    const client = await clientPromise;
    const result = await client
      .db("crm")
      .collection("customer")
      .findOne({ _id: new ObjectId(id as string) });

    if (!result) {
      return null;
    } else {
      const formattedCustomer: CustomerWithId = {
        ...result,
        _id: result._id.toString(),
      };

      return formattedCustomer;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default getCustomerById;
