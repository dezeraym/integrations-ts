import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

// Create an instance of Axios
export const calendlyClient = () => {
  const instance = axios.create({
    baseURL: 'https://api.calendly.com/', // Update with the correct base URL for Calendly
    headers: {
      Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`, // Use your API key from environment variables
      'Content-Type': 'application/json',
    },
  });

  return instance; // Return the Axios instance
};
