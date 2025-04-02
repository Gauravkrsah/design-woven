
import { useState, useEffect, useCallback } from 'react';

// Store all event listeners
interface WebSocketEventListeners {
  [key: string]: Function[];
}

const eventListeners: WebSocketEventListeners = {};
let isConnected = false;

// Function to initialize the WebSocket connection
export const initWebSocket = () => {
  // In a real app, this would establish a real WebSocket connection
  // For this demo, we're simulating the functionality
  isConnected = true;
  console.log('WebSocket connected');
  
  // Listen for custom websocket events from the API service
  document.addEventListener('websocket_event', ((event: CustomEvent) => {
    const { type } = event.detail;
    
    // Notify all listeners for this event type
    if (eventListeners[type]) {
      eventListeners[type].forEach(callback => callback());
    }
  }) as EventListener);
  
  return true;
};

// Function to close the WebSocket connection
export const closeWebSocket = () => {
  isConnected = false;
  console.log('WebSocket disconnected');
  
  // Remove the event listener
  document.removeEventListener('websocket_event', (() => {}) as EventListener);
};

// Hook to listen for WebSocket events
export const useWebSocketEvent = (eventType: string, callback: () => void) => {
  useEffect(() => {
    // Add the callback to the list of listeners for this event type
    if (!eventListeners[eventType]) {
      eventListeners[eventType] = [];
    }
    
    eventListeners[eventType].push(callback);
    
    // Clean up when the component unmounts
    return () => {
      if (eventListeners[eventType]) {
        const index = eventListeners[eventType].indexOf(callback);
        if (index !== -1) {
          eventListeners[eventType].splice(index, 1);
        }
      }
    };
  }, [eventType, callback]);
};

// Hook to get the current connection status
export const useWebSocketStatus = (): boolean => {
  const [connected, setConnected] = useState(isConnected);
  
  useEffect(() => {
    // Initially set the connection status
    setConnected(isConnected);
    
    // Define a custom event for connection status changes
    const handleStatusChange = () => {
      setConnected(isConnected);
    };
    
    // Listen for status changes
    window.addEventListener('websocket_status_change', handleStatusChange);
    
    // Clean up
    return () => {
      window.removeEventListener('websocket_status_change', handleStatusChange);
    };
  }, []);
  
  return connected;
};

// Function to manually emit a WebSocket event (for testing/demo purposes)
export const emitWebSocketEvent = (eventType: string) => {
  if (!isConnected) {
    console.warn('WebSocket is not connected');
    return false;
  }
  
  // Create a custom event that will be caught by our document event listener
  const wsEvent = new CustomEvent('websocket_event', { 
    detail: { type: eventType } 
  });
  document.dispatchEvent(wsEvent);
  
  return true;
};
