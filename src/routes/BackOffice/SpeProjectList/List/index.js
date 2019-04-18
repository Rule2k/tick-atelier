import React from 'react';

import PromoList from './PromoList';
import SpeList from './SpeList';
import ProjectList from './ProjectList';
import './list.scss';

const List = ({ promos, specialisations, projects, submitEditedPromo, submitEditedSpe, submitEditedProject, loadedPromos, loadedSpe, editPromoSubmitBdd, editSpeSubmitBdd, editProjectSubmitBdd }) => {

  return (
    <div id="main-backoffice-list">
      <div id="backoffice-list-promo">
        <div className="backoffice-list">
          <div className="backoffice-list-title">Promotions</div>
          {promos.map(promo =>
            <PromoList
              promos={promo}
              submitEditedPromo={submitEditedPromo}
              editPromoSubmitBdd={editPromoSubmitBdd} />)}
        </div>
      </div>
      <div className="backoffice-list">
        <div id="backoffice-list-spe">
          <div className="backoffice-list-title">spé</div>
          <div id="backoffice-list-spe">
            {specialisations.map(spe =>
              <SpeList
                specialisations={spe}
                submitEditedSpe={submitEditedSpe}
                editSpeSubmitBdd={editSpeSubmitBdd}
                promotions={promos}
                promos={promos.map(promo => promo.name)}
              />)}
          </div>
        </div>
      </div>
      <div className="backoffice-list">
        <div id="backoffice-list-project">
          <div className="backoffice-list-title">Projects</div>
          <div id="backoffice-list-project">
            {projects.map(project =>
              <ProjectList
                promotions={promos}
                promos={promos.map(promo => promo.name)}
                projects={project}
                submitEditedProject={submitEditedProject}
                editProjectSubmitBdd={editProjectSubmitBdd}
              />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
