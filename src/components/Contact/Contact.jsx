import css from "./Contact.module.css";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Contact = ({
  data: { id, name, number },
  onDelete,
  onEdit,
  isDeleting,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedNumber, setEditedNumber] = useState(number);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      onDelete(id);
      toast.success("Contact deleted successfully");
    }
  };

  const handleEdit = () => {
    if (isEditing) {
      onEdit(id, { name: editedName, number: editedNumber });
      setIsEditing(false);
      toast.success("Contact updated successfully");
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className={css.container}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="text"
            value={editedNumber}
            onChange={(e) => setEditedNumber(e.target.value)}
          />
        </div>
      ) : (
        <div className={css.contactInfo}>
          <p className={css.name}>{name}</p>
          <p className={css.number}>{number}</p>
        </div>
      )}
      <button className={css.editButton} onClick={handleEdit}>
        {isEditing ? "Save" : "Edit"}
      </button>
      <button
        className={css.deleteButton}
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default Contact;
