module.exports = {
    getAllUsers: (req, res) => {
        res.status(200).send(housesDB);
    },
    createNewUser: (req, res) => {
        const { username, firstName, lastName, age } = req.body;

        if (!username || !firstName || !lastName) {
            res.status(400).send("Forms cannot be empty");
            return;
        }

        let newUser = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            age: age,
        };

        usersDB.push(newUser);
        res.status(200).send(usersDB);
    },
    updateUser: (req, res) => {
        const { name } = req.params;
        const { username } = req.body;

        if (!username) {
            res.status(400).send("Failed to update");
            return;
        }

        const userToBeUpdated = usersDB.find(el => el.username === name);

        if (userToBeUpdated) {
            userToBeUpdated.username = username;
            res.status(200).send('Successfully updated user');
        } else {
            res.status(404).send("User not found");
        }
    },
    deleteUser: (req, res) => {
        const { username } = req.params;
        const indexToDelete = usersDB.findIndex(el => el.username === username);

        if (indexToDelete !== -1) {
            usersDB.splice(indexToDelete, 1);
            res.status(200).send("Successfully deleted");
        } else {
            res.status(404).send("User not found");
        }
    },
};
