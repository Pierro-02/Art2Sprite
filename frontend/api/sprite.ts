interface UploadResponse {
    message: string,
    results_dir: string
}

export async function getSprite(file: File): Promise<UploadResponse | null> {
    const formData = new FormData()
    formData.append("img", file)
    try {
        const response = await fetch('http://localhost:8000/user/create-sprite', {
            method: 'POST',
            body: formData
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result: UploadResponse = await response.json();
        console.log('Upload Successful:', result)
        return result;
    } catch (error) {
        console.error('Failed to Get Sprite:', error);
        return null
    }
}