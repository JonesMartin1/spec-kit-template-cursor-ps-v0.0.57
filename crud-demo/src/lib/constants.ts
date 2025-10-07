import { Item, ItemCategory, Priority, ItemStatus } from './types';

/**
 * Sample items for demonstration purposes
 * Based on data-model.md specification
 */
export const SAMPLE_ITEMS: Item[] = [
  {
    id: 'demo-1',
    name: 'Ejemplo de Tarea',
    description: 'Esta es una tarea de ejemplo para demostrar las operaciones CRUD básicas. Muestra cómo crear, leer, actualizar y eliminar elementos.',
    category: ItemCategory.DEMO,
    priority: Priority.HIGH,
    status: ItemStatus.ACTIVE,
    createdAt: new Date('2025-01-16T10:00:00Z'),
    updatedAt: new Date('2025-01-16T10:00:00Z')
  },
  {
    id: 'demo-2',
    name: 'Elemento Completado',
    description: 'Este elemento está marcado como completado para mostrar diferentes estados en el sistema.',
    category: ItemCategory.EXAMPLE,
    priority: Priority.MEDIUM,
    status: ItemStatus.COMPLETED,
    createdAt: new Date('2025-01-16T09:00:00Z'),
    updatedAt: new Date('2025-01-16T11:00:00Z')
  },
  {
    id: 'demo-3',
    name: 'Tarea Urgente',
    description: 'Una tarea con prioridad urgente para demostrar la clasificación por prioridad.',
    category: ItemCategory.TEST,
    priority: Priority.URGENT,
    status: ItemStatus.DRAFT,
    createdAt: new Date('2025-01-16T08:30:00Z'),
    updatedAt: new Date('2025-01-16T08:30:00Z')
  },
  {
    id: 'demo-4',
    name: 'Elemento Archivado',
    description: 'Este elemento ha sido archivado para mostrar el flujo completo de estados.',
    category: ItemCategory.SAMPLE,
    priority: Priority.LOW,
    status: ItemStatus.ARCHIVED,
    createdAt: new Date('2025-01-16T07:00:00Z'),
    updatedAt: new Date('2025-01-16T12:00:00Z')
  },
  {
    id: 'demo-5',
    name: 'Demostración de Spec-Driven Development',
    description: 'Este elemento demuestra cómo cada requisito de la especificación se traduce en funcionalidad real del sistema.',
    category: ItemCategory.DEMO,
    priority: Priority.HIGH,
    status: ItemStatus.ACTIVE,
    createdAt: new Date('2025-01-16T11:30:00Z'),
    updatedAt: new Date('2025-01-16T11:30:00Z')
  }
];

/**
 * Default values for new items
 */
export const DEFAULT_ITEM_VALUES = {
  category: ItemCategory.DEMO,
  priority: Priority.MEDIUM,
  status: ItemStatus.DRAFT,
  description: ''
} as const;

/**
 * Application constants
 */
export const APP_CONSTANTS = {
  MAX_ITEMS_PER_SESSION: 100,
  MAX_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  STORAGE_KEY: 'crud-demo-items',
  ANIMATION_DURATION: 300,
  TOAST_DURATION: 3000,
  DEBOUNCE_DELAY: 300
} as const;

/**
 * Priority colors for UI display
 */
export const PRIORITY_COLORS = {
  [Priority.LOW]: {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-700 dark:text-gray-300',
    border: 'border-gray-300 dark:border-gray-600'
  },
  [Priority.MEDIUM]: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-300 dark:border-blue-600'
  },
  [Priority.HIGH]: {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-700 dark:text-orange-300',
    border: 'border-orange-300 dark:border-orange-600'
  },
  [Priority.URGENT]: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-300 dark:border-red-600'
  }
} as const;

/**
 * Status colors for UI display
 */
export const STATUS_COLORS = {
  [ItemStatus.DRAFT]: {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-700 dark:text-gray-300',
    border: 'border-gray-300 dark:border-gray-600'
  },
  [ItemStatus.ACTIVE]: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-300',
    border: 'border-green-300 dark:border-green-600'
  },
  [ItemStatus.COMPLETED]: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-300 dark:border-blue-600'
  },
  [ItemStatus.ARCHIVED]: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-300 dark:border-purple-600'
  }
} as const;

/**
 * Category display names
 */
export const CATEGORY_LABELS = {
  [ItemCategory.DEMO]: 'Demostración',
  [ItemCategory.EXAMPLE]: 'Ejemplo',
  [ItemCategory.SAMPLE]: 'Muestra',
  [ItemCategory.TEST]: 'Prueba'
} as const;

/**
 * Priority display names
 */
export const PRIORITY_LABELS = {
  [Priority.LOW]: 'Baja',
  [Priority.MEDIUM]: 'Media',
  [Priority.HIGH]: 'Alta',
  [Priority.URGENT]: 'Urgente'
} as const;

/**
 * Status display names
 */
export const STATUS_LABELS = {
  [ItemStatus.DRAFT]: 'Borrador',
  [ItemStatus.ACTIVE]: 'Activo',
  [ItemStatus.COMPLETED]: 'Completado',
  [ItemStatus.ARCHIVED]: 'Archivado'
} as const;

/**
 * Validation messages
 */
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'Este campo es obligatorio',
  NAME_TOO_LONG: `El nombre no puede exceder ${APP_CONSTANTS.MAX_NAME_LENGTH} caracteres`,
  DESCRIPTION_TOO_LONG: `La descripción no puede exceder ${APP_CONSTANTS.MAX_DESCRIPTION_LENGTH} caracteres`,
  DUPLICATE_NAME: 'Ya existe un elemento con este nombre en la misma categoría',
  INVALID_CATEGORY: 'Categoría inválida',
  INVALID_PRIORITY: 'Prioridad inválida',
  INVALID_STATUS: 'Estado inválido',
  MAX_ITEMS_REACHED: `No se pueden crear más de ${APP_CONSTANTS.MAX_ITEMS_PER_SESSION} elementos por sesión`
} as const;

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  ITEM_CREATED: 'Elemento creado exitosamente',
  ITEM_UPDATED: 'Elemento actualizado exitosamente',
  ITEM_DELETED: 'Elemento eliminado exitosamente',
  DATA_EXPORTED: 'Datos exportados exitosamente',
  DATA_IMPORTED: 'Datos importados exitosamente',
  DATA_CLEARED: 'Todos los datos han sido eliminados'
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  GENERIC_ERROR: 'Ha ocurrido un error inesperado',
  STORAGE_ERROR: 'Error al acceder al almacenamiento local',
  NETWORK_ERROR: 'Error de conexión',
  VALIDATION_ERROR: 'Error de validación',
  ITEM_NOT_FOUND: 'Elemento no encontrado',
  OPERATION_FAILED: 'La operación no pudo completarse'
} as const;
