import Header from "../../components/user/layout/Header/Header";
import Footer from "../../components/user/layout/Footer/Footer";

export const metadata = {
  title: "Urban Company — Home services at your doorstep",
  description: "Book trusted home services: salon, cleaning, AC repair and more.",
};

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
