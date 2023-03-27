import { useState } from "react";

const useFileUpload = () => {
  const [thumbnails, setThumbnails] = useState([]);

  const handleFileUpload = (e) => {
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnails((prevThumbnails) => [
          ...prevThumbnails,
          { src: reader.result, file },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  return { thumbnails, handleFileUpload };
};

export default useFileUpload;
