'use client';

import { useEffect, useState } from 'react';

export default function LiveCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Generate or retrieve visitorId
    let visitorId = sessionStorage.getItem('visitorId');
    if (!visitorId) {
      visitorId = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('visitorId', visitorId);
    }

    const sendHeartbeat = async () => {
      try {
        await fetch('/api/presence', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ visitorId }),
        });
      } catch (error) {
        console.error('Error sending heartbeat:', error);
      }
    };

    const fetchCount = async () => {
      try {
        const res = await fetch('/api/presence');
        if (res.ok) {
          const data = await res.json();
          setCount(data.count);
        }
      } catch (error) {
        console.error('Error fetching count:', error);
      }
    };

    let heartbeatInterval: NodeJS.Timeout;
    let countInterval: NodeJS.Timeout;

    const startPolling = () => {
      // Immediate calls when starting
      sendHeartbeat();
      fetchCount();

      heartbeatInterval = setInterval(sendHeartbeat, 15000);
      countInterval = setInterval(fetchCount, 10000);
    };

    const stopPolling = () => {
      clearInterval(heartbeatInterval);
      clearInterval(countInterval);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPolling();
      } else {
        startPolling();
      }
    };

    // Initial start
    startPolling();

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopPolling();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (count === null) {
    return null;
  }

  return (
    <div className="text-sm text-[var(--color-text-secondary)] mt-8">
      {count} {count === 1 ? 'persona viendo' : 'personas viendo'} esto ahora
    </div>
  );
}
