import { environment } from "../environments/environments";

const getInvoices = async () => {
  try {
    const response = await fetch(environment.apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
};

const postInvoice = async (body, method) => {
  try {
    const requestOptions = {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    let request = null;
    if(method === "PUT"){
      request = await fetch(environment.apiUrl + `/${body.id}`, requestOptions);
    }else if(method === "POST"){
      request = await fetch(environment.apiUrl, requestOptions);
    }
    const response = await request.json();
    return response;
  } catch (error) {
    console.error("Error post invoice: ", error);
  }
};

const deleteInvoice = async (id) => {
  try {
    let requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
    let request = await fetch(environment.apiUrl + `/${id}`, requestOptions)
    const response = await request.json();
    return response
  } catch (error) {
    console.error("Erorr delete invoice: ", error);
  }
}

export { getInvoices, postInvoice, deleteInvoice };
