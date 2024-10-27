import { calendlyClient } from '../utils'; 

import { EventTypeData } from '../types'; // Import the defined types

// Function to create an event type
export async function createEventType(eventData: EventTypeData) {
    // Validate required fields
    if (!eventData.name || eventData.name.length > 55) {
        throw new Error("Event name is required and must be <= 55 characters.");
    }
    if (!eventData.host) {
        throw new Error("Host is required.");
    }
    if (!eventData.duration || eventData.duration > 720) {
        throw new Error("Duration is required and must be <= 720 minutes.");
    }
    if (!eventData.date_setting || eventData.date_setting.type !== 'date_range') {
        throw new Error("date_setting is required and type must be 'date_range'.");
    }
    if (!eventData.date_setting.start_date || !eventData.date_setting.end_date) {
        throw new Error("Both start_date and end_date are required.");
    }

    try {
        const response = await calendlyClient().post('/one_off_event_types', eventData); // Use the appropriate endpoint
        return response.data; // Return the created event type data
    } catch (error) {
        console.error('Error creating event type:', error.message);
        throw error; // Re-throw the error for further handling
    }
}

