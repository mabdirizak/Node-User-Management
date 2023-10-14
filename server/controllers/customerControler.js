const Customer = require('../models/Customer');
const mongoose = require('mongoose');

/**
 * GET 
 * Homepage
 */
  //with pagination
exports.homepage = async (req, res) => {
  const messages = await req.consumeFlash('info')
       const locals = {
       title: 'User Management System Dashboard',
       description: 'FREE Nodejs User Management System'
       
}

        let perPage = 9;
        let page = req.query.page || 1;




       try {
         const customers = await Customer.aggregate([ { $sort: { updatedAt: -1 } } ])
         .skip(perPage * page - perPage)
         .limit(perPage)
         .exec();
      const count = await Customer.count();
      
      res.render('index', {
        locals,
        customers,
        current: page,
        pages: Math.ceil(count / perPage),
        messages
      });

       } catch (error) {
         console.log(error);
       }
        

}

//Without a pagination

// exports.homepage = async (req, res) => {
//      const messages = await req.consumeFlash('info')
//           const locals = {
//           title: 'NodeJs',
//           description: 'FREE Nodejs User Management System'
          
// }
//           try {
//             const customers = await Customer.find({}).limit(22);
//             res.render('index', { locals, messages, customers } );
//           } catch (error) {
//             console.log(error);
//           }
           

// }

/**
 * GET
 * About
 */

exports.about = async (req, res) => {
  const locals = {
  title: 'About page - User Management System',
  description: 'FREE Nodejs User Management System'
  
}
   res.render('about', locals );

}

/**
 * GET 
 * New customer form
 */


exports.addCustomer = async (req, res) => {
 
  const locals = {
  title: 'Add new customer - NodeJs',
  description: 'FREE Nodejs User Management System'
  
}
   res.render('customer/add', locals );

}

/**
 * POST
 * @ create new customer
 */

exports.postCustomer = async(req, res) => {
  


  
  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    tel: req.body.tel,
    email: req.body.email,
    details: req.body.details,
  })


 const locals = {
  title: 'New Customer Added!',
  description: 'FREE Nodejs User Management System'
 }
 try {

  
  await Customer.create(newCustomer);
 
  await req.flash('info', 'New Customer has added.')

 res.redirect('/')
  
 } catch (error) {
  console.log("err", +error);
 }
 
}

/**
 * GET
 * @ get customer data by id
 */

exports.viewCustomer = async (req, res)=>{
  try {
    const customer = await Customer.findOne({ _id: req.params.id })
    const locals = {
      title: 'View Customer Data',
      description: 'FREE NodeJs User Management System'
    }
    res.render('customer/view', {
      locals,
      customer
    })
  } catch (error) {
    console.log(error);
  }
}

/**
 * GET
 * @ edit customer details
 */

exports.editCustomer = async(req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id })
    const locals = {
      title: 'Edit Customer Data',
      description: 'FREE NodeJs User Management System'
    }
    res.render('customer/edit', {
      locals,
      customer
    })
  } catch (error) {
    console.log(error);
  }
}


/**
 * PUT
 * @ edit customer details
 */

exports.editCustomerDet = async(req, res) => {
try {
  await Customer.findOneAndUpdate({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    tel: req.body.tel,
    email: req.body.email,
    details: req.body.details,
    updatedAt: Date.now()
  }).where(req.params.id)
  res.redirect('/')
} catch (error) {
  
}
}


/**
 * DELETE
 * @ delete a record
 */

exports.deleteCustomer = async(req, res)=>{
  try {
    await Customer.deleteOne({ _id: req.params.id } )
    await req.flash('info', 'A Customer has been deleted!.')
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
}

/**
 * GET
 * @ search customer
 */

exports.searchCustomer = async(req, res) =>{
  const locals = {
    title: 'Search Customer Data',
    description: 'FREE NodeJs User Management System'
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialCars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");



    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialCars, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialCars, "i") } },
      ]
    });

   

    res.render("search", {
      customers, 
      locals
    })
  } catch (error) {
    console.log(error);
  }
}