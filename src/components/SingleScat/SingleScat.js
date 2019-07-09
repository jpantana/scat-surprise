import React from 'react';

import scatData from '../../helpers/data/scatData';

import './SingleScat.scss';

class SingleScat extends React.Component {
  state = {
    scat: {},
  }

  componentDidMount() {
    const scatId = this.props.match.params.id;
    scatData.getSingleScat(scatId)
      .then((scatPromise) => {
        this.setState({ scat: scatPromise.data });
      }).catch(err => console.error('no single scat', err));
  }

  deleteScat = () => {
    const scatId = this.props.match.params.id;
    scatData.deleteScat(scatId)
      .then(() => this.props.history.push('/home'))
      .catch(err => console.error('no scat deleted', err));
  };

  render() {
    const { scat } = this.state;
    return (
      <div className="SingleScat">
        <h1>{ scat.sampleName }</h1>
        <h2>{ scat.location }</h2>
        <h3>{ scat.animal }</h3>
        <h4>{ scat.color }</h4>
        <h5>{ scat.weight }</h5>
        <button href="#" className="btn btn-danger" onClick={this.deleteScat}>Delete</button>
      </div>
    );
  }
}

export default SingleScat;
