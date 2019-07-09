import React from 'react';
import { Link } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';

import ScatCard from '../ScatCard/ScatCard';
import './Home.scss';
import scatData from '../../helpers/data/scatData';

class Home extends React.Component {
  state = {
    scats: [],
  }

  getScats = () => {
    const { uid } = firebase.auth().currentUser;
    scatData.getScats(uid)
      .then((scats) => {
        this.setState({ scats });
      })
      .catch(err => console.error('no scats for you', err));
  };

  componentDidMount() {
    this.getScats();
  }

  editEvent = (e) => {
    e.preventDefault();
    const orderId = '12345';
    this.props.history.push(`/edit/${orderId}`);
  };

  deleteScat = (scatId) => {
    scatData.deleteScat(scatId)
      .then(() => this.getScats())
      .catch(err => console.error('no scat deleted', err));
  };

  render() {
    // const singleLink = '/scat/12345'; // ${scat.id} for example
    const { scats } = this.state;
    const makeScatCards = scats.map(scat => (
      <ScatCard key={scat.id} scat={scat} deleteScat={this.deleteScat} />
    ));
    return (
      <div className="Home col">
        {/* <h1>Home</h1>
        <button className="btn btn-primary" onClick={this.editEvent}>Edit</button>
        <Link to={singleLink}>View Single</Link> */}
        <div className="col">
          <h2 className="col">Scat names</h2>
            <div className="d-flex">
              { makeScatCards }
            </div>
        </div>
      </div>
    );
  }
}

export default Home;
