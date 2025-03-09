interface UploadResponse {
    message: string,
    results_dir: string
}

export async function getSprite(file: string): Promise<UploadResponse | null> {
    try {
        const response = await fetch('http://localhost:8000/run-inference', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ file: file })
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