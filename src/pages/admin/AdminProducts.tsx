import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DataTable } from '../../components/admin/DataTable';
import { Modal } from '../../components/admin/Modal';
import { FileUpload } from '../../components/admin/FileUpload';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { apiClient } from '../../lib/api';
import { toast } from 'sonner';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: Array<{ url: string; alt: string; isPrimary: boolean }>;
  colors: string[];
  sizes: string[];
  stock: number;
  featured: boolean;
  views: number;
  sales: number;
}

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 0 });

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'dresses',
    colors: '',
    sizes: '',
    stock: '',
    featured: false
  });
  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<Array<{ url: string; alt: string; isPrimary: boolean }>>([]);

  useEffect(() => {
    fetchProducts();
  }, [page, searchQuery, categoryFilter]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const params: any = { page, limit: 10 };
      if (searchQuery) params.search = searchQuery;
      if (categoryFilter) params.category = categoryFilter;

      const response = await apiClient.getProducts(params);
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (error: any) {
      toast.error('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        colors: product.colors.join(', '),
        sizes: product.sizes.join(', '),
        stock: product.stock.toString(),
        featured: product.featured
      });
      setExistingImages(product.images || []);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'dresses',
        colors: '',
        sizes: '',
        stock: '',
        featured: false
      });
      setExistingImages([]);
    }
    setNewImages([]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setNewImages([]);
    setExistingImages([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        colors: formData.colors.split(',').map(c => c.trim()).filter(Boolean),
        sizes: formData.sizes.split(',').map(s => s.trim()).filter(Boolean),
        stock: parseInt(formData.stock) || 0,
        featured: formData.featured
      };

      formDataToSend.append('data', JSON.stringify(productData));

      // Add new images
      newImages.forEach(file => {
        formDataToSend.append('images', file);
      });

      if (editingProduct) {
        await apiClient.updateProduct(editingProduct._id, formDataToSend);
        toast.success('Product updated successfully');
      } else {
        await apiClient.createProduct(formDataToSend);
        toast.success('Product created successfully');
      }

      handleCloseModal();
      fetchProducts();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save product');
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await apiClient.deleteProduct(productId);
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error: any) {
      toast.error('Failed to delete product');
    }
  };

  const handleRemoveImage = async (index: number) => {
    if (index < existingImages.length) {
      // Remove existing image
      if (editingProduct) {
        try {
          await apiClient.deleteProductImage(editingProduct._id, index);
          const updatedImages = existingImages.filter((_, i) => i !== index);
          setExistingImages(updatedImages);
          toast.success('Image removed successfully');
        } catch (error) {
          toast.error('Failed to remove image');
        }
      } else {
        const updatedImages = existingImages.filter((_, i) => i !== index);
        setExistingImages(updatedImages);
      }
    } else {
      // Remove new image
      const newIndex = index - existingImages.length;
      const updatedNewImages = newImages.filter((_, i) => i !== newIndex);
      setNewImages(updatedNewImages);
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Product',
      render: (product: Product) => (
        <div className="flex items-center gap-3">
          {product.images?.[0] && (
            <img 
              src={product.images[0].url} 
              alt={product.name}
              className="w-12 h-12 object-cover rounded"
            />
          )}
          <div>
            <div className="font-medium">{product.name}</div>
            <div className="text-xs text-gray-500">{product.category}</div>
          </div>
        </div>
      )
    },
    {
      key: 'price',
      label: 'Price',
      render: (product: Product) => `$${product.price.toFixed(2)}`
    },
    {
      key: 'stock',
      label: 'Stock',
      render: (product: Product) => (
        <span className={product.stock < 10 ? 'text-red-600 font-medium' : ''}>
          {product.stock}
        </span>
      )
    },
    {
      key: 'views',
      label: 'Views'
    },
    {
      key: 'sales',
      label: 'Sales'
    },
    {
      key: 'featured',
      label: 'Featured',
      render: (product: Product) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          product.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {product.featured ? 'Yes' : 'No'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (product: Product) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenModal(product);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(product._id);
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600">Manage your product inventory</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option value="dresses">Dresses</option>
              <option value="tops">Tops</option>
              <option value="skirts">Skirts</option>
              <option value="jackets">Jackets</option>
              <option value="accessories">Accessories</option>
              <option value="shoes">Shoes</option>
            </select>
          </div>
        </div>

        <DataTable
          data={products}
          columns={columns}
          isLoading={isLoading}
          emptyMessage="No products found"
          pagination={{
            page,
            pages: pagination.pages,
            total: pagination.total,
            onPageChange: setPage
          }}
        />
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="dresses">Dresses</option>
                <option value="tops">Tops</option>
                <option value="skirts">Skirts</option>
                <option value="jackets">Jackets</option>
                <option value="accessories">Accessories</option>
                <option value="shoes">Shoes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Featured Product</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Colors (comma separated)
              </label>
              <input
                type="text"
                value={formData.colors}
                onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                placeholder="e.g., Red, Blue, Black"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sizes (comma separated)
              </label>
              <input
                type="text"
                value={formData.sizes}
                onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                placeholder="e.g., S, M, L, XL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <FileUpload
            label="Product Images"
            multiple
            value={newImages}
            onChange={setNewImages}
            previewUrls={existingImages.map(img => img.url)}
            onRemove={handleRemoveImage}
          />

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingProduct ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};
