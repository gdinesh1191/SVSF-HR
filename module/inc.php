<?php


switch ($_GET["pl"]) {

    case "staff": {
        if ($_GET["type"] == "list") {
            require 'pages/staff/list.php';
        } else {
            require 'pages/staff/new.php';
        }
    }
        break;
    case "option": {
       require 'pages/option/list.php';
    }
        break;
    case "policy": {
        require 'pages/policy/list.php';
    }
        break;
    case "manualPunch": {
       require 'pages/manualPunch/list.php';
    }
        break;
    case "reminder": {
        require 'pages/reminder/list.php';

    }
        break;
    case "salary": {
        require 'pages/salary/list.php';
    }
        break;
    case "insurance": {
        require 'pages/insurance/list.php';
    }
        break;

    case "approval": {
       require 'pages/approval/list.php';
    }
        break;

     case "attendance": {
       require 'pages/attendance/list.php';
    }
        break;

     case "report": {
       require 'pages/report/report.php';
    }
        break;
    
     case "asset": {
       require 'pages/asset/list.php';
    }
        break;

     case "shiftApproval": {
       require 'pages/shiftApproval/list.php';
    }
        break;

     case "notification": {
       require 'pages/notification/list.php';
    }
        break;

     case "event": {
       require 'pages/event/event.php';
    }
        break;
    case "profile": {
            require 'pages/profile/profile.php';
         }
             break;
    case "settings": {
                require 'pages/settings/settings.php';
             }
                 break;

    default:
        require 'pages/dashboard/index.php';
        break;
}


?>