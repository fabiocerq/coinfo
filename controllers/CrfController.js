const xlsx = require('xlsx');

module.exports = class CrfController {
    static mainPage(req, res) {
        res.render('crf/crf')
    }
}