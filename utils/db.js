const { Sequelize }= require('sequelize')
const { DB_URL } = require('./config')

const sequelize = new Sequelize(DB_URL, {
	dialect: 'postgres',
  dialectOptions: {}
})

const connectToDatabase = async () => {
	try {
    console.log('Start')
		await sequelize.authenticate()
		console.log('Connected to the database')
	} catch (error) {
		console.log('Failed to connect to the database')
    return process.exit(1)
	}

  return null
}

module.exports = { connectToDatabase, sequelize }