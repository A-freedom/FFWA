const ErrorDB = require('../module/db/db').error;
module.exports = {
    catch: (error, details, exit, callback) => {
        const paths = (new Error().stack).split('\n' + '    at ');
        paths.shift();
        const object = {
            error,
            paths,
            details,
        };
        const newErrorDB = new ErrorDB(object);
        newErrorDB.save((err) => {
            if (err) throw err;
            if (callback) callback(newErrorDB);
            if (exit) process.exit(1);
        });
        return true;
    },
    saveError(err,res,dontSentInSuccsses){
        const errorObject = {}
        if (err) {
            for(const property in err.errors){
                errorObject[property] = err.errors[property].message;
            }
            res.send(errorObject)
        }else {
            if(!dontSentInSuccsses){
                res.send(true);
            }
        }
    },
    findError:(err,result,res)=>{
        if(err) return module.catch(err)
        if(!result) res.send(404)
    }

};
