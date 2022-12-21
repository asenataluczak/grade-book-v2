<?php
require_once "Database.php";

class GradeHistoryModel extends Database
{
    // GET
    public function getGradeHistory($gradeId)
    {
        if (!is_null($gradeId)) {
            return $this->select("SELECT * FROM history WHERE gradeId = ?", ["i", $gradeId]);
        }
    }
}
