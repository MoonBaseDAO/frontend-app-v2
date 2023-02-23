import React from "react";
import { Draggable } from "react-beautiful-dnd";

const ListItem = ({ item, index }: {item: any, index: any}) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className="drag-item"
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <span>Content</span>
            <h4>Task {index}</h4>
          </div>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
