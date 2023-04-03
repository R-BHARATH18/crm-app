import addServiceRequest from "@falconz/app/lib/services/addServiceRequest";
import getServiceRequestsByCustomerId from "@falconz/app/lib/services/getServiceRequests";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const customerId = await req.json();

    const serviceRequests = await getServiceRequestsByCustomerId(customerId);

    return NextResponse.json({ serviceRequests }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "err" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { customerId } = await req.json();

  console.log(customerId);

  const insertedId = await addServiceRequest(customerId);

  return NextResponse.json({ insertedId }, { status: 201 });
}
