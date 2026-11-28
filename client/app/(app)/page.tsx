import HeroSection from "@/app/components/Home/Hero"
import FeaturedCourses from "@/app/components/Home/FeaturedCourses"


const page = () => {
  return (
    <div className="bg-white text-secondary">
      <HeroSection />
      <FeaturedCourses />
    </div>
  )
}

export default page