import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About Groceez</h3>
            <p className="text-gray-600 text-sm">
              Your one-stop destination for fresh groceries and daily essentials delivered right to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-600 hover:text-primary-600 text-sm">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-primary-600 text-sm">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-600 hover:text-primary-600 text-sm">
                  Track Orders
                </Link>
              </li>
              <li>
                <Link to="/register?role=seller" className="text-gray-600 hover:text-primary-600 text-sm">
                  Become a Seller
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=fruits" className="text-gray-600 hover:text-primary-600 text-sm">
                  Fresh Fruits
                </Link>
              </li>
              <li>
                <Link to="/products?category=vegetables" className="text-gray-600 hover:text-primary-600 text-sm">
                  Vegetables
                </Link>
              </li>
              <li>
                <Link to="/products?category=dairy" className="text-gray-600 hover:text-primary-600 text-sm">
                  Dairy Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=packaged" className="text-gray-600 hover:text-primary-600 text-sm">
                  Packaged Foods
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm">
                Email: support@groceez.com
              </li>
              <li className="text-gray-600 text-sm">
                Phone: +91 1234567890
              </li>
              <li className="text-gray-600 text-sm">
                Hours: 9:00 AM - 9:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Groceez. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">
                Shipping Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
