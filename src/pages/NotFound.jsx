import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="space-y-6">
          {/* 404 Icon */}
          <div className="flex justify-center">
            <div className="text-primary-600 text-9xl font-bold">404</div>
          </div>

          {/* Message */}
          <div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Page Not Found
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/"
              className="btn-primary"
            >
              Go Home
            </Link>
            <Link
              to="/products"
              className="btn-secondary"
            >
              Browse Products
            </Link>
          </div>

          {/* Support Link */}
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <a
              href="mailto:support@groceez.com"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
