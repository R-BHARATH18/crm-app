import AddCustomerDialog from "@falconz/app/components/Customer/addCustomerDialog";
import addCustomer from "@falconz/app/lib/services/addCustomer";
import deleteCustomer from "@falconz/app/lib/services/deleteCustomer";
import GetCustomers from "@falconz/app/lib/services/getCustomers";
import updateCustomerInfo from "@falconz/app/lib/services/updateCustomerInfo";
import updateLeadStatus from "@falconz/app/lib/services/updateLeadStatus";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const newCustomers = await GetCustomers();

    return NextResponse.json({ customers: newCustomers });
  } catch (err) {
    console.log(err);
    return NextResponse.error;
  }
}

export async function POST(req: NextRequest) {
  try {
    if (req.body) {
      const { name, email, phone, leadStatus } = await req.json();

      const customerData = {
        name,
        email,
        phone,
        leadStatus,
      };

      const insertedId = await addCustomer(customerData);

      return NextResponse.json({ insertedId }, { status: 201 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { mssage: "Error inserting data" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (req.body) {
      const { customerId, name, email, phone } = await req.json();

      const customerData = {
        name,
        email,
        phone,
      };

      const UpdateStatus = await updateCustomerInfo(customerId, customerData);

      return NextResponse.json({ UpdateStatus, customerId }, { status: 201 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { mssage: "Error inserting data" },
      { status: 500 }
    );
  }
}
export async function PATCH(req: NextRequest) {
  try {
    const { customerId, newStatus } = await req.json();

    const UpdateStatus = await updateLeadStatus(customerId, newStatus);

    return NextResponse.json({ UpdateStatus, customerId }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { mssage: "Error inserting data" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { customerId } = await req.json();

    const deleteStatus = await deleteCustomer(customerId);

    console.log(await req);

    console.log(deleteStatus);

    return NextResponse.json(
      { message: "Successfully Deleted" },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "failed to delete" }, { status: 500 });
  }
}
