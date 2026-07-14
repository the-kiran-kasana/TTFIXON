import Header from "../../components/user/layout/Header/Header";
import Footer from "../../components/user/layout/Footer/Footer";
import UserStoreProvider from "../../store/user/StoreProvider";

export const metadata = {
  title: "On Demand — Electrician and plumbing services",
  description: "Book trusted electrician and plumbing services at your doorstep.",
};

export default function UserLayout({ children }) {
  return (
    <UserStoreProvider>
      <div className="min-h-screen bg-white text-gray-900">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </UserStoreProvider>
  );
}
