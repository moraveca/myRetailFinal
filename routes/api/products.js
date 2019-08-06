const express = require('express')
const router = express.Router();
const db = require("../../config/firestore");
const axios = require('axios');
var cors = require('cors');

router.get('/:id', cors(), (req, res) => {

    const data = {
        id: req.params.id,
        name: "productName",
        current_price: {
            value: 0,
            currency_code: ""
        },
        product_attributes: {
            description: "",
            imageURL: ""
        }
    };

    const getInfo = async () => {
        const response = await axios.get("http://redsky.target.com/v2/pdp/tcin/" + data.id + "?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics")

        // console.log("async getInfo response: ", response);

        const item = response.data.product.item
        // console.log("res.data: ", res.data);
        // console.log("product name: ", item.product_description);

        const baseURL = item.enrichment.images[0].base_url;
        const primaryURL = item.enrichment.images[0].primary;
        const imageURL = baseURL + primaryURL;

        data.name = item.product_description.title;
        if (item.product_description.downstream_description) {
            data.product_attributes.description = item.product_description.downstream_description;
        }
        data.product_attributes.imageURL = imageURL;

        return console.log("Product Info retrieved.")
    };

    const getPricing = async () => {
        const docRef = db.collection("products").doc(data.id);

        await docRef.get().then(doc => {
            if (doc.exists) {

                data.current_price.currency_code = doc.data().currency_code;
                data.current_price.value = doc.data().value;

                return console.log("Pricing Info retrieved.")

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(error => {
            console.log("Error getting document:", error);
        });
    }

    const createData = async () => {
        const productInfo = await getInfo();
        console.log("data after productInfo: ", data);

        const pricingInfo = await getPricing();
        console.log("data after pricingInfo: ", data)

        // console.log("Yay! ", productInfo)
    }

    createData().then(() => {
        console.log("we get through the asyncs! ");

        console.log("data to be send: ", data);

        res.json(data);
        console.log("Sent data!")

    }).catch((error) => {
        console.log(error.message)
    });
});

router.put('/:id/:newPrice', cors(), (req, res) => {

    const docRef = db.collection("products").doc(req.params.id);

    return docRef.update({
        value: req.params.newPrice,
        lastPriceUpdate: Date.now()
    })
        .then( () => {
            console.log("Document successfully updated!");
        })
        .catch(error => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

})

module.exports = router;