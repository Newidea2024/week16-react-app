import React, { useState } from 'react';
import ItemForm from './ItemForm';  // Ensure the import path is correct
import ItemList from './ItemList';  // Ensure the import path is correct

// Define the structure of an item
interface Item {
  id: number;
  name: string;
  description: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState<Item | null>(null); // Holds the item being edited

  const addItem = (item: Omit<Item, 'id'>) => {
    setItems([...items, { ...item, id: Date.now() }]);
  };

  const editItem = (updatedItem: Item) => {
    setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
    setCurrentItem(null); // Clear current item after editing
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleEditClick = (item: Item) => {
    setCurrentItem(item); // Set the item to edit
  };

  return (
    <div>
      <h1>Item Management</h1>
      <ItemForm addItem={addItem} editItem={editItem} currentItem={currentItem} />
      
      {items.length === 0 ? (
        <p>No items available. Add a new item using the form above.</p>
      ) : (
        <ItemList items={items} onDelete={deleteItem} onEdit={handleEditClick} />
      )}
    </div>
  );
};

export default App;


