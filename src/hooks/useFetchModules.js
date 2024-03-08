import { useState, useEffect } from 'react';

const useFetchModules = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch('http://localhost:27017/marking');
        const modulesData = await response.json();
        setModules(modulesData);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    fetchModules();
  }, []); // Empty dependency array means this runs once on component mount

  return modules;
};