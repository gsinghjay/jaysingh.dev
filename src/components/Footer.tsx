export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-base font-bold">
            © {currentYear} JAYSINGH.DEV
          </p>
          <p className="text-base text-neutral-500">
            Built with raw HTML energy
          </p>
        </div>
      </div>
    </footer>
  );
}
