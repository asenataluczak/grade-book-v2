<?php
require_once "Database.php";

class CourseModel extends Database
{
    // GET
    public function getCourses()
    {
        return $this->select("SELECT * FROM courses");
    }
}
