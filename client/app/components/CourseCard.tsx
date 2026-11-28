import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface CourseData {
  _id: string,
  title: string,
  description: string,
  category: string,
  level: "Begineer" | "Intermediate" | "Advanced",
  price: number,
  thumbnail: string,
  instructorName: string,
  lectures?: Array<{ 
    _id: string;
    title: string;
    duration?: string; 
  }>;
  enrolledStudents?: string[];
  progressPercentage?: number;
  completedLecturesCount?: number;
};

interface CourseCardProps {
  course: CourseData;
  isEnrolled: boolean;
};

const CourseCard = ({ course, isEnrolled } : CourseCardProps ) => {
  const lectureCount = course.lecture?.length || 0;
  const isFree = course.price === 0;

  return (
    <Link href={isEnrolled ? `/learn/${course._id}` : `/courses/${course._id}`} className='group course-card'>
      <div>
        <div className='relative aspect-video w-full bg-secondary/5 overflow-hidden'>
          <Image
            src={course.thumbnail}
            alt={course.title}
            className='w-full h-full object-cover group-hover:scale-[1.02] transition duration-300'
            width={320}
            height={320}
          />

          <div className=''></div>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard