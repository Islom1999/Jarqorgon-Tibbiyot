
const authProtected = (req, res, next) => {
    try {
        if(req.session){
            if(req.session.isLogin){
                next()
            }else{
                res.redirect('/auth/login')
            }
        }else{
            res.redirect('/auth/login')
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {authProtected}