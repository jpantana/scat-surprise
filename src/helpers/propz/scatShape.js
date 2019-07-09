import PropTypes from 'prop-types';

const scatShape = PropTypes.shape({
  animal: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  sampleName: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
});
export default scatShape;
