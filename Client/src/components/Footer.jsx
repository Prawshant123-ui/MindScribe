import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      <div className="container-page py-10 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-semibold text-lg">MindScribe</span>
          </div>
          <p className="mt-3 text-sm text-slate-600 max-w-xs">
            Learn smarter with curated notes and high-quality video lectures.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Home</li><li>About</li><li>Testimonials</li><li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-sm text-slate-600">support@mindscribe.io</p>
        </div>
      </div>
      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} MindScribe. All rights reserved.
      </div>
    </footer>
  );
}
