import { useState, useCallback } from 'react';

const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    const triggerNotifications = useCallback((notifs = []) => {
        if (notifs?.length > 0) {
            const sortedNotifs = [...notifs].sort((a, b) => {
                if (a.type === 'level_up' || a.type === 'level_updated') return 1;
                if (b.type === 'level_up' || b.type === 'level_updated') return -1;
                return 0;
            });

            setNotifications(sortedNotifs);
        }
    }, []);

    const clearNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    return { notifications, triggerNotifications, clearNotifications };
};

export default useNotifications;