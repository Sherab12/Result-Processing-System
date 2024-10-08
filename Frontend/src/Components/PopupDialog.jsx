import PropTypes from "prop-types";
import Modal from "react-modal";

// Add Tailwind CSS classes to your customStyles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    // Add Tailwind CSS classes
    border: "1px solid #ccc",
    padding: "20px",
    maxWidth: "400px",
    width: "100%",
  },
};

Modal.setAppElement("#root");

function PopupDialog({ isOpen, onClose, onYesClick, title, content }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel={title}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="mb-4">{content}</div>
      <div className="flex justify-end">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded"
          onClick={onClose}
        >
          No
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onYesClick}
        >
          Yes
        </button>
      </div>
    </Modal>
  );
}

PopupDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onYesClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
};

export default PopupDialog;
