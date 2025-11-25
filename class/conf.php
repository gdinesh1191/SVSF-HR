<?php

error_reporting(0);
session_start();


//ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);


$timezone = 'Asia/Calcutta';
if (function_exists('date_default_timezone_set')) {
    date_default_timezone_set($timezone);
}
$link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$path = getenv('DOCUMENT_ROOT') . '';
header('Content-Type: text/html; charset=utf-8');
require 'meekro.php';
require 'functions.php';
require 'class.php';

$token_id = rno(6, 'A1') . date('dmyhisa');




 
 
if ($_SERVER["HTTP_HOST"] == 'bt98.infogreen.co') {
    DB::$host = '172.31.14.126';
    DB::$user = 'dinesh';
    DB::$password = 'dineshG12!@';
    $main_db = 'Badhri_Traders_9943979998';   
   // echo encrypt("9943979998"); exit;
}
else  if ($_SERVER["HTTP_HOST"] == 'kma8888.infogreen.co') {
    DB::$host = '65.0.119.163';
    DB::$user = 'dinesh';
    DB::$password = 'dineshG12!@';
    $main_db = 'KRUTHICK_MILK_AGENCY_9367678888'; 
    
    //echo encrypt("9367678888"); exit;
}
else if ($_SERVER["HTTP_HOST"] == 'sa145.infogreen.co') {
    DB::$host = 'localhost';
    DB::$user = 'root';
    DB::$password = '1960f7cdae8da45d';
    $main_db = 'saravas_agency_9791585145';   
    //echo encrypt("9791585145"); exit;
}
else if ($_SERVER["HTTP_HOST"] == 'kayal.infogreen.in') {
    DB::$host = '172.31.14.126';
    DB::$user = 'dinesh';
    DB::$password = 'dineshG12!@';
    $main_db = 'kayal_roofers_9677777903';
    //echo encrypt("Kayal@77903"); exit;
}
else if ($_SERVER["HTTP_HOST"] == 'mt288.infogreen.in') {
    DB::$host = '172.31.14.126';
    DB::$user = 'dinesh';
    DB::$password = 'dineshG12!@';
    $main_db = 'MURUGAN_TRADERS_8870422288';
    //echo encrypt("murugan@123"); exit;
}
else if ($_SERVER["HTTP_HOST"] == 'sgsm6568.infogreen.in') {
    DB::$host = '172.31.14.126';
    DB::$user = 'dinesh';
    DB::$password = 'dineshG12!@';
    $main_db = 'SRI_GANAPATHY_SUPER_MARKET_8778986568';
   // echo encrypt("7373874402"); exit;
}
else if ($_SERVER["HTTP_HOST"] == 'sl7774.infogreen.in') {
    DB::$host = 'localhost';
    DB::$user = 'root';
    DB::$password = '1960f7cdae8da45d';
    $main_db = 'SavithiriLubeProducts_9384237774';
    //echo encrypt("9384237774"); exit;
}
else if ($_SERVER["HTTP_HOST"] == 'gpf9898.infogreen.in') {
    DB::$host = 'localhost';
    DB::$user = 'root';
    DB::$password = '1960f7cdae8da45d';
    $main_db = 'ganapathy_poultry_farm_9487334466';
    //echo encrypt("Mario@123"); exit;
}
else {
    DB::$host = '65.0.119.163';
    DB::$user = 'dinesh';
    DB::$password = 'dineshG12!@';

    if ($_SERVER["HTTP_HOST"] == 'annamar1.infogreen.in')
        $main_db = 'annamar_agency_9524456333';
}

function getArrayRowsColumns($array)
{
    $numRows = count($array);
    $numColumns = count($array["0"]);

    return ["rows" => $numRows, "columns" => $numColumns];
}

$table_prefix = '';

function name($con)
{
    if ($con == 'items') {
        $items_query = DB::query('select name,id from items ');
        foreach ($items_query as $list) {
            $name[$list["id"]] = $list["name"];
        }

        return $name;
    }
    if ($con == 'options') {
        $query = DB::query('select name,id from options ');
        foreach ($query as $list) {
            $name[$list["id"]] = $list["name"];
        }

        return $name;
    }
    if ($con == 'ig_users') {
        $query = DB::query('select name,id from ig_users ');
        foreach ($query as $list) {
            $name[$list["id"]] = $list["name"];
        }

        return $name;
    }
}

function latest_details($type, $item)
{
    if ($type == 'sales') {
        $query = DB::query("SELECT * FROM  (  SELECT date, contact, total_value FROM  sales   ORDER BY  str_to_date(date,'%d/%m/%Y') DESC ) AS tmp_table  GROUP BY contact ");
        foreach ($query as $list) {
            $data[$list["contact"]]["value"] = $list["total_value"];
            $data[$list["contact"]]['date'] = $list["date"];
            $data[$list["contact"]]["days"] = days($list["date"]);
        }
    } elseif ($type == 'receipt') {
        $query = DB::query("SELECT * FROM  (  SELECT date, contact, amount FROM  receipt   ORDER BY  str_to_date(date,'%d/%m/%Y') DESC ) AS tmp_table  GROUP BY contact ");
        foreach ($query as $list) {
            $data[$list["contact"]]["value"] = $list["amount"];
            $data[$list["contact"]]['date'] = $list["date"];
            $data[$list["contact"]]["days"] = days($list["date"]);
        }
    }

    if ($type == 'material_rate') {
        $query = DB::queryFirstRow("select * from purchase_items  where product_id='" . $item . "'   ORDER BY  str_to_date(date,'%d/%m/%Y') DESC  ");

        $purchase = DB::queryFirstRow("select *  from purchase  where id='" . $query["sales_id"] . "'   ");

        $total = $query["total"] + $purchase["other_amount"] + $purchase["freight_amount"];

        return number_format(($total / $query["qty"]), 2, '.', '');
    }

    return $data;
}

function days($fdate, $tdate)
{
    // Declare two dates
    $start_date = strtotime(format($fdate, 'date'));
    if ($tdate == '') {
        $end_date = strtotime(date('Y-m-d'));
    } else {
        $end_date = strtotime(format($tdate, 'date'));
    }

    // number of days
    return ($end_date - $start_date) / 60 / 60 / 24;
}

function cash_balance($date)
{
    if ($date != null) {
        $con = " where str_to_date(date,'%d/%m/%Y') <= '" . format($date, 'date', 'Y-m-d') . "' ";
        $sales_con = "  and  str_to_date(date,'%d/%m/%Y') <= '" . format($date, 'date', 'Y-m-d') . "' ";
    }

    $sales_query = DB::query("select date,type,total_value  from  sales  where type='cash' " . $sales_con . ' ');
    foreach ($sales_query as $list) {
        $sales += $list['total_value'];
    }

    $receipt_query = DB::query('select bank,date,amount  from  receipt   ' . $con . '  ');
    foreach ($receipt_query as $list) {
        $credit[$list["bank"]] += $list['amount'];
    }

    $payment_query = DB::query('select bank,amount,date  from payment   ' . $con . ' ');
    foreach ($payment_query as $list) {
        $debit[$list["bank"]] += $list['amount'];
    }

    $transfer_query = DB::query('select from_account,to_account,amount,date  from bank_transfer ' . $con . '   ');
    foreach ($transfer_query as $list) {
        $debit[$list["from_account"]] += $list['amount'];
    }

    $transfer_query = DB::query('select from_account,to_account,amount,date  from bank_transfer ' . $con . ' ');
    foreach ($transfer_query as $list) {
        $credit[$list["to_account"]] += $list['amount'];
    }

    $accounts_query = DB::query('select  credit,debit,bank,date   from  accounts ' . $con . '  ');
    foreach ($accounts_query as $list) {
        $credit[$list["bank"]] += $list['credit'];
        $debit[$list["bank"]] += $list['debit'];
    }

    $query = DB::query("select * from options where type='bank_accounts' and account_type !='others' ");
    foreach ($query as $list) {
        if ($list["account_type"] == 'cash') {
            $balance[$list["id"]] = $sales + $credit[$list["id"]] - $debit[$list["id"]];
        } else {
            $balance[$list["id"]] = $credit[$list["id"]] - $debit[$list["id"]];
        }
    }

    return $balance;
}

function search_form_data($name)
{
    global $user_db;
    global $user_info;
    DB::useDB($user_db);
    $data = json_encode($_POST);
    $_SESSION["search_data"][$name] = $data;
}

