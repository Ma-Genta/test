const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class UserService {
  constructor() {
    this.collection = 'users';
    this.MongoDB = new MongoLib();
  }

  async getUser({ email }) {
    const [ user ] = await this.MongoDB.getAll(this.collection, { email });
    return user;
  }

  async createUser ({ user }) {
    const { name, email, password } = user;
    const hashedPassword = await bcrypt.hash(password, 5);

    const createUserId = await this.MongoDB.create(this.collection, {
      name,
      email,
      password: hashedPassword
    })

    return createUserId;
  }
};

module.exports = UserService;