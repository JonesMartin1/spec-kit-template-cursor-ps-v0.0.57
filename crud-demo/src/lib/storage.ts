import { Item, StorageService } from './types';

const STORAGE_KEY = 'crud-demo-items';

export class LocalStorageService implements StorageService {
  /**
   * Save items to localStorage
   */
  saveItems(items: Item[]): void {
    try {
      const serializedItems = JSON.stringify(items, (key, value) => {
        // Convert Date objects to ISO strings for storage
        if (key === 'createdAt' || key === 'updatedAt') {
          return value instanceof Date ? value.toISOString() : value;
        }
        return value;
      });
      
      localStorage.setItem(STORAGE_KEY, serializedItems);
    } catch (error) {
      console.error('Error saving items to localStorage:', error);
      throw new Error('Failed to save items to storage');
    }
  }

  /**
   * Load items from localStorage
   */
  loadItems(): Item[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return [];
      }

      const parsed = JSON.parse(stored);
      
      // Convert ISO strings back to Date objects and validate data
      const items: Item[] = parsed.map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      }));

      // Validate that all items have required properties
      return items.filter(this.isValidItem);
    } catch (error) {
      console.error('Error loading items from localStorage:', error);
      // Return empty array if storage is corrupted
      return [];
    }
  }

  /**
   * Clear all items from localStorage
   */
  clearItems(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing items from localStorage:', error);
      throw new Error('Failed to clear items from storage');
    }
  }

  /**
   * Export items as JSON string
   */
  exportItems(): string {
    try {
      const items = this.loadItems();
      return JSON.stringify(items, null, 2);
    } catch (error) {
      console.error('Error exporting items:', error);
      throw new Error('Failed to export items');
    }
  }

  /**
   * Import items from JSON string
   */
  importItems(data: string): Item[] {
    try {
      const parsed = JSON.parse(data);
      
      if (!Array.isArray(parsed)) {
        throw new Error('Invalid data format: expected array');
      }

      // Convert and validate imported items
      const items: Item[] = parsed.map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      }));

      // Filter out invalid items
      const validItems = items.filter(this.isValidItem);
      
      if (validItems.length !== items.length) {
        console.warn(`${items.length - validItems.length} invalid items were filtered out during import`);
      }

      // Save the valid items
      this.saveItems(validItems);
      
      return validItems;
    } catch (error) {
      console.error('Error importing items:', error);
      throw new Error('Failed to import items: invalid data format');
    }
  }

  /**
   * Check if localStorage is available
   */
  isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get storage usage information
   */
  getStorageInfo(): { used: number; available: number; percentage: number } {
    try {
      const items = this.loadItems();
      const serialized = JSON.stringify(items);
      const used = new Blob([serialized]).size;
      
      // Estimate available space (localStorage typically has 5-10MB limit)
      const estimated = 5 * 1024 * 1024; // 5MB
      const percentage = (used / estimated) * 100;
      
      return {
        used,
        available: estimated - used,
        percentage: Math.min(percentage, 100)
      };
    } catch {
      return { used: 0, available: 0, percentage: 0 };
    }
  }

  /**
   * Validate that an item has all required properties
   */
  private isValidItem(item: any): item is Item {
    return (
      item &&
      typeof item.id === 'string' &&
      typeof item.name === 'string' &&
      typeof item.description === 'string' &&
      typeof item.category === 'string' &&
      typeof item.priority === 'string' &&
      typeof item.status === 'string' &&
      item.createdAt instanceof Date &&
      item.updatedAt instanceof Date &&
      !isNaN(item.createdAt.getTime()) &&
      !isNaN(item.updatedAt.getTime())
    );
  }
}

// Create and export a singleton instance
export const storageService = new LocalStorageService();

// Export utility functions for direct use
export const saveItems = (items: Item[]) => storageService.saveItems(items);
export const loadItems = () => storageService.loadItems();
export const clearItems = () => storageService.clearItems();
export const exportItems = () => storageService.exportItems();
export const importItems = (data: string) => storageService.importItems(data);
