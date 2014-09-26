<?php
class Session
{
    //создание сессии
    public static function getSession()
    {
        //если в куки есть сохраненная сессия и она есть в базе
        if(isset($_COOKIE['chessGameId'])&&Game::model()->gameExists($_COOKIE['chessGameId']))
        {
            $sessionId = $_COOKIE['chessGameId'];
        }
        else
        {
            //добавить новую игру в таблицу Game, записать в куки новый id
            $sessionId = Game::model()->gameCreate();
            setcookie('chessGameId',$sessionId);
            GameHistory::model()->stepCreate($sessionId,GameHistory::FIGURES_JSON,GameHistory::STEP_INFO);
        }
        Yii::app()->session['chessGameId'] = $sessionId;
        return true;
    }
    //удаление сессии
    public static function deleteSession()
    {
        setcookie('chessGameId',Yii::app()->session['chessGameId'],time()-3600);
        return true;
    }
}