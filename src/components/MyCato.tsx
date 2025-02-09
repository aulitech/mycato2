import { FC, useMemo, useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';

import schema from '../schema.json';
import uischema from '../uischema.json';
import { initialData } from './InitialData';

const classes = {
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  changeContent: {
    display: 'flex',
    justifyContent: 'flex-start',
    overflow: 'wrap',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'flex-start',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  resetButton: {
    margin: 'auto !important',
    display: 'flex',
    justifyContent: 'flex-start',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
};

const renderers = [
  ...materialRenderers,
  //register custom renderers
  //{ tester: ratingControlTester, renderer: RatingControl },
];

interface Change<T = never> {
  path: string;
  value: T;
}

function findChanges<T>(
  newObj: Record<string, T>,
  oldObj: Record<string, T>,
  path = '',
): Change<T>[] {
  const changes: Change<T>[] = [];
  for (const key in newObj) {
    const currentPath = path ? `${path}.${key}` : key;

    if (
      typeof newObj[key] === 'object' &&
      newObj[key] !== null &&
      oldObj &&
      typeof oldObj[key] === 'object' &&
      oldObj[key] !== null
    ) {
      const nestedChanges = findChanges(
        newObj[key] as Record<string, T>,
        oldObj[key] as Record<string, T>,
        currentPath,
      );
      changes.push(...nestedChanges);
    } else if (newObj[key] !== oldObj?.[key]) {
      changes.push({
        path: currentPath,
        value: newObj[key],
      });
    }
  }
  return changes;
}

const changeQueue = [];
let changedData = '';
function queueChangedData(newData: typeof initialData) {
  // queue changes for cato
  const diff = findChanges(newData, initialData);
  console.log(diff);
  changeQueue.push(...diff);
  changedData = JSON.stringify(diff, null, 2);
}

export const MyCato: FC = () => {
  const [data, setData] = useState<object>(initialData);
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const clearData = () => {
    setData(initialData);
  };

  const [showJson, setShowJson] = useState(true);

  return (
    <>
      <button onClick={() => setShowJson(!showJson)}>Details</button>
      <Grid
        container
        justifyContent={'center'}
        spacing={1}
        style={classes.container}>
        <Grid item sm={6}>
          <div style={classes.demoform}>
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={data}
              renderers={renderers}
              cells={materialCells}
              onChange={({ data }) => {
                queueChangedData(data);
                setData(data);
              }}
            />
          </div>
        </Grid>
        {showJson && (
          <>
            <Grid item sm={6}>
              <Grid>
                <div style={classes.changeContent}>
                  <pre id="changedData">{changedData}</pre>
                </div>
              </Grid>
              <Typography variant={'h4'}>Configuration Details</Typography>
              <Button
                onClick={clearData}
                color="primary"
                variant="contained"
                data-testid="clear-data">
                Reset data
              </Button>
              <div style={classes.dataContent}>
                <pre id="boundData">{stringifiedData}</pre>
              </div>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};
