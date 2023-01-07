<?php
require_once "Database.php";

class GradeModel extends Database
{
    // GET
    public function getGrades($course, $user)
    {
        if (!is_null($course)) {
            return $this->select("SELECT * FROM grades WHERE courseId = ?", ["i", $course]);
        }
        if (!is_null($user)) {
            return $this->select("SELECT * FROM grades WHERE userId = ?", ["i", $user]);
        }
        return $this->select("SELECT * FROM grades");
    }

    // DELETE
    public function deleteGrade($gradeId, $userId = null)
    {
        if (!is_null($gradeId)) {
            return $this->executeStatement("DELETE FROM grades WHERE id =?", ["i", $gradeId]);
        }
        if (!is_null($userId)) {
            $gradeId = $this->select("SELECT * FROM grades WHERE userId = ?", ["i", $userId]);
            $this->executeStatement("DELETE FROM grades WHERE userId =?", ["i", $userId]);
            return $gradeId;
        }
    }

    // POST
    public function addGrade($data)
    {
        $data = json_decode($data, true);
        $keys = implode(',', array_keys($data));
        $values = "\"" . implode("\",\"", array_values($data)) . "\"";
        return $this->executeStatement("INSERT INTO grades($keys) VALUES($values)");
    }

    // PATCH
    public function editGrade($id, $data)
    {
        $data = json_decode($data, TRUE);

        foreach ($data as $key => $value) {
            $this->executeStatement("UPDATE grades SET $key='$value' WHERE id = $id");
        }
        return $this->select("SELECT * FROM grades WHERE id = $id");
    }
}
