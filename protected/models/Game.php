<?php

/**
 * This is the model class for table "game".
 *
 * The followings are the available columns in table 'game':
 * @property integer $id
 * @property integer $lastStepTime
 * @property string $figuresPacked
 *
 * The followings are the available model relations:
 * @property GameHistory $gameHistory
 */
class Game extends CActiveRecord
{
    //последняя сохраненная игра
    public $maxSession;
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'game';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
		//	array('lastStepTime, figuresPacked', 'required'),
		//	array('lastStepTime', 'numerical', 'integerOnly'=>true),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id', 'safe', 'on'=>'search'),
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
			'gameHistory' => array(self::HAS_MANY, 'GameHistory', 'gameId'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'lastStepTime' => 'Last Step Time',
			'figuresPacked' => 'Figures Packed',
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
		$criteria->compare('lastStepTime',$this->lastStepTime);
		$criteria->compare('figuresPacked',$this->figuresPacked,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Game the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

    public function gameExists($id)
    {

        $game = Game::model()->findByPk($id);
        if ($game === null)
            return false;
        else
            return true;

    }

    //находит последнюю сохраненную игру
    public function getMaxGameSession()
    {
        $criteria = new CDbCriteria;
        $criteria->select = 'max(id) as maxSession';
        $data = Game::model()->find($criteria);
        $maxId = $data['maxSession'];
        return $maxId;

    }
    //создает игру и возвращает ее id
    public function gameCreate()
    {
        $game = new Game;
        $game->save();
        return $this->getMaxGameSession();

    }
}
