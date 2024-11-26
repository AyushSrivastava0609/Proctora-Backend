const router = require("express").Router();
const authenticate = require("../middlewares/userAuth");

const deviceTokenController = require('../controllers/deviceToken.controller');
const usersController = require("../controllers/users.controller");
const userAddressesController = require("../controllers/userAddresses.controller");
const userBucketController = require("../controllers/userBucket.controller");
const categoriesController = require('../controllers/categories.controller');
const productsController = require('../controllers/products.controller');
const productsGalleryController = require('../controllers/productImage.controller');
const orderController = require('../controllers/orders.controller');
const creativesController = require('../controllers/creatives.controller');
const reviewsController = require('../controllers/reviews.controller');
const blogsController = require("../controllers/blogs.controller");
const testimonialsController = require("../controllers/testimonials");
const pageContentController = require("../controllers/pageContent.controller");

// Users Controller APIs
router.post("/user/login", usersController.login);

// push Notification Controller APIs
router.route("/pushNotification")
    .post(deviceTokenController.sendPushNotification);

router.route("/users")
    .post(usersController.signUp)
    .get(usersController.getAllUsers)
router.route("/user/:id")
    .get(usersController.getUserById)
    .put(usersController.updateUserById)
    .delete(usersController.deleteUserById)

// google Authentication APIs
router.post("/user/googleAuthentication", usersController.googleAuthentication);

// facebook SignUp APIs
router.post("/user/facebookSignUp", usersController.facebookAuthentication);

// apple SignUp APIs
router.post("/user/appleSignUp", usersController.appleAuthentication);

// userAddress Controller APIs
router.route("/userAddresses")
    .post(userAddressesController.createUserAddress)
    .get(userAddressesController.getAllusersAddresses)

router.route("/userAddresses/:id")
    .get(userAddressesController.getUserAddressById)
    .put(userAddressesController.updateUserAddressById)
    .delete(userAddressesController.deleteUserAddressById)

router.route("/getUserAddressByUserId/:user_id")
    .get(userAddressesController.getUserAddressByUser)


// userBucket Controller APIs
router.route("/userbucket/:id")
    .delete(userBucketController.deleteUserBucketById)
    .put(userBucketController.updateUserBucketById)
router.route("/update/userbucket")
    .put(userBucketController.updateUserBucket)

router.route("/userbucket/cart")
    .post(userBucketController.createUserCart)

router.route("/userbucket/wishlist")
    .post(userBucketController.createUserWishlist)

router.route("/userbucket/cart/:user_id")
    .get(userBucketController.getUserCart)
    .delete(userBucketController.deleteCartByUserId)

router.route("/userbucket/wishlist/:user_id")
    .get(userBucketController.getUserWishlist)


// Categories Controller APIs
router.route("/categories")
    .post(categoriesController.createCategory)
    .get(categoriesController.getAllCategories)
router.route("/parentcategories")
    .get(categoriesController.getParentCategories)
router.route("/categories/:id")
    .get(categoriesController.getCategoryById)
    .put(categoriesController.updateCategoryById)
    .delete(categoriesController.deleteCategoryById)

// products controller APIs
router.route('/products')
    .post(productsController.createProduct)
    .get(productsController.getAllProducts)
router.route('/search')
    .post(productsController.searchProducts)
router.route('/filteredProducts')
    .post(productsController.getFilteredProducts)
router.route("/filteredProducts/:id")
    .get(productsController.getFilteredProductsById)
router.route("/products/:id")
    .get(productsController.getProductById)
    .put(productsController.updateProductById)
    .delete(productsController.deleteProductById)
router.route("/isPublished/:id")
    .put(productsController.updateIsPublisedById)
router.route("/productsByCategory/:category_id")
    .get(productsController.getProductByCategory)


// productImages controller APIs
router.route('/gallery')
    .post(productsGalleryController.createProductImage)
    .get(productsGalleryController.getAllProductsImage)
router.route('/gallery/:id')
    .get(productsGalleryController.getProductImageById)
    .put(productsGalleryController.updateProductImageById)
    .delete(productsGalleryController.deleteProductImageById)
router.route('/galleryByProductId/:product_id')
    .get(productsGalleryController.getProductImageByProductId)

// Upload Image
router.post('/upload-image/:id', productsGalleryController.S3BucketImage);


// Order Controller APIs
router.route('/order')
    .get(orderController.getUserOrders)
router.route('/order/:id')
    .get(orderController.getOrderById)
    .put(orderController.updateOrderById)
    .delete(orderController.deleteOrderById)
router.route('/updateOrderStatus/:id')
    .put(orderController.updateOrderStatusById)
router.route('/orderPlaced')
    .post(orderController.createOrderPlaced)
    .get(orderController.getAllPlacedOrders)
router.route('/orderPlacedByUser/:user_id')
    .get(orderController.getOrderPlacedByUser)
router.route('/orderReturnsByUser/:user_id')
    .get(orderController.getOrderReturnsByUser)
router.route('/createPayment')
    .post(orderController.createPayment)
router.route('/confirmPayment')
    .post(orderController.confirmPayment)

// Creatives Controller APIs
router.route('/creatives')
    .post(creativesController.createCreatives)
    .get(creativesController.getAllCreatives);
router.route('/creatives/:id')
    .put(creativesController.updateCreativeById)
    .delete(creativesController.deleteCreativeById)
router.route('/creatives/:type')
    .get(creativesController.getCreativesBytype)

// Reviewes
router.route('/reviews')
    .get(reviewsController.getAllReviews);

// Blogs
router.route("/blogs")
    .get(blogsController.getAllBlogs)
    .post(blogsController.addBlog)

// router.route("/blogs/:id")
//     .put(blogsController.updateBlogById)

router.route("/testimonials")
    .get(testimonialsController.getAllTestimonials)


router.route("/pageContent")
    .get(pageContentController.getPageContent)
    .put(pageContentController.addPageContent)

module.exports = router;

