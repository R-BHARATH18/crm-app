"use client";

import { useRouter } from "next/navigation";

interface Props {
  customerId: string;
}

export default function DeleteCustomer({ customerId }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/customers", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => handleDelete}
        className="w-full rounded-full p-2  ring hover:bg-gray-500/25"
      >
        Delete Customer
      </button>
    </div>
  );
}
