const { Sequelize } = require('sequelize')
const db = require('../_db');
const OP = Sequelize.Op

const Image =  db.define('image', {
  name: {
    type: Sequelize.STRING
  },
  picture: {
    type: Sequelize.STRING
  },
   pictures: {
     type: Sequelize.ARRAY(Sequelize.STRING)
   },
})

module.exports = {
  Image,
  db
}
