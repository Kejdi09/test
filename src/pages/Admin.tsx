import { useState } from 'react';
import { useTranslation } from '@/context/LanguageContext';
import Layout from '@/components/layout/Layout';

const Admin = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'dresses',
    image: '',
    description: '',
    colors: '',
    sizes: '',
    featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const colorsArray = formData.colors
        .split(',')
        .map((c) => c.trim())
        .filter((c) => c);
      const sizesArray = formData.sizes
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s);

      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        description: formData.description,
        colors: colorsArray,
        sizes: sizesArray,
        featured: formData.featured,
        inStock: true,
        images: [{
          url: formData.image,
          alt: formData.name,
          isPrimary: true
        }]
      };

      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify(productData));

      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add product');
      }

      const result = await response.json();
      setMessageType('success');
      setMessage('Product added successfully!');
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        category: 'dresses',
        image: '',
        description: '',
        colors: '',
        sizes: '',
        featured: false,
      });
    } catch (error) {
      setMessageType('error');
      setMessage(error instanceof Error ? error.message : 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center">
            {t.addProductTitle}
          </h1>
          <p className="text-center text-muted-foreground mb-12">
            Add new products to your store
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 bg-muted/50 p-8 rounded-lg border border-border">
            {message && (
              <div
                className={`p-4 rounded-lg text-sm ${
                  messageType === 'success'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {message}
              </div>
            )}

            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                {t.productName} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="e.g., Green Embroidered Dress"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-2">
                {t.productPrice} (€) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                step="0.01"
                placeholder="99.99"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">
                {t.productCategory} *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              >
                <option value="dresses">{t.dresses}</option>
                <option value="tops">{t.tops}</option>
                <option value="skirts">{t.skirts}</option>
                <option value="jackets">{t.jackets}</option>
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-2">
                {t.productImage} (URL) *
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                {t.productDescription}
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your product..."
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>

            {/* Colors */}
            <div>
              <label htmlFor="colors" className="block text-sm font-medium mb-2">
                {t.color} (comma-separated)
              </label>
              <input
                type="text"
                id="colors"
                name="colors"
                value={formData.colors}
                onChange={handleInputChange}
                placeholder="e.g., Green, Sage, Forest"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Sizes */}
            <div>
              <label htmlFor="sizes" className="block text-sm font-medium mb-2">
                {t.size} (comma-separated)
              </label>
              <input
                type="text"
                id="sizes"
                name="sizes"
                value={formData.sizes}
                onChange={handleInputChange}
                placeholder="e.g., XS, S, M, L, XL"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary"
              />
              <label htmlFor="featured" className="text-sm font-medium cursor-pointer">
                Feature this product on homepage
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Adding...' : t.addButton}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
