const { parse } = require('dotenv');
const moduleService = require('../services/module.service');
const api = require('../utils/apiResponse');


// GET /api/modules
const getModules = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { educationLevel, modules } = await moduleService.getModules(userId);

    return api.success(res, {
      educationLevel,
      total: modules.length,
      modules,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/modules/:id
const getModuleById = async (req, res, next) => {
  try {
    const moduleId = req.params.id;
    const userId = req.user.id;

    const module = await moduleService.getModuleById(moduleId, userId);

    return api.success(res, module);
  } catch (err) {
    next(err);
  }
};

// GET /api/modules/:id/pages/:pageNumber
const getModulePage = async (req, res, next) => {
  try {
    const moduleId = req.params.id;
    const pageNumber = parseInt(req.params.pageNumber, 10);

    if (isNaN(pageNumber) || pageNumber < 1) {
      return api.error(res, 'Nomor halaman tidak valid', 400);
    }

    const page = await moduleService.getModulePage(moduleId, pageNumber);

    return api.success(res, page);
  } catch (err) {
    next(err);
  }
};

// PUT /api/modules/:id/progress
const updateProgress = async (req, res, next) => {
  try {
    const moduleId = req.params.id;
    const userId = req.user.id;
    const last_page = parseInt(req.body.lastPage, 10);

    const progress = await moduleService.updateProgress(moduleId, userId, last_page);

    return api.success(res, progress, 'Progress berhasil disimpan');
  } catch (err) {
    next(err);
  }
};

module.exports = { getModules, getModuleById, getModulePage, updateProgress };