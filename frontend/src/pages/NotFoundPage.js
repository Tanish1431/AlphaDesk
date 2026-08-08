import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-code">404</div>
      <h1>Page not found</h1>
      <p className="text-secondary">
        Sorry, we couldn't find the page you're looking for. It might have been
        moved or deleted.
      </p>
      <Link to="/" className="btn btn-primary">
        Return Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
