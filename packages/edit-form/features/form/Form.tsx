import { useCallback } from 'react';

import { JsonForms } from '@jsonforms/react';
import schema from '../table/example-jsonschema.json';

import { useAppSelector, selectData, selectEditorState, useAppDispatch, setRowData } from 'state';
import { selectJsonSchema } from 'project-state';

import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';


export function Form() {
  const schema = useAppSelector(selectJsonSchema);
  const tableData = useAppSelector(selectData);
  // @ts-ignore
  const { selectedRows } = useAppSelector(selectEditorState);
  const dispatch = useAppDispatch();

  const rowIndex = selectedRows && selectedRows.length === 1 ? selectedRows[0] : null;
  const rowData = rowIndex !== null && tableData[rowIndex];

  const onChange = useCallback( ({errors, data}: {errors: any[], data: any}) => {
    if(errors.length === 0 && rowIndex != null) {
      dispatch(setRowData({row: data, rowIndex}));
    }
  }, [dispatch, rowIndex]);

  return !rowData ? <p>For editing, select exactly 1 row.</p> : (
    <JsonForms
      renderers={materialRenderers}
      cells={materialCells}
      schema={schema}
      data={rowData}
      onChange={onChange}
    />
  )
}
