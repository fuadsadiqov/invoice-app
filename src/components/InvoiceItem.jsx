import React, { useContext } from "react";
import { ThemeContext } from "../App";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function InvoiceItem({ invoice }) {
  const { dark } = useContext(ThemeContext);

  return (
    <Link to={`invoice/${invoice.id}`}>
      <div
        className={`cursor-pointer hover:border-purple-500 border border-transparent w-full flex gap-2 items-center md:flex-row flex-col justify-between mt-4 px-8 py-4 rounded-md 
      ${dark ? "bg-primary" : "bg-white"}`}
      >
        <div className="flex flex-row gap-3 flex-1 min-w-[13rem] w-full justify-between">
          <span className="font-bold">
            <span className="text-purple-500">#</span>
            <span>{invoice.id.slice(0, 6)}</span>
          </span>
          <span className="font-light text-gray-400">
            {invoice.billTo.date}
          </span>
        </div>
        <div className="flex justify-between w-full items-center">
          <div className="w-full flex sm:flex-row flex-col sm:mx-5 justify-between">
            <span className="font-light text-gray-400">
              {invoice.billTo.client.name}
            </span>
            <span className="font-bold">{invoice.totalPrice} ₼</span>
          </div>
          <ul
            className={`status md:w-[12rem] w-full flex items-center gap-2 justify-center rounded-lg capitalize 
          ${invoice.status == 1 ? "paid" : ""} 
          ${invoice.status == 2 ? "pending" : ""} 
          ${invoice.status == 3 ? "draft" : ""}`}
          >
            <li className="list-disc ml-2">
              {invoice.status == 1 ? "paid" : ""}
              {invoice.status == 2 ? "pending" : ""}
              {invoice.status == 3 ? "draft" : ""}
            </li>
          </ul>
        </div>
        <BiChevronRight className="text-purple-500 w-10 md:flex hidden" />
      </div>
    </Link>
  );
}
