export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-full w-full font-inter">
      SIDEBAR
      {children}
    </main>
  );
}
