import React from 'react';
export default class OneUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      promos: this.props.promo,
      specialisations: this.props.specialisations,
      projects: this.props.projects,
      roles: this.props.roles,
      inputUsername: this.props.user.username,
      inputLastname: this.props.user.lastname,
      inputFirstname: this.props.user.firstname,
      inputEmail: this.props.user.email,
      inputPromotion: this.props.user.promotion,
      inputSpecialization: this.props.user.specialization,
      inputProject: this.props.user.project,
      inputAdmin: this.props.user.admin,
      isEdited: false,
      user_id: this.props.user.user_id,
    };
    // console.log(this.props.roles)
  }

  handleEditClick = () => {
    this.setState({
      isEdited: !this.state.isEdited,
    });
  };

  handleEditInputUsername = (event) => {
    const { value } = event.target;
    console.log(value);
    this.setState({
      inputUsername: value,
    });
  };

  handleEdiputInputLastname = (event) => {
    const { value } = event.target;
    this.setState({
      inputLastname: value,
    });
  };

  handleEdiputInputFirstname = (event) => {
    const { value } = event.target;
    this.setState({
      inputFirstname: value,
    });
  };

  handleEdiputInputEmail = (event) => {
    const { value } = event.target;
    this.setState({
      inputEmail: value,
    });
  };

  handleEdiputInputPromotion = (event) => {
    const { value } = event.target;
    this.setState({
      inputPromotion: value,
    });
  };

  handleEdiputInputSpecialization = (event) => {
    const { value } = event.target;
    console.log(value);
    this.setState({
      inputSpecialization: value,
    });
    console.log(this.state.inputSpecialization);
  };

  handleEdiputInputProject = (event) => {
    const { value } = event.target;
    this.setState({
      inputProject: value,
    });
    console.log(this.state.inputProject);
  };

  handleEdiputInputAdmin = (event) => {
    const { value } = event.target;

    if (value === "true") {
      const value = true;
      this.setState({
        inputAdmin: value,
      });
    } else {
      const value = false;
      this.setState({
        inputAdmin: value,
      });
    }
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.setState({
      user_id: this.state.user_id,
      username: this.state.inputUsername,
      lastname: this.state.inputLastname,
      firstname: this.state.inputFirstname,
      email: this.state.inputEmail,
      promotion: this.state.inputPromotion,
      specialization: this.state.inputSpecialization,
      project: this.state.inputProject,
      admin: this.state.inputAdmin,
      isEdited: !this.state.isEdited,
    });

    this.props.submitForm(this.state.user_id, this.state.inputUsername, this.state.inputLastname, this.state.inputFirstname, this.state.inputEmail, this.state.inputPromotion, this.state.inputSpecialization, this.state.inputProject, this.state.inputAdmin);
    this.props.submitFormBDD();
  };

  render() {

    return (
      <div className="main-backoffice-table-row">
        <div style={{ display: !this.state.isEdited ? 'inline' : 'none' }} className="main-backoffice-table-cell">{this.state.inputUsername}</div>
        <div style={{ display: !this.state.isEdited ? 'inline' : 'none' }} className="main-backoffice-table-cell">{this.state.inputLastname}</div>
        <div style={{ display: !this.state.isEdited ? 'inline' : 'none' }} className="main-backoffice-table-cell">{this.state.inputFirstname}</div>
        <div style={{ display: !this.state.isEdited ? 'inline' : 'none' }} className="main-backoffice-table-cell">{this.state.inputEmail}</div>
        <div style={{ display: !this.state.isEdited ? 'inline' : 'none' }} className="main-backoffice-table-cell">{this.state.inputPromotion}</div>
        <div style={{ display: !this.state.isEdited ? 'inline' : 'none' }} className="main-backoffice-table-cell">{this.state.inputSpecialization}</div>
        <div style={{ display: !this.state.isEdited ? 'inline' : 'none' }} className="main-backoffice-table-cell">{this.state.inputProject}</div>
        <div style={{ display: !this.state.isEdited ? 'inline' : 'none' }} className="main-backoffice-table-cell main-backoffice-table-status">{this.state.inputAdmin ? 'Prof' : 'Eleve'}</div>
        <form id="main-backoffice-table-form" style={{ display: this.state.isEdited ? '' : 'none' }} onSubmit={this.handleFormSubmit}>
          <input className="main-backoffice-table-form-input" type="text" value={this.state.inputUsername} onChange={this.handleEditInputUsername} />
          <input className="main-backoffice-table-form-input" type="text" value={this.state.inputLastname} onChange={this.handleEdiputInputLastname} />
          <input className="main-backoffice-table-form-input" type="text" value={this.state.inputFirstname} onChange={this.handleEdiputInputFirstname} />
          <input className="main-backoffice-table-form-input" type="text" value={this.state.inputEmail} onChange={this.handleEdiputInputEmail} />
          <select className="main-backoffice-table-form-select" type="text" onChange={this.handleEdiputInputPromotion} value={this.state.inputPromotion}>
            <option >Selectionnez une promo</option>
            {this.state.promos.map(promo => <option value={promo.name}>{promo.name}</option>)}
          </select>
          <select className="main-backoffice-table-form-select" type="text" onChange={this.handleEdiputInputSpecialization} value={this.state.inputSpecialization}>
            <option selected disabled >Selectionnez une spe</option>
            {this.state.specialisations.map(specialisation => <option value={specialisation.name}>{specialisation.name}</option>)}
          </select>
          <select className="main-backoffice-table-form-select" type="text" onChange={this.handleEdiputInputProject} value={this.state.inputProject}>
            <option selected disabled >Selectionnez un projet</option>
            {this.state.projects.map(project => <option value={project.name}>{project.name}</option>)}
          </select>
          <select className="main-backoffice-table-form-select" onChange={this.handleEdiputInputAdmin} value={this.state.inputAdmin}>
            {this.state.roles.map(status => {
              if (status) {
                return (
                  <option value={status}>Prof</option>
                )
              } else {
                return (
                  <option value={status}>Elève</option>
                )
              }
            })}
          </select>
          <button className="main-backoffice-table-form-button">valider</button>
        </form>
        <div className="main-backoffice-form-editbutton" onClick={this.handleEditClick} style={{ display: this.state.isEdited ? 'inline' : 'none' }}>fermer</div>
        <div className="main-backoffice-form-editbutton" onClick={this.handleEditClick} style={{ display: !this.state.isEdited ? 'inline' : 'none' }}>edit</div>
      </div>
    );
  }
}
