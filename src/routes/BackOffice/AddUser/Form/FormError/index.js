import React from 'react';
import './formerror.scss';

const FormError = () => (
  <div id="backoffice-adduser-form-error">
    <div>Le prénom ne peux pas être vide</div>
    <div>Le nom ne peux pas être vide</div>
    <div>L'identifiant GitHub ne peux pas être vide</div>
    <div>L'email ne peux pas être vide</div>
  </div>
);

export default FormError;
