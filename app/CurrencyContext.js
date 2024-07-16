// import React, { createContext, useState } from 'react';

// export const CurrencyContext = createContext();

// export const CurrencyProvider = ({ children }) => {
//   const [currency, setCurrency] = useState('INR');

//   return (
//     <CurrencyContext.Provider value={{ currency, setCurrency }}>
//       {children}
//     </CurrencyContext.Provider>
//   );
// };
'use client'

import React, { createContext, useState, useEffect } from 'react';

export const CurrencyContext = createContext();

// Function to fetch exchange rates from an external API
const fetchExchangeRates = async () => {
  const API_KEY = 'cd53e5cc99ff1361cc9713ca'; // Replace with your API key
  const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/INR`;
  // const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log("Data is: ",data)
    if (data.result === 'success') {
      return data.conversion_rates;
    } else {
      console.error('Failed to fetch exchange rates:', data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('INR');
  const [exchangeRates, setExchangeRates] = useState({ INR: 1 });

  useEffect(() => {
    const fetchRates = async () => {
      const rates = await fetchExchangeRates();
      if (rates) {
        setExchangeRates(rates);
      }
    };

    fetchRates();
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, exchangeRates }}>
      {children}
    </CurrencyContext.Provider>
  );
};

