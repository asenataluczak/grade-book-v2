<?php
require_once "Database.php";

class GradeModel extends Database
{
    // GET
    public function getGrades($course)
    {
        if (!is_null($course)) {
            return $this->select("SELECT * FROM grades WHERE courseId = ?", ["i", $course]);
        }
        return $this->select("SELECT * FROM grades");
    }

    // DELETE
    public function deleteGrade($id)
    {
        if (!is_null($id)) {
            return $this->executeStatement("DELETE FROM grades WHERE id =?", ["i", $id]);
        }
    }

    // POST
    public function addGrade($data)
    {
        $data = json_decode($data, true);
        $keys = implode(',', array_keys($data));
        $values = "\"" . implode("\",\"", array_values($data)) . "\"";
        $now = date('Y-m-d H:i:s');
        return $this->executeStatement("INSERT INTO grades($keys, createdAt) VALUES($values, \"$now\")");
    }
    
    // PATCH
    public function editGrade($id, $data)
    {
        $data = json_decode($data, TRUE);
        $now = date('Y-m-d H:i:s');

        foreach ($data as $key => $value) {
            $this->executeStatement("UPDATE grades SET $key='$value' WHERE id = $id");
        }
        $this->executeStatement("UPDATE grades SET createdAt='$now' WHERE id = $id");
        return $this->select("SELECT * FROM grades WHERE id = $id");
    }
}
