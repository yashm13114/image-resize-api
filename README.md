# Image Resize API

This is an Image Resize API built with Next.js. It allows you to resize images by specifying the URL of the image and the desired dimensions.

## Features

- Resize images to specified width and height.
- Supports PNG, JPG, JPEG, and GIF formats.
- Caches the resized images for improved performance.

## Getting Started

### Prerequisites

- Node.js
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Code-Parth/image-resize-api.git
    cd image-resize-api
    ```

2. Install dependencies:

    ```sh
    pnpm install
    ```

### Running the Development Server

To start the development server, run:

```sh
pnpm dev
```

The server will be available at http://localhost:3000.

Building for Production
To build the project for production, run:

```sh
pnpm build
```

## API Usage

### Endpoint

`GET /api/resize`

### Query Parameters

- [`url`](https://github.com/Code-Parth/image-resize-api/blob/701b128f073e25c2469e6d24075771a0779cb794/app/api/resize/route.ts#L7) (required): The URL of the image to resize.
- [`width`](https://github.com/Code-Parth/image-resize-api/blob/701b128f073e25c2469e6d24075771a0779cb794/app/api/resize/route.ts#L8) (optional): The desired width of the resized image.
- [`height`](https://github.com/Code-Parth/image-resize-api/blob/701b128f073e25c2469e6d24075771a0779cb794/app/api/resize/route.ts#L9) (optional): The desired height of the resized image.


### Example Request

```sh
curl "http://localhost:3000/api/resize?url=https://example.com/image.jpg&width=300&height=200"
```


## Dependencies

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Sharp](https://sharp.pixelplumbing.com/)
- [Axios](https://axios-http.com/)

This project is licensed under the MIT License.
