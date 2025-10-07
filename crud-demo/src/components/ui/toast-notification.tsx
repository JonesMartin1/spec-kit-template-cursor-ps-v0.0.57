'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { ToastNotification } from '@/lib/types';

interface ToastNotificationComponentProps {
  notification: ToastNotification;
  onClose: () => void;
}

const getToastIcon = (type: ToastNotification['type']) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
    case 'error':
      return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
    case 'warning':
      return <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />;
    case 'info':
      return <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    default:
      return <Info className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
  }
};

const getToastStyles = (type: ToastNotification['type']) => {
  switch (type) {
    case 'success':
      return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    case 'error':
      return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
    case 'warning':
      return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
    case 'info':
      return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    default:
      return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
  }
};

export const ToastNotificationComponent: React.FC<ToastNotificationComponentProps> = ({
  notification,
  onClose
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`relative flex items-start space-x-3 p-4 rounded-lg border shadow-lg max-w-md w-full ${getToastStyles(notification.type)}`}
    >
      <div className="flex-shrink-0 mt-0.5">
        {getToastIcon(notification.type)}
      </div>
      
      <div className="flex-1 min-w-0">
        {notification.title && (
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
            {notification.title}
          </h4>
        )}
        {notification.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {notification.description}
          </p>
        )}
      </div>
      
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      </button>
    </motion.div>
  );
};

interface ToastContainerProps {
  notifications: ToastNotification[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  notifications,
  onRemove
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <ToastNotificationComponent
            key={notification.id}
            notification={notification}
            onClose={() => onRemove(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
