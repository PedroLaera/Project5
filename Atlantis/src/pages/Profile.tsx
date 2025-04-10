import ProfileCard from "../components/custom/CardProfile";
import CardAndress from "../components/custom/CardAndress";

export default function ProfilePage() {
  return (
    <div className="flex justify-center items-center h-screen bg-zinc-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md bg-zinc-900">
        <h2 className="text-2xl font-bold text-center mb-4"></h2>
        <ProfileCard />
        <CardAndress />
      </div>
    </div>
  );
}
