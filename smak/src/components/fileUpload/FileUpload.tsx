import { useState } from 'react';
import { uploadMedia } from '../fileUpload/MediaUploader';

export default function FileUpload() {
    const [uploadStatus, setUploadStatus] = useState('');
    const [uploadedUrl, setUploadedUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement;

        if (!fileInput.files?.[0]) {
            setUploadStatus('Please select a file');
            return;
        }

        setIsUploading(true);
        setUploadStatus('Uploading...');
        setUploadedUrl('');

        try {
            const result = await uploadMedia(fileInput);
            setUploadStatus(`Upload successful! File: ${result.fileName}`);
            setUploadedUrl(result.url);
            form.reset();
        } catch (error) {
            setUploadStatus(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="container">
            <h1>Media Upload</h1>

            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <input type="file" accept="image/*" disabled={isUploading} />
                </div>

                <button type="submit" disabled={isUploading} className="form-button">
                    {isUploading ? 'Uploading...' : 'Upload Image'}
                </button>
            </form>

            {uploadStatus && (
                <div className={`status-message ${uploadStatus.includes('failed') ? '' : 'status-success'}`}>
                    {uploadStatus}
                </div>
            )}

            {uploadedUrl && (
                <div>
                    <h3>Uploaded Image:</h3>
                    <img src={uploadedUrl} alt="Uploaded" className="uploaded-image" />
                    <p className="image-url">
                        URL: <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">{uploadedUrl}</a>
                    </p>
                </div>
            )}
        </div>
    );
}
