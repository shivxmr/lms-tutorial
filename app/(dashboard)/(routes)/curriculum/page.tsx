'use client';

import { useEffect, useState } from 'react';

interface Curriculum {
  id: number;
  title: string;
}

const CurriculumPage = () => {
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);

  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        const response = await fetch('/api/curriculum');
        const data = await response.json();
        setCurriculums(data);
      } catch (error) {
        console.error('Error fetching curriculums:', error);
      }
    };

    fetchCurriculums();
  }, []);

  return (
    <div>
      <h1>Curriculum Titles:</h1>
      <ul>
        {curriculums.map((curriculum) => (
          <li key={curriculum.id}>{curriculum.title}</li>
        ))}
      </ul>
      End
    </div>
  );
};

export default CurriculumPage;