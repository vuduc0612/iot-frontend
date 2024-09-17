
const ToggleButton = ({isActive, setActive}) => {
    
  return (
    <div>
      <button
        className={`toggle-btn ${isActive ? "toggled" : ""}`}
        onClick={() => setActive(!isActive)}
      >
        <div className="thumb"></div>
      </button>
    </div>
  );
};
export default ToggleButton;
