"use client";

import { useState } from "react";
import MyAddressesPage from "../address/page";
import SettingsPage from "../settings/page";

export default function AccountSidebar() {
  const [activeTab, setActiveTab] = useState("settings");

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <div className="flex gap-8">

          {/* Sidebar */}
          <div className="w-64 shrink-0">
            <div className="rounded-2xl bg-white p-4 shadow-md">

              <button
                onClick={() => setActiveTab("settings")}
                className={`mb-3 w-full rounded-xl px-4 py-3 text-left font-medium transition ${
                  activeTab === "settings"
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Settings
              </button>

              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full rounded-xl px-4 py-3 text-left font-medium transition ${
                  activeTab === "addresses"
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                My Addresses
              </button>

            </div>
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            {activeTab === "settings" && <SettingsPage />}

            {activeTab === "addresses" && <MyAddressesPage />}
          </div>

        </div>
      </div>
    </div>
  );
}
