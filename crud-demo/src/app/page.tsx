'use client';

import React, { Suspense, lazy } from 'react';
import { Background } from '@/components/layout/Background';
import { ToastContainer } from '@/components/ui/toast-notification';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FadeIn } from '@/components/animations/FadeIn';
import { Plus, Filter, RotateCcw, Trash2, Book } from 'lucide-react';
import Link from 'next/link';
import { useItems } from '@/hooks/useItems';
import { Item, CreateItemRequest, UpdateItemRequest, FilterState, ItemCategory, Priority, ItemStatus } from '@/lib/types';
import { CATEGORY_LABELS, PRIORITY_LABELS, STATUS_LABELS } from '@/lib/constants';

// Lazy load heavy components
const ItemList = lazy(() => import('@/components/crud/ItemList').then(module => ({ default: module.ItemList })));
const ItemForm = lazy(() => import('@/components/crud/ItemForm').then(module => ({ default: module.ItemForm })));
const DeleteDialog = lazy(() => import('@/components/crud/DeleteDialog').then(module => ({ default: module.DeleteDialog })));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
  </div>
);

export default function Home() {
  const {
    // State
    items,
    allItems,
    isLoading,
    selectedItem,
    showCreateForm,
    showEditForm,
    showDeleteDialog,
    filter,
    notifications,
    
    // CRUD operations
    createItem,
    updateItem,
    deleteItem,
    
    // UI state management
    setSelectedItem,
    setShowCreateForm,
    setShowEditForm,
    setShowDeleteDialog,
    setFilter,
    
    // Notifications
    removeNotification,
    
    // Utility functions
    clearAllItems,
    resetToSampleData,
    
    // Statistics
    totalItems,
    filteredCount
  } = useItems();

  // Local state for filters
  const [showFilters, setShowFilters] = React.useState(false);

  // Handle create item
  const handleCreateItem = async (data: CreateItemRequest | UpdateItemRequest) => {
    if ('id' in data) {
      await updateItem(data as UpdateItemRequest);
    } else {
      await createItem(data as CreateItemRequest);
    }
  };

  // Handle update item
  const handleUpdateItem = async (data: CreateItemRequest | UpdateItemRequest) => {
    if ('id' in data) {
      await updateItem(data as UpdateItemRequest);
    } else {
      await createItem(data as CreateItemRequest);
    }
  };

  // Handle delete item
  const handleDeleteItem = async () => {
    if (selectedItem) {
      await deleteItem(selectedItem.id);
    }
  };

  // Handle edit item
  const handleEditItem = (item: Item) => {
    setSelectedItem(item);
    setShowEditForm(true);
  };

  // Handle delete item click
  const handleDeleteItemClick = (item: Item) => {
    setSelectedItem(item);
    setShowDeleteDialog(true);
  };

  // Handle filter change
  const handleFilterChange = (newFilter: Partial<FilterState>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilter({});
  };

  // Get filter summary
  const getFilterSummary = () => {
    const activeFilters = [];
    if (filter.category) activeFilters.push(`Categoría: ${CATEGORY_LABELS[filter.category]}`);
    if (filter.priority) activeFilters.push(`Prioridad: ${PRIORITY_LABELS[filter.priority]}`);
    if (filter.status) activeFilters.push(`Estado: ${STATUS_LABELS[filter.status]}`);
    return activeFilters;
  };

  return (
    <Background variant="hero">
      {/* Toast Notifications */}
      <ToastContainer
        notifications={notifications}
        onRemove={removeNotification}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
        <FadeIn delay={0.1}>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
              CRUD Interactivo
            </h1>
            <p className="text-blue-200 text-sm sm:text-base lg:text-lg">
              Demostración de Spec-Driven Development con operaciones CRUD
            </p>
          </div>

          {/* Statistics and Actions */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6" role="region" aria-label="Panel de control">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Panel de Control</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="border-white/30 text-white hover:bg-white/10"
                    aria-expanded={showFilters}
                    aria-controls="filters-section"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCreateForm(true)}
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Crear
                  </Button>
                  <Link href="/docs">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      <Book className="h-4 w-4 mr-2" />
                      Docs
                    </Button>
                  </Link>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{totalItems}</div>
                  <div className="text-blue-200 text-xs sm:text-sm">Total Elementos</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{filteredCount}</div>
                  <div className="text-blue-200 text-xs sm:text-sm">Filtrados</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                    {allItems.filter(item => item.status === 'completed').length}
                  </div>
                  <div className="text-blue-200 text-xs sm:text-sm">Completados</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                    {allItems.filter(item => item.priority === 'high').length}
                  </div>
                  <div className="text-blue-200 text-xs sm:text-sm">Alta Prioridad</div>
                </div>
              </div>

              {/* Filters */}
              {showFilters && (
                <div id="filters-section" className="mt-6 pt-6 border-t border-white/20" role="region" aria-label="Filtros">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {/* Category Filter */}
                    <div>
                      <label htmlFor="category-filter" className="block text-sm font-medium text-white mb-2">
                        Categoría
                      </label>
                      <select
                        id="category-filter"
                        value={filter.category || ''}
                        onChange={(e) => handleFilterChange({ 
                          category: (e.target.value as ItemCategory) || undefined 
                        })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Filtrar por categoría"
                      >
                        <option value="">Todas las categorías</option>
                        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                          <option key={key} value={key} className="bg-gray-800">
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Priority Filter */}
                    <div>
                      <label htmlFor="priority-filter" className="block text-sm font-medium text-white mb-2">
                        Prioridad
                      </label>
                      <select
                        id="priority-filter"
                        value={filter.priority || ''}
                        onChange={(e) => handleFilterChange({ 
                          priority: (e.target.value as Priority) || undefined 
                        })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Filtrar por prioridad"
                      >
                        <option value="">Todas las prioridades</option>
                        {Object.entries(PRIORITY_LABELS).map(([key, label]) => (
                          <option key={key} value={key} className="bg-gray-800">
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                      <label htmlFor="status-filter" className="block text-sm font-medium text-white mb-2">
                        Estado
                      </label>
                      <select
                        id="status-filter"
                        value={filter.status || ''}
                        onChange={(e) => handleFilterChange({ 
                          status: (e.target.value as ItemStatus) || undefined 
                        })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Filtrar por estado"
                      >
                        <option value="">Todos los estados</option>
                        {Object.entries(STATUS_LABELS).map(([key, label]) => (
                          <option key={key} value={key} className="bg-gray-800">
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Active Filters */}
                  {getFilterSummary().length > 0 && (
                    <div className="mt-4 flex items-center space-x-2 flex-wrap">
                      <span className="text-white text-sm">Filtros activos:</span>
                      {getFilterSummary().map((filterText, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          {filterText}
                        </span>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-white hover:bg-white/10"
                      >
                        Limpiar filtros
                      </Button>
                    </div>
                  )}

                  {/* Utility Actions */}
                  <div className="mt-4 flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetToSampleData}
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Restaurar Datos
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAllItems}
                      className="border-red-300 text-red-300 hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Limpiar Todo
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Items List */}
          <FadeIn delay={0.2}>
            <Suspense fallback={<LoadingSpinner />}>
              <ItemList
                items={items}
                isLoading={isLoading}
                onEdit={handleEditItem}
                onDelete={handleDeleteItemClick}
              />
            </Suspense>
          </FadeIn>
        </FadeIn>
      </div>

      {/* Create Form Modal */}
      <Suspense fallback={<LoadingSpinner />}>
        <ItemForm
          isOpen={showCreateForm}
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreateItem}
          isLoading={isLoading}
          mode="create"
        />
      </Suspense>

      {/* Edit Form Modal */}
      <Suspense fallback={<LoadingSpinner />}>
        <ItemForm
          item={selectedItem}
          isOpen={showEditForm}
          onClose={() => {
            setShowEditForm(false);
            setSelectedItem(null);
          }}
          onSubmit={handleUpdateItem}
          isLoading={isLoading}
          mode="edit"
        />
      </Suspense>

      {/* Delete Confirmation Dialog */}
      <Suspense fallback={<LoadingSpinner />}>
        <DeleteDialog
          item={selectedItem}
          isOpen={showDeleteDialog}
          onClose={() => {
            setShowDeleteDialog(false);
            setSelectedItem(null);
          }}
          onConfirm={handleDeleteItem}
          isLoading={isLoading}
        />
      </Suspense>
    </Background>
  );
}