import Feature from "../Model/FEATURE";
export const addHotelFeature = async (req, res) => {
  //   console.log("hi");
  const responseObj = {
    response: {},
    message: "Please Enter feature name",
  };
  const { featureName } = req.body;
  if (!featureName) {
    return res.status(400).json(responseObj);
  }
  const featureExist = await Feature.findOne({
    name: featureName,
  }).exec();
  // error is exist
  if (featureExist) {
    return res.status(201).json({
      ...responseObj,
      message: "Feature name already exists",
    });
  }
  try {
    // const feature = new Feature({ $push: { name: featureName } });

    const feature = new Feature({
      name: featureName,
    });
    await feature.save();
    // console.log(feature);
    res.status(201).json({
      ...responseObj,
      message: "Feature added successfully",
      response: feature,
    });
  } catch (e) {
    return res.status(400).send("Register error. Try again.");
  }
};

export const getFeature = async (req, res) => {
  const getallfeature = await Feature.find({});
  console.log(getallfeature);
};
