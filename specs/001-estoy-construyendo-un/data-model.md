# Data Model: CRUD Interactivo

**Feature**: CRUD Interactivo para Demostración de Spec-Driven Development  
**Date**: 2025-01-16  
**Purpose**: Definir la estructura de datos y modelos para las operaciones CRUD

## Core Entities

### Item (Elemento Principal)

**Purpose**: Representa un elemento individual en el sistema CRUD para demostración

**Attributes**:
```typescript
interface Item {
  id: string;              // UUID único generado automáticamente
  name: string;            // Nombre del elemento (required, max 100 chars)
  description: string;     // Descripción detallada (optional, max 500 chars)
  category: ItemCategory;  // Categoría del elemento
  priority: Priority;      // Nivel de prioridad
  status: ItemStatus;      // Estado actual del elemento
  createdAt: Date;         // Fecha de creación (automática)
  updatedAt: Date;         // Fecha de última modificación (automática)
}
```

**Validation Rules**:
- `id`: UUID v4, único, generado automáticamente
- `name`: String no vacío, 1-100 caracteres, trim whitespace
- `description`: String opcional, máximo 500 caracteres
- `category`: Enum válido de ItemCategory
- `priority`: Enum válido de Priority
- `status`: Enum válido de ItemStatus
- `createdAt`: Date, automática al crear
- `updatedAt`: Date, automática al actualizar

**State Transitions**:
```
DRAFT → ACTIVE → COMPLETED
  ↓        ↓         ↓
ARCHIVED  ARCHIVED  ARCHIVED
```

### ItemCategory (Categorías)

**Purpose**: Clasificación de elementos para mejor organización

**Values**:
```typescript
enum ItemCategory {
  DEMO = "demo",           // Elementos de demostración
  EXAMPLE = "example",     // Ejemplos de uso
  SAMPLE = "sample",       // Muestras de datos
  TEST = "test"           // Elementos de prueba
}
```

**Business Rules**:
- Valor por defecto: `DEMO`
- No se puede eliminar una categoría si tiene elementos asociados
- Categorías son predefinidas (no se pueden crear nuevas)

### Priority (Prioridades)

**Purpose**: Nivel de importancia del elemento

**Values**:
```typescript
enum Priority {
  LOW = "low",             // Prioridad baja
  MEDIUM = "medium",       // Prioridad media
  HIGH = "high",           // Prioridad alta
  URGENT = "urgent"       // Prioridad urgente
}
```

**Business Rules**:
- Valor por defecto: `MEDIUM`
- Se muestra con colores diferentes en la UI
- Orden de importancia: LOW < MEDIUM < HIGH < URGENT

### ItemStatus (Estados)

**Purpose**: Estado actual del elemento en el flujo de trabajo

**Values**:
```typescript
enum ItemStatus {
  DRAFT = "draft",         // Borrador (recién creado)
  ACTIVE = "active",       // Activo (en uso)
  COMPLETED = "completed", // Completado
  ARCHIVED = "archived"   // Archivado
}
```

**Business Rules**:
- Valor por defecto: `DRAFT`
- Solo elementos ACTIVE se pueden editar
- Elementos COMPLETED no se pueden modificar
- Elementos ARCHIVED se pueden restaurar

## Data Operations

### Create Operation
```typescript
interface CreateItemRequest {
  name: string;
  description?: string;
  category?: ItemCategory;
  priority?: Priority;
}

interface CreateItemResponse {
  item: Item;
  success: boolean;
  message: string;
}
```

### Read Operation
```typescript
interface ReadItemsResponse {
  items: Item[];
  total: number;
  success: boolean;
}

interface ReadItemResponse {
  item: Item | null;
  success: boolean;
  message?: string;
}
```

### Update Operation
```typescript
interface UpdateItemRequest {
  id: string;
  name?: string;
  description?: string;
  category?: ItemCategory;
  priority?: Priority;
  status?: ItemStatus;
}

interface UpdateItemResponse {
  item: Item;
  success: boolean;
  message: string;
}
```

### Delete Operation
```typescript
interface DeleteItemRequest {
  id: string;
  confirmDelete: boolean;
}

interface DeleteItemResponse {
  success: boolean;
  message: string;
  deletedItemId: string;
}
```

## State Management

### Application State Structure
```typescript
interface AppState {
  items: Item[];
  ui: {
    isLoading: boolean;
    selectedItem: Item | null;
    showCreateForm: boolean;
    showEditForm: boolean;
    showDeleteDialog: boolean;
    filter: {
      category?: ItemCategory;
      status?: ItemStatus;
      priority?: Priority;
    };
    sort: {
      field: keyof Item;
      direction: 'asc' | 'desc';
    };
  };
  notifications: ToastNotification[];
}
```

### State Actions
```typescript
type AppAction =
  | { type: 'CREATE_ITEM'; payload: CreateItemRequest }
  | { type: 'CREATE_ITEM_SUCCESS'; payload: Item }
  | { type: 'CREATE_ITEM_ERROR'; payload: string }
  | { type: 'UPDATE_ITEM'; payload: UpdateItemRequest }
  | { type: 'UPDATE_ITEM_SUCCESS'; payload: Item }
  | { type: 'UPDATE_ITEM_ERROR'; payload: string }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'DELETE_ITEM_SUCCESS'; payload: string }
  | { type: 'DELETE_ITEM_ERROR'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SELECTED_ITEM'; payload: Item | null }
  | { type: 'TOGGLE_CREATE_FORM'; payload: boolean }
  | { type: 'TOGGLE_EDIT_FORM'; payload: boolean }
  | { type: 'TOGGLE_DELETE_DIALOG'; payload: boolean }
  | { type: 'SET_FILTER'; payload: FilterState }
  | { type: 'SET_SORT'; payload: SortState }
  | { type: 'ADD_NOTIFICATION'; payload: ToastNotification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string };
```

## Data Persistence

### Local Storage Strategy
```typescript
interface StorageService {
  saveItems(items: Item[]): void;
  loadItems(): Item[];
  clearItems(): void;
  exportItems(): string;
  importItems(data: string): Item[];
}
```

**Implementation**:
- `localStorage` como persistencia principal
- JSON serialization/deserialization
- Error handling para storage quota exceeded
- Data validation al cargar desde storage
- Backup/restore functionality para demostración

### Sample Data
```typescript
const SAMPLE_ITEMS: Item[] = [
  {
    id: 'demo-1',
    name: 'Ejemplo de Tarea',
    description: 'Esta es una tarea de ejemplo para demostrar las operaciones CRUD',
    category: ItemCategory.DEMO,
    priority: Priority.HIGH,
    status: ItemStatus.ACTIVE,
    createdAt: new Date('2025-01-16T10:00:00Z'),
    updatedAt: new Date('2025-01-16T10:00:00Z')
  },
  {
    id: 'demo-2',
    name: 'Elemento Completado',
    description: 'Este elemento está marcado como completado',
    category: ItemCategory.EXAMPLE,
    priority: Priority.MEDIUM,
    status: ItemStatus.COMPLETED,
    createdAt: new Date('2025-01-16T09:00:00Z'),
    updatedAt: new Date('2025-01-16T11:00:00Z')
  }
];
```

## Validation Rules

### Input Validation
- **Name**: Required, 1-100 characters, no special characters except spaces and hyphens
- **Description**: Optional, max 500 characters
- **Category**: Must be valid enum value
- **Priority**: Must be valid enum value
- **Status**: Must be valid enum value

### Business Rules
- No duplicate names within the same category
- Cannot delete item that is currently being edited
- Cannot edit item that is in COMPLETED status
- Cannot change status from ARCHIVED to ACTIVE without confirmation
- Maximum 100 items per session (demo limitation)

### Error Handling
```typescript
interface ValidationError {
  field: keyof Item;
  message: string;
  code: string;
}

interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
}
```

## Data Model Summary

**Entities**: 4 (Item, ItemCategory, Priority, ItemStatus)  
**Relationships**: Item belongs to one Category, has one Priority, has one Status  
**Operations**: 4 CRUD operations with full validation  
**Persistence**: Local storage with JSON serialization  
**State Management**: React useReducer with typed actions  
**Validation**: Client-side validation with business rules  
**Sample Data**: Pre-populated demo items for presentation
