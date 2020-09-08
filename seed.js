const { db } = require('./server/db/models/image')
const {gree, red} = require('chalk')
const { Image, User } = require('./server/db/models')
const Sequelize = require('sequelize')

const seed = async () => {
  await db.sync({force: true})

  const image1= await Image.create({
    name: 'test',
    picture: 'https://eastnewyork.com/wp-content/uploads/2018/10/trees.jpg',
    pictures: ['https://eastnewyork.com/wp-content/uploads/2018/10/trees.jpg', 'https://treepicturesonline.com/orangetree-9991.jpg', 'https://treepicturesonline.com/old-oak-tree.jpg']
  })
  const user1 = await User.create({
    email: 'random@email.com',
    password: '12345',
  })
  db.close()
  console.log(`
    Seeding successful!
    Time to fly!
  `)
}
seed().catch(err => {
  db.close()
  console.log(`
    Error seeding:
    ${err.message}
    ${err.stack}
  `)
})
