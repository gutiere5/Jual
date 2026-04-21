import './item-details.css';
import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router';
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Edit,
  Package,
  Save,
  TrendingDown,
  TrendingUp,
  X,
  XCircle,
} from 'lucide-react';
import { Category, UnitOfMeasure, Item } from '@repo/types/item.schema';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { itemQueryOptions, updateItemMutationOptions } from '../../api/query-client';

function ItemDetails() {
  const itemId = useParams().itemId;
  const { data: item } = useSuspenseQuery(itemQueryOptions(Number(itemId)));
  const [currentItem, setCurrentItem] = useState(item);
  const updateMutation = useMutation(updateItemMutationOptions());
  const [isEditing, setIsEditing] = useState(false);

  const isLowStock = item.quantity_remaining < (item.low_stock_threshold ?? 0);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isExpiringSoon = (expirationDate: string) => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return new Date(expirationDate) <= thirtyDaysFromNow;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCurrentItem({ ...currentItem, image_url: imageUrl });
    }
  };

  const handleUpdateItem = () => {
    try {
      updateMutation.mutate(currentItem);
      setIsEditing(false); // only close on success
      return { success: true, message: 'Item Updated Successfully' };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to update item. Please try again.';
      throw new Error(errorMessage);
    }
  };

  return (
    <div className="item-details-container">
      {/* Alert Message */}
      {updateMutation.isError && isEditing && (
        <div className="alert alert-error">
          <AlertTriangle className="icon-small" />
          {updateMutation.error.message}
        </div>
      )}

      {updateMutation.isSuccess && !isEditing && (
        <div className="alert alert-success">
          <CheckCircle className="icon-small" />
          {updateMutation.status === 'success' && 'Item updated successfully!'}
        </div>
      )}

      {/* Header */}
      <div className="item-details-header">
        <div className="header-left">
          <NavLink to="/">
            <button>
              <ArrowLeft />
            </button>
          </NavLink>

          <div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  className="edit-title-input"
                  defaultValue={currentItem.name}
                  required
                  onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                />
              ) : (
                <h1 style={{ margin: 0 }}>{item.name}</h1>
              )}
              {isLowStock && (
                <span className="badge badge-warning">
                  <AlertTriangle className="icon-small" />
                  Low Stock
                </span>
              )}
            </div>
            <h2 className="header-subtitle">Item Details & Inventory Management</h2>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {isEditing ? (
            <>
              <button
                key="save-btn"
                className="action-button save-button"
                disabled={updateMutation.isPending}
                onClick={() => {
                  handleUpdateItem();
                }}
              >
                <Save className="icon-small" />
                {updateMutation.isPending ? 'Saving...' : 'Save'}
              </button>

              <button
                key="cancel-btn"
                type="button"
                className="action-button cancel-button"
                onClick={() => setIsEditing(false)}
              >
                <X className="icon-small" />
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className="action-button" onClick={() => setIsEditing(true)}>
                <Edit className="icon-small" />
                Edit
              </button>

              <button className="action-button">
                <Download className="icon-small" />
                Export
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Item Information Card */}

      <div className="cards-grid">
        {/* Stock Batches Card */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <Package className="icon-medium" />
              Stock Batches
            </h2>
            <p className="card-description">Current inventory batches and expiration dates</p>
          </div>
          <div className="card-content">
            {item.stock_batch && item.stock_batch.length > 0 ? (
              <div className="batches-list">
                {item.stock_batch.map((batch, index) => {
                  const expiringSoon = isExpiringSoon(batch.expiration_date);
                  return (
                    <div
                      key={index}
                      className={`batch-item ${expiringSoon ? 'batch-expiring' : ''}`}
                    >
                      <div className="batch-header">
                        <div className="batch-title-row">
                          <p className="batch-number">Batch #{index + 1}</p>
                          {expiringSoon && (
                            <span className="badge badge-warning-small">
                              <Clock className="icon-tiny" />
                              Expiring Soon
                            </span>
                          )}
                        </div>
                        <p className="batch-quantity">
                          {batch.quantity_remaining} {item.uom}
                        </p>
                      </div>
                      <div className="batch-date">
                        <Calendar className="icon-small" />
                        <span>Expires: {formatDate(batch.expiration_date)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <Package className="empty-icon" />
                <p>No stock batches available</p>
              </div>
            )}
          </div>
        </div>

        {/* Transactions Card */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <TrendingUp className="icon-medium" />
              Recent Transactions
            </h3>
            <p className="card-description">Inventory movement history</p>
          </div>
          <div className="card-content">
            {currentItem.transaction && currentItem.transaction.length > 0 ? (
              <div className="transactions-list">
                {currentItem.transaction.map((t, index) => {
                  const isInbound =
                    t.type.toLowerCase().includes('in') || t.type.toLowerCase().includes('receive');
                  return (
                    <div key={index} className="transaction-item">
                      <div className="transaction-left">
                        <div
                          className={`transaction-icon ${isInbound ? 'icon-inbound' : 'icon-outbound'}`}
                        >
                          {isInbound ? (
                            <TrendingUp className="icon-small" />
                          ) : (
                            <TrendingDown className="icon-small" />
                          )}
                        </div>
                        <div className="transaction-details">
                          <p className="transaction-type">{t.type}</p>
                          <div className="transaction-date">
                            <Calendar className="icon-tiny" />
                            <span>{formatDate(t.transaction_date)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="transaction-right">
                        <p
                          className={`transaction-amount ${isInbound ? 'amount-inbound' : 'amount-outbound'}`}
                        >
                          {isInbound ? '+' : '-'}
                          {Math.abs(t.quantity)} {currentItem.uom}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <TrendingUp className="empty-icon" />
                <p>No transactions recorded</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Waste Tracking Card */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <XCircle className="icon-medium" />
            Waste Records
          </h3>
          <p className="card-description">Track damaged, expired, or discarded inventory</p>
        </div>
        <div className="card-content">
          {currentItem.waste && currentItem.waste.length > 0 ? (
            <div className="transactions-list">
              {currentItem.waste.map((waste, index) => (
                <div key={index} className="transaction-item">
                  <div className="transaction-left">
                    <div className="transaction-icon icon-outbound">
                      <XCircle className="icon-small" />
                    </div>
                    <div className="transaction-details">
                      <p className="transaction-type">{waste.reason}</p>
                      <div className="transaction-date">
                        <Calendar className="icon-tiny" />
                        <span>{formatDate(waste.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="transaction-right">
                    <p className="transaction-amount amount-outbound">
                      -{waste.quantity} {currentItem.uom}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <XCircle className="empty-icon" />
              <p>No waste records found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;

// 440 lines
