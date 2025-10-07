'use client';

import React from 'react';
import { Item } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PRIORITY_COLORS, STATUS_COLORS, CATEGORY_LABELS, PRIORITY_LABELS, STATUS_LABELS } from '@/lib/constants';
import { Edit, Trash2, Eye, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface ItemCardProps {
  item: Item;
  onEdit?: (item: Item) => void;
  onDelete?: (item: Item) => void;
  onView?: (item: Item) => void;
  className?: string;
  showActions?: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onEdit,
  onDelete,
  onView,
  className = '',
  showActions = true
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getPriorityColor = (priority: string) => {
    return PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS] || PRIORITY_COLORS.medium;
  };

  const getStatusColor = (status: string) => {
    return STATUS_COLORS[status as keyof typeof STATUS_COLORS] || STATUS_COLORS.draft;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      demo: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      example: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      sample: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      test: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
    };
    return colors[category as keyof typeof colors] || colors.demo;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
      transition={{ 
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-200 border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100 truncate mb-2">
                {item.name}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                  {CATEGORY_LABELS[item.category]}
                </span>
              </div>
            </div>
            {showActions && (
              <div className="flex items-center space-x-1 ml-2">
                {onView && (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(item)}
                      className="h-8 w-8 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      title="Ver detalles"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
                {onEdit && (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(item)}
                      className="h-8 w-8 hover:bg-green-50 dark:hover:bg-green-900/20"
                      title="Editar elemento"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
                {onDelete && (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(item)}
                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                      title="Eliminar elemento"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          {item.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              {item.description}
            </p>
          )}
          
          <div className="space-y-3">
            {/* Priority and Status */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">Prioridad</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority).bg} ${getPriorityColor(item.priority).text} ${getPriorityColor(item.priority).border} border`}>
                  {PRIORITY_LABELS[item.priority]}
                </span>
              </div>
              
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">Estado</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status).bg} ${getStatusColor(item.status).text} ${getStatusColor(item.status).border} border`}>
                  {STATUS_LABELS[item.status]}
                </span>
              </div>
            </div>
            
            {/* Dates */}
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
                <Calendar className="h-3 w-3" />
                <span>Creado: {formatDate(item.createdAt)}</span>
              </div>
              {item.updatedAt.getTime() !== item.createdAt.getTime() && (
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3 w-3" />
                  <span>Actualizado: {formatDate(item.updatedAt)}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ItemCard;
