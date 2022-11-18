import React, { useState } from "react";
import { columnsFromBackend } from "./KanbanData";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const Column = (props: BoxProps) => {
  return (
    <Droppable droppableId={props.id!}>
      {(provided) => (
        <Box ref={provided.innerRef} {...provided.droppableProps} {...props}>
          {props.children}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};

export const Card = (props: BoxProps & { index: number }) => {
  return (
    <Draggable draggableId={props.id!} index={props.index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          {...props}
        />
      )}
    </Draggable>
  );
};

const Kanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (result: DropResult, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <Box style={{ display: "flex", width: "100%" }}>
        {Object.entries(columns).map(([columnId, column]) => (
          <Column
            key={columnId}
            id={columnId}
            style={{
              width: "300px",
              display: "flex",
              flexDirection: "column",
              background: "#f3f3f3",
              padding: "15px",
              margin: "15px",
            }}
          >
            <Typography>{column.title}</Typography>
            {column.items.map((item, index) => (
              <Card
                key={item.id}
                id={item.id}
                index={index}
                sx={{ background: "white", margin: 1 }}
              >
                <Typography>{item.Task}</Typography>
              </Card>
            ))}
          </Column>
        ))}
      </Box>
      <Button onClick={() => console.log(columns)}>test</Button>
    </DragDropContext>
  );
};

export default Kanban;
