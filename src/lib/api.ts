// Determine sensible defaults when VITE_API_URL is missing (e.g., on Vercel)
const defaultApiUrl =
  typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')
    ? 'https://test-ikgy.onrender.com/api'
    : 'http://localhost:3001/api';

const API_URL = import.meta.env.VITE_API_URL || defaultApiUrl;
const BASE_URL = API_URL.replace('/api', ''); // Remove /api to get base URL

console.log('API URL:', API_URL);
console.log('Base URL:', BASE_URL);

class ApiClient {
  baseUrl: string;
  baseImageUrl: string;
  token: string | null;

  constructor() {
    this.baseUrl = API_URL;
    this.baseImageUrl = BASE_URL;
    this.token = localStorage.getItem('adminToken');
  }

  // Convert relative image path to absolute URL
  getImageUrl(imagePath: string | undefined): string {
    if (!imagePath) return 'https://via.placeholder.com/400x600?text=No+Image';
    if (imagePath.startsWith('http')) return imagePath; // Already absolute
    if (imagePath.startsWith('/')) return `${this.baseImageUrl}${imagePath}`; // Make absolute
    return imagePath; // Return as-is
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('adminToken', token);
    } else {
      localStorage.removeItem('adminToken');
    }
  }

  getHeaders(isFormData = false): Record<string, string> {
    const headers: Record<string, string> = {};
    
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  async request(endpoint: string, options: any = {}): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: this.getHeaders(options.isFormData)
    };

    console.log('Making request to:', url);

    try {
      const response = await fetch(url, config);
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response received:', text.substring(0, 200));
        throw new Error('Server returned non-JSON response. Make sure backend is running on port 3001');
      }
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(username: string, password: string) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    this.setToken(data.data.token);
    return data;
  }

  async register(email: string, password: string, name: string) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name })
    });
    this.setToken(data.data.token);
    return data;
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async logout() {
    await this.request('/auth/logout', { method: 'POST' });
    this.setToken(null);
  }

  // Product endpoints
  async getProducts(params: any = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/products${queryString ? `?${queryString}` : ''}`);
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`);
  }

  async createProduct(formData: FormData) {
    return this.request('/products', {
      method: 'POST',
      body: formData,
      isFormData: true
    });
  }

  async updateProduct(id: string, formData: FormData) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: formData,
      isFormData: true
    });
  }

  async deleteProduct(id: string) {
    return this.request(`/products/${id}`, { method: 'DELETE' });
  }

  async deleteProductImage(productId: string, imageIndex: number) {
    return this.request(`/products/${productId}/images/${imageIndex}`, { 
      method: 'DELETE' 
    });
  }

  // Message endpoints
  async getMessages(params: any = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/messages${queryString ? `?${queryString}` : ''}`);
  }

  async getMessage(id: string) {
    return this.request(`/messages/${id}`);
  }

  async createMessage(data: { name: string; email: string; subject: string; message: string }) {
    return this.request('/messages', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async markMessageAsRead(id: string, isRead: boolean) {
    return this.request(`/messages/${id}/read`, {
      method: 'PATCH',
      body: JSON.stringify({ isRead })
    });
  }

  async replyToMessage(id: string, reply: string) {
    return this.request(`/messages/${id}/reply`, {
      method: 'POST',
      body: JSON.stringify({ reply })
    });
  }

  async deleteMessage(id: string) {
    return this.request(`/messages/${id}`, { method: 'DELETE' });
  }

  // Website images endpoints
  async getWebsiteImages() {
    return this.request('/website-images');
  }

  async getWebsiteImage(section: string) {
    return this.request(`/website-images/${section}`);
  }

  async updateWebsiteImage(formData: FormData) {
    return this.request('/website-images', {
      method: 'POST',
      body: formData,
      isFormData: true
    });
  }

  async deleteWebsiteImage(section: string) {
    return this.request(`/website-images/${section}`, { method: 'DELETE' });
  }

  // Email verification + order request
  async sendEmailCode(email: string) {
    return this.request('/email/send-code', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async verifyEmailCode(email: string, code: string) {
    return this.request('/email/verify-code', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    });
  }

  async createOrderRequest(data: {
    token: string;
    email: string;
    items: any[];
    totals: { subtotal: number; shipping: number; total: number };
    note?: string;
  }) {
    return this.request('/orders/request', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getOrderRequests(limit = 100) {
    return this.request(`/orders?limit=${limit}`, {
      method: 'GET',
    });
  }

  // Analytics endpoints
  async getDashboardStats() {
    return this.request('/analytics/dashboard');
  }

  async getSalesAnalytics(period = '7d') {
    return this.request(`/analytics/sales?period=${period}`);
  }

  async getProductAnalytics() {
    return this.request('/analytics/products');
  }
}

export const apiClient = new ApiClient();
export default apiClient;
