import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../App";
import InvoiceItem from "./InvoiceItem";
import { getInvoices } from "../helpers/fetchData";

export default function Main() {
  const { dark, invoices, setInvoices, reload, filteredInvoices, setFilteredInvoices } = useContext(ThemeContext);
  const [invoiceArray, setInvoiceArray] = useState(invoices)

  useEffect(() => {
    getInvoices().then(res => {
      setInvoices(res)
      setInvoiceArray(res);
    });
  }, [reload])

  useEffect(() => {
    setInvoiceArray(filteredInvoices);
  }, [filteredInvoices])
  
  return (
    <div className={`${dark ? 'text-light-bg' : 'text-dark-bg'} max-w-[46rem] w-full flex-1`}>
      {invoiceArray.length ? invoiceArray.map((invoice, key) => {
        return (
          <InvoiceItem key={key} invoice={invoice}/>
        )
      }) : <p className="flex justify-center items-center text-xl font-semibold pt-[100px]">Not found any invoices</p>}
    </div>
  )
}
