import React, { useEffect, useState } from 'react'

export default function Typewritter({ text, delay, setLoading }) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
  
      return () => clearTimeout(timeout);
    }
    if(currentIndex === text.length){
      setLoading(false)
    }else{
      setLoading(true)
    }
  }, [currentIndex, delay, text]);

  return <>{currentText}{currentIndex === text.length ? '' : '|'}</>;
}
