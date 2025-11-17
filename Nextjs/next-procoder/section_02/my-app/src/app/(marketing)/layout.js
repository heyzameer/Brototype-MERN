
export default function RootLayout({ children }) {
  return (
<>
        <header style={{background:'teal'}}>Header (Marketing)</header>
        {children}
        <footer style={{background:'green'}}>Footer (Marketing)</footer>
</>

  );
}
