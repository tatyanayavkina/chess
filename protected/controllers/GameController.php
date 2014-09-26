<?php

class GameController extends Controller
{
    public $defaultAction = 'start';


    public function actionDelete()
    {
        $id = Yii::app()->session['chessGameId'];
        $this->loadModel($id)->delete();
        Yii::app()->session['chessGameId'] = '';
        $this->redirect(array('end'));
    }

	public function loadModel($id)
	{
		$model=Game::model()->findByPk($id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}

    public function actionStart()
    {
        //получаем id игры
        Session::getSession();
        //переходим на страницу с игрой
        $this->redirect(array('gameHistory/view'));
    }

    public function actionEnd()
    {
        Session::deleteSession();
        $this->render('end');
       // $this->sendResponse(200, 'game is deleted');
    }
}
