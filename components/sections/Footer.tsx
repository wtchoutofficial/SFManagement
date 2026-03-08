import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-surface pt-12 pb-8">
      <div className="gradient-divider" />
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 text-xl font-bold text-text font-heading">
              <Image src="/sf-crown.png" alt="SF Management" width={40} height={40} loading="lazy" className="h-10 w-auto" />
              SF Management
            </div>
            <p className="text-muted text-sm mt-3 leading-relaxed">
              The premier Scandinavian management agency. We do the heavy
              lifting, you keep the focus on creation.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-text mb-4 font-heading">
              Navigation
            </h4>
            <div className="flex flex-col gap-3 text-sm text-muted">
              <a href="#home" className="hover:text-text transition-colors">
                Home
              </a>
              <a
                href="#services"
                className="hover:text-text transition-colors"
              >
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

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-text mb-4 font-heading">
              Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm text-muted">
              <a
                href="mailto:Thomas@sfmanagement.eu"
                className="hover:text-accent transition-colors"
              >
                Thomas@sfmanagement.eu
              </a>
              <a
                href="https://www.instagram.com/sfmanagement/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-accent transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="gradient-divider" />
          <div className="pt-8 flex flex-col items-center gap-4">
            <p className="text-xs text-muted">
              &copy; SF Management AS &middot; Etablert 2023 &middot; Org.nr: 931 562 371
            </p>
            <p className="text-xs text-muted text-center">
              SF Management is an independent agency. We are not affiliated with,
              endorsed by, or sponsored by any platform.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
