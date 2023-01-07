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

    // GET
    public function getUserByEmail($email)
    {
        return $this->select("SELECT * FROM users WHERE email = ?", ["s", $email]);
    }


    // POST
    public function addUser($data)
    {
        $data = json_decode($data, true);
        $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);
        $keys = implode(',', array_keys($data));
        $values = "\"" . implode("\",\"", array_values($data)) . "\"";
        return $this->executeStatement("INSERT INTO users($keys) VALUES($values)");
    }

    // DELETE
    public function deleteUser($id)
    {
        if (!is_null($id)) {
            return $this->executeStatement("DELETE FROM users WHERE id =?", ["i", $id]);
        }
    }

    // PATCH
    public function editUser($id, $data)
    {
        $data = json_decode($data, TRUE);

        foreach ($data as $key => $value) {
            if ($key == 'password') {
                $value = password_hash($value, PASSWORD_BCRYPT);
            }
            return $this->executeStatement("UPDATE users SET $key='$value' WHERE id = $id");
        }
    }
}

// $user = new UserModel();
// echo $user->getUser(26);
