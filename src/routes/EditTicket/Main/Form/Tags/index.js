import React from 'react';
import PropTypes from 'prop-types';

import './tags.scss';

const Form = ({ checkedTags, tags }) => {
  const handleCheckboxChange = (event) => {
    const { name } = event.target;
    checkedTags(name);
    document.getElementById('edit-ticket-main-form-bottom-tagsandpriority-tags').classList.remove('error-input-tags');
  };
  return (
    <div id="edit-ticket-main-form-bottom-tagsandpriority-tags">
      <div className="edit-ticket-tags">
        <input type="checkbox" checked={tags.includes('php')} name="php" id="php" onChange={handleCheckboxChange} />
        <label htmlFor="php">PHP</label>
      </div>
      <div className="edit-ticket-tags">
        <input type="checkbox" checked={tags.includes('js')} name="js" id="js" onChange={handleCheckboxChange} />
        <label htmlFor="js">JS</label>
      </div>
      <div className="edit-ticket-tags">
        <input type="checkbox" checked={tags.includes('html')} name="html" id="html" onChange={handleCheckboxChange} />
        <label htmlFor="html">HTML</label>
      </div>
      <div className="edit-ticket-tags">
        <input type="checkbox" checked={tags.includes('css')} name="css" id="css" onChange={handleCheckboxChange} />
        <label htmlFor="css">CSS</label>
      </div>
      <div className="edit-ticket-tags">
        <input type="checkbox" checked={tags.includes('react')} name="react" id="react" onChange={handleCheckboxChange} />
        <label htmlFor="react">React</label>
      </div>
      <div className="edit-ticket-tags">
        <input type="checkbox" checked={tags.includes('wordpress')} name="wordpress" id="wordpress" onChange={handleCheckboxChange} />
        <label htmlFor="wordpress">WordPress</label>
      </div>
      <div className="edit-ticket-tags">
        <input type="checkbox" checked={tags.includes('symfony')} name="symfony" id="symfony" onChange={handleCheckboxChange} />
        <label htmlFor="symfony">Symfony</label>
      </div>
      <div className="edit-ticket-tags">
        <input type="checkbox" checked={tags.includes('git')} name="git" id="git" onChange={handleCheckboxChange} />
        <label htmlFor="git">GitHub</label>
      </div>
    </div>
  );
};

Form.propTypes = {
  checkedTags: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default Form;
