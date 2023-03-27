import React, { useRef } from "react";
import styled from "styled-components";
import StyledButton from "../ui/StyledButton";

const HiddenFileInput = styled.input`
  display: none;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
`;

const ThumbnailImage = styled.img`
  width: 160px;
  height: 120px;
  object-fit: contain;
  border-radius: 8px;
  cursor: pointer;
`;

const ImageUpload = ({ thumbnails, onFileUpload, onThumbnailClick }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <StyledButton primary onClick={handleClick}>
        Select images
      </StyledButton>
      <HiddenFileInput
        type="file"
        ref={fileInputRef}
        onChange={onFileUpload}
        multiple
        accept="image/*"
      />
      <ThumbnailContainer>
        {thumbnails.map((thumbnail, index) => (
          <ThumbnailImage
            key={index}
            src={thumbnail.src}
            alt={`Thumbnail ${index}`}
            onClick={() => onThumbnailClick(thumbnail.src)}
          />
        ))}
      </ThumbnailContainer>
    </>
  );
};

export default ImageUpload;
