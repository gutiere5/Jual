export const PropertySection = ({ title, children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};
