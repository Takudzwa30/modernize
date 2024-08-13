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
  categoryName: string;
}

export default function AddProductView() {
  const { openModal } = useModal();
  const { storeData } = useStoreData();

  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: [],
  });
  // State to keep track of selected categories
  const [selectedCategories, setSelectedCategories] = useState<{
    [key: string]: boolean;
  }>({});

  // Functions
  const handleOpenModal = () => {
    openModal(<AddCategory />);
  };

  const handleCheckboxChange = (category: string) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    process.env.NEXT_PUBLIC_DATABASE_URL + "/categories.json",
    fetcher
  );

  // Validation Schema
  const validationSchema = Yup.object().shape({
    categoryName: Yup.string().required("Category Name is required"),
  });

  const updateUploadedFiles = (files: any) =>
    setNewUserInfo({ ...newUserInfo, profileImages: files });

  const handleSubmit = async () => {
    // event.preventDefault();

    const storage = getStorage();

    // Step 1: Create references and upload files
    const imageUrls = await Promise.all(
      newUserInfo.profileImages.map(async (file: File) => {
        // Create a reference to 'fileName.jpg'
        const fileRef = ref(storage, file.name);

        // Create a reference to 'images/fileName.jpg'
        const fileImagesRef = ref(storage, `products/${file.name}`);

        // Example: Comparing references
        console.log(fileRef.name === fileImagesRef.name); // true
        console.log(fileRef.fullPath === fileImagesRef.fullPath); // false

        // Upload the file to 'images/fileName.jpg'
        await uploadBytes(fileImagesRef, file);

        // Get the download URL for the uploaded file
        return await getDownloadURL(fileImagesRef);
      })
    );

    // Step 2: Store the image URLs in your Firebase Realtime Database
    const newProduct = {
      images: imageUrls,
      // Add any other form data like categories here
    };

    // Logic to save newProduct in Firebase Realtime Database...

    // Reset form or handle success
  };

  return (
    <>
      <BreadCrumb buttonTitle="Back" />
      <div className={Style.header}>
        <h4>Add Product</h4>
        <div className={Style.btns}>
          <Button text="Cancel" variant />
          <Button text="Save" />
        </div>
      </div>
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
            await storeData(values, "products");

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
            <Card>
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
              {/* <div className={Style.createNew} onClick={handleOpenModal}>
          Create New
        </div> */}

              <FileUpload
                accept=".jpg,.png,.jpeg"
                label="Image"
                // multiple
                updateFilesCb={updateUploadedFiles}
              />
              <Button type="submit" text="Save" />

              <div className={Style.btns}>
                <Button
                  disabled={values.categoryName === ""}
                  type="submit"
                  text="Create Category"
                />
              </div>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
}
