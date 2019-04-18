import React from 'react';

import FormSelect from 'src/containers/BackOffice/AddUserSelect';
import './form.scss';

const FormInput = ({ submitFirstname, submitLastname, submitEmail, submitUsername, submitForm, submitFormBDD, firstname, lastname, username, email, promos, specializations, projects, roles }) => {

  const handleChangeInputFirstname = (event) => {
    const { value } = event.target;
    submitFirstname(value);
  };

  const handleChangeLastname = (event) => {
    const { value } = event.target;
    submitLastname(value);
  };

  const handleChangeInputEmail = (event) => {
    const { value } = event.target;
    submitEmail(value);
  };

  const handleChangeInputUsername = (event) => {
    const { value } = event.target;
    submitUsername(value);
  };

  const handleSubmitAddUserForm = (event) => {
    event.preventDefault();
    submitForm();
    submitFormBDD();
  };

  return (
    <form id="backoffice-adduser-form-single" onSubmit={handleSubmitAddUserForm}>
      <div>
        Prénom
        <input className="backoffice-adduser-form-input" type="text" onChange={handleChangeInputFirstname} />
      </div>
      <div>
        Nom
        <input className="backoffice-adduser-form-input" type="text" onChange={handleChangeLastname} />
      </div>
      <div>
        Username
        <input className="backoffice-adduser-form-input" type="text" onChange={handleChangeInputUsername} />
      </div>
      <div>
        Email
        <input className="backoffice-adduser-form-input" type="text" onChange={handleChangeInputEmail} />
      </div>
      <FormSelect promos={promos} specialisations={specializations} projects={projects} roles={roles} />
      <button id="backoffice-adduser-form-button">Ajouter</button>
    </form>
  );
}

export default FormInput;
