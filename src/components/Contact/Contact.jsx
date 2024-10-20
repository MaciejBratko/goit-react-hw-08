import css from "./Contact.module.css";

const Contact = ({ data: { id, name, phone }, onDelete, isDeleting }) => {
  return (
    <div className={css.container}>
      <div>
        <p>{name}</p>
        <p>{phone}</p>
      </div>
      <button
        className={css.deleteButton}
        onClick={() => onDelete(id)}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default Contact;
