import Image from "next/image";
import HeaderSlider from "./_SharedComponent/Home/HeaderSlider/HeaderSlider";
import CategoryCards from "./_SharedComponent/Home/CategoryCards/CategoryCards";
import ProductHome from "./_SharedComponent/Home/ProductHome/ProductHome";
import OffersSection from "./_SharedComponent/Home/OffersSection/OffersSection";
import NewsletterSection from "./_SharedComponent/Home/NewsletterSection/NewsletterSection";

export default function Home() {
  return (

   <>
   {/* headerslider */}
   <HeaderSlider/>


   {/* categoryslider */}
   <CategoryCards/>

  <OffersSection/>


   {/* products */}
   <ProductHome/>

   <NewsletterSection/>


   
   </>
  );
}
