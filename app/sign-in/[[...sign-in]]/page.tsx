import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="grid place-content-center h-screen pb-20">
      <SignIn />
    </div>
  );
}
