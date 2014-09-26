<?php /* @var $this Controller */ ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="language" content="en" />
    <?php Yii::app()->bootstrap->register(); ?>
	<!-- blueprint CSS framework -->
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/app.css" />
    <base href="<?php echo Yii::app()->createAbsoluteUrl('/'); ?>/">
	<title><?php echo CHtml::encode($this->pageTitle); ?></title>
</head>

<body>
<header class="navbar navbar-fixed-top">
    <div class="navbar-inner">
        <div style = "width: 1170px; height: 40px;">
            <div class="ul-wrapper">
                <?php $this->widget('zii.widgets.CMenu',array(
                    'items'=>array(
                        array('label'=>'START GAME', 'url'=>array('/game/start')),
                        array('label'=>'END GAME', 'url'=>array('/game/delete')),

                    ),
                    'activeCssClass'=>'active',
                    'htmlOptions'=>array(
                        'class'=>'nav',
                    ),
                )); ?>
            </div>
        </div>
    </div>
</header>
    <div class="container">
        <?php echo $content; ?>
    </div>

</div><!-- page -->

</body>
</html>
