import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getNeeds, deleteNeed } from '../actions/needActions';
import { getUserNeeds } from '../actions/authActions';
import PropTypes from 'prop-types';

class NeedsList extends Component {
    static propTypes = {
        getNeeds: PropTypes.func.isRequired,
        need: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        getUserNeeds: PropTypes.func.isRequired,
        needs: PropTypes.array.isRequired
    }

    componentDidMount() {
        this.props.getNeeds();
        this.props.getUserNeeds();
    }

    onDeleteClick = id => {
        this.props.deleteNeed(id)
    }

    render() {
        const { needs } = this.props.need;
        const userNeeds = this.props.needs;
        return(
            <Container>
                { this.props.isAuthenticated ? <h4>What Your Neighbors Need</h4> : null }
                <ListGroup>
                    <TransitionGroup className="needs-list">
                        {needs.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    { this.props.isAuthenticated ? <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                        >&times; 
                                        </Button> : null}
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

const mapStateToProps = (state) => ({
    need: state.need,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { getNeeds, deleteNeed, getUserNeeds }
)(NeedsList);