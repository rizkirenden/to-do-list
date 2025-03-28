import Navbar from "@/components/navbar";
import Todolist from "@/components/todolist";
export default function Home() {
  return (
    <>
      <div>
        <Navbar />
        <main className="min-h-screen pt-10 bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <Todolist />
          </div>
        </main>
      </div>
    </>
  );
}
