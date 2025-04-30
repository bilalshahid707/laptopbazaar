// import { Facebook, Twitter, Instagram } from "lucide-react";

export const Footer = ()=> {
  return (
    <footer className="bg-whiteAccent border-t border-gray-300 h-full">
      <div className="container h-full px-6 py-8 custom-flex justify-between items-start gap-6 text-sm text-gray-700">
        
        {/* Popular Categories */}
        <div>
          <h3 className="font-semibold text-blue">POPULAR CATEGORIES</h3>
          <ul className="mt-2 space-y-1">
            <li>Professional Laptops</li>
            <li>Gaming</li>
            <li>Chromebooks</li>
            <li>2 in 1 Convertibles</li>
          </ul>
        </div>

        {/* Trending Searches */}
        <div>
          <h3 className="font-semibold text-blue">TRENDING SEARCHES</h3>
          <ul className="mt-2 space-y-1">
            <li>Lenovo P73</li>
            <li>Ideapad</li>
            <li>Zbook</li>
            <li>MacBooks</li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h3 className="font-semibold text-blue">ABOUT US</h3>
          <ul className="mt-2 space-y-1">
            <li>About Laptop Bazaar</li>
            <li>Our Blog</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="font-semibold text-blue">FOLLOW US</h3>
          <div className="flex space-x-4 mt-6 text-blue-600 text-xl">
              <a href="https://www.facebook.com/laptopbazaar01" className="hover:text-blue-800">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
              <a href="https://www.instagram.com/laptopbazaar01?igsh=a3lqZXBzYW5jNXQ2" className="hover:text-blue-800">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-blue text-white text-sm">
        <div className="container pb-2 pt-2  flex flex-col md:flex-row justify-between items-center">
          <span>Free Classifieds in Pakistan</span>
          <span>© 2024-2025 Laptop Bazaar</span>
        </div>
      </div>
    </footer>
  );
}
export default Footer