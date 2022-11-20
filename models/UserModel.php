<?php
require_once "./Database.php";

class UserModel extends Database
{
    // GET
    public function getUsers($role)
    {
        return json_encode($this->select("SELECT * FROM users WHERE role = ?", ["i", $role]));
    }

    public function getUser($id)
    {
        return json_encode($this->select("SELECT * FROM users WHERE id = ?", ["i", $id]));
    }

    public function activateUser($token)
    {
    }

    // POST
    public function addUser()
    {
    }

    // DELETE
    public function deleteUser()
    {
    }

    // PATCH
    public function updateUser()
    {
    }
}

// $user = new UserModel();
// echo $user->getUser(26);
