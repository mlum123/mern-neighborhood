import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {v4 as uuid} from 'uuid';

class NeedsList extends Component {
    state = {
        needs: [
            { id: uuid(), name: 'Grocery shopper' },
            { id: uuid(), name: 'Dog walker' },
            { id: uuid(), name: 'Yeast' },
            { id: uuid(), name: 'Flour' }
        ]
    }

    render() {
        const { needs } = this.state;
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

export default NeedsList;