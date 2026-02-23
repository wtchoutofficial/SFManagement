export function Footer() {
  return (
    <footer className="bg-surface border-t border-surface-light py-12">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-lg font-bold">SF Management</div>

          <div className="flex gap-6 text-sm text-muted">
            <a href="#home" className="hover:text-text transition-colors">
              Home
            </a>
            <a href="#services" className="hover:text-text transition-colors">
              Services
            </a>
            <a href="#why-us" className="hover:text-text transition-colors">
              Why Us
            </a>
            <a href="#process" className="hover:text-text transition-colors">
              Process
            </a>
            <a href="#apply" className="hover:text-text transition-colors">
              Apply
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-surface-light text-center">
          <p className="text-xs text-muted">
            &copy; 2026 SF Management. All rights reserved.
          </p>
          <p className="text-xs text-muted mt-2">
            SF Management is an independent agency. We are not affiliated with,
            endorsed by, or sponsored by any platform.
          </p>
        </div>
      </div>
    </footer>
  );
}
