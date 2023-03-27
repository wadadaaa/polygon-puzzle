import React, { useState } from "react";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import useFileUpload from "./hooks/useFileUpload";
import DefaultLayout from "./layout/DefaultLayout";
import ImageUpload from "./components/ImageUpload";
import ImageTracer from "./components/ImageTracer";

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const App = () => {
  const { thumbnails, handleFileUpload } = useFileUpload();
  const [selectedImageSrc, setSelectedImageSrc] = useState(null);

  const handleThumbnailClick = (src) => {
    setSelectedImageSrc(src);
  };
  return (
    <DefaultLayout>
      <DndProvider backend={HTML5Backend}>
        <Section>
          {!selectedImageSrc && (
            <>
              <Title>🖼️ Upload images</Title>
              <ImageUpload
                thumbnails={thumbnails}
                onFileUpload={handleFileUpload}
                onThumbnailClick={handleThumbnailClick}
              />
            </>
          )}
          {selectedImageSrc && <ImageTracer src={selectedImageSrc} />}
        </Section>
      </DndProvider>
    </DefaultLayout>
  );
};

export default App;
