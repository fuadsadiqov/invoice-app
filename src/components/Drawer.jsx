import { useContext } from "react";
import { ThemeContext } from "../App";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
} from "formik";
import { postInvoice } from "../helpers/fetchData";
import { v4 as uuidv4 } from "uuid";
import "../styles/drawer.css";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { RiDraftLine } from "react-icons/ri";
import { MdDone } from "react-icons/md";

export default function DrawerComponent({ invoice, closeDrawer }) {
  const { dark, setReload } = useContext(ThemeContext);
  const navigate = useNavigate();
  return (
    <div
      className={`${
        dark ? "bg-dark-bg text-light-bg" : "bg-light-bg text-dark-bg"
      } md:pl-[100px] pl-[60px] pt-10`}
    >
      <h2 className="font-bold text-2xl">
        {invoice ? `Edit ${invoice.id}` : "New invoice"}
      </h2>
      <div className="pt-10">
        <Formik
          initialValues={{
            billFrom: {
              address: invoice?.billFrom?.address || "",
              city: invoice?.billFrom?.city || "",
              postCode: invoice?.billFrom?.postCode || "",
              country: invoice?.billFrom?.country || "",
            },
            billTo: {
              client: {
                name: invoice?.billTo?.client?.name || "",
                email: invoice?.billTo?.client?.email || "",
                address: invoice?.billTo?.client?.address || "",
              },
              city: invoice?.billTo?.city || "",
              postCode: invoice?.billTo?.postCode || "",
              country: invoice?.billTo?.country || "",
              date: invoice?.billTo?.date || "",
              terms: invoice?.billTo?.terms || "",
              description: invoice?.billTo?.description || "",
            },
            status: invoice?.status || 2,
            itemList: invoice?.itemList,
            totalPrice: invoice?.totalPrice || 0,
          }}
          onSubmit={(values, { setSubmitting }) => {
            let method = invoice ? "PUT" : "POST";
            const newId = uuidv4();
            values.itemList?.forEach((item, index) => {
              const quantity = item.quantity || 0;
              const price = item.price || 0;
              const total = quantity * price;
              values.itemList[index].total = total;
            });
            let totalPrice = values.itemList?.reduce((acc, item) => acc + item.total, 0);
            values.totalPrice = totalPrice;
            let body = {
              id: invoice ? invoice.id : newId,
              ...values,
            };
            postInvoice(body, method).then((response) => {
              if(!invoice){
                closeDrawer();
                setReload(prevReload => !prevReload);
              }
            });
          }}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="pr-3 overflow-y-scroll pb-10 h-[75vh]">
              <h5 className="text-purple-500">Bill from</h5>
              <div>
                <label className="text-lg" htmlFor="billFromAddress">
                  Street Address
                </label>
                <Field
                  id="billFromAddress"
                  className={`w-full ${dark ? "dark" : "light"}`}
                  type="text"
                  name="billFrom.address"
                />
                <ErrorMessage name="billFromAddress" component="div" />
              </div>
              <div className="flex md:flex-row flex-col gap-3 pt-3">
                <div>
                  <label className="text-lg" htmlFor="billFromCity">
                    City
                  </label>
                  <Field
                    id="billFromCity"
                    className={`w-full ${dark ? "dark" : "light"}`}
                    type="text"
                    name="billFrom.city"
                  />
                  <ErrorMessage name="billFromCity" component="div" />
                </div>
                <div>
                  <label className="text-lg" htmlFor="billFromPostCode">
                    Post Code
                  </label>
                  <Field
                    id="billFromPostCode"
                    className={`w-full ${dark ? "dark" : "light"}`}
                    type="text"
                    name="billFrom.postCode"
                  />
                  <ErrorMessage name="billFromPostCode" component="div" />
                </div>
                <div>
                  <label className="text-lg" htmlFor="billFromCountry">
                    Country
                  </label>
                  <Field
                    id="billFromCountry"
                    className={`w-full ${dark ? "dark" : "light"}`}
                    type="text"
                    name="billFrom.country"
                  />
                  <ErrorMessage name="billFromCountry" component="div" />
                </div>
              </div>
              <h5 className="pt-10 text-purple-500">Bill to</h5>
              <div>
                <label className="text-lg" htmlFor="billToName">
                  Client's Name
                </label>
                <Field
                  id="billToName"
                  className={`w-full ${dark ? "dark" : "light"}`}
                  type="text"
                  name="billTo.client.name"
                />
                <ErrorMessage name="billToName" component="div" />
              </div>
              <div>
                <label className="text-lg" htmlFor="billToEmail">
                  Client's Email
                </label>
                <Field
                  id="billToEmail"
                  className={`w-full ${dark ? "dark" : "light"}`}
                  type="email"
                  name="billTo.client.email"
                />
                <ErrorMessage name="billToEmail" component="div" />
              </div>
              <div>
                <label className="text-lg" htmlFor="billToAddress">
                  Client's Address
                </label>
                <Field
                  id="billToAddress"
                  className={`w-full ${dark ? "dark" : "light"}`}
                  type="text"
                  name="billTo.client.address"
                />
                <ErrorMessage name="billToAddress" component="div" />
              </div>
              <div className="flex md:flex-row flex-col gap-3 pt-3">
                <div>
                  <label className="text-lg" htmlFor="billToCity">
                    City
                  </label>
                  <Field
                    id="billToCity"
                    className={`w-full ${dark ? "dark" : "light"}`}
                    type="text"
                    name="billTo.city"
                  />
                  <ErrorMessage name="billToCity" component="div" />
                </div>
                <div>
                  <label className="text-lg" htmlFor="billToPostCode">
                    Post Code
                  </label>
                  <Field
                    id="billToPostCode"
                    className={`w-full ${dark ? "dark" : "light"}`}
                    type="text"
                    name="billTo.postCode"
                  />
                  <ErrorMessage name="billToPostCode" component="div" />
                </div>
                <div>
                  <label className="text-lg" htmlFor="billToCountry">
                    Country
                  </label>
                  <Field
                    id="billToCountry"
                    className={`w-full ${dark ? "dark" : "light"}`}
                    type="text"
                    name="billTo.country"
                  />
                  <ErrorMessage name="billToCountry" component="div" />
                </div>
              </div>
              <div className="flex md:flex-row flex-col gap-3 pt-3">
                <div>
                  <label className="text-lg" htmlFor="billToDate">
                    Invoice Date
                  </label>
                  <Field
                    id="billToDate"
                    className={`w-full ${dark ? "dark" : "light"}`}
                    type="date"
                    name="billTo.date"
                  />
                  <ErrorMessage name="billToDate" component="div" />
                </div>
                <div>
                  <label className="text-lg" htmlFor="billToTerms">
                    Payment terms
                  </label>
                  <Field
                    id="billToTerms"
                    className={`w-full ${dark ? "dark" : "light"}`}
                    type="text"
                    name="billTo.terms"
                  />
                  <ErrorMessage name="billToTerms" component="div" />
                </div>
              </div>
              <div className="pt-3">
                <label className="text-lg" htmlFor="billToDescription">
                  Description
                </label>
                <Field
                  id="billToDescription"
                  className={`w-full ${dark ? "dark" : "light"}`}
                  type="text"
                  name="billTo.description"
                />
                <ErrorMessage name="billToDescription" component="div" />
              </div>
              <h4 className="text-gray-700 font-bold pt-10 text-2xl">
                Item List
              </h4>
              <FieldArray
                name="itemList"
                render={(arrayHelpers) => (
                  <div>
                    {values.itemList &&
                      values.itemList.length > 0 &&
                      values.itemList.map((item, index) => (
                        <div
                          className="flex mt-3 justify-between items-center gap-2"
                          key={index}
                        >
                          <label>
                            Name
                            <Field
                              type="text"
                              className={`w-full ${dark ? "dark" : "light"}`}
                              name={`itemList.${index}.name`}
                            />
                          </label>
                          <label>
                            QTY
                            <Field
                              type="number"
                              className={`w-full ${
                                dark ? "dark" : "light"
                              } w-16 flex-1`}
                              name={`itemList.${index}.quantity`}
                            />
                          </label>
                          <label>
                            Price
                            <Field
                              type="number"
                              className={`w-full ${
                                dark ? "dark" : "light"
                              } flex-0`}
                              name={`itemList.${index}.price`}
                            />
                          </label>
                          <label>
                            Total
                            <Field
                              type="number"
                              readOnly
                              className={`w-full ${
                                dark ? "dark" : "light"
                              } flex-0 border-0`}
                              value={values.itemList[index].quantity * values.itemList[index].price || 0}
                              name={`itemList.${index}.total`}
                            />
                          </label>
                          <button
                            className="mt-5"
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <BsTrash />
                          </button>
                        </div>
                      ))}
                    <button
                      className="w-full rounded-3xl bg-gray-700 text-white py-3 mt-5 hover:bg-gray-500"
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          name: "",
                          quantity: 0,
                          price: 0,
                          total: 0,
                        })
                      }
                    >
                      Add an item
                    </button>
                  </div>
                )}
              />
              <div
                className={`${
                  dark ? "bg-dark-bg text-light-bg" : "bg-light-bg text-dark-bg"
                } flex justify-between absolute left-0 md:pl-[100px] pl-[60px] pr-2  pb-3 pt-5 bottom-0 w-full`}
              >
                <button
                  className={`px-5 py-2 rounded-3xl ${
                    dark ? "bg-gray-800 text-white" : "bg-gray-300 text-dark-bg"
                  }`}
                  type="button"
                  onClick={closeDrawer}
                >
                  {" "}
                  Discard{" "}
                </button>
                <div className="flex gap-1">
                  {!invoice && (
                    <button
                    onClick={() => setFieldValue('status', '3')}
                    className={`px-5 py-2 bg-orange-300 text-white rounded-3xl`}
                    type="submit"
                  >
                    <RiDraftLine className="md:hidden flex"/>
                    <span className="md:flex hidden">Save as Draft</span>
                  </button>
                  )}
                  <button
                    onClick={() => setFieldValue('status', '2')}
                    className={`px-5 py-2 bg-green-500 text-white rounded-3xl`}
                    type="submit"
                  >
                    <MdDone className="md:hidden flex"/>
                    <span className="md:flex hidden">Save & Send</span>
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
