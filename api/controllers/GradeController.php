<?php
class GradeController extends BaseController
{
  /**
   * "/grade/list" Endpoint - Get list of grades
   */
  public function listAction()
  {
    $strErrorDesc = '';
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $arrQueryStringParams = $this->getQueryStringParams();

    if (strtoupper($requestMethod) == 'GET') {
      try {
        $gradeModel = new GradeModel();

        $course = $arrQueryStringParams['course'] ?? NULL;
        $user = $arrQueryStringParams['user'] ?? NULL;

        $arrGrades = $gradeModel->getGrades($course, $user);
        $responseData = json_encode($arrGrades);
      } catch (Error $e) {
        $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
        $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
      }
    } else {
      $strErrorDesc = 'Method not supported';
      $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
    }

    // send output
    if (!$strErrorDesc) {
      $this->sendOutput(
        $responseData,
        array('Content-Type: application/json', 'HTTP/1.1 200 OK')
      );
    } else {
      $this->sendOutput(
        json_encode(array('error' => $strErrorDesc)),
        array('Content-Type: application/json', $strErrorHeader)
      );
    }
  }

  /**
   * "/grade/history" Endpoint - Get history of grade by its id
   */
  public function historyAction()
  {
    $strErrorDesc = '';
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $arrQueryStringParams = $this->getQueryStringParams();

    if (strtoupper($requestMethod) == 'GET') {
      try {
        $gradeHistoryModel = new GradeHistoryModel();

        $id = $arrQueryStringParams['id'] ?? NULL;

        $arrHistory = $gradeHistoryModel->getGradeHistory($id);
        $responseData = json_encode($arrHistory);
      } catch (Error $e) {
        $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
        $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
      }
    } else {
      $strErrorDesc = 'Method not supported';
      $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
    }

    // send output
    if (!$strErrorDesc) {
      $this->sendOutput(
        $responseData,
        array('Content-Type: application/json', 'HTTP/1.1 200 OK')
      );
    } else {
      $this->sendOutput(
        json_encode(array('error' => $strErrorDesc)),
        array('Content-Type: application/json', $strErrorHeader)
      );
    }
  }

  /**
   * "/grade/delete" Endpoint - Delete grade by id
   */
  public function deleteAction()
  {
    $strErrorDesc = '';
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $arrQueryStringParams = $this->getQueryStringParams();

    if (strtoupper($requestMethod) == 'DELETE') {
      try {
        $gradeModel = new GradeModel();
        $gradeHistoryModel = new GradeHistoryModel();

        $gradeId = $arrQueryStringParams['id'] ?? NULL;

        $arrGrades = $gradeModel->deleteGrade($gradeId);
        $gradeHistoryModel->deleteGradeHistory($gradeId);
        $responseData = json_encode($arrGrades);
      } catch (Error $e) {
        $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
        $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
      }
    } else {
      $strErrorDesc = 'Method not supported';
      $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
    }

    //TODO: set output and error handling for deleteAction
  }

  /**
   * "/grade/add" Endpoint - Add grade
   */
  public function addAction()
  {
    $strErrorDesc = '';
    $requestMethod = $_SERVER["REQUEST_METHOD"];

    if (strtoupper($requestMethod) == 'POST') {
      try {
        $gradeModel = new GradeModel();
        $gradeHistoryModel = new GradeHistoryModel();

        $data = file_get_contents('php://input');

        $arrGrades = $gradeModel->addGrade($data);
        $gradeHistoryModel->addGradeHistory($data, $arrGrades->insert_id);
        $responseData = json_encode($arrGrades);
      } catch (Error $e) {
        $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
        $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
      }
    } else {
      $strErrorDesc = 'Method not supported';
      $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
    }

    //TODO: set output and error handling
  }

  /**
   * "/grade/edit" Endpoint - Edit grade by id
   */
  public function editAction()
  {
    $strErrorDesc = '';
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $arrQueryStringParams = $this->getQueryStringParams();

    if (strtoupper($requestMethod) == 'PATCH') {
      try {
        $gradeModel = new GradeModel();
        $gradeHistoryModel = new GradeHistoryModel();

        $gradeId = $arrQueryStringParams['id'] ?? NULL;
        $data = file_get_contents('php://input');

        $arrGrades = $gradeModel->editGrade($gradeId, $data);
        $gradeHistoryModel->addGradeHistory(json_encode($arrGrades[0]), $gradeId);
        $responseData = json_encode($arrGrades);
      } catch (Error $e) {
        $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
        $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
      }
    } else {
      $strErrorDesc = 'Method not supported';
      $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
    }

    //TODO: set output and error handling
  }
}
