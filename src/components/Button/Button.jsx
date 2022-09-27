import PropTypes from 'prop-types';
import { Button } from './Button.styled';

export const LoadMoreBtn = ({ onloadMore}) => {
  return (
    <Button type="button" onClick={onloadMore}>
      Load more
    </Button>
  );
};

LoadMoreBtn.propTypes = {
  onloadMore: PropTypes.func.isRequired,
};
