import React from 'react';

export default class PromoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdited: false,
      input: this.props.promos.name,
      id: this.props.promos.id,
    };
  }

  handleClickPromo = (event) => {
    this.setState({
      isEdited: !this.state.isEdited,
    });
  };

  handleClickPromoClose = () => (
    this.setState({
      isEdited: !this.state.isEdited,
    })
  );

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({
      input: value,
    });
  };

  handleEditPromSubmit = (event) => {
    event.preventDefault();
    this.setState({
      input: this.state.input,
      isEdited: !this.state.isEdited,
      id: this.state.id,
    });
    this.props.submitEditedPromo(this.state.input, this.state.id);
    this.props.editPromoSubmitBdd();
  };

  render() {
    const { input } = this.state;

    return (

      <div id="backoffice-list-promo">
        <div
          style={{ display: !this.state.isEdited ? 'block' : 'none' }}
          className="backoffice-list-one-promo"
          onClick={this.handleClickPromo}
        >
          {input}
        </div>
        <form id="main-backoffice-list-form" onSubmit={this.handleEditPromSubmit} style={{ display: this.state.isEdited ? '' : 'none' }}>
          <input className="main-backoffice-list-form-input-promo" type="" value={input} onChange={this.handleInputChange} />
          <button className="main-backoffice-list-form-button-validate">valider</button>
          <div className="main-backoffice-list-editbutton" onClick={this.handleClickPromoClose} style={{ display: this.state.isEdited ? '' : 'none' }}>fermer</div>
        </form>
      </div>
    );
  }
}
