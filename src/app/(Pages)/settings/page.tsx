import ChangePassword from "../../_SharedComponent/changepass/changepass";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Page Header */}
      <section className="border-b border-slate-100 bg-white">
        <div className="container mx-auto px-4 py-8">

          <h1 className="text-3xl font-bold text-slate-900">
            Settings
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your account settings and preferences
          </p>

        </div>
      </section>

      {/* Settings Content */}
      <section className="container mx-auto px-4 py-10">

        <div className="mx-auto max-w-5xl">

          {/* Change Password */}
          <ChangePassword />

        </div>

      </section>

      {/* Bottom Features */}
      

    </main>
  );
}
