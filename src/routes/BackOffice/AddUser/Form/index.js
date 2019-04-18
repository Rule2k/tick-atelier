import React from 'react';

import FormInput from 'src/containers/BackOffice/AddUserInput';
import FormError from './FormError';


const Form = () => (
  <div id="backoffice-adduser-form">
    <FormInput />
    {/* FormError ne s affiche pas car il est en display: none */}
    <FormError />
  </div>
);

export default Form;
