<?php
class AuthController extends BaseController
{
    /**
     * "/auth/login" Endpoint - Login
     */
    public function loginAction()
    {
        $strErrorDesc = '';
        $strErrorHeader = '';
        $responseData = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'POST') {
            try {
                $userModel = new UserModel();

                $data = json_decode(file_get_contents('php://input'));
                $user = $userModel->getUserByEmail($data->email);
                if (password_verify($data->password, $user[0]['password'])) {
                    session_start();
                    $_SESSION["loggedIn"]=true;
                    $user['sessionId'] = session_id();
                    $responseData = json_encode($user);
                } else {
                    $strErrorDesc = 'Wrong credentials';
                    $strErrorHeader = 'HTTP/1.1 401 Unauthorized';
                }
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
     * "/auth/logout" Endpoint - Logout
     */
    public function logoutAction()
    {
        $strErrorDesc = '';
        $strErrorHeader = '';
        $responseData = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'DELETE') {
            try {
                session_start();
                unset($_SESSION["loggedIn"]);
                $responseData = json_encode(array('loggedOut' => true));
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
     * "/auth/status" Endpoint - Login
     */
    public function statusAction()
    {
        $strErrorDesc = '';
        $strErrorHeader = '';
        $responseData = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'GET') {
            try {
                session_start();
                if(isset($_SESSION['loggedIn']) && $_SESSION["loggedIn"] == true) {
                    $responseData = json_encode(array('isLoggedIn' => true));
                } else {
                    $responseData = json_encode(array('isLoggedIn' => false));
                }
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
