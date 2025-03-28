import Profile from "@/components/profile";
import Navbar from "@/components/navbar";
const page = () => {
  return (
    <>
      <div>
        <Navbar />
        <main className="min-h-screen pt-10 bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <Profile />
          </div>
        </main>
      </div>
    </>
  );
};

export default page;
