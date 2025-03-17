const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/"

interface UploadResponse {
    message: string,
    results_dir: string
}

interface SpriteSheetResponse {
    message: string
    results_dir: string
    frame_paths: string[]
}

export async function getSprite(file: File): Promise<UploadResponse | null> {
    const API = BACKEND_URL + 'user/create-sprite'
    const formData = new FormData()
    formData.append("img", file)
    try {
        const response = await fetch(API, {
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

export async function getSpriteSheet(animationType: string): Promise<SpriteSheetResponse | null> {
    const API = BACKEND_URL + 'user/create-animation'
    try {
        const response = await fetch(API, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "animationType": animationType
            })
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`)
        }

        const result: SpriteSheetResponse = await response.json();
        console.log('Upload Successful: ', result)
        return result
    } catch (error) {
        console.error('Failed to Get Sprite Sheet:', error);
        return null
    }
}