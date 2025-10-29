export async function uploadMedia(fileInputElement: HTMLInputElement) {
    const file = fileInputElement.files?.[0];
    if (!file) { return; }
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/media-upload', {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
    }

    return await response.json();
}
