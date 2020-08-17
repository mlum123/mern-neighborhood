import React, { Component, Fragment } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers, register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
    state = {
        auth: null,
        modal: false,
        name: '',
        email: '',
        password: '',
        neighborhood: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        getUsers: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.getUsers();
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;

        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        // If authenticated, close modal
        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        // Clear errrors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const { name, email, password, neighborhood } = this.state;

        const newUser = {
            name,
            email,
            password,
            neighborhood
        };

        this.props.register(newUser);
    }

    render() {
        const { users } = this.props.auth;

        const { usersGotten } = this.props.auth;

        if (usersGotten === true) {
            var uniqueNeighborhoods = []

            var i;
            for (i = 0; i < users.length; i++) {
                if (!uniqueNeighborhoods.includes(users[i].neighborhood)) {
                    uniqueNeighborhoods.push(users[i].neighborhood);
                };
            };

            return (
                <div>
                    <NavLink onClick={this.toggle} href="#">
                        Register
                    </NavLink>

                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                    >
                        <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                        <ModalBody>
                            { this.state.msg ? (
                                <Alert color="danger">{this.state.msg.msg}</Alert>
                            ) : null}
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Name"
                                        className="mb-3"
                                        onChange={this.onChange}
                                    />

                                    <Label for="email">Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Email"
                                        className="mb-3"
                                        onChange={this.onChange}
                                    />

                                    <Label for="password">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        className="mb-3"
                                        onChange={this.onChange}
                                    />

                                    <Label for="neighborhood">Neighborhood</Label>
                                    <Input
                                        type="select"
                                        name="neighborhood"
                                        id="neighborhood"
                                        className="mb-3"
                                        onChange={this.onChange} >
                                        <option>Select Neighborhood</option>
                                        {
                                            uniqueNeighborhoods.map(neighborhood => <option key={neighborhood} value={neighborhood}>{neighborhood}</option>)
                                        }
                                        <option>Other</option>
                                    </Input>

                                    { this.state.neighborhood === "Other" ? 
                                        (<Fragment>
                                         <Label for="neighborhood">Add New Neighborhood</Label>
                                         <Input
                                            type="neighborhood"
                                            name="neighborhood"
                                            id="neighborhood"
                                            className="mb-3"
                                            onChange={this.onChange} >
                                        </Input></Fragment>)
                                        : null
                                    }

                                    <Button
                                        color="dark"
                                        style={{marginTop: '2rem'}}
                                        block
                                    >Register</Button>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
        return null;
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getUsers, register, clearErrors }
)(RegisterModal);