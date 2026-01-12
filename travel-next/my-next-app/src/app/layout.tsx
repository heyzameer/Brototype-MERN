// app/layout.js
import './globals.css'; // Your global styles
import Script from 'next/script';
export const metadata = {
  title: 'Travel App',
  description: 'Your next travel adventure starts here!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Load the Google Identity Services script */}
        <Script 
          src="https://accounts.google.com/gsi/client" 
          strategy="beforeInteractive" // Load before the component hydration
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}