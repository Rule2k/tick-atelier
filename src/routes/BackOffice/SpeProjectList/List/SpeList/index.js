import React from 'react';

export default class SpeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdited: false,
      old_spe: this.props.specialisations.name,
      input: this.props.specialisations.name,
      spe_id: this.props.specialisations.id,
    };
  }


  handleClickSpe = () => {
    this.setState({
      isEdited: !this.state.isEdited,
    });
  };

  handleClickSpeClose = () => (
    this.setState({
      isEdited: !this.state.isEdited,
    })
  );

  handleInputSpeChange = (event) => {
    const { value } = event.target;
    this.setState({
      input: value,
    });
  };

  handleSelectNewPromoSpe = (event) => {
    const { value } = event.target;
    console.log(value);
    this.setState({
      new_promo: value,
    });
  };

  handleEditSpeSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.new_promo);
    this.setState({
      old_spe: this.state.old_spe,
      input: this.state.input,
      isEdited: !this.state.isEdited,
      spe_id: this.state.spe_id,
      new_promo: this.state.new_promo,
    });
    this.props.submitEditedSpe(this.state.input, this.state.spe_id, this.state.old_spe, this.state.new_promo);
    this.props.editSpeSubmitBdd();
  };

  render() {
    const { input } = this.state;

    return (

      <div id="backoffice-list-promo">
        <div
          style={{ display: !this.state.isEdited ? 'block' : 'none' }}
          className="backoffice-list-one-promo"
          onClick={this.handleClickSpe}
        >
          {input}
        </div>
        <form id="main-backoffice-list-form" onSubmit={this.handleEditSpeSubmit} style={{ display: this.state.isEdited ? '' : 'none' }}>
          <input className="main-backoffice-list-form-input-spe" type="" value={input} onChange={this.handleInputSpeChange} />
          <select onChange={this.handleSelectNewPromoSpe} className="main-backoffice-list-form-select">
            <option selected disabled >Promotion</option>
            {this.props.promotions.map(promo => <option value={promo.name}>{promo.name} </option>)}
          </select>
          <button className="main-backoffice-list-form-button-validate">valider</button>
          <div className="main-backoffice-list-editbutton" onClick={this.handleClickSpeClose} style={{ display: this.state.isEdited ? '' : 'none' }}>fermer</div>
        </form>
      </div>
    );
  }
}
