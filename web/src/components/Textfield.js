import React from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

const Textfield = ({
  name,
  fullWidth=true,
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth,
    variant: 'outlined',
    margin:"normal"
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return (
    <TextField {...configTextfield}/>
  );
};

export default Textfield ;