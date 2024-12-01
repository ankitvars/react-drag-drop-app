import React from "react";

type HeaderProps = {
  onInitialOrder: () => void;
  onSortedOrder: () => void;
  onOpenForm: () => void;
};

const Header: React.FC<HeaderProps> = ({
  onInitialOrder,
  onSortedOrder,
  onOpenForm,
}) => (
  <div className="p-4">
    <h1 className="text-3xl font-semibold text-gray-600 text-center mb-4">
      Drag and Drop App
    </h1>
    <div className="flex flex-col sm:flex-row justify-between items-center p-4">
      <div className="mb-2 sm:mb-0">
        <button
          onClick={onInitialOrder}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Initial Order
        </button>
        <button
          onClick={onSortedOrder}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Sorted Order
        </button>
      </div>
      <button
        onClick={onOpenForm}
        className="bg-stone-500 text-white px-4 py-2 rounded"
      >
        Add New Tile
      </button>
    </div>
  </div>
);

export default Header;
