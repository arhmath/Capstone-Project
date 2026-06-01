const recommendationService = require('../services/ai-recommendation.service');
const api = require('../utils/apiResponse');

// POST /api/recommendations/sessions/:sessionId
// Dipanggil ketika user menekan tombol "Lihat Rekomendasi Modul Untukmu"
const requestRecommendation = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { sessionId } = req.params;

    const result = await recommendationService.requestRecommendation(
      userId,
      sessionId
    );

    return api.success(res, result, 'Rekomendasi modul berhasil didapatkan');
  } catch (err) {
    // Jika sudah pernah request, arahkan client untuk GET saja
    if (err.status === 409) {
      return api.error(res, err.message, 409, {
        alreadyExists: true,
        hint: `Rekomendasi modul sudah ada`,
      });
    }
    next(err);
  }
};

// GET /api/recommendations/sessions/:sessionId
// Ambil rekomendasi tersimpan (setelah pernah POST sebelumnya)
const getSavedRecommendations = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { sessionId } = req.params;

    const result = await recommendationService.getSavedRecommendations(
      userId,
      sessionId
    );

    return api.success(res, result);
  } catch (err) {
    next(err);
  }
};

module.exports = { requestRecommendation, getSavedRecommendations };