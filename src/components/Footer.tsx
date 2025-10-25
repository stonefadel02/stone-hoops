import Link from 'next/link';

// Données pour les liens, faciles à modifier
const footerLinks = [
  {
    title: "NBA Organization",
    links: [
      { label: "NBA Official", href: "#" },
      { label: "NBA Careers", href: "#" },
    ]
  },
  {
    title: "NBA Initiatives",
    links: [
      { label: "NBA Cares", href: "#" },
      { label: "Jr. NBA", href: "#" },
      { label: "NBA Foundation", href: "#" },
      { label: "Social Justice Coalition", href: "#" },
    ]
  },
  {
    title: "Across The League",
    links: [
      { label: "NBA Communications", href: "#" },
      { label: "Lockervision", href: "#" },
      { label: "NBA Transactions", href: "#" },
    ]
  },
  {
    title: "Shop",
    links: [
      { label: "Global Stores", href: "#" },
      { label: "NYC Store", href: "#" },
      { label: "NBA Auctions", href: "#" },
      { label: "NBA Photostore", href: "#" },
    ]
  },
];

const Footer = () => {
  return (
    <footer className="bg-black mt-20 text-gray-400 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">

          {/* 1. Colonnes de liens */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerLinks.map((column) => (
                <div key={column.title}>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                    {column.title}
                  </h3>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="text-sm hover:text-white transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Icônes de réseaux sociaux */}
          <div className="w-full lg:w-1/4 flex lg:justify-end items-start mt-12 lg:mt-0">
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="Snapchat" className="text-gray-400 hover:text-white transition-colors">
                <SnapchatIcon />
              </a>
            </div>
          </div>
        </div>

        {/* 3. Ligne de Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center">
          <p className="text-xs text-gray-500">
            © 2025 Stone Hoops League. Tous droits réservés. Inspiré par NBA Media Ventures, LLC.
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Composants d'icônes SVG ---
// (Placés dans le même fichier pour plus de simplicité)

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const SnapchatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 4 2.4 7.4 5.8 9.1.5.3.8.8.8 1.4v1.1c0 .6-.7 1-1.2.8C3.1 22.3 0 17.5 0 12 0 5.4 5.4 0 12 0s12 5.4 12 12-3.1 10.3-7.4 12.1c-.5.2-1.2-.2-1.2-.8v-1.1c0-.6.3-1.1.8-1.4C19.6 19.4 22 16 22 12z"></path>
    <path d="M14.9 8.5c-.3-1.1-1.4-1.8-2.6-1.8-.1 0-.3 0-.4.1-.2 0-.3 0-.5.1-1.2.1-2.2 1-2.4 2.1-.1.5 0 1.1.2 1.6.2.4.4.8.7 1.2.3.4.7.7 1.1.9.4.2.9.3 1.4.3s1-.1 1.4-.3c.4-.2.8-.5 1.1-.9.3-.4.5-.8.7-1.2.2-.5.3-1.1.2-1.6z"></path>
  </svg>
);

export default Footer;