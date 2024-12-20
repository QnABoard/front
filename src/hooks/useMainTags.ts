import { fetchMainData } from '@/apis/maindata.api';
import { mainTags } from '@/types/main.model';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export const useMainTags = () => {
  const location = useLocation();
  const [maintags, setMaintags] = useState<mainTags[]>([]);

  const setActive = () => {
    const params = new URLSearchParams(location.search);
    if (params.get('id')) {
      setMaintags((prev) => {
        return prev.map((item) => {
          return { ...item, isActive: item.id === Number(params.get('id')) };
        });
      });
    } else {
      setMaintags((prev) => {
        return prev.map((item) => {
          return { ...item, isActive: false };
        });
      });
    }
  };

  useEffect(() => {
    fetchMainData().then((data) => {
      if (!data.tags) return;
      const tagsAll = [
        {
          id: null,
          name: '전체',
        },
        ...data.tags,
      ];

      setMaintags(tagsAll);
      setActive();
    });
  }, []);

  useEffect(() => {
    setActive();
  }, [location.search]);

  return { maintags };
};
