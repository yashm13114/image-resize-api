import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import axios from "axios";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get("url");
    const width = searchParams.get("width");
    const height = searchParams.get("height");

    if (!url) {
        return new NextResponse("URL parameter is required", { status: 400 });
    }

    try {
        // Download the image
        const response = await axios.get(url, { responseType: "arraybuffer" });
        const buffer = Buffer.from(response.data);

        // Detect image format
        const metadata = await sharp(buffer).metadata();
        const format = metadata.format;

        if (!format || !["png", "jpg", "jpeg", "gif"].includes(format)) {
            return new NextResponse("Unsupported image format", { status: 400 });
        }

        // Resize the image
        let resizedImage = sharp(buffer).resize({
            width: width ? parseInt(width) : undefined,
            height: height ? parseInt(height) : undefined,
            fit: "contain",
        });

        // Convert to the original format
        switch (format) {
            case "png":
                resizedImage = resizedImage.png();
                break;
            case "jpg":
            case "jpeg":
                resizedImage = resizedImage.jpeg();
                break;
            case "gif":
                resizedImage = resizedImage.gif();
                break;
        }

        const outputBuffer = await resizedImage.toBuffer();

        // Return the resized image
        return new NextResponse(outputBuffer, {
            headers: {
                "Content-Type": `image/${format}`,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("An error occurred while processing the image", { status: 500 });
    }
}