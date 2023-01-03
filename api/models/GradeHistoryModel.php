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
    public function addGradeHistory($data, $gradeId)
    {
        $data = json_decode($data, true);
        unset($data['userId']);
        unset($data['courseId']);
        unset($data['id']);
        $keys = implode(',', array_keys($data));
        $values = "\"" . implode("\",\"", array_values($data)) . "\"";
        if (!isset($data['createdAt'])) {
            $now = date('Y-m-d H:i:s');
            return $this->executeStatement("INSERT INTO history($keys, createdAt, gradeId) VALUES($values, \"$now\", \"$gradeId\")");
        } else {
            return $this->executeStatement("INSERT INTO history($keys, gradeId) VALUES($values, \"$gradeId\")");
        }
    }
}
