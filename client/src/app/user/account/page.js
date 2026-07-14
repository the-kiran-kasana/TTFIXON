"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, Check } from "lucide-react";
import { updateProfile, logout } from "@/store/user/authSlice";

const CATEGORY_OPTIONS = [
  "Painting",
  "Plumbing",
  "Electrical",
  "Interior Design",
  "Civil Work",
  "Cleaning",
];

export default function AccountPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, token, hydrated, status, error } = useSelector(
    (state) => state.userAuth
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    categories: [],
  });
  const [saved, setSaved] = useState(false);

  // Not logged in (after hydration) → go to login.
  useEffect(() => {
    if (hydrated && !token) router.replace("/user/login?redirect=/user/account");
  }, [hydrated, token, router]);

  // Populate the form from the stored profile.
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        location: user.location || "",
        categories: user.categories || [],
      });
    }
  }, [user]);

  const saving = status === "saving";

  const toggleCategory = (cat) =>
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(cat)
        ? f.categories.filter((c) => c !== cat)
        : [...f.categories, cat],
    }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaved(false);
    const result = await dispatch(updateProfile(form));
    if (updateProfile.fulfilled.match(result)) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/user/login");
  };

  if (!hydrated || !user) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center text-sm text-gray-500">
        Loading…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
          <p className="mt-1 text-sm text-gray-500">
            Logged in as +91 {user.phone}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <LogOut size={15} /> Logout
        </button>
      </div>

      <form
        onSubmit={handleSave}
        className="space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Phone number
          </label>
          <input
            value={`+91 ${user.phone}`}
            disabled
            className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 py-2.5 px-3 text-sm text-gray-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Full name
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="w-full rounded-lg border border-gray-200 py-2.5 px-3 text-sm outline-none focus:border-gray-400"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="email@example.com"
            className="w-full rounded-lg border border-gray-200 py-2.5 px-3 text-sm outline-none focus:border-gray-400"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="City"
            className="w-full rounded-lg border border-gray-200 py-2.5 px-3 text-sm outline-none focus:border-gray-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Interested categories
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((cat) => {
              const active = form.categories.includes(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                    active
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-gray-900 py-2.5 px-5 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          {saved && (
            <span className="flex items-center gap-1 text-sm font-medium text-green-600">
              <Check size={16} /> Saved
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
