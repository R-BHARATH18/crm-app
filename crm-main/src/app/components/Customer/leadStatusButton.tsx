"use client";

import { Popover } from "@headlessui/react";
import { useState } from "react";

interface Props {
  customerId: string;
  currentStatus: string;
}

export default function LeaadStatusButton({
  customerId,
  currentStatus,
}: Props) {
  const [status, setStatus] = useState(currentStatus);

  const leadStatuses: string[] = [
    "new",
    "contacted",
    "qualified",
    "lost",
    "cancelled",
    "confirmed",
  ];

  const changeStatus = async (newStatus: string) => {
    try {
      const response = await fetch("/api/customers", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId,
          newStatus,
        }),
      });
      setStatus(newStatus);
    } catch (err) {
      console.error(err);
    } finally {
      close();
    }
  };

  return (
    <Popover>
      <Popover.Button
        className={
          "rounded-l-full rounded-r-full px-8 py-2 text-base uppercase ring"
        }
      >
        {status}
      </Popover.Button>
      <Popover.Panel
        className={"mt-2 rounded-xl bg-gray-300 p-4 shadow-lg dark:bg-gray-900"}
      >
        {({ close }) => (
          <ul className="flex items-center justify-center gap-4 divide-x divide-gray-500 divide-opacity-50">
            {leadStatuses.map((status) => (
              <li
                key={status}
                className="rounded-lg hover:bg-gray-500/50 hover:ring"
              >
                <button
                  type="button"
                  onClick={() => {
                    changeStatus(status);
                    close();
                  }}
                  className="p-4  text-sm uppercase"
                >
                  {status}
                </button>
              </li>
            ))}
          </ul>
        )}
      </Popover.Panel>
    </Popover>
  );
}
