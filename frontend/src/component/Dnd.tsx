import React, { Dispatch, ReactElement, SetStateAction } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Column = (props: BoxProps) => {
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

const Card = (props: BoxProps & { index: number }) => {
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

export type DndCardElement = { id: string; element: ReactElement | string };

export type DndColumns = {
  [key: string]: { title: string; items: DndCardElement[] };
};

interface Props {
  columns: DndColumns;
  setColumns: Dispatch<SetStateAction<DndColumns>>;
}

export const Dnd = ({ columns, setColumns }: Props) => {
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
      <Box style={{ display: "flex" }}>
        {Object.entries(columns).map(([columnId, column]) => (
          <Column
            key={columnId}
            id={columnId}
            sx={{
              m: 1,
              p: 1,
              width: "300px",
              display: "flex",
              flexDirection: "column",
              background: "#f3f3f3",
            }}
          >
            <Typography>{column.title}</Typography>
            {column.items.map((item, index) => (
              <Card
                key={item.id}
                id={item.id}
                index={index}
                sx={{
                  m: 1,
                  p: 1,
                  borderRadius: 2,
                  borderStyle: "solid",
                  background: "white",
                }}
              >
                {item.element}
              </Card>
            ))}
          </Column>
        ))}
      </Box>
    </DragDropContext>
  );
};
