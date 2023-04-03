"use client";

import { GenerateFakeData } from "@falconz/app/lib/utils/generateFakeData";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  customerId: string;
  name: string;
  email: string;
  phone: string;
}

export default function AddCustomerDialog({
  customerId,
  name,
  email,
  phone,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formdata, setFormData] = useState({
    name: name,
    email: email,
    phone: phone,
  });

  const router = useRouter();

  const handleAutofill = () => {
    const newData = GenerateFakeData();
    setFormData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const { name, email, phone } = formdata;

      const response = await fetch("/api/customers", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId,
          name,
          email,
          phone,
          leadStatus: "new",
        }),
      });

      const { id } = await response.json();

      setIsOpen(false);
      router.push(`/customers/${id.toString()}`);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
      setFormData({
        name: name,
        email: email,
        phone: phone,
      });
    }
  };

  return (
    <>
      <button
        type="button"
        className="w-full rounded-full p-2  ring hover:bg-gray-500/25"
        onClick={() => setIsOpen(true)}
      >
        Update Customer Info
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={"relative z-50"}
      >
        <div
          className="fixed inset-0 backdrop-blur backdrop-brightness-50"
          aria-hidden="true"
        />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto rounded-2xl  bg-gray-200 p-8 shadow-xl dark:bg-gray-900">
            <Dialog.Title className={"m-4 text-3xl"}>
              Update Customer Info
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="grid gap-4 p-4">
              <label htmlFor="name"> Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formdata.name}
                placeholder="Enter Customer name"
                onChange={(e) => {
                  setFormData({ ...formdata, name: e.target.value });
                }}
                required
                className="form-input  rounded-xl bg-gray-300 ring ring-opacity-75 dark:bg-gray-800"
              />

              <label htmlFor="email"> E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formdata.email}
                placeholder="Enter Customer name"
                onChange={(e) => {
                  setFormData({ ...formdata, email: e.target.value });
                }}
                required
                className="form-input  rounded-xl bg-gray-300 ring ring-opacity-75 dark:bg-gray-800  "
              />

              <label htmlFor="phone"> Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formdata.phone}
                placeholder="Enter Customer name"
                onChange={(e) => {
                  setFormData({ ...formdata, phone: e.target.value });
                }}
                required
                minLength={10}
                maxLength={20}
                className="form-input  rounded-xl bg-gray-300 ring ring-opacity-75 dark:bg-gray-800  "
              />

              <button
                type="button"
                onClick={() => handleAutofill()}
                className="w-full rounded-xl p-2  text-base hover:bg-gray-500/10"
              >
                Autofill
              </button>

              <div className="flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="my-8 w-full  rounded-lg p-2 text-base text-red-700 hover:ring hover:ring-red-300/25 dark:text-red-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="my-8 w-full rounded-lg bg-green-400/75 p-2 text-base hover:ring hover:ring-green-300/25 disabled:bg-gray-500"
                >
                  {isSubmitting ? "Updating customer..." : "Update customer"}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
