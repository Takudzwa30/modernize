"use client";

import { useState } from "react";

// Libraries
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import useSWR from "swr";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Components
import Button from "@/components/ui/button/Button";
import BreadCrumb from "@/components/ui/breadCrumb/BreadCrumb";
import AddCategory from "@/components/modals/addCategory/AddCategory";
import Card from "@/components/ui/card/Card";
import FileUpload from "@/components/advanced/fileUpload/FileUpload";

// Contexts
import { useModal } from "@/contexts/ModalContext";

// Styles
import Style from "./AddProductView.module.css";
import SuccessModal from "@/components/modals/successModal/SuccessModal";
import { useStoreData } from "@/hooks/useStoreData";

// Types
interface Values {
  productName: string;
  productDescription: string;
  productPrice: number;
  productInventory: number;
  productColor: string;
}

export default function AddProductView() {
  const { openModal } = useModal();
  const { storeData } = useStoreData();

  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: [],
  });

  const [selectedCategories, setSelectedCategories] = useState<{
    [key: string]: boolean;
  }>({});

  // Functions
  const handleCheckboxChange = (category: string) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleResetForm = (resetForm: () => void) => {
    resetForm();

    setNewUserInfo({
      profileImages: [],
    });

    setSelectedCategories({});
  };

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    process.env.NEXT_PUBLIC_DATABASE_URL + "/categories.json",
    fetcher
  );

  // Validation Schema
  const validationSchema = Yup.object().shape({
    productName: Yup.string().required("Product name is required"),
    productDescription: Yup.string().required(
      "Product description is required"
    ),
    productPrice: Yup.number()
      .required("Product price is required")
      .min(0, "Price cannot be negative"),
    productInventory: Yup.number()
      .required("Product inventory is required")
      .min(0, "Inventory cannot be negative")
      .integer("Inventory must be a whole number"),
    productColor: Yup.string().required("Product color is required"),
  });

  const updateUploadedFiles = (files: any) =>
    setNewUserInfo({ ...newUserInfo, profileImages: files });

  return (
    <>
      <BreadCrumb buttonTitle="Back" />
      <div className={Style.header}>
        <h4>Add Product</h4>
      </div>
      <Formik
        initialValues={{
          productName: "",
          productDescription: "",
          productPrice: 0,
          productInventory: 0,
          productColor: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          try {
            // Step 1: Upload images and get URLs
            const storage = getStorage();
            const imageUrls = await Promise.all(
              newUserInfo.profileImages.map(async (file: File) => {
                const fileRef = ref(storage, `products/${file.name}`);
                await uploadBytes(fileRef, file);
                return await getDownloadURL(fileRef);
              })
            );

            // Step 2: Prepare product data
            const newProduct = {
              ...values,
              selectedCategories: Object.keys(selectedCategories).filter(
                (key) => selectedCategories[key]
              ),
              images: imageUrls,
            };

            // Step 3: Store the product data in Firebase Realtime Database
            await storeData(newProduct, "products");

            openModal(
              <SuccessModal
                title="Product Added"
                subTitle="New product added successfully"
              />
            );

            // Optionally, revalidate SWR cache or handle any other logic
          } catch (error) {
            alert("Failed to add product");
            console.error("Product creation error:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, values, resetForm, isValid }) => (
          <Card>
            <Form className={Style.form}>
              <h6>Information</h6>
              <div
                className={
                  errors.productName && touched.productName
                    ? Style.errorFieldWrapper
                    : Style.fieldWrapper
                }
              >
                <label htmlFor="productName">Product Name*</label>
                <Field
                  autoComplete="on"
                  id="productName"
                  name="productName"
                  placeholder="Enter product name"
                  type="text"
                />
                {errors.productName && touched.productName ? (
                  <div className={Style.error}>{errors.productName}</div>
                ) : null}
              </div>
              <div
                className={
                  errors.productDescription && touched.productDescription
                    ? Style.errorFieldWrapper
                    : Style.fieldWrapper
                }
              >
                <label htmlFor="productDescription">Product Description*</label>
                <Field
                  as="textarea"
                  autoComplete="on"
                  id="productDescription"
                  name="productDescription"
                  placeholder="Enter product description"
                  rows={6}
                />
                {errors.productDescription && touched.productDescription ? (
                  <div className={Style.error}>{errors.productDescription}</div>
                ) : null}
              </div>

              <div className={Style.spacer} />

              <h6>Categories</h6>
              <div className={Style.categories}>
                {data &&
                  Object.values(data).map((item: any, index) => {
                    const category = item.categoryName;

                    return (
                      <div key={index} className={Style.categoryItem}>
                        <input
                          type="checkbox"
                          id={`category-${index}`}
                          checked={!!selectedCategories[category]}
                          onChange={() => handleCheckboxChange(category)}
                        />
                        <label htmlFor={`category-${index}`}>{category}</label>
                      </div>
                    );
                  })}
              </div>

              <div className={Style.spacer} />

              <FileUpload
                accept=".jpg,.png,.jpeg"
                label="Image"
                updateFilesCb={updateUploadedFiles}
              />

              <div className={Style.spacer} />
              <h6>Color</h6>
              <div
                className={
                  errors.productColor && touched.productColor
                    ? Style.errorFieldWrapper
                    : Style.fieldWrapper
                }
              >
                <label htmlFor="productColor">Product Color*</label>
                <Field
                  autoComplete="on"
                  id="productColor"
                  name="productColor"
                  placeholder="Enter product color"
                  type="text"
                />
                {errors.productColor && touched.productColor ? (
                  <div className={Style.error}>{errors.productColor}</div>
                ) : null}
              </div>

              <div className={Style.spacer} />

              <h6>Price</h6>
              <div
                className={
                  errors.productPrice && touched.productPrice
                    ? Style.errorFieldWrapper
                    : Style.fieldWrapper
                }
              >
                <label htmlFor="productPrice">Product Price*</label>
                <Field
                  autoComplete="on"
                  id="productPrice"
                  name="productPrice"
                  placeholder="Enter product price"
                  type="number"
                />
                {errors.productPrice && touched.productPrice ? (
                  <div className={Style.error}>{errors.productPrice}</div>
                ) : null}
              </div>

              <div className={Style.spacer} />

              <h6>Stock</h6>
              <div
                className={
                  errors.productInventory && touched.productInventory
                    ? Style.errorFieldWrapper
                    : Style.fieldWrapper
                }
              >
                <label htmlFor="productInventory">Product Inventory*</label>
                <Field
                  autoComplete="on"
                  id="productInventory"
                  name="productInventory"
                  placeholder="Enter product inventory"
                  type="number"
                />
                {errors.productInventory && touched.productInventory ? (
                  <div className={Style.error}>{errors.productInventory}</div>
                ) : null}
              </div>

              <div className={Style.btns}>
                <Button disabled={!isValid} type="submit" text="Save" />
                <Button
                  onClick={() => handleResetForm(resetForm)}
                  variant
                  text="Cancel"
                />
              </div>
            </Form>
          </Card>
        )}
      </Formik>
    </>
  );
}
