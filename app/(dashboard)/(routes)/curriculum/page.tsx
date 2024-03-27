"use client"

import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';

const prisma = new PrismaClient();

const CurriculumPage = () => {
 
  const [curriculumTitle, setCurriculumTitle] = useState<string>('');

  useEffect(() => {
 
    const fetchCurriculum = async () => {
      try {
 
        const curriculum = await prisma.curriculum.findFirst();

        if (curriculum) {
          setCurriculumTitle(curriculum.title);
		  console.log(curriculum.title);
        } else {
          console.error('No curriculum found');
        }
      } catch (error) {
        console.error('Error fetching curriculum:', error);
      }
    };
    
    fetchCurriculum();

    return () => {
      prisma.$disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Curriculum Title</h1>
      {curriculumTitle ? (
        <p>{curriculumTitle}</p>
      ) : (
        <p>Could not fetch title</p>
      )}
    </div>
  );
};

export default CurriculumPage;
