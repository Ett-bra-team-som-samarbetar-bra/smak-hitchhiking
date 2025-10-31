export default function MapMarker() {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "20px",
          height: "20px",
          backgroundColor: "white",
          borderRadius: "50%",
          zIndex: 1
        }} />

      <i className="bi bi-geo-alt-fill text-primary"
        style={{
          position: "relative",
          zIndex: 2,
          fontSize: "40px",
        }} />
    </div>
  );
}
