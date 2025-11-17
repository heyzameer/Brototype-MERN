
export default function RootLayout({ children }) {
  return (
<>
        <header style={{background:'teal'}}>Header (Application)</header>
        {children}
        <footer style={{background:'green'}}>Footer (Application)</footer>
</>

  );
}
