import React from "react";
import { Message } from "../types";

type TileProps = {
  message: Message;
  index: number;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
};

const Tile: React.FC<TileProps> = ({
  message,
  index,
  onDragStart,
  onDragOver,
}) => (
  <div
    className="p-4 bg-white shadow rounded hover:bg-gray-50 cursor-move"
    draggable
    onDragStart={(e) => onDragStart(e, index)}
    onDragOver={(e) => onDragOver(e, index)}
  >
    <p className="text-gray-700">{message.message}</p>
    <p className="text-sm text-gray-500">{message.date}</p>
  </div>
);

export default Tile;
