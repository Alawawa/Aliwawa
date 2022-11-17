const { Database } =  require("fakebase");

const db = new Database("./server/data");

const Users = db.table('users');
const Listings = db.table('listings');

module.exports = {
    Users, Listings
}