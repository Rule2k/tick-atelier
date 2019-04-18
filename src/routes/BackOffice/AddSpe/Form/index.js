import React from 'react';

import FormError from './FormError';
import './form.scss';

const Form = ({ submitSpe, submitForm, submitFormBDD, selectPromo, promos }) => {

  const handleSpeSubmit = (event) => {
    event.preventDefault();
    submitForm();
    submitFormBDD();
  };

  const handleInputSpeChange = (event) => {
    const { value } = event.target;
    submitSpe(value);
  };

  const handleSelectChange = (event) => {
    const { value } = event.target;
    selectPromo(value);
  };

  return (
    <div id="backoffice-addspe-form">
      <form id="backoffice-addspe-form-single" onSubmit={handleSpeSubmit}>
        <div>
          <div>Nouvelle spé</div>
          <input className="backoffice-addspe-form-input" type="text" onChange={handleInputSpeChange} />
          <select className="backoffice-addspe-form-select" name="" id="" onChange={handleSelectChange}>
            <option selected disabled>Promotion</option>
            {promos.map(promo => <option value={promo.name}>{promo.name}</option>)}
          </select>
        </div>
        <button id="backoffice-addspe-form-button">Ajouter</button>
      </form>
      {/* Form Error est en display : none*/}
      <FormError />
    </div>
  );
}

export default Form;
