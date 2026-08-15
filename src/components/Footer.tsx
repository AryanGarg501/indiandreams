import logoAsset from "@/assets/logo.png.asset.json";

const Footer = () => {
  return (
    <footer className="bg-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logoAsset.url} alt="Indian Dreams logo" className="h-9 w-9 object-contain" />
              <span className="font-display text-xl font-bold text-background">
                Indian Dreams
              </span>
            </div>
            <p className="text-sm text-background/60">
              India's premier AI learning platform. Master AI skills to advance your career.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-background mb-4 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><a href="/about-us" className="hover:text-background transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-background mb-4 text-sm">Support</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><a href="#" className="hover:text-background transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-background mb-4 text-sm">Follow Us</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><a href="#" className="hover:text-background transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-background transition-colors">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/indiandreams.app?igsh=MThqenpkaTE0c2k4Zw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/10 mt-8 pt-8 text-center text-sm text-background/40">
          © 2026 Indian Dreams. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
