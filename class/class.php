<?php


function db_verification($table_name, $column)
{
	global $user_db;
	global $user_info;
	global $company_details;
	DB::useDB($user_db);
	$query = DB::queryFirstRow("SELECT COUNT(*) as result 	FROM information_schema.columns WHERE table_schema = DATABASE()
								      AND table_name = '" . $table_name . "' 	AND column_name = '" . $column . "';");

	if ($query["result"] != "1")
		DB::query("ALTER TABLE " . $table_name . " ADD COLUMN " . $column . " TEXT;");
}



function unit_qty_settings($id, $actual_qty)
{

	global $user_db;
	global $user_info;
	global $company_details;
	DB::useDB($user_db);
	$unit_query = DB::query("select * from options ");
	foreach ($unit_query as $list) {
		$unit_name[$list[id]] = $list[name];
	}

	$list = DB::queryFirstRow("select * from items where id='" . $id . "' ");

	$unit_settings = json_decode($list[unit_settings], true);

	$unit_count = 0;
	foreach ($unit_settings as $settings_list) {
		$unit_qty = ($settings_list[unit_qty] > 0) ? $actual_qty / $settings_list[unit_qty] : 0;
		$unit_qty = (int) $unit_qty;
		$unit_qty_disp .= ($unit_qty > 0) ? '<strong>' . $unit_qty . '</strong><small> ' . $unit_name[$settings_list[unit_settings]] . ' </small>' : NULL;
		$actual_qty -= ($unit_qty * $settings_list[unit_qty]);
	}
	$unit_qty_disp .= ($actual_qty > 0) ? '<strong>' . $actual_qty . ' </strong>Pcs ' : NULL;

	return $unit_qty_disp;


}


function voucher_no($table, $id)
{
	global $user_db;
	global $user_info;
	global $company_details;
	
	$company_details["financial_year"] = ($company_details["manual_financial_year"]>0)? $company_details["manual_financial_year"]:"04";
	$company_details["financial_year"] = sprintf("%02d", $company_details[financial_year]);

	if (date("m") < $company_details["financial_year"]) {
		$year = date("Y") - 1;
		$date = date($year . "-" . $company_details["financial_year"] . "-01");
	} else {
		$date = date("Y-" . $company_details["financial_year"] . "-01");
	}

	DB::useDB($user_db);
	$fetch = DB::queryFirstRow("select  no  from " . $table . "  where id='" . $id . "' ");
	if ($fetch == NULL) {
		$fetch = DB::queryFirstRow("select IFNULL(max(CAST(no AS UNSIGNED)),0)+1 as no from " . $table . "   where  str_to_date(date,'%d/%m/%Y') >= '" . $date . "'     ");
	}

	return $fetch[no];
}


function stock($id)
{
	global $user_db;
	global $user_info;
	DB::useDB($user_db);
	if ($id > 0) {
		$condition = " where  product_id ='" . $id . "'  ";
		$item_condition = " where  id ='" . $id . "'  ";
	}


	$sales_query = DB::query("select id,product_id,sum(qty) as qty from  sales_items   " . $condition . "  group by product_id");
	foreach ($sales_query as $list) {
		$sales[$list['product_id']] += round($list['qty'], 2);
	}

	$return_query = DB::query("select id,product_id,qty from return_bill_items   " . $condition . "    ");
	foreach ($return_query as $list) {
		$return[$list['product_id']] += round($list['qty'], 2);
	}

	$purchase_query = DB::query("select id,product_id,sum(qty) as qty from purchase_items    " . $condition . "  group by product_id ");
	foreach ($purchase_query as $list) {
		$purchase[$list['product_id']] += round($list['qty'], 2);
	}

	$adjustment = DB::query("select * from  stock_adjustment ");
	foreach ($adjustment as $list) {
		$credit[$list[item]] += number_format($list['credit'], 2, '.', '');
		$debit[$list[item]] += number_format($list['debit'], 2, '.', '');
	}


	$items_query = DB::query("select id,stock from items  " . $item_condition . "  ");
	foreach ($items_query as $list) {
		$stock[$list[id]] = $list[stock] + $purchase[$list[id]] + $return[$list[id]] - $sales[$list[id]] + $credit[$list[id]] - $debit[$list[id]];
		$stock[$list[id]] = number_format($stock[$list[id]], 2, '.', '');
	}
	return $stock;
}



function purchase_rate($con)
{
	global $user_db;
	global $user_info;
	DB::useDB($user_db);


	if ($con == "ex_rate") {
		$purchase = DB::query("SELECT * FROM (  select product_id,rate from purchase_items order by str_to_date(date,'%d/%m/%Y')   DESC ) AS tmp_table group by  product_id   ");
		foreach ($purchase as $list)
			$purchase_rate[$list[product_id]] = round($list[rate], 2);
	} else {

		$purchase = DB::query("SELECT * FROM (  select product_id,round(total/qty,2) as net_rate from purchase_items order by str_to_date(date,'%d/%m/%Y')   DESC ) AS tmp_table group by  product_id   ");
		foreach ($purchase as $list)
			$purchase_rate[$list[product_id]] = $list[net_rate];

	}

	$items_query = DB::query("select id,prate from items  " . $item_condition . "  ");
	foreach ($items_query as $list) {
		$purchase_rate[$list[id]] = ($purchase_rate[$list[id]] > 0) ? $purchase_rate[$list[id]] : $list[prate];
	}

	return $purchase_rate;
}



function customer_balance($date)
{
	global $user_db;
	global $user_info;
	DB::useDB($user_db);


	$date = ($date != NULL) ? format($date, "date", "Y-m-d") : date("Y-m-d");

	$sales_query = DB::query("select total_value,contact from  sales  where   str_to_date(date,'%d/%m/%Y') <= '" . $date . "' ");
	foreach ($sales_query as $list) {
		$sales[$list['contact']] += round($list['total_value']);
	}
	$sales_return_query = DB::query("select total_value,contact from return_bill  where   str_to_date(date,'%d/%m/%Y') <= '" . $date . "'   ");
	foreach ($sales_return_query as $list) {
		$sales_return[$list['contact']] += round($list['total_value']);
	}
	$receipt_query = DB::query("select *  from receipt    where   str_to_date(date,'%d/%m/%Y') <= '" . $date . "'   ");
	foreach ($receipt_query as $list) {
		$receipt[$list['contact']] += round($list['amount']);
	}
	$query = DB::query("select id,opening_balance from contacts  ");
	foreach ($query as $list) {
		$outstanding[$list[id]] = $list[opening_balance] + $sales[$list[id]] - $sales_return[$list[id]] - $receipt[$list[id]];
	}


	return $outstanding;
}


function outstanding($date)
{
	global $user_db;
	global $user_info;
	DB::useDB($user_db);

	if ($date != NULL) {
		$con = " where str_to_date(date,'%d/%m/%Y') <= '" . format($date, 'date', 'Y-m-d') . "' ";
	}

	$sales_query = DB::query("select total_value,contact from  sales  " . $con . "  ");
	foreach ($sales_query as $list) {
		$sales[$list['contact']] += round($list['total_value']);
	}

	$purchase_query = DB::query("select total_value,contact from purchase  " . $con . " ");
	foreach ($purchase_query as $list) {
		$purchase_amount[$list['contact']] += round($list['total_value']);
	}

	$payment_query = DB::query("select *  from payment  " . $con . "   ");
	foreach ($payment_query as $list) {
		$payment[$list['contact']] += $list['amount'];
	}


	$sales_return_query = DB::query("select total_value,contact from return_bill   " . $con . " ");
	foreach ($sales_return_query as $list) {
		$sales_return[$list['contact']] += $list['total_value'];
	}


	$receipt_query = DB::query("select *  from receipt   " . $con . "  ");
	foreach ($receipt_query as $list) {
		$receipt[$list['contact']] += round($list['amount']);
	}

	if ($type != NULL) {
		$contact_con = " where type='" . $type . "' ";
	}

	$query = DB::query("select id,opening_balance,type from contacts  " . $contact_con . " ");
	foreach ($query as $list) {
		$purchase = DB::queryFirstRow("select * from purchase  where contact='" . $list["id"] . "' ");
		if ($purchase != NULL) {
			$outstanding[$list[id]] = $list["opening_balance"] + $purchase_amount[$list["id"]] - $payment[$list["id"]] + $receipt[$list["id"]] - $sales[$list[id]];
		} else {
			$outstanding[$list[id]] = $list[opening_balance] + $sales[$list[id]] - $sales_return[$list[id]] - $receipt[$list[id]] + $payment[$list[id]];

		}
	}


	return $outstanding;
}



function supplier_balance()
{
	global $user_db;
	global $user_info;
	DB::useDB($user_db);

	$sales_query = DB::query("select round(total_value) as total_value ,contact from purchase  ");
	foreach ($sales_query as $list) {
		$sales[$list['contact']] += $list['total_value'];
	}

	$receipt_query = DB::query("select *  from payment   ");
	foreach ($receipt_query as $list) {
		$receipt[$list['contact']] += $list['amount'];
		$discount[$list['contact']] += $list['discount'];
	}
	$query = DB::query("select id,opening_balance from contacts  ");
	foreach ($query as $list) {
		$outstanding[$list[id]] = $list[opening_balance] + $sales[$list[id]] - $receipt[$list[id]];
	}


	return $outstanding;
}


?>