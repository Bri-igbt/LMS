'use client'

import { useEffect, useState } from 'react'
import { DUMMY_COURSES, DUMMY_USER } from '@/app/assets/assets'
import CourseCard, { CourseData } from '@/app/components/CourseCard';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

const FeaturedCourses = () => {
  const { user } = { user: DUMMY_USER as any };
  const [courses, setCourses] = useState<CourseData[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        setCourses(DUMMY_COURSES as any)
      } finally {
        setLoading(false)
      };
    };

    fetchFeaturedCourses();
  }, []);

  const featuredCourses = courses.slice(0,3);
  if (loading || featuredCourses.length === 0) return null;

  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
      <div className='mb-8'>
        <h2 className='text-xl sm:text-2xl font-medium tracking-tight'>
          Featured Courses
        </h2>
        <p className='text-xs sm:text-sm text-secondary/80 mt-1'>
          Curated masterclasses taught by top instructors
        </p>
      </div>

      {featuredCourses.length > 0 && (
        <div className='space-y-8'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {featuredCourses.map((course) => (
              <CourseCard 
                key={course._id}
                course={course}
                isEnrolled={Boolean(user && course.enrolledStudents?.includes(user._id))}
              />
            ))}
          </div>

          <div className='text-center pt-2'>
            <Link href="/courses" className='btn-browse-all'>
              <span>Browse All Courses</span>
              <ArrowRightIcon className='text-primary w-3.5 h-3.5' />
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

export default FeaturedCourses