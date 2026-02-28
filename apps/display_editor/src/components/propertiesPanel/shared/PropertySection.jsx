import "../PropertiesPanel.css";

export const PropertySection = ({ title, children }) => {
  return (
    <>
      <h3 className="section-header">{title}</h3>
      {children}
    </>
  );
};
