import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addNeed } from '../actions/needActions';
import PropTypes from 'prop-types';

class NeedModal extends Component {
    state = {
        modal: false,
        name: '',
        username: '',
        contact: '',
        neighborhood: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        
        const newNeed = {
            name: this.state.name,
            details: this.state.details,
            username: this.props.auth.user.name,
            contact: this.props.auth.user.email,
            neighborhood: this.props.auth.user.neighborhood
        }

        // Add Need via addNeed action
        this.props.addNeed(newNeed);

        // Close modal
        this.toggle();
    }

    render() {
        return (
            <div>
                { this.props.isAuthenticated ? <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                    >
                        Add Need
                    </Button> : <h3 className="mb-3 ml-4"><span id="welcome">welcome to our</span><br></br> <span id="neighborhood-welcome">neighborhood</span></h3> }
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add To Needs List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="need">Your Need</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="need"
                                    placeholder="Add need"
                                    onChange={this.onChange}
                                />
                                <br></br>
                                <Label for="details">Details</Label>
                                <Input
                                    type="text"
                                    name="details"
                                    id="details"
                                    placeholder="Add details (instructions for delivery / pick-up, etc.)"
                                    onChange={this.onChange}
                                />

                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Add Need</Button>
                            </FormGroup>
                        </Form>
                        <p><em>The email you used when registering will be used as the method of contact between you and your neighbors.</em></p>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    need: state.need,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});

export default connect(mapStateToProps, { addNeed })(NeedModal);