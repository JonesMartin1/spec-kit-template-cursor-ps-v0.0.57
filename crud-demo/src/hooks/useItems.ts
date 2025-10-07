import { useState, useEffect, useCallback } from 'react';
import { 
  Item, 
  CreateItemRequest, 
  UpdateItemRequest,
  FilterState,
  SortState,
  ToastNotification
} from '@/lib/types';
import { storageService } from '@/lib/storage';
import { SAMPLE_ITEMS, DEFAULT_ITEM_VALUES } from '@/lib/constants';

/**
 * Custom hook for managing CRUD operations on items
 * This will be fully implemented in T011
 */
export const useItems = () => {
  // State management
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [filter, setFilter] = useState<FilterState>({});
  const [sort, setSort] = useState<SortState>({ field: 'createdAt', direction: 'desc' });
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  // Initialize data on mount
  useEffect(() => {
    initializeData();
  }, []);

  /**
   * Add a notification
   */
  const addNotification = useCallback((notification: Omit<ToastNotification, 'id'>) => {
    const id = Date.now().toString();
    const newNotification: ToastNotification = { ...notification, id };
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-remove notification after duration
    setTimeout(() => {
      removeNotification(id);
    }, notification.duration || 3000);
  }, []);

  /**
   * Remove a notification
   */
  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  /**
   * Initialize data from storage or use sample data
   */
  const initializeData = useCallback(() => {
    try {
      const storedItems = storageService.loadItems();
      if (storedItems.length === 0) {
        // Use sample data if no stored items
        setItems(SAMPLE_ITEMS);
        storageService.saveItems(SAMPLE_ITEMS);
      } else {
        setItems(storedItems);
      }
    } catch (error) {
      console.error('Error initializing data:', error);
      setItems(SAMPLE_ITEMS);
    }
  }, []);

  /**
   * Create a new item
   */
  const createItem = useCallback((request: CreateItemRequest) => {
    try {
      setIsLoading(true);
      
      // Validate request
      if (!request.name || request.name.trim().length === 0) {
        throw new Error('El nombre es obligatorio');
      }

      if (request.name.length > 100) {
        throw new Error('El nombre no puede exceder 100 caracteres');
      }

      if (request.description && request.description.length > 500) {
        throw new Error('La descripción no puede exceder 500 caracteres');
      }

      // Check for duplicates in same category
      const category = request.category || DEFAULT_ITEM_VALUES.category;
      const duplicateExists = items.some(
        item => item.name.toLowerCase() === request.name.toLowerCase() && item.category === category
      );

      if (duplicateExists) {
        throw new Error('Ya existe un elemento con este nombre en la misma categoría');
      }

      // Check max items limit
      if (items.length >= 100) {
        throw new Error('No se pueden crear más de 100 elementos por sesión');
      }

      // Create new item
      const newItem: Item = {
        id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: request.name.trim(),
        description: request.description?.trim() || '',
        category: request.category || DEFAULT_ITEM_VALUES.category,
        priority: request.priority || DEFAULT_ITEM_VALUES.priority,
        status: DEFAULT_ITEM_VALUES.status,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Update state
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      storageService.saveItems(updatedItems);

      // Show success notification
      addNotification({
        title: 'Elemento creado',
        description: `"${newItem.name}" ha sido creado exitosamente`,
        type: 'success'
      });

      // Close form
      setShowCreateForm(false);

      return newItem;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al crear elemento';
      addNotification({
        title: 'Error',
        description: message,
        type: 'error'
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [items, addNotification]);

  /**
   * Update an existing item
   */
  const updateItem = useCallback((request: UpdateItemRequest) => {
    try {
      setIsLoading(true);

      // Find the item
      const itemIndex = items.findIndex(item => item.id === request.id);
      if (itemIndex === -1) {
        throw new Error('Elemento no encontrado');
      }

      const currentItem = items[itemIndex];

      // Validate updates
      if (request.name !== undefined) {
        if (!request.name || request.name.trim().length === 0) {
          throw new Error('El nombre es obligatorio');
        }
        if (request.name.length > 100) {
          throw new Error('El nombre no puede exceder 100 caracteres');
        }
      }

      if (request.description !== undefined && request.description.length > 500) {
        throw new Error('La descripción no puede exceder 500 caracteres');
      }

      // Check for duplicates if name is being changed
      if (request.name && request.name.toLowerCase() !== currentItem.name.toLowerCase()) {
        const category = request.category || currentItem.category;
        const duplicateExists = items.some(
          item => item.id !== request.id && 
                 item.name.toLowerCase() === request.name.toLowerCase() && 
                 item.category === category
        );

        if (duplicateExists) {
          throw new Error('Ya existe un elemento con este nombre en la misma categoría');
        }
      }

      // Create updated item
      const updatedItem: Item = {
        ...currentItem,
        name: request.name !== undefined ? request.name.trim() : currentItem.name,
        description: request.description !== undefined ? request.description.trim() : currentItem.description,
        category: request.category !== undefined ? request.category : currentItem.category,
        priority: request.priority !== undefined ? request.priority : currentItem.priority,
        status: request.status !== undefined ? request.status : currentItem.status,
        updatedAt: new Date()
      };

      // Update state
      const updatedItems = [...items];
      updatedItems[itemIndex] = updatedItem;
      setItems(updatedItems);
      storageService.saveItems(updatedItems);

      // Show success notification
      addNotification({
        title: 'Elemento actualizado',
        description: `"${updatedItem.name}" ha sido actualizado exitosamente`,
        type: 'success'
      });

      // Close form and clear selection
      setShowEditForm(false);
      setSelectedItem(null);

      return updatedItem;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al actualizar elemento';
      addNotification({
        title: 'Error',
        description: message,
        type: 'error'
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [items, addNotification]);

  /**
   * Delete an item
   */
  const deleteItem = useCallback((id: string) => {
    try {
      setIsLoading(true);

      // Find the item
      const itemIndex = items.findIndex(item => item.id === id);
      if (itemIndex === -1) {
        throw new Error('Elemento no encontrado');
      }

      const itemToDelete = items[itemIndex];

      // Update state
      const updatedItems = items.filter(item => item.id !== id);
      setItems(updatedItems);
      storageService.saveItems(updatedItems);

      // Show success notification
      addNotification({
        title: 'Elemento eliminado',
        description: `"${itemToDelete.name}" ha sido eliminado exitosamente`,
        type: 'success'
      });

      // Close dialog and clear selection
      setShowDeleteDialog(false);
      setSelectedItem(null);

      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al eliminar elemento';
      addNotification({
        title: 'Error',
        description: message,
        type: 'error'
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [items, addNotification]);

  /**
   * Get filtered and sorted items
   */
  const getFilteredItems = useCallback(() => {
    let filtered = [...items];

    // Apply filters
    if (filter.category) {
      filtered = filtered.filter(item => item.category === filter.category);
    }
    if (filter.status) {
      filtered = filtered.filter(item => item.status === filter.status);
    }
    if (filter.priority) {
      filtered = filtered.filter(item => item.priority === filter.priority);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];
      
      let comparison = 0;
      if (aValue < bValue) comparison = -1;
      if (aValue > bValue) comparison = 1;
      
      return sort.direction === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [items, filter, sort]);

  /**
   * Clear all items
   */
  const clearAllItems = useCallback(() => {
    setItems([]);
    storageService.clearItems();
    addNotification({
      title: 'Datos eliminados',
      description: 'Todos los elementos han sido eliminados',
      type: 'success'
    });
  }, [addNotification]);

  /**
   * Reset to sample data
   */
  const resetToSampleData = useCallback(() => {
    setItems(SAMPLE_ITEMS);
    storageService.saveItems(SAMPLE_ITEMS);
    addNotification({
      title: 'Datos restaurados',
      description: 'Se han restaurado los datos de ejemplo',
      type: 'success'
    });
  }, [addNotification]);

  // Return hook interface
  return {
    // State
    items: getFilteredItems(),
    allItems: items,
    isLoading,
    selectedItem,
    showCreateForm,
    showEditForm,
    showDeleteDialog,
    filter,
    sort,
    notifications,

    // CRUD operations (to be implemented)
    createItem,
    updateItem,
    deleteItem,

    // UI state management
    setSelectedItem,
    setShowCreateForm,
    setShowEditForm,
    setShowDeleteDialog,
    setFilter,
    setSort,

    // Notifications
    addNotification,
    removeNotification,

    // Utility functions
    clearAllItems,
    resetToSampleData,
    initializeData,

    // Statistics
    totalItems: items.length,
    filteredCount: getFilteredItems().length
  };
};

export default useItems;
