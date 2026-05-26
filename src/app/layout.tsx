export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <nav>Navbar</nav>

        {children}
      </body>
    </html>
  );
}