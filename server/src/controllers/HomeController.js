
let getHomePage = (req, res) => {
    res.render('HomePage.ejs');
}
module.exports = {
    getHomePage: getHomePage,
}
