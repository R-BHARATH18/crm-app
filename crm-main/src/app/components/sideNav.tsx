import AddCustomerDialog from "./Customer/addCustomerDialog";
import CustomerList from "./Customer/customerList";

export default function Sidenav() {
  return (
    <div className="bg-gray-200 dark:bg-gray-900 shadowmd w-1/4 max-w-sm h-full max-h-screen overflow-hidden ">
      <div className="content-center p-4 m-4">
        <AddCustomerDialog />
      </div>
      <div className="max-h-[90%] overflow-auto py-8">
        {/* @ts-expect-error Async Server Component */}
        <CustomerList />
      </div>
    </div>
  );
}
