<?php

/**
 * This is the model class for table "game_history".
 *
 * The followings are the available model relations:
 * @property Game $id0
 */
class GameHistory extends CActiveRecord
{
    public $maxStepNumber;
    const MOVE_FIGURE_ID = -1;
    const STEP_INFO = "Ход";
    const LAST_STEP = '[{"x" : null, "y" : null},{"x" : null, "y" : null}]';
    const FIGURES_JSON = StartFigures::FIGURES;
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'game_history';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('gameId, stepNumber, boardPacked, lastStep, moveFigure, stepInfo', 'required'),
			array('gameId, stepNumber, moveFigure', 'numerical', 'integerOnly'=>true),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, gameId, stepNumber, boardPacked, lastStep, moveFigure', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'id0' => array(self::BELONGS_TO, 'Game', 'gameId'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'gameId' => 'Game',
			'stepNumber' => 'Step Number',
			'boardPacked' => 'Board Packed',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('gameId',$this->gameId);
		$criteria->compare('stepNumber',$this->stepNumber);
		$criteria->compare('boardPacked',$this->boardPacked,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return GameHistory the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

    public function stepCreate($gameId,$figures,$stepInfo,$stepNumber = 0, $lastStep = self::LAST_STEP, $moveFigure = self::MOVE_FIGURE_ID)
    {
        $step = new GameHistory();
        $step->gameId = $gameId;
        $step->boardPacked = $figures;
        $step->stepNumber = $stepNumber;
        $step->lastStep = $lastStep;
        $step->moveFigure = $moveFigure;
        $step->stepInfo = $stepInfo;
        $step->save();
    }

    //функция возвращает номер следующего хода
    public function getNextStepNumber()
    {
        return self::model()->countByAttributes(array('gameId' => Yii::app()->session['chessGameId']));
    }

    //функция возвращает последний ход игры
    public function getLastStep($stepNumber){
        $criteria = new CDbCriteria;
        $criteria->condition = 'gameId = :gameId';
        $criteria->addCondition('stepNumber = :stepNumber');
        $criteria->params = array(':gameId'=>Yii::app()->session['chessGameId'],':stepNumber'=>$stepNumber);
        return self::model()->find($criteria);
    }

}