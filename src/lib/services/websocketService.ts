
import React, { useState, useEffect } from 'react';

// WebSocket service for real-time updates
let socket: WebSocket | null = null;
let reconnectTimer: number | null = null;
const listeners: Record<string, Array<(data: any) => void>> = {};

// Event types for the application
export type WebSocketEventType = 
  | 'project_updated' 
  | 'blog_updated' 
  | 'video_updated' 
  | 'work_updated'
  | 'connection_status';

/**
 * Initialize the WebSocket connection
 */
export const initWebSocket = () => {
  if (socket) return;

  // Use secure WebSocket if on HTTPS
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const wsUrl = `${protocol}//${window.location.host}/api/ws`;
  
  try {
    socket = new WebSocket(wsUrl);
    
    socket.onopen = () => {
      console.log('WebSocket connection established');
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
      
      // Notify listeners about connection status
      notifyListeners('connection_status', { connected: true });
    };
    
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data && data.type) {
          notifyListeners(data.type, data.payload);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    socket.onclose = () => {
      console.log('WebSocket connection closed');
      notifyListeners('connection_status', { connected: false });
      
      // Attempt to reconnect after 5 seconds
      socket = null;
      reconnectTimer = window.setTimeout(() => {
        initWebSocket();
      }, 5000);
    };
    
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      socket?.close();
    };
  } catch (error) {
    console.error('Failed to create WebSocket connection:', error);
  }
};

/**
 * Close the WebSocket connection
 */
export const closeWebSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
  
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
};

/**
 * Subscribe to a specific event type
 */
export const subscribe = (eventType: WebSocketEventType, callback: (data: any) => void) => {
  if (!listeners[eventType]) {
    listeners[eventType] = [];
  }
  
  listeners[eventType].push(callback);
  
  // Return unsubscribe function
  return () => {
    if (listeners[eventType]) {
      listeners[eventType] = listeners[eventType].filter(cb => cb !== callback);
    }
  };
};

/**
 * Notify all listeners of a specific event type
 */
const notifyListeners = (eventType: WebSocketEventType, data: any) => {
  if (listeners[eventType]) {
    listeners[eventType].forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in ${eventType} listener:`, error);
      }
    });
  }
};

/**
 * Send a message through the WebSocket
 */
export const sendMessage = (type: string, payload: any) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type, payload }));
    return true;
  }
  return false;
};

/**
 * Hook to use WebSocket in components
 */
export const useWebSocketStatus = () => {
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    // Initialize WebSocket connection
    initWebSocket();
    
    // Listen for connection status changes
    const unsubscribe = subscribe('connection_status', (data) => {
      setIsConnected(data.connected);
    });
    
    // Clean up on unmount
    return () => {
      unsubscribe();
    };
  }, []);
  
  return isConnected;
};

/**
 * Export a hook to use WebSocket events
 */
export const useWebSocketEvent = (eventType: WebSocketEventType, callback: (data: any) => void) => {
  useEffect(() => {
    // Initialize WebSocket if not already
    initWebSocket();
    
    // Subscribe to the event
    const unsubscribe = subscribe(eventType, callback);
    
    // Clean up on unmount
    return unsubscribe;
  }, [eventType, callback]);
};
