<?php
require_once "Database.php";

class UserModel extends Database
{
    // GET
    public function getUsers($role, $id)
    {
        if (!is_null($role)) {
            return $this->select("SELECT * FROM users WHERE role = ?", ["i", $role]);
        }
        if (!is_null($id)) {
            return $this->select("SELECT * FROM users WHERE id = ?", ["i", $id]);
        }
        return $this->select("SELECT * FROM users");
    }

    public function activateUser($token)
    {
    }

    // POST
    public function addUser()
    {
    }

    // DELETE
    public function deleteUser($id)
    {
        if (!is_null($id)) {
            return $this->executeStatement("DELETE FROM users WHERE id =?", ["i", $id]);
        }
    }

    // PATCH
    public function updateUser()
    {
    }
}

// $user = new UserModel();
// echo $user->getUser(26);
