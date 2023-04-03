import clientPromise from "@falconz/app/lib/db";
import { faker } from '@faker-js/faker';
import Customer from "@falconz/app/lib/types";
import { NextResponse } from "next/server";

export async function GET(){
    try{

        const customers: Customer[] = [];

        for (let i = 0; i < 10; i++) {
            const customer: Customer = {
                name: faker.name.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                leadStatus: 'new', // Default lead status is "new"
            };
            customers.push(customer);
        }

          const client = await clientPromise;
          const result = await client.db('crm').collection('customer').insertMany(customers);

          return NextResponse.json({customers: result})
        }
        catch(err){
            console.error(err)
            return NextResponse.error
        }
}