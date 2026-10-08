"use client";

import { useState } from "react";
import changeMyPassword from "../../../services/auth/changePass.service";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!currentPassword || !password || !rePassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (password !== rePassword) {
      setError("New password and confirmation password do not match.");
      return;
    }

    setLoading(true);

    const response = await changeMyPassword(
      currentPassword,
      password,
      rePassword
    );

    setLoading(false);

    if (response?.status === "success") {
      setMessage("Password changed successfully.");

      setCurrentPassword("");
      setPassword("");
      setRePassword("");
    } else {
      setError(response?.message || "Failed to change password.");
    }
  }

  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">

      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
          <i className="fa-solid fa-lock text-2xl text-orange-500"></i>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Change Password
          </h2>

          <p className="text-sm text-slate-500">
            Update your account password
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Current Password */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Current Password
          </label>

          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter your current password"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />

            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <i
                className={`fa-solid ${
                  showCurrent ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            New Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            Must be at least 6 characters
          </p>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Confirm New Password
          </label>

          <div className="relative">
            <input
              type={showRePassword ? "text" : "password"}
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              placeholder="Confirm your new password"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />

            <button
              type="button"
              onClick={() => setShowRePassword(!showRePassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <i
                className={`fa-solid ${
                  showRePassword ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* Success */}
        {message && (
          <div className="mb-5 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-600">
            {message}
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <i className="fa-solid fa-lock"></i>

          {loading ? "Changing..." : "Change Password"}
        </button>

      </form>
    </section>
  );
}
