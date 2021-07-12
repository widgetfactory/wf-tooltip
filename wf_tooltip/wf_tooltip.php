<?php

defined('_JEXEC') or die;

/**
 * Responsive Widgets class
 *
 * @package     Joomla.Plugin
 * @subpackage  System.wf-responsive-widgets
 */
class PlgSystemWf_Tooltip extends JPlugin
{
    public function onAfterDispatch()
    {
        $app = JFactory::getApplication();

        if ($app->isAdmin()) {
            return;
        }

        $document = JFactory::getDocument();
        $docType = $document->getType();

        // only in html pages
        if ($docType != 'html') {
            return;
        }

        // Include jQuery
        JHtml::_('jquery.framework');

        $selector   = $this->params->get('selector', '.jcetooltip');
        $options    = array('position' => 'bottom-center');
        $options    = json_encode($options);

        $document->addScript(JURI::base(true) . '/plugins/system/wf_tooltip/js/tooltip.js', array('version'));
        $document->addScriptDeclaration('jQuery(document).ready(function($){$("' . $selector . '").wf_tooltip(' . $options . ');});');

        $document->addStyleSheet(JURI::base(true) . '/plugins/system/wf_tooltip/css/tooltip.min.css', array('version'));
    }
}
