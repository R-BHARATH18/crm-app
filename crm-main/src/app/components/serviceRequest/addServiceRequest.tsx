"use client";

import { useRouter } from "next/navigation";

interface Props {
  customerId: string;
}

export function AddServiceRequest({ customerId }: Props) {
  const router = useRouter();

  const handleSubmit = async () => {
    await fetch("/api/service", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customerId }),
    });

    router.replace(`/customers/${customerId}`);
  };

  return (
    <button
      type="button"
      onClick={() => handleSubmit}
      className="w-full rounded-full p-2  ring hover:bg-gray-500/25"
    >
      New Service Request
    </button>
  );
}
