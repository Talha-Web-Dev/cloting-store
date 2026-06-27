import HeroSection from "../components/HeroSection"
import Categories from "../components/Categories"
import BannerSection from "../components/BannerSection"
import FeaturedProducts from "../components/FeaturedProducts"
import NewArrivals from "../components/NewArrivals"
import BestSellers from "../components/BestSellers"
import WhyChooseUs from "../components/WhyChooseUs"
import Testimonials from "../components/Testimonials"
import Newsletter from "../components/Newsletter"

function Home() {
  return (
    <main className="bg-brand-bg text-brand-charcoal">
      <HeroSection />
      <Categories />
      <FeaturedProducts />
      <NewArrivals />
      <BestSellers />
      <BannerSection />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </main>
  )
}

export default Home
