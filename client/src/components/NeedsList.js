import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getNeeds, deleteNeed } from '../actions/needActions';
import PropTypes from 'prop-types';

class NeedsList extends Component {
    componentDidMount() {
        this.props.getNeeds();
    }

    onDeleteClick = id => {
        this.props.deleteNeed(id)
    }

    render() {
        const { needs } = this.props.need;
        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="needs-list">
                        {needs.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                    >&times; 
                                    </Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

NeedsList.propTypes = {
    getNeeds: PropTypes.func.isRequired,
    need: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    need: state.need
});

export default connect(
    mapStateToProps,
    { getNeeds, deleteNeed }
)(NeedsList);