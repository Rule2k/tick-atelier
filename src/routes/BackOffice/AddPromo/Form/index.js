import React from 'react';

import FormError from './FormError';
import './form.scss';

const Form = ({ submitPromo, submitForm, submitFormBDD }) => {

  const handleInputPromo = (event) => {
    const { value } = event.target;
    submitPromo(value);
  };

  const handleSubmitPromo = (event) => {
    event.preventDefault();
    submitForm();
    submitFormBDD();
  };

  return (
    <div id="backoffice-addpromo-form">
      <form id="backoffice-addpromo-form-single" onSubmit={handleSubmitPromo}>
        <div>
          <div>Nouvelle promo</div>
          <input className="backoffice-addpromo-form-input" type="text" onChange={handleInputPromo} />
        </div>
        <button id="backoffice-addpromo-form-button">Ajouter</button>
      </form>
      {/* Form Error est en display : none*/}
      <FormError />
    </div>
  );
}

export default Form;
