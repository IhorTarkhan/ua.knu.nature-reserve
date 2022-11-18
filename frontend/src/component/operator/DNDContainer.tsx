import update from "immutability-helper";
import type { ReactElement } from "react";
import { useCallback, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

import Button from "@mui/material/Button";
import { useDrag, useDrop } from "react-dnd";
import { Identifier, XYCoord } from "dnd-core";

export type DragItem = {
  id: string;
  children: ReactElement;
};

const data: DragItem[] = [
  {
    id: uuid(),
    children: <>Write a cool JS library</>,
  },
  {
    id: uuid(),
    children: <>Make it generic enough</>,
  },
  {
    id: uuid(),
    children: <>Write README</>,
  },
  {
    id: uuid(),
    children: <>Create some examples</>,
  },
  {
    id: uuid(),
    children: (
      <>
        Spam in Twitter and IRC to promote it (note that this element is taller
        than the others)
      </>
    ),
  },
  {
    id: uuid(),
    children: <>???</>,
  },
  {
    id: uuid(),
    children: <>PROFIT</>,
  },
];

export const DNDContainer = (): ReactElement => {
  const [cards, setCards] = useState<DragItem[]>(data);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: DragItem[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as DragItem],
        ],
      })
    );
  }, []);

  const RenderCard = useCallback(
    (props: CardProps) => <Card {...props}>{props.children}</Card>,
    []
  );

  return (
    <>
      {cards.map((card, index) => (
        <RenderCard
          key={`card-${card.id}`}
          id={card.id}
          index={index}
          moveCard={moveCard}
        >
          {card.children}
        </RenderCard>
      ))}
      <Button onClick={() => console.log(cards)}>fff</Button>
    </>
  );
};

interface CardProps {
  id: any;
  children: ReactElement;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}
const Card = (props: CardProps): ReactElement => {
  interface DragItem {
    index: number;
    id: string;
  }

  const ref = useRef<HTMLDivElement | null>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "card",
    collect: (monitor) => ({ handlerId: monitor.getHandlerId() }),
    hover: (item: DragItem, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      props.moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => ({ id: props.id, index: props.index }),
    collect: (monitor: any) => ({ isDragging: monitor.isDragging() }),
  });

  drag(drop(ref));
  return (
    <div
      ref={ref}
      style={{
        border: "1px dashed gray",
        padding: "0.5rem 1rem",
        marginBottom: ".5rem",
        cursor: "move",
        opacity: isDragging ? 0 : 1,
      }}
      data-handler-id={handlerId}
    >
      {props.children}
    </div>
  );
};
