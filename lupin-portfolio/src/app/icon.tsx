import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const size = {
  width: 128,
  height: 128,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'black',
          borderRadius: '50%',
        }}
      >
        <img
          src="https://res.cloudinary.com/dxvpm6xhq/image/upload/v1779984329/vvlogo-updated_tzg7bh.png"
          style={{ width: '92%', height: '92%', objectFit: 'contain' }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
