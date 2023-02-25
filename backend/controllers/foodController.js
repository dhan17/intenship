const Food = require("../models/foodModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

//create food item (ADMIN)
exports.createItem = catchAsyncErrors(async (req, res, next) => {
  let food_images = [];

  if (typeof req.body.food_images === "string") {
    food_images.push(req.body.food_images);
  } else {
    food_images = req.body.food_images;
  }

  const food_images_link = [];

  for (let i = 0; i < food_images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(food_images[i], {
      folder: "food_images",
    });

    food_images_link.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.food_images = food_images_link;
  req.body.user = req.user.id;

  const fooditem = await Food.create(req.body);

  res.status(201).json({
    success: true,
    fooditem,
  });
});

//get all food items
exports.getAllItems = catchAsyncErrors(async (req, res) => {
  const resultsPerPage = 8;

  const fooditemCount = await Food.countDocuments();

  const apiFeature = new ApiFeatures(Food.find(), req.query).search().filter();

  let fooditems = await apiFeature.query;

  let filteredFooditemsCount = fooditems.length;

  apiFeature.pagination(resultsPerPage);

  fooditems = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    fooditems,
    fooditemCount,
    resultsPerPage,
    filteredFooditemsCount,
  });
});

//get all food items --ADMIN
exports.getAdminItems = catchAsyncErrors(async (req, res) => {
  const fooditems = await Food.find();

  res.status(200).json({
    success: true,
    fooditems,
  });
});

//update food item (ADMIN)
exports.updateItem = catchAsyncErrors(async (req, res, next) => {
  let fooditem = await Food.findById(req.params.id);

  if (!fooditem) {
    return next(new ErrorHandler("Food item not found", 500));
  }

  let food_images = [];

  if (typeof req.body.food_images === "string") {
    food_images.push(req.body.food_images);
  } else {
    food_images = req.body.food_images;
  }

  if (food_images !== undefined) {
    for (let i = 0; i < fooditem.food_images.length; i++) {
      await cloudinary.v2.uploader.destroy(fooditem.food_images[i].public_id);
    }

    const food_images_link = [];

    for (let i = 0; i < food_images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(food_images[i], {
        folder: "food_images",
      });

      food_images_link.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.food_images = food_images_link;
  }

  fooditem = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    fooditem,
  });
});

//delete food item
exports.deleteitem = catchAsyncErrors(async (req, res, next) => {
  const fooditem = await Food.findById(req.params.id);

  if (!fooditem) {
    return next(new ErrorHandler("Food item not found", 500));
  }

  for (let i = 0; i < fooditem.food_images.length; i++) {
    await cloudinary.v2.uploader.destroy(fooditem.food_images[i].public_id);
  }

  await fooditem.remove();

  res.status(200).json({
    success: true,
    message: "Food item deleted successfully",
  });
});

//get item details
exports.getItemDetails = catchAsyncErrors(async (req, res, next) => {
  const fooditem = await Food.findById(req.params.id);

  if (!fooditem) {
    return next(new ErrorHandler("Food item not found", 404));
  }

  res.status(200).json({
    success: true,
    fooditem,
  });
});
