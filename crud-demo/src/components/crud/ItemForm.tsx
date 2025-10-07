'use client';

import React, { useState, useEffect } from 'react';
import { Item, ItemCategory, Priority, ItemStatus, CreateItemRequest, UpdateItemRequest } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CATEGORY_LABELS, PRIORITY_LABELS, STATUS_LABELS, DEFAULT_ITEM_VALUES } from '@/lib/constants';
import { motion } from 'framer-motion';
import { Save, X } from 'lucide-react';

interface ItemFormProps {
  item?: Item | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateItemRequest | UpdateItemRequest) => Promise<void>;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}

export const ItemForm: React.FC<ItemFormProps> = ({
  item,
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  mode
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    category: ItemCategory;
    priority: Priority;
    status: ItemStatus;
  }>({
    name: '',
    description: '',
    category: DEFAULT_ITEM_VALUES.category,
    priority: DEFAULT_ITEM_VALUES.priority,
    status: DEFAULT_ITEM_VALUES.status
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form data when item changes or mode changes
  useEffect(() => {
    if (mode === 'edit' && item) {
      setFormData({
        name: item.name,
        description: item.description,
        category: item.category,
        priority: item.priority,
        status: item.status
      });
    } else {
      setFormData({
        name: '',
        description: '',
        category: DEFAULT_ITEM_VALUES.category,
        priority: DEFAULT_ITEM_VALUES.priority,
        status: DEFAULT_ITEM_VALUES.status
      });
    }
    setErrors({});
  }, [item, mode]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (formData.name.length > 100) {
      newErrors.name = 'El nombre no puede exceder 100 caracteres';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'La descripción no puede exceder 500 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (mode === 'create') {
        await onSubmit({
          name: formData.name.trim(),
          description: formData.description.trim(),
          category: formData.category,
          priority: formData.priority
        });
      } else {
        await onSubmit({
          id: item!.id,
          name: formData.name.trim(),
          description: formData.description.trim(),
          category: formData.category,
          priority: formData.priority,
          status: formData.status
        });
      }
    } catch (error) {
      // Error handling is done in the parent component
      console.error('Form submission error:', error);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      category: DEFAULT_ITEM_VALUES.category,
      priority: DEFAULT_ITEM_VALUES.priority,
      status: DEFAULT_ITEM_VALUES.status
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ 
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="relative w-full max-w-sm sm:max-w-md"
      >
        <Card className="bg-white dark:bg-gray-900 shadow-xl" role="dialog" aria-modal="true" aria-labelledby="form-title">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle id="form-title" className="text-lg font-semibold">
              {mode === 'create' ? 'Crear Elemento' : 'Editar Elemento'}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8"
              aria-label="Cerrar formulario"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent>
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre *
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ingresa el nombre del elemento"
                  className={errors.name ? 'border-red-500 focus:border-red-500' : ''}
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Descripción
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Descripción opcional del elemento"
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white ${errors.description ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                  disabled={isLoading}
                />
                {errors.description && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.description}</p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formData.description.length}/500 caracteres
                </p>
              </div>

              {/* Category Field */}
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Categoría
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value as ItemCategory)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  disabled={isLoading}
                >
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority Field */}
              <div className="space-y-2">
                <label htmlFor="priority" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Prioridad
                </label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value as Priority)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  disabled={isLoading}
                >
                  {Object.entries(PRIORITY_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Field (only for edit mode) */}
              {mode === 'edit' && (
                <div className="space-y-2">
                  <label htmlFor="status" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Estado
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value as ItemStatus)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    disabled={isLoading}
                  >
                    {Object.entries(STATUS_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isLoading}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Guardando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Save className="w-4 h-4" />
                      <span>{mode === 'create' ? 'Crear' : 'Actualizar'}</span>
                    </div>
                  )}
                </Button>
              </div>
            </motion.form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ItemForm;
