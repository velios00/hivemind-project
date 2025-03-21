import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col gap-2">
      404 not found
      <Link to="/">Go to Home</Link>;
    </div>
  );
}
