const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const CompanyController = require('../controllers/company.controller');
//const AdminController = require('../controllers/admin.controller');
const HomeController = require('../controllers/home.controller');
const BorrowersController = require('../controllers/borrowers.controller');
const EmailPanelController = require('../controllers/emailPanel.controller');
const EmployeeController = require('../controllers/employee.controller');
const LoansController = require('../controllers/loans.controller');
const MessageController = require('../controllers/message.controller');
const ModulePermissionController = require('../controllers/modulePermission.controller');
const PaymentsController = require('../controllers/payments.controller');
const SavingAccountController = require('../controllers/savingAccount.controller');
const CountriesController = require('../controllers/countries.controller');
const StatesController = require('../controllers/states.controller');
const CitiesController = require('../controllers/cities.controller');
const ImageController = require('../controllers/image.controller.js');
const custom = require('./../middleware/custom');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const passport = require('passport');
const path = require('path');


require('./../middleware/passport')(passport)
    /* GET home page. */
router.get('/', function(req, res, next) {
    res.json({ status: "success", message: "Parcel Pending API", data: { "version_number": "v1.0.0" } })

});
/* Routing for Users */
router.post('/users/create', UserController.create); // C
router.get('/users', passport.authenticate('jwt', { session: false }), UserController.get); // R
router.put('/users', passport.authenticate('jwt', { session: false }), UserController.update); // U
router.delete('/users', passport.authenticate('jwt', { session: false }), UserController.remove); // D
router.post('/users/login', UserController.login);
/* routing for Admin */
// router.post('/admin', passport.authenticate('jwt', { session: false }), AdminController.create);
// router.get('/admin', passport.authenticate('jwt', { session: false }), AdminController.getadminList); // R
// router.get('/admin/:admin_id', passport.authenticate('jwt', { session: false }), AdminController.getadmindetails); // R
// router.delete('/admin/:admin_id', passport.authenticate('jwt', { session: false }), AdminController.removeadmin); // D
// router.put('/admin/:admin_id', passport.authenticate('jwt', { session: false }), AdminController.updateadmin); // U


/* Routing for Forworders */
router.post('/company', passport.authenticate('jwt', { session: false }), CompanyController.create);
router.get('/company', passport.authenticate('jwt', { session: false }), CompanyController.getcompanyList); // R
router.get('/company/:company_id', passport.authenticate('jwt', { session: false }), CompanyController.getcompanydetails); // R
router.delete('/company/:company_id', passport.authenticate('jwt', { session: false }), CompanyController.removecompany); // D
router.put('/company/:company_id', passport.authenticate('jwt', { session: false }), CompanyController.updatecompany); // U
/* Routing for Borrowers */
router.post('/borrowers', passport.authenticate('jwt', { session: false }), BorrowersController.create);
router.get('/borrowers', passport.authenticate('jwt', { session: false }), BorrowersController.getBorrowersList); // R
router.get('/borrowers/:borrowers_id', passport.authenticate('jwt', { session: false }), BorrowersController.getBorrowersdetails); // R
router.delete('/borrowers/:borrowers_id', passport.authenticate('jwt', { session: false }), BorrowersController.removeBorrowers); // D
router.put('/borrowers/:borrowers_id', passport.authenticate('jwt', { session: false }), BorrowersController.updateBorrowers); // U


/* Routing for EmailPanel */
router.post('/emailPanel', passport.authenticate('jwt', { session: false }), EmailPanelController.create);
router.get('/emailPanel', passport.authenticate('jwt', { session: false }), EmailPanelController.getEmailPanelList); // R
router.get('/emailPanel/:emailPanel_id', passport.authenticate('jwt', { session: false }), EmailPanelController.getemailPaneldetails); // R
router.delete('/emailPanel/:emailPanel_id', passport.authenticate('jwt', { session: false }), EmailPanelController.removeemailPanel); // D
router.put('/emailPanel/:emailPanel_id', passport.authenticate('jwt', { session: false }), EmailPanelController.updateemailPanel); // U

/* Routing for Employee */
router.post('/employee', passport.authenticate('jwt', { session: false }), EmployeeController.create);
router.get('/employee', passport.authenticate('jwt', { session: false }), EmployeeController.getEmployeeList); // R
router.get('/employee/:employee_id', passport.authenticate('jwt', { session: false }), EmployeeController.getEmployeedetails); // R
router.delete('/employee/:employee_id', passport.authenticate('jwt', { session: false }), EmployeeController.removeEmployee); // D
router.put('/employee/:employee_id', passport.authenticate('jwt', { session: false }), EmployeeController.updateEmployee); // U


/* Routing for Loans */
router.post('/loans', passport.authenticate('jwt', { session: false }), LoansController.create);
router.get('/loans', passport.authenticate('jwt', { session: false }), LoansController.getLoansList); // R
router.get('/loans/:loans_id', passport.authenticate('jwt', { session: false }), LoansController.getLoansdetails); // R
router.delete('/loans/:loans_id', passport.authenticate('jwt', { session: false }), LoansController.removeLoans); // D
router.put('/loans/:loans_id', passport.authenticate('jwt', { session: false }), LoansController.updateLoans); // U

/* Routing for Message */
router.post('/message', passport.authenticate('jwt', { session: false }), MessageController.create);
router.get('/message', passport.authenticate('jwt', { session: false }), MessageController.getMessageList); // R
router.get('/message/:message_id', passport.authenticate('jwt', { session: false }), MessageController.getMessagedetails); // R
router.delete('/message/:message_id', passport.authenticate('jwt', { session: false }), MessageController.removeMessage); // D
router.put('/message/:message_id', passport.authenticate('jwt', { session: false }), MessageController.updateMessage); // U

/* Routing for ModulePermission */
router.post('/modulePermission', passport.authenticate('jwt', { session: false }), ModulePermissionController.create);
router.get('/modulePermission', passport.authenticate('jwt', { session: false }), ModulePermissionController.getModulePermissionList); // R
router.get('/modulePermission/:modulePermission_id', passport.authenticate('jwt', { session: false }), ModulePermissionController.getModulePermissiondetails); // R
router.delete('/modulePermission/:modulePermission_id', passport.authenticate('jwt', { session: false }), ModulePermissionController.removeModulePermission); // D
router.put('/modulePermission/:modulePermission_id', passport.authenticate('jwt', { session: false }), ModulePermissionController.updateModulePermission); // U

/* Routing for Payments */
router.post('/payments', passport.authenticate('jwt', { session: false }), PaymentsController.create);
router.get('/payments', passport.authenticate('jwt', { session: false }), PaymentsController.getPaymentsList); // R
router.get('/payments/:payments_id', passport.authenticate('jwt', { session: false }), PaymentsController.getPaymentsdetails); // R
router.delete('/payments/:payments_id', passport.authenticate('jwt', { session: false }), PaymentsController.removePayments); // D
router.put('/payments/:payments_id', passport.authenticate('jwt', { session: false }), PaymentsController.updatePayments); // U


/* Routing for SavingAccount */
router.post('/savingAccount', passport.authenticate('jwt', { session: false }), SavingAccountController.create);
router.get('/savingAccount', passport.authenticate('jwt', { session: false }), SavingAccountController.getSavingAccountList); // R
router.get('/savingAccount/:savingAccount_id', passport.authenticate('jwt', { session: false }), SavingAccountController.getSavingAccountdetails); // R
router.delete('/savingAccount/:savingAccount_id', passport.authenticate('jwt', { session: false }), SavingAccountController.removeSavingAccount); // D
router.put('/savingAccount/:savingAccount_id', passport.authenticate('jwt', { session: false }), SavingAccountController.updateSavingAccount); // U




router.get('/dash', passport.authenticate('jwt', { session: false }), HomeController.Dashboard)


//********* API DOCUMENTATION **********
router.use('/docs/api.json', express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
router.use('/docs', express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;