import React from 'react';
import { Upload, X } from 'lucide-react';

interface FileUploadProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  value?: File[];
  onChange: (files: File[]) => void;
  maxSize?: number; // in MB
  previewUrls?: string[];
  onRemove?: (index: number) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label = 'Upload Images',
  accept = 'image/*',
  multiple = false,
  value = [],
  onChange,
  maxSize = 5,
  previewUrls = [],
  onRemove
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate file sizes
    const validFiles = files.filter(file => {
      const sizeMB = file.size / 1024 / 1024;
      if (sizeMB > maxSize) {
        alert(`File ${file.name} is too large. Max size is ${maxSize}MB`);
        return false;
      }
      return true;
    });

    onChange(multiple ? [...value, ...validFiles] : validFiles);
  };

  const handleRemove = (index: number) => {
    if (onRemove) {
      onRemove(index);
    } else {
      const newFiles = value.filter((_, i) => i !== index);
      onChange(newFiles);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors cursor-pointer">
          <div className="space-y-2 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                <span>Upload files</span>
                <input
                  type="file"
                  className="sr-only"
                  accept={accept}
                  multiple={multiple}
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              {accept} up to {maxSize}MB
            </p>
          </div>
        </div>
      </label>

      {/* Preview existing images */}
      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Preview new files */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {value.map((file, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-32 object-cover rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={() => handleRemove(previewUrls.length + index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 rounded-b-lg truncate">
                {file.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
