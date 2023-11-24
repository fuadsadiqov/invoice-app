import "./App.css";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import InvoiceItemDetail from "./components/InvoiceItemDetail";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { getLocalTheme } from "./helpers/localStorage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getInvoices } from "./helpers/fetchData";

export const ThemeContext = createContext(null);

function App() {
  const [dark, setDark] = useState(getLocalTheme());
  const [reload, setReload] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const contextData = { dark, setDark, invoices, setInvoices, reload, setReload, filteredInvoices, setFilteredInvoices };
  
  useEffect(() => {
    setDark((prevDark) => (prevDark = getLocalTheme()));
  }, [getLocalTheme()]);

  useEffect(() => {
    getInvoices().then(res => setInvoices(res));
  }, [])

  return (
    <ThemeContext.Provider value={contextData}>
      <div className={`flex w-full ${dark ? "bg-dark-bg" : "bg-light-bg"}`}>
        <Sidebar dark={dark} setDark={setDark} />
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />}>
            </Route>
            <Route path="/invoice/:id" element={<InvoiceItemDetail/>}>
            </Route>
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
