const { Zone } = require("../models/zone.model");

/**
 * @route  GET /api/zones/stats
 */
const getZoneStats = async (req, res, next) => {
  try {
    const [total, active, inactive] = await Promise.all([
      Zone.countDocuments(),
      Zone.countDocuments({ status: "Active" }),
      Zone.countDocuments({ status: "Inactive" }),
    ]);
    return res.status(200).json({ success: true, stats: { total, active, inactive } });
  } catch (err) { next(err); }
};

/**
 * @route  GET /api/zones
 */
const getAllZones = async (req, res, next) => {
  try {
    const { search = "", status } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
      ];
    }
    if (status && status !== "All") query.status = status;

    const zones = await Zone.find(query).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, total: zones.length, zones });
  } catch (err) { next(err); }
};

/**
 * @route  GET /api/zones/:id
 */
const getZoneById = async (req, res, next) => {
  try {
    const zone = await Zone.findById(req.params.id);
    if (!zone) return res.status(404).json({ success: false, message: "Zone not found" });
    return res.status(200).json({ success: true, zone });
  } catch (err) { next(err); }
};

/**
 * @route  POST /api/zones
 */
const createZone = async (req, res, next) => {
  try {
    const { name, city, areas, providers, enabledServices, pricingType, status } = req.body;
    if (!name || !city) {
      return res.status(400).json({ success: false, message: "name and city are required" });
    }
    const zone = await Zone.create({ name, city, areas, providers, enabledServices, pricingType, status });
    return res.status(201).json({ success: true, message: "Zone created successfully", zone });
  } catch (err) { next(err); }
};

/**
 * @route  PUT /api/zones/:id
 */
const updateZone = async (req, res, next) => {
  try {
    const { name, city, areas, providers, enabledServices, pricingType, status } = req.body;
    const zone = await Zone.findByIdAndUpdate(
      req.params.id,
      { name, city, areas, providers, enabledServices, pricingType, status },
      { new: true, runValidators: true }
    );
    if (!zone) return res.status(404).json({ success: false, message: "Zone not found" });
    return res.status(200).json({ success: true, message: "Zone updated successfully", zone });
  } catch (err) { next(err); }
};

/**
 * @route  DELETE /api/zones/:id
 */
const deleteZone = async (req, res, next) => {
  try {
    const zone = await Zone.findByIdAndDelete(req.params.id);
    if (!zone) return res.status(404).json({ success: false, message: "Zone not found" });
    return res.status(200).json({ success: true, message: "Zone deleted successfully" });
  } catch (err) { next(err); }
};

module.exports = { getZoneStats, getAllZones, getZoneById, createZone, updateZone, deleteZone };
