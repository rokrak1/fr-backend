const Clarifai = require('clarifai');

//You need to sign into your Clarifai account to get an APIKey
const app = new Clarifai.App({
 apiKey: 'YOUR_API_KEY'
});

const handleApiCall = () => (req, res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('Problems with api...'))
}


const handleIncrement = (db) => (req,res) =>{
	const {id} = req.body;
	db('users')
	.where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries =>{
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Unable to get entries...'))
}
module.exports = {
	handleIncrement,
	handleApiCall
}