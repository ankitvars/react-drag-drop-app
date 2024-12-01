import React, { useState } from "react";
import { Message } from "../types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type AddTileFormProps = {
  onAdd: (message: Message) => void;
  onClose: () => void;
};

const AddTileForm: React.FC<AddTileFormProps> = ({ onAdd, onClose }) => {
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !message) {
      toast.error("All fields are required.");
      return;
    }

    if (message.trim() === "") {
      toast.error("Message cannot be empty.");
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      toast.error("Date must be in YYYY-MM-DD format.");
      return;
    }
    onAdd({ date, message });
    toast.success("Tile added successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md mx-8 sm:mx-16 p-8 rounded-lg shadow-lg relative">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Add New Tile
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md cursor-pointer focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTileForm;
