import {useState} from 'react'
export default function List({ items, setItem }) {

    const [editingIndex, setEditingIndex] = useState(null);
    const [editValue, setEditValue] = useState("");

    const onDelete = (index) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
      setItem(items.filter((item, i) => i !== index));
    }
    }

    const mark = (name) => {
        let newItem = items.map((item) => item.name === name ? { ...item, done: !item.done } : item)
        setItem(newItem)
    }

    const handleEdit = (index, name) => {
        setEditingIndex(index);
        setEditValue(name);
      };


      const handleSave = (index) => {
        const updatedItems = items.map((item, i) =>
          i === index ? { ...item, name: editValue } : item
        );
        setItem(updatedItems);
        setEditingIndex(null);
        setEditValue("");
      }


    return (
        <>
           {items.map((item, index) => (
        <li
          key={index}
          className="flex px-3 py-2 hover:backdrop-brightness-95 backdrop-brightness-105 shadow-lg shadow-indigo-500/40 border border-indigo font-mono"
        >
          {editingIndex === index ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 border px-2 py-1 rounded"
            />
          ) : (
            <span
              className={
                item.done
                  ? "line-through cursor-pointer flex-1"
                  : "cursor-pointer flex-1"
              }
              onClick={() => mark(item.name)}
            >
              {item.name}
            </span>
          )}

          <div className="flex space-x-2">
            {editingIndex === index ? (
              <>
                <button
                  onClick={() => handleSave(index)}
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  <i className="fas fa-check"></i>
                </button>
                <button
                  onClick={() => setEditingIndex(null)}
                  className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  <i className="fas fa-times"></i>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleEdit(index, item.name)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                 <i className="fas fa-pen"></i>
                </button>
                <button
                  onClick={() => onDelete(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                 <i className="fas fa-trash"></i>
                </button>
              </>
            )}
          </div>
        </li>
      ))}
    </>
    )
}