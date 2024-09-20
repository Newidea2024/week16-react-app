import React from 'react';

// Define the structure of an item
interface Item {
  id: number;
  name: string;
  description: string;
}

// Define the props for the ItemList component
interface ItemListProps {
  items: Item[];
  onDelete: (id: number) => void;
  onEdit: (item: Item) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onDelete, onEdit }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <strong>{item.name}</strong>: {item.description}
          <button onClick={() => onEdit(item)}>Edit</button>
          <button onClick={() => onDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
