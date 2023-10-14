const express = require ('express');
const router = express.Router();
const customerControler = require('../controllers/customerControler');
/**
 * GET request
 * @ Customer
 */

router.get('/', customerControler.homepage);
router.get('/about', customerControler.about);
router.get('/add', customerControler.addCustomer);
router.post('/add', customerControler.postCustomer);
router.get('/view/:id', customerControler.viewCustomer);

router.get('/edit/:id', customerControler.editCustomer);
router.put('/edit/:id', customerControler.editCustomerDet);
router.delete('/edit/:id', customerControler.deleteCustomer);


router.post('/search', customerControler.searchCustomer);

module.exports = router;