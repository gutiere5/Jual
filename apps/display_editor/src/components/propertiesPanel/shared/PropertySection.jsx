export const PropertySection = ({ title, children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '10px 0' }}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};
