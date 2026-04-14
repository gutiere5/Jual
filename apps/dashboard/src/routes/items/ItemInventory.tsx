import { redirect, type LoaderFunctionArgs } from 'react-router';
import { Grid3x3, List, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import './ItemInventory.css';
// import type { Item } from '@repo/types/item.schema';
import { useQuery } from '@tanstack/react-query';
import { listItemsQueryOptions } from '../../api/query-client';
import GridView from './grid-view';

export const inventoryItemsAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const itemId = formData.get('itemId') as string;

  return redirect(`/items/${itemId}`);
};

const ItemInventoryContainer = () => {
  const { data: items, isPending } = useQuery(listItemsQueryOptions());
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredItems = useMemo(() => {
    if (!items) return [];
    if (!searchQuery.trim()) {
      return items;
    }

    const query = searchQuery.toLowerCase();
    return items.filter((item) => item.name.toLowerCase().includes(query));
  }, [items, searchQuery]);

  // const getStockStatus = (quantity: number) => {
  //   if (quantity === 0) return { label: 'Out of Stock', variant: 'destructive' };
  //   if (quantity < 20) return { label: 'Low Stock', variant: 'outline' };
  //   return { label: 'In Stock', variant: 'secondary' };
  // };

  return (
    <main>
      <div className="inventory-header">
        <div className="inventory-details">
          <h1 className="inventory-header-title ">Inventory Management</h1>
          <p>Manage Stock and Item Details</p>
        </div>
        <div className="inventory-view-toggles">
          <button
            onClick={() => setViewMode('grid')}
            className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            aria-label="Grid View"
          >
            <Grid3x3 />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            aria-label="List View"
          >
            <List />
          </button>
        </div>
      </div>

      <div className="inventory-search-container">
        <Search className="inventory-search-icon" />
        <input
          type="text"
          placeholder="Search by name, category, or SKU..."
          className="inventory-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="inventory-content">
        {/* Item Grid/List */}
        {viewMode === 'grid' ? (
          <GridView filteredItems={filteredItems} isPending={isPending} />
        ) : (
          <p>List View Coming Soon</p>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="inventory-empty-state">
            <h3>No items found</h3>
            <p>Try adjusting your search to find what you&apos;re looking for</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ItemInventoryContainer;

// 180 Lines
