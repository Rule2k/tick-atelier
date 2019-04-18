import React from 'react';

const ButtonRadio = () => (
  <div id="header-backoffice-buttons-radio">
    <div className="header-backoffice-buttons-radio-single">
      <input type="radio" id="show-all" name="backoffice-filter" value="Show All"
      />
      <label htmlFor="show-all">Tous</label>
    </div>

    <div className="header-backoffice-buttons-radio-single">
      <input type="radio" id="student" name="backoffice-filter" value="student" />
      <label for="student">Prof</label>
    </div>

    <div className="header-backoffice-buttons-radio-single">
      <input type="radio" id="Teachers" name="backoffice-filter" value="Teachers" />
      <label htmlFor="Teachers">Elève</label>
    </div>
  </div>
);

export default ButtonRadio;
