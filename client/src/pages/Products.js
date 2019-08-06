import React, { Component } from "react";
import API from "../utils/API";
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')




class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            productName: "",
            value: 0,
            currency_code: "",
            productImage: "https://imgplaceholder.com/420x320/cccccc/757575/glyphicon-tags",
            productDescription: "",
            modalIsOpen: false,
            newPrice: 0
        };

        // this.openModal = this.openModal.bind(this);
        // this.afterOpenModal = this.afterOpenModal.bind(this);
        // this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
    };


    updatePrice = event => {
        event.preventDefault();
        this.setState({ modalIsOpen: true });
    }

    sendPutRequest = event => {
        event.preventDefault();

        API.updatePrice(this.state.id, this.state.newPrice)
            .then(res => {
                console.log("Successfully updated price!");
            });

        this.setState({ modalIsOpen: false })
        this.sendGetRequest();


    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {

        event.preventDefault();
        this.sendGetRequest();

    };

    sendGetRequest = () => {
        API.getProduct(this.state.id)
            .then(res => {
                console.log("results: ", res.data);
                this.setState({
                    id: res.data.id,
                    productName: res.data.name,
                    value: res.data.current_price.value,
                    currency_code: res.data.current_price.currency_code,
                    productImage: res.data.product_attributes.imageURL,
                    productDescription: res.data.product_attributes.description,
                    newPrice: res.data.current_price.value
                })
            })
    }

    render() {
        return (
            <>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <form>
                        <div className="form-group">
                            <h3>Current Price: {this.state.value}</h3>
                        </div>
                        <div className="form-group">
                            <label htmlFor="priceInput">What would you like the new price to be? </label>
                            <input
                                value={this.state.newPrice}
                                name="newPrice"
                                onChange={this.handleInputChange}
                                type="number"
                                className="form-control">
                            </input>
                        </div>
                        <button type="submit"
                            className="btn btn-primary"
                            onClick={this.sendPutRequest}
                        >Submit Price Change</button>
                    </form>
                </Modal>


                <form>
                    <input value={this.state.id}
                        name="id"
                        onChange={this.handleInputChange}
                        type="number"
                        placeholder="Item Number">
                    </input>
                    <button className="btn btn-outline-secondary" onClick={this.handleFormSubmit}>Search for Item</button>
                </form>

                {this.state.productName.length ? (
                    <div className="card" style={{ "width": "25rem" }}>
                        <img src={this.state.productImage} className="card-img-top" alt="Product" />
                        <div className="card-body">
                            <h5 className="card-title">{this.state.productName}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">${this.state.value}</h6>
                            <button onClick={this.updatePrice} className="btn btn-primary">Update Price</button>
                            <p className="card-text">{this.state.productDescription}</p>
                        </div>
                    </div>
                ) : (
                        <div>
                            <h3>No Results to Display</h3>
                        </div>)
                }
            </>
        );
    }
}

export default Products;
