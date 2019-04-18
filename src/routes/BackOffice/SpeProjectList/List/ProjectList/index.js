import React from 'react';

export default class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdited: false,
      input: this.props.projects.name,
      projectOriginal: this.props.projects,
      project_id: this.props.projects.id,
    };
  }

  handleClickProject = () => {
    this.setState({
      isEdited: !this.state.isEdited,
    });
  };

  handleClickProjectClose = () => (
    this.setState({
      isEdited: !this.state.isEdited,
    })
  );

  handleInputProjectChange = (event) => {
    const { value } = event.target;
    this.setState({
      input: value,
    });
  };

  handleSelectNewPromo = (event) => {
    const { value } = event.target;
    console.log(value);
    this.setState({
      new_promo: value,
    });
  };

  handleEditProjectSubmit = (event) => {
    event.preventDefault();
    console.log(this.props.promo);
    this.setState({
      input: this.state.input,
      isEdited: !this.state.isEdited,
      projectOriginal: this.props.projects.name,
      old_name: this.props.promo,
      project_id: this.state.project_id,
      new_promo: this.state.new_promo,
    });
    this.props.submitEditedProject(this.state.input, this.state.projectOriginal, this.state.project_id, this.state.new_promo, this.state.old_name);
    this.props.editProjectSubmitBdd();
  };

  render() {
    const { input } = this.state;

    return (

      <div id="backoffice-list-project">
        <div
          style={{ display: !this.state.isEdited ? 'block' : 'none' }}
          className="backoffice-list-one-project"
          onClick={this.handleClickProject}
        >
          {input}
        </div>
        <form id="main-backoffice-list-form" onSubmit={this.handleEditProjectSubmit} style={{ display: this.state.isEdited ? '' : 'none' }}>
          <input className="main-backoffice-list-form-input-project" type="" value={input} onChange={this.handleInputProjectChange} />
          <select className="main-backoffice-list-form-select" onChange={this.handleSelectNewPromo}>
            <option selected disables>Promotions</option>
            {this.props.promotions.map(promo => <option value={promo.name}>{promo.name} </option>)}
          </select>
          <button className="main-backoffice-list-form-button-validate">valider</button>
          <div className="main-backoffice-list-editbutton" onClick={this.handleClickProjectClose} style={{ display: this.state.isEdited ? '' : 'none' }}>fermer</div>
        </form>
      </div >
    );
  }
}
