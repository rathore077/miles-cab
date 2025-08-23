export default function Footer() {
  return (
    <footer style={{ background: "#222", color: "white", padding: "1rem", textAlign: "center" }}>
      <p>Miles Cab © {new Date().getFullYear()}</p>
    </footer>
  );
}
