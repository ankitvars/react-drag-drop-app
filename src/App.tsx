import { useEffect, useState } from "react";
import Header from "./components/Header";
import { input } from "./data";
import { Message } from "./types";
import Tile from "./components/Tile";
import AddTileForm from "./components/AddTileForm";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [initialOrder, setInitialOrder] = useState<Message[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedMessages = localStorage.getItem("tilesData");
    if (storedMessages) {
      const parsedMessages = JSON.parse(storedMessages);
      setMessages(parsedMessages);
      setInitialOrder(parsedMessages);
    } else {
      localStorage.setItem("tilesData", JSON.stringify(input));
      setMessages(input);
      setInitialOrder(input);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("tilesData", JSON.stringify(messages));
    }
  }, [messages]);

  const handleDragStart = (
    _e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    if (draggingIndex === null || draggingIndex === index) return;
    const newMessages = [...messages];
    const draggedItem = newMessages[draggingIndex];
    newMessages.splice(draggingIndex, 1);
    newMessages.splice(index, 0, draggedItem);
    setDraggingIndex(index);
    setMessages(newMessages);
  };

  const handleSortedOrder = () => {
    const sorted = [...messages].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setMessages(sorted);
  };

  const groupedMessages = messages.reduce((acc, message) => {
    const year = new Date(message.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(message);
    return acc;
  }, {} as Record<number, Message[]>);

  const handleAddMessage = (newMessage: Message) => {
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInitialOrder((prev) => [...prev, newMessage]);
  };

  const handleInitialOrder = () => {
    setMessages([...initialOrder]);
  };

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <Header
        onInitialOrder={handleInitialOrder}
        onSortedOrder={handleSortedOrder}
        onOpenForm={handleOpenForm}
      />

      {Object.keys(groupedMessages)
        .sort((a, b) => Number(b) - Number(a))
        .map((year) => (
          <div key={year} className="mx-4">
            <h2 className="text-xl font-bold my-4">{year}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {groupedMessages[Number(year)].map((message, index) => (
                <Tile
                  key={`${message.date}-${index}`}
                  message={message}
                  index={messages.indexOf(message)}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                />
              ))}
            </div>
          </div>
        ))}
      {showForm && (
        <AddTileForm onAdd={handleAddMessage} onClose={handleCloseForm} />
      )}
    </div>
  );
}

export default App;
