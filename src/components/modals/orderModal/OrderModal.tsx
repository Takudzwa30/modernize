// Libraries
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { mutate } from "swr";

// Contexts
import { useModal } from "@/contexts/ModalContext";

// Styles
import Style from "./OrderModal.module.css";
import SuccessModal from "../successModal/SuccessModal";
import { addToTable, fetchById, updateInTable } from "@/utils/useTableData";
import { useEffect, useState } from "react";

// Types
interface Values {
  orderNumber: string;
  date: string;
  customer: string;
  paymentStatus: string;
  orderStatus: string;
  amount: number;
}

interface ModalProps {
  updateId?: string;
}

const OrderModal: React.FC<ModalProps> = ({ updateId }) => {
  const { openModal } = useModal();

  const [initialValues, setInitialValues] = useState<Values>({
    orderNumber: "",
    date: "",
    customer: "",
    paymentStatus: "",
    orderStatus: "",
    amount: 0,
  });

  // Validation Schema
  const validationSchema = Yup.object().shape({
    orderNumber: Yup.string().required("Order Number is required"),
    date: Yup.date().required("Date is required").nullable(),
    customer: Yup.string().required("Customer Name is required"),
    paymentStatus: Yup.string().required("Payment Status is required"),
    orderStatus: Yup.string().required("Order Status is required"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
  });

  const fetchOrder = async () => {
    if (updateId) {
      try {
        const { data, error } = await fetchById<Values>(updateId);
        if (data) {
          console.log(data);

          setInitialValues(data);
        } else if (error) {
          console.error(error);
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [updateId]);

  return (
    <div className={Style.addOrderWrapper}>
      <h5>{updateId ? "Update Order" : "Add Order"}</h5>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={async (
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          try {
            let result;

            if (updateId) {
              result = await updateInTable<Values>("orders", updateId, values);
            } else {
              result = await addToTable<Values>("orders", values);
            }

            if (result.success) {
              openModal(
                <SuccessModal
                  title="Order Successful"
                  subTitle={
                    updateId
                      ? "Order updated successfully"
                      : "Added new order successfully"
                  }
                />
              );

              // Revalidate SWR cache
              mutate(`${process.env.NEXT_PUBLIC_DATABASE_URL}/orders.json`);
            } else {
              alert(
                `Failed to ${updateId ? "update" : "add"} order: ${
                  result.error
                }`
              );
            }
          } catch (error) {
            alert(`Failed to ${updateId ? "update" : "add"} order`);
            console.error(
              `Order ${updateId ? "update" : "creation"} error:`,
              error
            );
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form className={Style.form}>
            <div
              className={
                errors.orderNumber && touched.orderNumber
                  ? Style.errorFieldWrapper
                  : Style.fieldWrapper
              }
            >
              <label htmlFor="orderNumber">Order Number*</label>
              <Field
                autoComplete="on"
                id="orderNumber"
                name="orderNumber"
                placeholder="Enter Order Number"
                type="text"
              />
              {errors.orderNumber && touched.orderNumber ? (
                <div className={Style.error}>{errors.orderNumber}</div>
              ) : null}
            </div>
            <div
              className={
                errors.date && touched.date
                  ? Style.errorFieldWrapper
                  : Style.fieldWrapper
              }
            >
              <label htmlFor="date">Date*</label>
              <Field
                autoComplete="on"
                id="date"
                name="date"
                placeholder="Enter Date"
                type="datetime-local"
              />
              {errors.date && touched.date ? (
                <div className={Style.error}>{errors.date}</div>
              ) : null}
            </div>
            <div
              className={
                errors.customer && touched.customer
                  ? Style.errorFieldWrapper
                  : Style.fieldWrapper
              }
            >
              <label htmlFor="customer">Customer*</label>
              <Field
                autoComplete="on"
                id="customer"
                name="customer"
                placeholder="Enter Customer Name"
                type="text"
              />
              {errors.customer && touched.customer ? (
                <div className={Style.error}>{errors.customer}</div>
              ) : null}
            </div>
            <div
              className={
                errors.paymentStatus && touched.paymentStatus
                  ? Style.errorFieldWrapper
                  : Style.fieldWrapper
              }
            >
              <label htmlFor="paymentStatus">Payment Status*</label>
              <Field as="select" id="paymentStatus" name="paymentStatus">
                <option value="">Select Payment Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                {/* <option value="overdue">Overdue</option> */}
              </Field>
              {errors.paymentStatus && touched.paymentStatus ? (
                <div className={Style.error}>{errors.paymentStatus}</div>
              ) : null}
            </div>
            <div
              className={
                errors.orderStatus && touched.orderStatus
                  ? Style.errorFieldWrapper
                  : Style.fieldWrapper
              }
            >
              <label htmlFor="orderStatus">Order Status*</label>
              <Field as="select" id="orderStatus" name="orderStatus">
                <option value="">Select Order Status</option>
                <option value="ready">Ready</option>
                <option value="shipped">Shipped</option>
                <option value="received">Received</option>
              </Field>
              {errors.orderStatus && touched.orderStatus ? (
                <div className={Style.error}>{errors.orderStatus}</div>
              ) : null}
            </div>
            <div
              className={
                errors.amount && touched.amount
                  ? Style.errorFieldWrapper
                  : Style.fieldWrapper
              }
            >
              <label htmlFor="amount">Amount*</label>
              <Field
                autoComplete="on"
                id="amount"
                name="amount"
                placeholder="Enter Order Amount"
                type="number"
              />
              {errors.amount && touched.amount ? (
                <div className={Style.error}>{errors.amount}</div>
              ) : null}
            </div>

            <button
              className={Style.submitBtn}
              disabled={
                !!Object.keys(errors).length ||
                values.orderNumber === "" ||
                values.date === "" ||
                values.customer === "" ||
                values.paymentStatus === "" ||
                values.orderStatus === "" ||
                values.amount === 0
              }
              type="submit"
            >
              {updateId ? "Update Order" : "Add Order"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OrderModal;
