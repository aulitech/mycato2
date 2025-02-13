import { FC, useState } from 'react';
import { InputLabel } from '@mui/material';

interface OrientationProps {
  id?: string;
  value: number;
  updateValue: (newValue: {
    front: string;
    bottom: string;
    left: string;
  }) => void;
}

export const Orientation: FC<OrientationProps> = ({
  id,
  value,
  updateValue,
}) => {
  const orientations = {
    flat: {
      front: '-x',
      bottom: '-z',
      left: '-y',
      //image: flatImage
    },
    left: {
      front: '+y',
      bottom: '-x',
      left: '+z',
      //image: leftImage
    },
    right: {
      front: '-y',
      bottom: '-x',
      left: '-z',
      //image: rightImage
    },
  };

  const [hoverAt, setHoverAt] = useState<string | null>(null);

  return (
    <div
      id="#/properties/global_info/properties/orientation"
      className="orientation">
      <InputLabel style={{ marginTop: '0.8em' }}>Orientation</InputLabel>
      <div style={{ cursor: 'pointer', fontSize: '18px' }}>
        {Object.entries(orientations).map(([key, value]) => {
          return (
            <button
              style={{ fontSize: '1rem' }}
              onMouseOver={() => setHoverAt(key)}
              onMouseOut={() => setHoverAt(null)}
              onClick={() => updateValue(value)}
              key={`${id}_${key}`}>
              {hoverAt === key ? (
                <span style={{ fontWeight: 'bold' }}>key</span>
              ) : (
                key
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
