import React from 'react';
import { Link } from 'react-router-dom';

import './buttons.scss';

const Buttons = () => (
  <div id="header-backoffice-buttons">
    <Link to="/admin/add-user"> <div className="header-backoffice-onebutton">ajouter un membre</div></Link>
    <Link to="/admin/add-promo"><div className="header-backoffice-onebutton">ajouter promo</div></Link>
    <Link to="/admin/add-spe"><div className="header-backoffice-onebutton"> ajouter spé</div></Link>
    <Link to="/admin/add-project"><div className="header-backoffice-onebutton">ajouter projet</div></Link>
    <Link to="/admin/list"><div className="header-backoffice-onebutton">Liste</div></Link>
  </div>
);

export default Buttons;
