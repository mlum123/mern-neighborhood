import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
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
        console.log(this.props.auth);
    }

    onDeleteClick = id => {
        this.props.deleteNeed(id)
    }

    render() {
        const { needs } = this.props.need;
        const { user } = this.props.auth;
        return (
            <Container>
                { this.props.isAuthenticated ? <div>
                    <h4>What Your Neighbors Need</h4>
                    <ListGroup>
                    <TransitionGroup className="needs-list">
                        {needs.filter(need => need.userId != user._id).map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    {name}
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
                        {needs.filter(need => need.userId == user._id).map(({ _id, name }) => (
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