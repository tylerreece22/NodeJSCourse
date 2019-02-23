const auth = require('../middleware/auth');
const {Customer, validate} = require('../models/customer')
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send(await Customer.find().sort('name'))
});

router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })

    res.send(await customer.save());
});

router.put('/:id', auth, async (req,res)=> {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findOneAndUpdate(req.params.id, {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    },{
        new: true
    })

    if (!customer) return res.status(404).send('The customer with the given id does not exist')

    res.send(customer)
})

router.delete('/:id', auth, async (req, res) => {
    const customer = await Customer.findOneAndDelete(req.params.id)

    if (!customer) return res.status(404).send('The customer with the given id does not exist')

    res.send(customer)
})

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id)

    if (!customer) return res.status(404).send('The customer with the given id does not exist')

    res.send(customer)
})

module.exports = router;
