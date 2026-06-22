import FeaturedSection from "./components/Feature/FeaturedSection";
import HomeSections from "./components/Festival/HomeSections";
import SpecialSection from "./components/HeroCarousel/SpecialSection";
import SubscriptionSection from "./components/Subscription/SubscriptionSection";
import MongolCarousel from "./components/MongolCarousel/MongolCarousel";
import NewsSection from "./components/News/index";
import ReelsSection from "./components/Reel/Reelssection";
import AdBanner from "./components/Ad/AdBanner";
import CategoryGrid from "./components/Festival/Category/CategoryGrid";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <FeaturedSection />
      <CategoryGrid />
      {/* <HomeSections /> */}
      {/* <AdBanner /> */}
      <MongolCarousel/>
      <NewsSection/>
      <ReelsSection />
      <SpecialSection />
      <SubscriptionSection />
      {/* <NewsCard/> */}
      {/* <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800">Монголын Үндэсний Мэдээллийн Агентлаг</h1>
        <p className="mt-4 text-gray-600">
          Монгол Улсын Үндэсний Мэдээллийн Агентлаг (Монцамэ) нь төрийн өмчийн хариуцсан 
          мэдээллийн агентлаг бөгөөд үндэсний болон олон улсын хэмжээнд мэдээллийн үйлчилгээ эрхэлнэ.
        </p> */}
      {/* </main>  */}
    </div>
  );
}
