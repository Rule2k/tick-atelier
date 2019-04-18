import React from 'react';

import FormError from './FormError';
import './form.scss';

const Form = ({ submitForm, submitProject, submitFormBDD, promos, selectPromo }) => {
  const handleChangeProjectInput = (event) => {
    const { value } = event.target;
    submitProject(value);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    submitForm();
    submitFormBDD();
  };

  const handleChangePromo = (event) => {
    const { value } = event.target;
    selectPromo(value);
  };

  return (
    <div id="backoffice-addproject-form">
      <form id="backoffice-addproject-form-single" onSubmit={handleSubmitForm}>
        <div>
          <div>Nouveau projet</div>
          <input className="backoffice-addproject-form-input" type="text" onChange={handleChangeProjectInput} />
          <select className="backoffice-addproject-form-select" onChange={handleChangePromo}>
            <option selected disabled>Promotion</option>
            {promos.map(promo => <option value={promo.name}>{promo.name}</option>)}
          </select>
        </div>
        <button type="submit" id="backoffice-addproject-form-button">Ajouter</button>
      </form>
      { /* Form Error est en display : none */}
      <FormError />
    </div>
  );
}

export default Form;
