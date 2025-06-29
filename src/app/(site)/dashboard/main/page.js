export default function DashboardMainPage() {
  return (
    <div className="space-y-8">
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">BASIC INFORMATION</h2>
        <div className="text-gray-700">Show basic user info here...</div>
      </section>
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">ACCOUNT INFORMATION</h2>
        <div className="text-gray-700">Show account info here...</div>
      </section>
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">N-Coin</h2>
        <div className="text-gray-700">Show N-Coin balance and actions here...</div>
      </section>
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">My Inquiry</h2>
        <div className="text-gray-700">Show user's inquiries here...</div>
      </section>
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Forum activities</h2>
        <div className="text-gray-700">Show forum activities here...</div>
      </section>
    </div>
  );
} 