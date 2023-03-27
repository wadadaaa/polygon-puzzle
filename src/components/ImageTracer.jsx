import React, { useState } from "react";
import useImage from "use-image";
import styled from "styled-components";
import { Stage, Layer, Image, Line, Group, Text } from "react-konva";
import ConfirmModal from "./ConfirmModal";

const PuzzleLine = ({ points, stroke, strokeWidth, closed, fill }) => (
  <Line
    points={points}
    stroke={stroke}
    strokeWidth={strokeWidth}
    closed={closed}
    fill={fill}
  />
);

const PuzzlePiece = ({ children, onDragEnd }) => (
  <Group draggable onDragEnd={onDragEnd}>
    {children}
  </Group>
);

const DeleteButton = ({ hover, setHover, ...props }) => <Text {...props} />;

const ImageTracer = ({ src }) => {
  const [image] = useImage(src);
  const [lines, setLines] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const stageRef = React.useRef();

  const calculateNewDimensions = (image, targetWidth) => {
    const aspectRatio = image.width / image.height;
    const newWidth = targetWidth;
    const newHeight = targetWidth / aspectRatio;
    return { width: newWidth, height: newHeight };
  };

  const handleMouseDown = () => {
    setDrawing(true);
    const stage = stageRef.current;
    const pos = stage.getPointerPosition();
    setLines([
      ...lines,
      { points: [pos.x, pos.y], ready: false, hole: false, hover: false },
    ]);
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;

    const stage = stageRef.current;
    const pos = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([pos.x, pos.y]);
    const newLines = lines.slice(0, lines.length - 1).concat([lastLine]);
    setLines(newLines);
  };

  const handleMouseUp = () => {
    if (!drawing) return;

    const lastLine = lines[lines.length - 1];
    const pointCount = lastLine.points.length / 2;
    const closedLine = {
      points: lastLine.points.concat([lastLine.points[0], lastLine.points[1]]),
      ready: pointCount > 2,
      hole: false,
    };
    const newLines = lines.slice(0, lines.length - 1).concat([closedLine]);
    setLines(newLines);
    setDrawing(false);
  };

  const handleDragEnd = (e, index) => {
    const newLines = lines.slice();
    newLines[index].hole = true;
    setLines(newLines);
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const newLines = lines.slice();
    newLines.splice(deleteIndex, 1);
    setLines(newLines);
    setModalOpen(false);
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
  };

  if (!image) {
    return <div>Loading image...</div>;
  }

  const newDimensions = calculateNewDimensions(image, 500);

  return (
    <div style={{ position: "relative" }}>
      <p>
        Please draw a path to create a puzzle piece. 😊 Then drag the piece!
      </p>
      <Stage
        ref={stageRef}
        width={newDimensions.width}
        height={newDimensions.height}
        style={{ position: "relative" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Layer>
          <Image
            image={image}
            width={newDimensions.width}
            height={newDimensions.height}
          />
          {lines.map((line, i) => {
            const handleMouseEnter = () => {
              const newLines = lines.slice();
              newLines[i].hover = true;
              setLines(newLines);
            };

            const handleMouseLeave = () => {
              const newLines = lines.slice();
              newLines[i].hover = false;
              setLines(newLines);
            };
            return (
              <Group key={i}>
                {line.hole && (
                  <PuzzleLine
                    points={line.points}
                    stroke="#1899d6"
                    strokeWidth={2}
                    closed
                    fill="gray"
                  />
                )}
                <PuzzlePiece draggable onDragEnd={(e) => handleDragEnd(e, i)}>
                  <PuzzleLine
                    points={line.points}
                    stroke="#1899d6"
                    strokeWidth={2}
                    closed
                    fill={line.ready ? "" : ""}
                  />
                  {line.hole && line.ready && (
                    <DeleteButton
                      text="x"
                      x={line.points[0]}
                      y={line.points[1]}
                      fontSize={20}
                      fontFamily="Arial"
                      fontStyle="bold"
                      fill="#FF0000"
                      offsetX={8}
                      offsetY={8}
                      onClick={() => handleDelete(i)}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      style={{ cursor: line.hover ? "pointer" : "default" }}
                      className={deletingIndex === i ? "deleting" : ""}
                    />
                  )}
                </PuzzlePiece>
              </Group>
            );
          })}
        </Layer>
      </Stage>
      <ConfirmModal
        isOpen={modalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ImageTracer;
