import React, { useState } from 'react';
import { Upload, Eye, Trash2, FileText, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface DocumentUploadProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  formData,
  setFormData,
  onNext,
  onPrevious
}) => {
  const { t } = useLanguage();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const documentTypes = [
    {
      key: 'passportPhoto',
      label: t('worker.passportPhoto'),
      accept: '.jpg,.jpeg',
      maxSize: 100, // MB
      required: true
    },
    {
      key: 'aadharCard',
      label: t('worker.aadharCard'),
      accept: '.jpg,.jpeg,.pdf',
      maxSize: 50, // MB
      required: true
    },
    {
      key: 'checkPassbook',
      label: t('worker.checkPassbook'),
      accept: '.jpg,.jpeg,.pdf',
      maxSize: 50, // MB
      required: true
    },
    {
      key: 'nresDocument',
      label: t('worker.nresDocument'),
      accept: '.jpg,.jpeg,.pdf',
      maxSize: 50, // MB
      required: formData.isNresWorker === 'yes'
    }
  ];

  const handleFileUpload = (documentKey: string, file: File, maxSize: number) => {
    const fileSizeMB = file.size / (1024 * 1024);
    
    if (fileSizeMB > maxSize) {
      setErrors({
        ...errors,
        [documentKey]: `File size should not exceed ${maxSize}MB`
      });
      return;
    }

    // Clear any existing error for this document
    const newErrors = { ...errors };
    delete newErrors[documentKey];
    setErrors(newErrors);

    // Store file information (in real app, you'd upload to server)
    setFormData({
      ...formData,
      documents: {
        ...formData.documents,
        [documentKey]: {
          file: file,
          name: file.name,
          size: fileSizeMB.toFixed(2),
          type: file.type,
          uploadedAt: new Date().toISOString()
        }
      }
    });
  };

  const handleFileRemove = (documentKey: string) => {
    const newDocuments = { ...formData.documents };
    delete newDocuments[documentKey];
    
    setFormData({
      ...formData,
      documents: newDocuments
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    documentTypes.forEach(docType => {
      if (docType.required && !formData.documents?.[docType.key]) {
        newErrors[docType.key] = `${docType.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const renderDocumentUpload = (docType: any) => {
    const document = formData.documents?.[docType.key];
    const hasError = errors[docType.key];

    return (
      <div key={docType.key} className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900">
            {docType.label}
            {docType.required && <span className="text-red-500 ml-1">*</span>}
          </h4>
          <span className="text-xs text-gray-500">
            Max: {docType.maxSize}MB | {docType.accept}
          </span>
        </div>

        {!document ? (
          <div>
            <label className={`block w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              hasError ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }`}>
              <input
                type="file"
                accept={docType.accept}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileUpload(docType.key, file, docType.maxSize);
                  }
                }}
                className="hidden"
              />
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Click to upload {docType.label.toLowerCase()}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: {docType.accept} (Max {docType.maxSize}MB)
              </p>
            </label>
            {hasError && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {hasError}
              </p>
            )}
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">{document.name}</p>
                  <p className="text-sm text-green-700">
                    {document.size}MB • Uploaded successfully
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    // In real app, this would open a preview modal
                    alert('Preview functionality would be implemented here');
                  }}
                  className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-lg"
                  title="Preview"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleFileRemove(docType.key)}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg"
                  title="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Upload className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">
          {t('worker.documentUpload')}
        </h2>
        <p className="text-gray-600 mt-2">
          Please upload the required documents for verification
        </p>
      </div>

      <div className="space-y-4">
        {documentTypes.map(renderDocumentUpload)}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-medium text-yellow-900 mb-2">Document Guidelines</h3>
        <ul className="text-yellow-800 text-sm space-y-1">
          <li>• Ensure documents are clear and readable</li>
          <li>• Upload original documents only</li>
          <li>• File names should not contain special characters</li>
          <li>• All documents will be verified by the department</li>
          <li>• Keep physical copies ready for verification if required</li>
        </ul>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
        >
          {t('common.previous')}
        </button>
        
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
        >
          {t('common.next')}
        </button>
      </div>
    </div>
  );
};

export default DocumentUpload;