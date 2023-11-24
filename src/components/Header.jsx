import { useContext, useState } from "react";
import { ThemeContext } from "../App";
import { IoIosAdd } from "react-icons/io";
import DrawerComponent from "./Drawer";
import { Drawer } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import "../styles/header.css";

export default function Header() {
  const { dark, invoices, setFilteredInvoices } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const filterOptions = [
    {
      id: "1",
      value: "Paid",
    },
    {
      id: "2",
      value: "Pending",
    },
    {
      id: "3",
      value: "Draft",
    },
    {
      id: "4",
      value: "All",
    }
  ];
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const toggleFilter = (e) => {
    const filteredItems = e != 4 ? invoices.filter(prevInvoice => prevInvoice.status == e) : invoices;
    setFilteredInvoices(prevInvoices => prevInvoices = filteredItems);
  };
  return (
    <div
      className={`flex justify-between md:flex-row flex-col w-full max-w-screen-md px-5 mx-auto md:pt-[200px] pt-10 ${
        dark ? "text-light-bg" : "text-dark-bg"
      }`}
    >
      <div>
        <h1 className="text-3xl font-bold">Invoices</h1>
        <p className="text-gray-500 font-semibold flex gap-1">
          <span className="md:flex hidden">There are total </span> {invoices.length} invoices
        </p>
      </div>
      <div className="flex justify-between gap-2 md:flex-row flex-col items-center">
        <div className={`${dark ? "dark" : "light"} w-full md:w-max pt-3 sm:pt-0 select`}>
          <Select
            onChange={(e) => toggleFilter(e)}
            color="purple"
            label="Filter by status"
          >
            {filterOptions.map((filter, index) => {
              return (
                <Option key={index} value={filter.id}>
                  {filter.value}
                </Option>
              );
            })}
          </Select>
        </div>
        <button
          onClick={openDrawer}
          className="bg-purple-500 w-full md:w-max text-white px-5 py-2.5 rounded-3xl font-semibold flex items-center gap-2"
        >
          <div className="bg-white text-purple-500 p-1 rounded-full">
            <IoIosAdd />
          </div>
          <span>New Invoices</span>
        </button>
        <Drawer
          className={`${dark ? "dark" : "light"} drawer`}
          size={500}
          open={open}
          onClose={closeDrawer}
        >
          <DrawerComponent closeDrawer={closeDrawer} />
        </Drawer>
      </div>
    </div>
  );
}
