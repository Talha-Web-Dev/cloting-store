import AnnouncementBar from "../components/AnnouncementBar"
import Categories from "../components/Categories"
import FeaturedProducts from "../components/FeaturedProducts"
import Testimonials from "../components/Testimonials"
import Newsletter from "../components/Newsletter"
import NewArrivals from "../components/NewArrivals"
import InstagramGallery from "../components/InstagramGallery"
import HeroSection from "../components/HeroSection"
import MarqueeSection from "../components/MarqueeSection"
import BannerSection from "../components/BannerSection"
function Home() {
  return (
    <div className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
     <AnnouncementBar />
      <HeroSection />
      <MarqueeSection />
      <BannerSection />
      
      
      <NewArrivals />
      <FeaturedProducts />
      <Categories />
      <Testimonials />
      <Newsletter />
      <InstagramGallery />
    </div>
  )
}

export default Home
