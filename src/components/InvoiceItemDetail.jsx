import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { ThemeContext } from "../App";
import DrawerComponent from "./Drawer";
import { Drawer } from "@material-tailwind/react";
import "../styles/invoiceItemDetail.css";
import { deleteInvoice, getInvoices, postInvoice } from "../helpers/fetchData";
import { MdOutlineEdit, MdDeleteOutline, MdDone } from "react-icons/md";
import { CiClock1 } from "react-icons/ci";
import { RiDraftLine } from "react-icons/ri";

export default function InvoiceItemDetail() {
  const { id } = useParams();
  const { dark, invoices, setInvoices } = useContext(ThemeContext);
  const navigate = useNavigate();
  const item = invoices.length
    ? invoices.find((invoice) => invoice.id === id)
    : null;
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => {
    getInvoices().then((invoicesResponse) => setInvoices(invoicesResponse));
    setOpen(false);
  };

  const removeInvoice = () => {
    deleteInvoice(item.id).then();
    navigate("/");
  };
  const markAsPaid = () => {
    let newItem = { ...item, status: 1 };
    postInvoice(newItem, "PUT").then((res) => {
      navigate("/");
    });
  };

  if (item) {
    return (
      <div className="flex justify-center w-full">
        <div className="text-white item-detail md:pt-[100px] pt-5 w-full flex flex-col gap-5 max-w-screen-md md:px-5 px-2 mx-auto">
          <div
            onClick={() => navigate(-1)}
            className="back flex h-max items-center gap-2 cursor-pointer md:mb-4 mb-0"
          >
            <FiChevronLeft className="text-purple-500" />
            <span
              className={`font-bold ${
                dark ? "text-light-bg " : "text-primary"
              }`}
            >
              Go Back
            </span>
          </div>
          <div
            className={`flex justify-between gap-1 ${
              dark ? "bg-primary text-white" : "bg-white text-primary"
            } py-6 px-7 rounded-md`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl font-medium">Status</span>
              <ul
                className={`status md:w-24 w-full  flex items-center gap-2 justify-center rounded-lg capitalize 
                ${item.status == 1 ? "paid" : ""} 
                ${item.status == 2 ? "pending" : ""} 
                ${item.status == 3 ? "draft" : ""}`}
                    >
                <li className="list-disc md:flex hidden ml-2">
                  {item.status == 1 ? "paid" : ""}
                  {item.status == 2 ? "pending" : ""}
                  {item.status == 3 ? "draft" : ""}
                </li>
                {item.status === 1 ? <MdDone className="md:hidden flex" /> : (item.status === 2 ? <CiClock1 className="md:hidden flex" /> : <RiDraftLine className="md:hidden flex" />)}
              </ul>
            </div>
            <div className="flex gap-2">
              <button
                onClick={openDrawer}
                className={`md:px-6 px-3 md:py-2 py-1 rounded-3xl ${
                  dark
                    ? "bg-gray-400 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-400"
                } transition-colors`}
              >
                <span className="md:flex hidden">Edit</span>
                <MdOutlineEdit className="md:hidden flex" />
              </button>
              <button
                onClick={removeInvoice}
                className="md:px-6 px-3 md:py-2 py-1 rounded-3xl text-white bg-red-400 hover:bg-red-500 transition-colors"
              >
                <span className="md:flex hidden">Delete</span>
                <MdDeleteOutline className="md:hidden flex"/>
              </button>
              {item.status != 1 && (
                <button
                  onClick={markAsPaid}
                  className="capitalize md:px-6 px-3 md:py-2 py-1 rounded-3xl text-white bg-green-700 hover:bg-green-800 transition-colors"
                >
                  <MdDone className="md:hidden flex"/>
                  <span className="md:flex hidden">Mark as paid</span>
                </button>
              )}
            </div>
          </div>
          <div
            className={`${
              dark ? "bg-primary text-light-bg" : "bg-white text-primary"
            } py-6 px-7 flex flex-col gap-4 rounded-md`}
          >
            <div className="flex justify-between">
              <div>
                <span className="font-bold text-2xl">
                  <span className="text-purple-500">#</span>
                  <span>{item.id.slice(0, 6)}</span>
                </span>
                <p className="font-light">{item.billTo.description}</p>
              </div>
              <div className="font-light">{item.billFrom.address}</div>
            </div>
            <div className="flex md:flex-row flex-col justify-between">
              <div className="flex gap-8">
                <div className="flex flex-col gap-2">
                  <div>
                    <div className="font-light">Invoice Date</div>
                    <h5 className="font-semibold text-xl">
                      {item.billTo.date}
                    </h5>
                  </div>
                  <div>
                    <div className="font-light">Payment Due</div>
                    <h5 className="font-semibold text-xl">
                      {item.billTo.terms}
                    </h5>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <p className="font-light">Bill to</p>
                    <h5 className="font-semibold">{item.billTo.client.name}</h5>
                  </div>
                  <div className="font-light">{item.billTo.client.address}</div>
                </div>
              </div>
              <div>
                <p className="font-light">Sent to</p>
                <h5 className="text-lg lowercase font-semibold">
                  {item.billTo.client.email}
                </h5>
              </div>
            </div>
            <div>
              <table
                className={`${dark ? "bg-[#2f324c]" : "bg-gray-300"} w-full`}
              >
                <thead
                  className={`${
                    dark ? "bg-[#2f324c]" : "bg-gray-300"
                  } rounded-t-md px-6 w-full table-caption justify-between py-2`}
                >
                  <tr className="w-full justify-between flex">
                    <td className="font-light">Item Name</td>
                    <td className="font-light">QTY</td>
                    <td className="font-light">Price</td>
                    <td className="font-light">Total</td>
                  </tr>
                </thead>
                <tbody className="flex w-full justify-between flex-col px-3">
                  {item.itemList &&
                    item.itemList.map((itemList, key) => {
                      return (
                        <tr key={key} className="flex justify-between mb-3">
                          <td className="md:w-[140px] w-[20px]">{itemList.name}</td>
                          <td className="md:w-[140px] w-[20px] text-center">
                            {itemList.quantity}
                          </td>
                          <td className="md:w-[140px] w-[20px] text-center">
                            {itemList.price}
                          </td>
                          <td className="md:w-[140px] w-[20px] text-center">
                            {itemList.total}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div
                className={`${
                  dark ? "bg-dark-bg" : "bg-[#141624]"
                } text-white py-6 rounded-b-md px-8 flex justify-between`}
              >
                <p className="font-light">Total amount</p>
                <h2 className="text-2xl font-bold">{item.totalPrice || 0} ₼</h2>
              </div>
            </div>
          </div>
        </div>
        <Drawer size={500} open={open} onClose={closeDrawer}>
          <DrawerComponent invoice={item} closeDrawer={closeDrawer} />
        </Drawer>
      </div>
    );
  }
}
