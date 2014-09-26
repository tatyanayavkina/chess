<?php

class GameHistoryController extends RestController
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='//layouts/column2';


	public function actionView()
	{
		$this->render('view');
	}

    public function actionShow()
    {
        $lastStepNumber = GameHistory::model()->getNextStepNumber()-1;
        $response[0] = false;
        if ($lastStepNumber % 2 === 0) $response[0] = true;
        $step = GameHistory::model()->getLastStep($lastStepNumber);
        $response[1] = CJSON::decode($step->boardPacked);
        $response[2] = CJSON::decode($step->lastStep);
        $response[3] = $step->moveFigure;
        $response[4] = $step->stepInfo;
        $this->sendResponse(200,CJSON::encode($response));
    }

    public function actionCreate()
    {
        $gameId = Yii::app()->session['chessGameId'];
        $data = CJSON::decode(file_get_contents('php://input'));
        $boardPacked = CJSON::encode($data[0]);
        $lastStep = CJSON::encode($data[1]);
        $moveFigure = $data[2];
        $stepInfo = $data[3];
        $stepNumber = GameHistory::model()->getNextStepNumber();
        GameHistory::model()->stepCreate($gameId,$boardPacked,$stepInfo,$stepNumber,$lastStep,$moveFigure);
        $this->sendResponse(200, $stepNumber);
    }
}
