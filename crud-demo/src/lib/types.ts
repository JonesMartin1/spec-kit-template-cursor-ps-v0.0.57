// Core entities from data-model.md

export enum ItemCategory {
  DEMO = "demo",
  EXAMPLE = "example", 
  SAMPLE = "sample",
  TEST = "test"
}

export enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent"
}

export enum ItemStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  COMPLETED = "completed",
  ARCHIVED = "archived"
}

export interface Item {
  id: string;
  name: string;
  description: string;
  category: ItemCategory;
  priority: Priority;
  status: ItemStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Data Operations Interfaces

export interface CreateItemRequest {
  name: string;
  description?: string;
  category?: ItemCategory;
  priority?: Priority;
}

export interface CreateItemResponse {
  item: Item;
  success: boolean;
  message: string;
}

export interface ReadItemsResponse {
  items: Item[];
  total: number;
  success: boolean;
}

export interface ReadItemResponse {
  item: Item | null;
  success: boolean;
  message?: string;
}

export interface UpdateItemRequest {
  id: string;
  name?: string;
  description?: string;
  category?: ItemCategory;
  priority?: Priority;
  status?: ItemStatus;
}

export interface UpdateItemResponse {
  item: Item;
  success: boolean;
  message: string;
}

export interface DeleteItemRequest {
  id: string;
  confirmDelete: boolean;
}

export interface DeleteItemResponse {
  success: boolean;
  message: string;
  deletedItemId: string;
}

// State Management Types

export interface FilterState {
  category?: ItemCategory;
  status?: ItemStatus;
  priority?: Priority;
}

export interface SortState {
  field: keyof Item;
  direction: 'asc' | 'desc';
}

export interface UIState {
  isLoading: boolean;
  selectedItem: Item | null;
  showCreateForm: boolean;
  showEditForm: boolean;
  showDeleteDialog: boolean;
  filter: FilterState;
  sort: SortState;
}

export interface ToastNotification {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export interface AppState {
  items: Item[];
  ui: UIState;
  notifications: ToastNotification[];
}

// State Actions

export type AppAction =
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

// Error Types

export interface ValidationError {
  field: keyof Item;
  message: string;
  code: string;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
}

// Storage Service Interface

export interface StorageService {
  saveItems(items: Item[]): void;
  loadItems(): Item[];
  clearItems(): void;
  exportItems(): string;
  importItems(data: string): Item[];
}
