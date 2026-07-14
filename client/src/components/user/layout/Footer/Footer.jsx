import Link from "next/link";
import { FaInstagram, FaXTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { FOOTER_COLUMNS } from "../../data/homeData";

/**
 * Footer — link columns, social icons, app badges and legal line.
 */
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-semibold text-gray-900">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* social + apps */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-900">
              Social links
            </h4>
            <div className="mb-4 flex gap-3 text-gray-500">
              <Link href="#" aria-label="Instagram"><FaInstagram size={18} /></Link>
              <Link href="#" aria-label="Twitter"><FaXTwitter size={18} /></Link>
              <Link href="#" aria-label="Facebook"><FaFacebookF size={18} /></Link>
              <Link href="#" aria-label="LinkedIn"><FaLinkedinIn size={18} /></Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="inline-flex w-fit items-center gap-2 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white">
                 App Store
              </span>
              <span className="inline-flex w-fit items-center gap-2 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white">
                ▶ Google Play
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6 text-xs text-gray-400">
          <p>* As on December 31, 2024</p>
          <p className="mt-1" suppressHydrationWarning>
            © {new Date().getFullYear()} On Demand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
