import React from 'react';

import Table from 'src/containers/BackOffice/Table';
import Header from './Home/Header';
import Footer from './Home/Footer';


const BackOffice = ({ loadedUsers, loadedPromos, loadedSpe, loadedProjects }) => {
  return (
    <div id="backoffice">
      <Header />
      <Table />
      <Footer />
      {loadedUsers()}
      {loadedPromos()}
      {loadedSpe()}
      {loadedProjects()}
    </div>
  );
};

export default BackOffice;
