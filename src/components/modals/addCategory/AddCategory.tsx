// Libraries
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useStoreData } from "@/hooks/useStoreData"; // Import your custom hook

// Modals
import SuccessModal from "../successModal/SuccessModal";

// Contexts
import { useModal } from "@/contexts/ModalContext";

// Styles
import Style from "./AddCategory.module.css";
import Button from "@/components/ui/button/Button";

// Types
interface Values {
  categoryName: string;
}

const AddCategory: React.FC = () => {
  const { openModal, closeModal } = useModal();
  const { storeData } = useStoreData(); // Destructure storeData from the hook

  // Validation Schema
  const validationSchema = Yup.object().shape({
    categoryName: Yup.string().required("Category Name is required"),
  });

  return (
    <div className={Style.addOrderWrapper}>
      <h5>Add Category</h5>
      <Formik
        initialValues={{
          categoryName: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          try {
            await storeData(values, "categories");

            openModal(
              <SuccessModal
                title="Category Added"
                subTitle="New category added successfully"
              />
            );

            // Optionally, revalidate SWR cache or handle any other logic
          } catch (error) {
            alert("Failed to add category");
            console.error("Category creation error:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, values }) => (
          <Form className={Style.form}>
            <div
              className={
                errors.categoryName && touched.categoryName
                  ? Style.errorFieldWrapper
                  : Style.fieldWrapper
              }
            >
              <label htmlFor="categoryName">Category Name*</label>
              <Field
                autoComplete="on"
                id="categoryName"
                name="categoryName"
                placeholder="Enter Category Name"
                type="text"
              />
              {errors.categoryName && touched.categoryName ? (
                <div className={Style.error}>{errors.categoryName}</div>
              ) : null}
            </div>

            <div className={Style.btns}>
              <Button text="Cancel" onClick={() => closeModal()} variant />
              <Button
                disabled={values.categoryName === ""}
                type="submit"
                text="Create Category"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCategory;
