// Replace with your actual API key from https://openweathermap.org/api
const API_KEY = 'b0773dcb5ede81a197020333c85ec77b';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getCurrentWeather(location) {
  try {
    if (!location || location.trim() === '') {
      throw new Error('Please enter a city name');
    }
    
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(location)}&units=metric&appid=${API_KEY}`
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      if (data.cod === '404') {
        throw new Error('City not found. Please check the spelling.');
      } else if (data.cod === '401') {
        throw new Error('Invalid API key. Please check your configuration.');
      } else {
        throw new Error(data.message || 'Failed to fetch weather data');
      }
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
}

export async function getForecast(location) {
  try {
    if (!location || location.trim() === '') {
      throw new Error('Please enter a city name');
    }
    
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(location)}&units=metric&appid=${API_KEY}`
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch forecast data');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
}

// Helper function to get weather icon URL
export function getWeatherIcon(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Helper function to format date
export function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
}