import { withJsonFormsControlProps } from '@jsonforms/react';
import { Orientation } from './Orientation';

interface OrientationControlProps {
  data: number;
  handleChange(path: string, value: number): void;
  path: string;
}

const OrientationControl = ({
  data,
  handleChange,
  path,
}: OrientationControlProps) => (
  <Orientation
    value={data}
    updateValue={(newValue: number) => handleChange(path, newValue)}
  />
);

// Fast refresh can't handle anonymous components.
const OrientationControlWithJsonForms =
  withJsonFormsControlProps(OrientationControl);
export default OrientationControlWithJsonForms;
