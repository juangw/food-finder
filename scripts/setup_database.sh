docker-compose exec mongo bash
mongo admin -u root -p 'rootpassword' --authenticationDatabase admin
db.createCollection("users", {});
db.users.insert({"username": "juangw", "password": "local"});
