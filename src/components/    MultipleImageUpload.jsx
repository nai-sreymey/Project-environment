import React, { useRef, useState } from 'react';

const MultipleImageUpload = ({ onImagesChange }) => {
    const inputRef = useRef(null);
    const [previewImages, setPreviewImages] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));
        setPreviewImages(previews);
        onImagesChange(files);
    };

    const removeImage = (index) => {
        const updated = [...previewImages];
        updated.splice(index, 1);
        setPreviewImages(updated);
        onImagesChange(updated.map(pre => pre.file));
    };

    return (
        <div>
            <input
                type="file"
                multiple
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />
            <button
                type="button"
                onClick={() => inputRef.current.click()}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Upload Images
            </button>

            <div className="grid grid-cols-3 gap-4 mt-4">
                {previewImages.map((img, index) => (
                    <div key={index} className="relative">
                        <img src={img.url} alt={`preview-${index}`} className="w-full h-32 object-cover rounded" />
                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-600 text-white text-sm rounded-full w-6 h-6"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MultipleImageUpload;   
