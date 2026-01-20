import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Modal } from '../../components/admin/Modal';
import { FileUpload } from '../../components/admin/FileUpload';
import { Edit, Save, X } from 'lucide-react';
import { apiClient } from '../../lib/api';
import { toast } from 'sonner';

interface WebsiteImage {
  section: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
}

const sections = [
  { id: 'hero', name: 'Hero Section', description: 'Main banner on homepage' },
  { id: 'banner', name: 'Banner', description: 'Secondary promotional banner' },
  { id: 'promotion', name: 'Promotion', description: 'Special offers section' },
  { id: 'category', name: 'Category', description: 'Category feature image' },
  { id: 'about', name: 'About', description: 'About page banner' }
];

export const AdminWebsiteImages: React.FC = () => {
  const [images, setImages] = useState<Record<string, WebsiteImage>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    ctaText: '',
    ctaLink: '',
    isActive: true
  });
  const [newImage, setNewImage] = useState<File[]>([]);

  useEffect(() => {
    fetchWebsiteImages();
  }, []);

  const fetchWebsiteImages = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.getWebsiteImages();
      const imagesMap: Record<string, WebsiteImage> = {};
      response.data.images.forEach((img: WebsiteImage) => {
        imagesMap[img.section] = img;
      });
      setImages(imagesMap);
    } catch (error) {
      toast.error('Failed to fetch website images');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (section: string) => {
    setEditingSection(section);
    const existingImage = images[section];
    
    if (existingImage) {
      setFormData({
        title: existingImage.title || '',
        subtitle: existingImage.subtitle || '',
        ctaText: existingImage.ctaText || '',
        ctaLink: existingImage.ctaLink || '',
        isActive: existingImage.isActive
      });
    } else {
      setFormData({
        title: '',
        subtitle: '',
        ctaText: '',
        ctaLink: '',
        isActive: true
      });
    }
    
    setNewImage([]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSection(null);
    setNewImage([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('section', editingSection);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('subtitle', formData.subtitle);
      formDataToSend.append('ctaText', formData.ctaText);
      formDataToSend.append('ctaLink', formData.ctaLink);
      formDataToSend.append('isActive', String(formData.isActive));

      if (newImage.length > 0) {
        formDataToSend.append('image', newImage[0]);
      } else if (images[editingSection]) {
        formDataToSend.append('imageUrl', images[editingSection].imageUrl);
      }

      await apiClient.updateWebsiteImage(formDataToSend);
      toast.success('Website image updated successfully');
      handleCloseModal();
      fetchWebsiteImages();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update website image');
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Website Images</h1>
          <p className="text-gray-600">Manage images displayed on your website</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const image = images[section.id];
            
            return (
              <div key={section.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="aspect-video bg-gray-100 relative">
                  {image?.imageUrl ? (
                    <img
                      src={image.imageUrl}
                      alt={section.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <div className="text-center">
                        <X className="w-12 h-12 mx-auto mb-2" />
                        <p>No image set</p>
                      </div>
                    </div>
                  )}
                  
                  {image && !image.isActive && (
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                        Inactive
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{section.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                  
                  {image && (
                    <div className="mt-3 space-y-1">
                      {image.title && (
                        <p className="text-sm">
                          <span className="font-medium">Title:</span> {image.title}
                        </p>
                      )}
                      {image.subtitle && (
                        <p className="text-sm text-gray-600 line-clamp-1">
                          <span className="font-medium">Subtitle:</span> {image.subtitle}
                        </p>
                      )}
                      {image.ctaText && (
                        <p className="text-sm">
                          <span className="font-medium">CTA:</span> {image.ctaText}
                        </p>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => handleOpenModal(section.id)}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {image ? (
                      <>
                        <Edit className="w-4 h-4" />
                        Edit
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Set Image
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Edit ${sections.find(s => s.id === editingSection)?.name}`}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Call-to-Action Text
              </label>
              <input
                type="text"
                value={formData.ctaText}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                placeholder="e.g., Shop Now"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Call-to-Action Link
              </label>
              <input
                type="text"
                value={formData.ctaLink}
                onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                placeholder="e.g., /shop"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Active (display on website)</span>
            </label>
          </div>

          <FileUpload
            label="Image"
            multiple={false}
            value={newImage}
            onChange={setNewImage}
            previewUrls={editingSection && images[editingSection] ? [images[editingSection].imageUrl] : []}
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
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};
