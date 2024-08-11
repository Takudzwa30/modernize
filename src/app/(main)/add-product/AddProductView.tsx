"use client";

import { useState } from "react";
import useSWR from "swr";

// Components
import Button from "@/components/ui/button/Button";
import BreadCrumb from "@/components/ui/breadCrumb/BreadCrumb";
import AddCategory from "@/components/modals/addCategory/AddCategory";

// Contexts
import { useModal } from "@/contexts/ModalContext";

// Styles
import Style from "./AddProductView.module.css";
import Card from "@/components/ui/card/Card";

export default function AddProductView() {
  const { openModal } = useModal();

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

  const BACKEND_URL = "https://modernize-eb7ad-default-rtdb.firebaseio.com";

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(BACKEND_URL + "/categories.json", fetcher);

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

      <Card>
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
        <div className={Style.createNew} onClick={handleOpenModal}>
          Create New
        </div>
      </Card>
    </>
  );
}
