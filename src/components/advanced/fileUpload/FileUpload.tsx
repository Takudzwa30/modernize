import React, { useRef, useState } from "react";

// Components
import Button from "@/components/ui/button/Button";

// Icons
import { GiCancel } from "react-icons/gi";

// Styles
import Style from "./FileUpload.module.css";

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 2000000;

type FileUploadProps = {
  label: string;
  updateFilesCb: (files: File[]) => void;
  maxFileSizeInBytes?: number;
  multiple?: boolean;
  accept?: string;
};

const convertNestedObjectToArray = (nestedObj: Record<string, File>): File[] =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes: number) =>
  Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  updateFilesCb,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {
  const fileInputField = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<Record<string, File>>({});

  const handleUploadBtnClick = () => {
    fileInputField.current?.click();
  };

  const addNewFiles = (newFiles: FileList) => {
    const updatedFiles = { ...files };
    for (let file of Array.from(newFiles)) {
      if (file.size <= maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { [file.name]: file };
        }
        updatedFiles[file.name] = file;
      }
    }
    return updatedFiles;
  };

  const callUpdateFilesCb = (files: Record<string, File>) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  const handleNewFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files: newFiles } = e.target;
    if (newFiles && newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = (fileName: string) => {
    const updatedFiles = { ...files };
    delete updatedFiles[fileName];
    setFiles(updatedFiles);
    callUpdateFilesCb(updatedFiles);
  };

  return (
    <>
      <section className={Style.fileUploadContainer}>
        <label className={Style.inputLabel}>{label}</label>
        <Button text="Add File" variant />
        <p className={Style.dragDropText}>Or drag and drop files</p>
        <input
          className={Style.formField}
          type="file"
          ref={fileInputField}
          accept={otherProps.accept}
          onChange={handleNewFileUpload}
          title=""
          value=""
          {...otherProps}
        />
      </section>
      <article className={Style.filePreviewContainer}>
        <span>To Upload</span>
        <section className={Style.previewList}>
          {Object.keys(files).map((fileName, index) => {
            const file = files[fileName];
            const isImageFile = file.type.split("/")[0] === "image";

            return (
              <div key={fileName} className={Style.previewContainer}>
                <div>
                  {isImageFile && (
                    <img
                      className={Style.imagePreview}
                      src={URL.createObjectURL(file)}
                      alt={`file preview ${index}`}
                    />
                  )}
                  <div
                    className={Style.fileMetaData}
                    // style={{ display: isImageFile ? "none" : "flex" }}
                  >
                    <span>{file.name}</span>
                    <aside>
                      <span>{convertBytesToKB(file.size)} kb</span>
                      <i
                        className={`fas fa-trash-alt ${Style.removeFileIcon}`}
                        onClick={() => removeFile(fileName)}
                      />
                      <GiCancel
                        size={30}
                        onClick={() => removeFile(fileName)}
                      />
                    </aside>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </article>
    </>
  );
};

export default FileUpload;
