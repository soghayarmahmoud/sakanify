// src/context/ThemeContext.js
// This file defines the React Context for managing the theme.
import { createContext, useContext } from 'react';

// Create a context with a default value (null).
// The actual value will be provided by ThemeProvider.
export const ThemeContext = createContext(null);

// src/hooks/useTheme.js
// This custom hook simplifies accessing the theme context.
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    // Ensure the hook is used within a ThemeProvider.
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};


// src/components/ThemeProvider.js
// This component manages the theme state and provides it to the application.
import React, { useState, useEffect, useCallback } from 'react';
// ThemeContext is defined above, no need for relative import
// import { ThemeContext } from '../context/ThemeContext';

const ThemeProvider = ({ children }) => {
  // Initialize theme state from localStorage or default to 'light'
  // Using a function for initial state ensures localStorage is only accessed once.
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme || 'light';
    }
    return 'light'; // Default for server-side rendering
  });

  // Effect to apply the theme class to the document body
  useEffect(() => {
    const root = window.document.documentElement;
    // Remove existing theme classes to prevent conflicts
    root.classList.remove('light', 'dark');
    // Add the current theme class
    root.classList.add(theme);
    // Save the theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]); // Rerun effect whenever theme changes

  // Function to toggle between 'light' and 'dark'
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  // Provide the theme state and toggle function via context
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


// src/components/ThemeToggleButton.js
// An example component that uses the useTheme hook to toggle the theme.
// useTheme is defined in this file
// import { useTheme } from './useTheme';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 m-2 rounded-full bg-blue-500 text-white shadow-lg
                 hover:bg-blue-600 focus:outline-none focus:ring-2
                 focus:ring-blue-400 focus:ring-opacity-75
                 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-500"
    >
      {theme === 'light' ? 'التبديل للوضع الداكن' : 'التبديل للوضع الفاتح'}
    </button>
  );
};


// src/pages/index.js (or app/page.js for App Router)
// An example page demonstrating how to use the ThemeToggleButton and apply theme-based styles.
import React, { useState } from 'react';
// ThemeToggleButton and useTheme are defined in this file
// import ThemeToggleButton from '../components/ThemeToggleButton';
// import { useTheme } from '../hooks/useTheme';

const HomePage = () => {
  const { theme } = useTheme(); // Access the current theme

  // State for property details
  const [numBedrooms, setNumBedrooms] = useState('');
  const [numBathrooms, setNumBathrooms] = useState('');
  const [location, setLocation] = useState('');
  const [amenities, setAmenities] = useState('');
  const [price, setPrice] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to handle Gemini API call for property description
  const handleGenerateDescription = async () => {
    setIsLoading(true);
    setError('');
    setGeneratedDescription('');

    const prompt = `
      أنا مالك عقار وأرغب في تأجير شقة. الرجاء كتابة وصف جذاب للعقار بناءً على التفاصيل التالية:
      عدد غرف النوم: ${numBedrooms || 'غير محدد'}
      عدد الحمامات: ${numBathrooms || 'غير محدد'}
      الموقع: ${location || 'غير محدد'}
      المميزات: ${amenities || 'غير محدد'}
      السعر المتوقع: ${price || 'غير محدد'}
      الرجاء التركيز على جذب الطلاب أو المستأجرين الشباب، وتسليط الضوء على قرب العقار من الجامعات أو وسائل النقل أو المرافق الحيوية إن أمكن. يجب أن يكون الوصف موجزاً وجذاباً.
    `;

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = ""; // If you want to use models other than gemini-2.5-flash-preview-05-20 or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    let retries = 0;
    const maxRetries = 3;
    const baseDelay = 1000; // 1 second

    while (retries < maxRetries) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
          const text = result.candidates[0].content.parts[0].text;
          setGeneratedDescription(text);
          break; // Exit loop on success
        } else {
          setError('فشل في توليد الوصف. يرجى المحاولة مرة أخرى.');
          break; // Exit loop on unexpected response
        }
      } catch (err) {
        retries++;
        if (retries < maxRetries) {
          const delay = baseDelay * Math.pow(2, retries - 1);
          await new Promise(res => setTimeout(res, delay));
        } else {
          setError('حدث خطأ أثناء الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت والمحاولة لاحقًا.');
        }
      }
    }
    setIsLoading(false);
  };

  return (
    // The 'dark' class on the html element (applied by ThemeProvider)
    // will make these Tailwind classes active.
    <div className={`min-h-screen flex flex-col items-center justify-center
                    ${theme === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-gray-100'}
                    transition-colors duration-300 ease-in-out
                    p-4 sm:p-6 md:p-8 rounded-lg shadow-xl`}>
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
        مرحباً بك في سكنفاي!
      </h1>
      <p className="text-lg sm:text-xl text-center max-w-2xl mb-8">
        وصلتك السلسة إلى منزلك المثالي.
        سواء كنت مالك عقار أو طالباً يبحث عن مكان،
        نجعل العثور على مساحتك المثالية أمراً سهلاً.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md
                           hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400
                           focus:ring-opacity-75 transition-all duration-200 ease-in-out">
          ابحث عن سكن
        </button>
        <button className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md
                           hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400
                           focus:ring-opacity-75 transition-all duration-200 ease-in-out">
          اعرض عقارك
        </button>
      </div>

      <ThemeToggleButton />

      <p className="mt-8 text-sm text-gray-600 dark:text-gray-400 text-center">
        الوضع الحالي: <span className="font-semibold">{theme === 'light' ? 'فاتح' : 'داكن'}</span>
      </p>

      {/* Gemini LLM Feature: Property Description Generator */}
      <div className="mt-12 w-full max-w-3xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          ✨ مولد وصف العقار بالذكاء الاصطناعي ✨
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="number"
            placeholder="عدد غرف النوم"
            value={numBedrooms}
            onChange={(e) => setNumBedrooms(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="number"
            placeholder="عدد الحمامات"
            value={numBathrooms}
            onChange={(e) => setNumBathrooms(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="text"
            placeholder="الموقع (مثال: حي الجامعة، وسط البلد)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white col-span-full"
          />
          <textarea
            placeholder="المميزات (مثال: مفروشة بالكامل، تكييف، قرب من المواصلات)"
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
            rows="3"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white col-span-full"
          ></textarea>
          <input
            type="text"
            placeholder="السعر المتوقع (مثال: 5000 جنيه شهرياً)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white col-span-full"
          />
        </div>
        <button
          onClick={handleGenerateDescription}
          disabled={isLoading}
          className="w-full px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md
                     hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400
                     focus:ring-opacity-75 transition-all duration-200 ease-in-out
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'جاري التوليد...' : 'توليد وصف العقار ✨'}
        </button>

        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}

        {generatedDescription && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">الوصف المُولد:</h3>
            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{generatedDescription}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App component to wrap HomePage with ThemeProvider
const App = ({ Component, pageProps }) => {
  // In a real Next.js app, ThemeProvider would wrap the <Component {...pageProps} />
  // in pages/_app.js or app/layout.js. For this single immersive,
  // we'll wrap HomePage directly.
  return (
    <ThemeProvider>
      <HomePage {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
