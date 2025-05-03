import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Products from "../components/Products";
export default function Home() {
  return (
    <main>
      <Header />
      <FeaturedProducts />
      <Products />
      <Footer />
    </main>
  );
}