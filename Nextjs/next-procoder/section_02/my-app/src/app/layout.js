export const metadata = {
  title: {
    default: 'My App',
    template: '%s | My App',
  },
  description: 'A Next.js application with custom layout',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
       {children}
      </body>
    </html>
  );
}
