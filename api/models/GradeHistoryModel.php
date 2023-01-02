<?php
require_once "Database.php";

class GradeHistoryModel extends Database
{
    // GET
    public function getGradeHistory($gradeId)
    {
        if (!is_null($gradeId)) {
            return $this->select("SELECT * FROM history WHERE gradeId = ? ORDER BY createdAt DESC", ["i", $gradeId]);
        }
    }

    // POST
    public function addGradeHistory($data)
    {
        $data = json_decode($data, true);
        unset($data['userId']);
        unset($data['courseId']);
        $keys = implode(',', array_keys($data));
        $values = "\"" . implode("\",\"", array_values($data)) . "\"";
        $now = date('Y-m-d H:i:s');
        return $this->executeStatement("INSERT INTO history($keys, createdAt) VALUES($values, \"$now\")");
    }
}
