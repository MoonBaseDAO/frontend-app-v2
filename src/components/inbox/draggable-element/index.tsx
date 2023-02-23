import React from "react";
import { Droppable } from "react-beautiful-dnd";
import ListItem from "../list-item";
import { ItemType } from "../interface";

type ComponentType = {
  prefix: string;
  elements: Array<any>;
};

const DraggableElement = ({ prefix, elements }: ComponentType) => {
  return (
    <div className="droppable">
      <h5>{prefix.toUpperCase()}</h5>

      <Droppable droppableId={`${prefix}`}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {elements.map((item: ItemType, index: number) => (
              <ListItem key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DraggableElement;
