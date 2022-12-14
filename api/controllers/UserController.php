<?php
class UserController extends BaseController
{
    /**
     * "/user/list" Endpoint - Get list of users
     */
    public function listAction()
    {
        $strErrorDesc = '';
        $strErrorHeader = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();

        if (strtoupper($requestMethod) == 'GET') {
            try {
                $userModel = new UserModel();

                $role = $arrQueryStringParams['role'] ?? NULL;
                $userId = $arrQueryStringParams['id'] ?? NULL;

                $arrUsers = $userModel->getUsers($role, $userId);
                $responseData = json_encode($arrUsers);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        $this->prepareOutput($responseData, $strErrorDesc, $strErrorHeader);
    }

    /**
     * "/user/delete" Endpoint - Delete user by id
     */
    public function deleteAction()
    {
        $strErrorDesc = '';
        $strErrorHeader = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();

        if (strtoupper($requestMethod) == 'DELETE') {
            try {
                $userModel = new UserModel();
                $gradeModel = new GradeModel();
                $gradeHistoryModel = new GradeHistoryModel();

                $userId = $arrQueryStringParams['id'] ?? NULL;

                $grade = $gradeModel->deleteGrade(null, $userId);
                if (count($grade) > 0) {
                    $gradeHistoryModel->deleteGradeHistory($grade[0]['id']);
                }
                $arrUsers = $userModel->deleteUser($userId);
                $responseData = json_encode($arrUsers);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        $this->prepareOutput($responseData, $strErrorDesc, $strErrorHeader);
    }

    /**
     * "/user/edit" Endpoint - Edit user by id
     */
    public function editAction()
    {
        $strErrorDesc = '';
        $strErrorHeader = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();

        if (strtoupper($requestMethod) == 'PATCH') {
            try {
                $userModel = new UserModel();

                $userId = $arrQueryStringParams['id'] ?? NULL;
                $data = file_get_contents('php://input');

                $arrUsers = $userModel->editUser($userId, $data);
                $responseData = json_encode($arrUsers);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        $this->prepareOutput($responseData, $strErrorDesc, $strErrorHeader);
    }

    /**
     * "/user/add" Endpoint - Add user
     */
    public function addAction()
    {
        $strErrorDesc = '';
        $strErrorHeader = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'POST') {
            try {
                $userModel = new UserModel();

                $data = file_get_contents('php://input');

                $arrUsers = $userModel->addUser($data);
                $responseData = json_encode($arrUsers);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        $this->prepareOutput($responseData, $strErrorDesc, $strErrorHeader);
    }

    private function prepareOutput($responseData, $strErrorDesc = '', $strErrorHeader = '')
    {
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
}
