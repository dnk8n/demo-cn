export const MoreLoader = () => {
  return (
    <div
      className="spinner-border"
      style={{ width: "1rem", height: "1rem", marginLeft: "0.5rem" }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};
