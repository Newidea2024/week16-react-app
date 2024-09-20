import React, { useState, useEffect } from 'react';

// Define the structure of an item
interface Item {
  id?: number; // id is optional since it may not exist when creating a new item
  name: string;
  description: string;
}

// Define the props for the ItemForm component
interface ItemFormProps {
  addItem: (item: Omit<Item, 'id'>) => void;
  editItem: (item: Item) => void;
  currentItem: Item | null;
}

const ItemForm: React.FC<ItemFormProps> = ({ addItem, editItem, currentItem }) => {
  const [item, setItem] = useState<Omit<Item, 'id'>>({ name: '', description: '' });

  // If editing, prepopulate the form with the selected item's data
  useEffect(() => {
    if (currentItem) {
      const { id, ...itemWithoutId } = currentItem; // Strip out 'id' when setting state
      setItem(itemWithoutId);
    }
  }, [currentItem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentItem) {
      editItem({ ...item, id: currentItem.id }); // Include the id when editing
    } else {
      addItem(item); // Add a new item
    }
    setItem({ name: '', description: '' }); // Reset the form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Item Name"
        value={item.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Item Description"
        value={item.description}
        onChange={handleChange}
        required
      />
      <button type="submit">{currentItem ? 'Update Item' : 'Add Item'}</button>
    </form>
  );
};

export default ItemForm;
