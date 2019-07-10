import React from 'react';

import scatData from '../../helpers/data/scatData';

import './EditScat.scss';

const defaultScat = {
  location: '',
  weight: '',
  color: '',
  sampleName: '',
  animal: '',
  uid: '',
};

class EditScat extends React.Component {
  state = {
    newScat: defaultScat,
  }

  componentDidMount() {
    const scatId = this.props.match.params.id;
    scatData.getSingleScat(scatId)
      .then(scatPromise => this.setState({ newScat: scatPromise.data }))
      .catch(err => console.error('no edit', err));
  }

  formFieldStringState = (name, e) => {
    const tempScat = { ...this.state.newScat };
    tempScat[name] = e.target.value;
    this.setState({ newScat: tempScat });
  };

  sampleNameChange = e => this.formFieldStringState('sampleName', e);

  colorChange = e => this.formFieldStringState('color', e);

  weightChange = e => this.formFieldStringState('weight', e);

  locationChange = e => this.formFieldStringState('location', e);

  animalChange = e => this.formFieldStringState('animal', e);

  formSubmit = (e) => {
    e.preventDefault();
    const saveMe = { ...this.state.newScat }; // makes a copy so you don't directly modify the state
    const scatId = this.props.match.params.id;
    scatData.putScat(saveMe, scatId)
      .then(() => {
        this.props.history.push('/home');
      }).catch(err => console.error('not updated', err));
  };

  render() {
    const { newScat } = this.state;
    return (
      <div className="NewScat">
        <h1>Edit Scat</h1>
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <label htmlFor="sampleName">Sample Name</label>
            <input
              type="text"
              className="form-control"
              id="sampleName" placeholder="Sample Name"
              value={newScat.sampleName}
              onChange={this.sampleNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="form-control"
              id="location" placeholder="location"
              value={newScat.location}
              onChange={this.locationChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="color">Color</label>
            <input
              type="text"
              className="form-control"
              id="color" placeholder="color"
              value={newScat.color}
              onChange={this.colorChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight</label>
            <input
              type="text"
              className="form-control"
              id="weight" placeholder="weight"
              value={newScat.weight}
              onChange={this.weightChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="animal">Animal</label>
            <input
              type="text"
              className="form-control"
              id="animal" placeholder="animal"
              value={newScat.animal}
              onChange={this.animalChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Update Scat</button>
        </form>
      </div>
    );
  }
}

export default EditScat;
