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
}
