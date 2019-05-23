const mongoUsername ='merinta'
const mongoPassword ='Rinta13579'
const dbName = 'f-look'
const localUri = 'mongodb://localhost/f-look'
const atlasUri = `mongodb+srv://${mongoUsername}:${mongoPassword}@f-cluster-0ewgo.gcp.mongodb.net/${dbName}?retryWrites=true`

module.exports.atlasUri = atlasUri