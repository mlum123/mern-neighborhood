import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {v4 as uuid} from 'uuid';
import { connect } from 'react-redux';
import { getNeeds } from '../actions/needActions';
import PropTypes from 'prop-types';

class NeedsList extends Component {
    componentDidMount() {
        this.props.getNeeds();
    }
    
    render() {
        const { needs } = this.props.need;
        return(
            <Container>
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={() => {
                        const name = prompt('Enter Need');
                        if (name) {
                            this.setState(state => ({
                                needs: [...state.needs, { id: uuid(), name }]
                            }))
                        }
                    }}
                >
                    Add Need
                </Button>
                <ListGroup>
                    <TransitionGroup className="needs-list">
                        {needs.map(({ id, name }) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={() => {
                                            this.setState(state => ({
                                                needs: state.needs.filter(need => need.id !== id)
                                            }));
                                        }}
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

export default connect(mapStateToProps, { getNeeds })(NeedsList);