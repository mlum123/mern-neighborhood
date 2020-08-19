import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Badge } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getNeeds, deleteNeed } from '../actions/needActions';
import PropTypes from 'prop-types';

class NeedsList extends Component {
    static propTypes = {
        getNeeds: PropTypes.func.isRequired,
        need: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired,
        isLoading: PropTypes.bool,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.getNeeds();
    }

    onDeleteClick = id => {
        this.props.deleteNeed(id)
    }

    render() {
        const { needs } = this.props.need;
        const { user } = this.props.auth;

        const { userNotLoaded } = this.props.auth;
        
        if (userNotLoaded === false) {

            return (
                <Container>
                    { this.props.isAuthenticated ? <div>
                        <h4>What Your Neighbors Need</h4>
                        <ListGroup>
                        <TransitionGroup className="needs-list">
                            {needs.filter(need => need.userId !== user._id).filter(need => need.userNeighborhood === user.neighborhood).map(({ _id, name, details, userName, userContact, userNeighborhood }) => (
                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                    <ListGroupItem>
                                        <Badge classNames="badge">{userName}</Badge>
                                        <br></br>
                                        <strong>{name}</strong>
                                        <br></br>
                                        <em>Details</em>: {details}
                                        <br></br>
                                        <em>Contact Info</em>: {userContact}
                                    </ListGroupItem>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </ListGroup>
                    </div> : null }
                    
                    <br>
                    </br>
                    { this.props.isAuthenticated ? <div>
                        <h4>Manage Your Needs</h4>
                        <ListGroup>
                        <TransitionGroup className="needs-list">
                            {needs.filter(need => need.userId === user._id).map(({ _id, name }) => (
                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                    <ListGroupItem>
                                        <Button
                                            className="remove-btn"
                                            color="danger"
                                            size="sm"
                                            onClick={this.onDeleteClick.bind(this, _id)}
                                            >&times; 
                                            </Button> {name}
                                    </ListGroupItem>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </ListGroup>
                    </div> : null }
                </Container>
            );
        }
        
        return (
            this.props.isAuthenticated ? <div>Refresh the page to see what your neighbors need, and your current requests!</div> : null 
        )

    }
}

const mapStateToProps = (state) => ({
    need: state.need,
    auth: state.auth,
    isLoading: state.auth.isLoading,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { getNeeds, deleteNeed }
)(NeedsList);
