module.exports = (mongoose) => {
    mongoose.connect('mongodb://localhost:27017/DD', {useNewUrlParser: true, useUnifiedTopology: true});
};