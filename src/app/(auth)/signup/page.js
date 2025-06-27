export default function RegisterPage() {
    return (
      <main className="p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Username" className="border p-2 rounded" />
          <input type="email" placeholder="Email" className="border p-2 rounded" />
          <input type="password" placeholder="Password" className="border p-2 rounded" />
          <button type="submit" className="bg-green-600 text-white p-2 rounded">Register</button>
        </form>
      </main>
    );
  } 