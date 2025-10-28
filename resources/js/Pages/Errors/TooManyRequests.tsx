import { Link } from "@inertiajs/react";

export default function TooManyRequests({ message }: { message: string }) {
  return (
    <div className="">
      <h1 className="">429</h1>
      <p className="">{message}</p>

      <Link href={route("user.dashboard.login")}>Back</Link>
    </div>
  );
}
