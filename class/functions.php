<?php
 
 
 function format($data,$condition,$type=NULL)
{
	switch($condition)
	{
		case "date": 
			{
				if($data==NULL) {  return ""; }
				$date = explode("/", $data);
				if (sizeof($date) == 3) { $data = $date[2] . "-" . $date[1] . "-" . $date[0];  }
				if ($type == NULL) {  $type = "Y-m-d";  }
				return date($type, strtotime($data));						
			} break;
		case "money":
		{
			$number = ($data>=0)?  $data:($data*-1);
			$exp_number = explode(".", number_format($number, 2, '.', ''));
			$num  = $exp_number[0];
			$explrestunits = "" ;
			if(strlen($num)>3) {
				$lastthree = substr($num, strlen($num)-3, strlen($num));
				$restunits = substr($num, 0, strlen($num)-3); // extracts the last three digits
				$restunits = (strlen($restunits)%2 == 1)?"0".$restunits:$restunits; // explodes the remaining digits in 2's formats, adds a zero in the beginning to maintain the 2's grouping.
				$expunit = str_split($restunits, 2);
				for($i=0; $i<sizeof($expunit); $i++) {
					// creates each of the 2's group and adds a comma to the end
					if($i==0) {
						$explrestunits .= (int)$expunit[$i].","; // if is first value , convert into integer
					} else {
						$explrestunits .= $expunit[$i].",";
					}
				}
				$thecash = $explrestunits.$lastthree;
			} else {
				$thecash = $num;
			}
			$thecash = ($data>=0)?  $thecash:"-".$thecash;
			if($type=="round") {   return $thecash;   }
			else { return $thecash.'.'.$exp_number[1];  }

		
		}break;	
		
	}
}  
 
 
 
 function insertData($data,$table=NULL)
{
	global $user_info; $data[token] =NULL; $data[token] =NULL; $data[url] = NULL;
	if($data[id]>0) { $data[update_user] = $user_info[id]; $data[cre_time] =  date("d/m/Y h:i:s A"); }
	else  {   $data[update_user] = $user_info[id]; $data[update_time] =  date("d/m/Y h:i:s A"); } 	
	foreach($data as $key => $list)  { $value[$key] = trim($list); }
	 DB::$usenull = false; DB::insertUpdate($table, $value);
     $id = ($data[id] > 0) ? $data[id] : DB::insertId();
	 return $id;
}

 
 
 
 
 function generate_table_header($array)
{	
	$data .= '[{"COLUMNS":[ ';
	foreach($array as $list)
	{
		$data_implode[] = '{"title": "'.$list.'"}';
	}
	$data .= implode($data_implode,',');
	$data .= ']}]';
	return $data;
} 

function datatable($search=NULL,$pagging=NULL,$table_name=NULL)
{
	$search = ($search=="no")? '':'<\'col-sm-3\'f>';
	$pagging = ($pagging=="no")? '':' "paging":   true,	';
	$table_name = ($table_name=="")? 'example':$table_name;
	
	
	return '  $(\'#'.$table_name.'\').html("");
	 $(\'#'.$table_name.'\').dataTable( {
	  "destroy": true,"bPaginate": false,
		"columns": dataObject[0].COLUMNS, "ajax": json_url,
		"scrollY": document_height,
      	"sScrollX": "100%",
		 "deferRender": true,		 
			'.$pagging .'		 
		"bAutoWidth": false,
		 "autoWidth": false,
		"language": {  "zeroRecords":    "No matching records found",  "loadingRecords": "Loading...", "processing":     "Processing...", },
		"fnRowCallback" : function(nRow, aData, iDisplayIndex){ $("td:first", nRow).html(\'<center>\'+(iDisplayIndex +1)+\'</center>\'); return nRow;},	
		 dom: "<\'row\'<\'col-sm-5\'B><\'col-sm-2 text-left \'l><\'col-sm-2 text-left custom_btn\'l>'.$search.'>tp", "lengthMenu": [ [100, 250, 500, -1], [100, 250, 500, "All"] ],
		buttons: [  
				 { text: \'<i class="fa fa-file-excel-o"></i> Excel\', extend: \'csv\',title: \'sales data\', className: \'btn-sm\'},
				  { text: \'<i class="fa fa-refresh"></i> Refresh\',  className: \'btn-sm\', action: function ( e, dt, node, config ) { load_list(); },    },				
				 { text: \'<i class="fa fa-search"></i> Search\',  className: \'btn-sm\', action: function ( e, dt, node, config ) { search_model();   },    },
				  { text: \'<i class="fa fa-pencil"></i> Edit\',  className: \'btn-sm  edit_btn\', action: function ( e, dt, node, config ) { edit_data();   },  },
				 { text: \'<i class="fa fa-print" ></i> Print\',  className: \'btn-sm  print_all\', action: function ( e, dt, node, config ) { print_data();  },  },
				 { text: \'<i class="fa fa-remove"></i> Delete\',  className: \'btn-sm btn-danger delete_btn\', action: function ( e, dt, node, config ) { delete_data();   },  
				 }				  
				]
	});   $(".custom_btn").html("");';
}	 
	 
	 
function isMobileDevice() 
{
    return preg_match("/(android|infogreen|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]);
}
 	 

 
 
 function common_html_elements($type)
{

	switch($type)
	{
		case "right_suggession":
		{
			return '<!-- Right Bar Suggessions Start --><div class="animated fadeInRight ig-sidebar" style="z-index:9999;"> <div style=" background-color:#F7F9FA; height:30px; padding-top:3px; padding-left:10px; cursor:pointer" onclick="hide_panel()"> <table border="0"> <tr> <td><strong><i class="pe pe-7s-close" style=" font-size:22px"></i></strong></td> <td><strong> &nbsp;&nbsp;Close</strong></td> </tr> </table> </div> <div style=""> <div class="services" > <div class="items" id="items_suggession_right" style=" overflow-y:scroll; "> <ul id="right_suggession" class="right_suggession"></ul> </div>  <div class="m-t-md" style="height:300px"><a class="list-group-item active" style="height:300px"  href="#" id="right_side_details"> </a> </div> </div></div><script type="text/javascript">var window_height = parseInt(screen.height);   $(\'#items_suggession_right\').css(\'max-height\', (window_height-399)+\'px\'); $(\'#items_suggession_right\').css(\'height\', (window_height-399)+\'px\'); $(\'#suggession_description\').css(\'max-height\', (window_height-559)+\'px\'); $(\'#suggession_description\').css(\'height\', (window_height-559)+\'px\');</script><style>.services { display:none; }.services li { width: 100%; list-style-type: none; font-size:14px; margin-left:-25px;border-bottom:1px #999999 dotted; line-height:25px; }.services li.selected { background-color: #CCCCCC; }</style> <!-- Right Bar Suggessions End --><div class="modal fade" id="myModal5" tabindex="-1" role="dialog" aria-hidden="true" style="top:-70px; position:fixed"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="color-line"></div> <div style="padding:10px;"><a style="float:right" data-dismiss="modal"> <i class="fa fa-times"></i> Close </a> <a onclick="print_report()" style="float:right; margin-right:20px;"> <i class="fa fa-print"></i> Print</a> </div> <div class="modal-body"> <iframe style="width:100%;" frameborder="0" name="printf" scrolling="yes" id="printf"></iframe></div> </div></div></div>';
		} break;
		
		case 'print_model':
		{
			return '<div class="modal fade" id="myModal5" tabindex="-1" role="dialog" aria-hidden="true" style="top:-70px; position:fixed"> <div class="modal-dialog modal-lg"> <div class="modal-content"> <div class="color-line"></div> <div style="padding:10px;"> <a style="float:right" data-dismiss="modal"> <i class="fa fa-times"></i> Close </a> <a onclick="print_report()" style="float:right; margin-right:20px;"> <i class="fa fa-print"></i> Print</a> </div> <div class="modal-body"> <iframe style="width:100%;" frameborder="0" name="printf" scrolling="yes" id="printf"></iframe> </div> </div> </div> </div> ';
		} break;
	}
}

 
 
 function submit_form_script($condition)
 {
 	return ' 
					 $(".submitWizard").html(\'Please Wait...\');  			 
					 $.ajax({
						   url: \'/api/?token='.$condition.'\',
						   type: \'POST\',
						   data: $("#DataForm").serialize(),
						   dataType: \'text\',
						   success: function(response, textStatus, jqXHR) {
							$(".submitWizard").html(\'Save & Update\');  $("#message").html(response); 
						   },
						   error: function(jqXHR, textStatus, errorThrown){  alert(textStatus, errorThrown); }
						});			   			 
				 ';
 }
 
 
 
 function no_to_words($no)
{   
 $words = array('0'=> '' ,'1'=> 'one' ,'2'=> 'two' ,'3' => 'three','4' => 'four','5' => 'five','6' => 'six','7' => 'seven','8' => 'eight','9' => 'nine','10' => 'ten','11' => 'eleven','12' => 'twelve','13' => 'thirteen','14' => 'fourteen','15' => 'fifteen','16' => 'sixteen','17' => 'seventeen','18' => 'eighteen','19' => 'nineteen','20' => 'twenty','30' => 'thirty','40' => 'fourty','50' => 'fifty','60' => 'sixty','70' => 'seventy','80' => 'eighty','90' => 'ninty','100' => 'hundred &','1000' => 'thousand','100000' => 'lakh','10000000' => 'crore');
    if($no == 0)
        return ' ';
    else {
	$novalue='';
	$highno=$no;
	$remainno=0;
	$value=100;
	$value1=1000;       
            while($no>=100)    {
                if(($value <= $no) &&($no  < $value1))    {
                $novalue=$words["$value"];
                $highno = (int)($no/$value);
                $remainno = $no % $value;
                break;
                }
                $value= $value1;
                $value1 = $value * 100;
            }       
          if(array_key_exists("$highno",$words))
              return $words["$highno"]." ".$novalue." ".no_to_words($remainno);
          else {
             $unit=$highno%10;
             $ten =(int)($highno/10)*10;            
             return $words["$ten"]." ".$words["$unit"]." ".$novalue." ".no_to_words($remainno);
           }
    }
}
  
  
function date_formats($date, $format=NULL)
{
    $fdate = explode("/", $date);
    if (sizeof($fdate) == 3) {
        $date = $fdate[2] . "-" . $fdate[1] . "-" . $fdate[0];
    }
    if ($format == NULL) {
        $format = "Y-m-d";
    }
    return date($format, strtotime($date));
    /*"F jS, Y"*/
}

  
function  user_info()
{  
global  $main_db;

DB::useDB($main_db); 
$gateway =  DB::queryFirstRow("select * from ig_gateway where user_info='".decrypt($_SESSION["id"])."' and  access_code = '".$_SESSION["access_code"]."' ");													 											  									  
if($gateway!=NULL) 
{ 
return  DB::queryFirstRow("select * from ig_users where  id='".decrypt($_SESSION["id"])."' and username = '".$_SESSION["usr"]."'  and password='".$_SESSION["pass"]."' ");
}	
else  {  redirect("/login");  } 
}


class Cryptor
{
 
  protected $method = 'AES-128-CTR'; // default
  private $key = '3F579E179A27D845315CCC2BB2724';

  protected function iv_bytes()
  {
    return openssl_cipher_iv_length($this->method);
  }

  public function __construct($key = false, $method = false)
  {
    if(!$key) {
      // if you don't supply your own key, this will be the default
      $key = gethostname() . "|" . ip2long($_SERVER['SERVER_ADDR']);
    }
    if(ctype_print($key)) {
      // convert key to binary format
      $this->key = openssl_digest($key, 'SHA256', true);
    } else {
      $this->key = $key;
    }
    if($method) {
      if(in_array($method, openssl_get_cipher_methods())) {
        $this->method = $method;
      } else {
        die(__METHOD__ . ": unrecognised encryption method: {$method}");
      }
    }
  }

  public function encrypt($data)
  {
    $iv = openssl_random_pseudo_bytes($this->iv_bytes());
    $encrypted_string = bin2hex($iv) . openssl_encrypt($data, $this->method, $this->key, 0, $iv);
    return $encrypted_string;
  }

  // decrypt encrypted string
  public function decrypt($data)
  {
    $iv_strlen = 2  * $this->iv_bytes();
    if(preg_match("/^(.{" . $iv_strlen . "})(.+)$/", $data, $regs)) {
      list(, $iv, $crypted_string) = $regs;
      $decrypted_string = openssl_decrypt($crypted_string, $this->method, $this->key, 0, hex2bin($iv));
      return $decrypted_string;
    } else {
      return false;
    }
  }

}
// $cryptor = new Cryptor(); 

 // $token = "The quick brown fox jumps over the lazy dog.";
 // $encryption_key = 'dinesh';  $cryptor = new Cryptor($encryption_key);  $crypted_token = $cryptor->encrypt($token); unset($token);  
 // $encryption_key = 'dinesh'; $cryptor = new Cryptor($encryption_key);  $decrypted_token = $cryptor->decrypt($crypted_token);

function redirect($url)
{
	if($_GET[url]!=NULL) 
	{  
		echo '<SCRIPT TYPE="text/JavaScript">window.location.replace("' . decrypt($_GET[url]) . '"); </SCRIPT>';
	} 
	else  
	{
		echo '<SCRIPT TYPE="text/JavaScript">window.location.replace("' . $url . '"); </SCRIPT>';  
	}    
    exit; 
}



function age($fdate, $tdate=NULL)
{
	
	 $tdate = ( $tdate==NULL)? date("d/m/Y"): $tdate;
 $fdate = strtotime(format($fdate,'date'));
 $tdate = strtotime(format($tdate,'date'));
$datediff = $tdate- $fdate;

return floor($datediff / (60 * 60 * 24));
}


function message($type,$message)
{
	$_SESSION[message] = 'setTimeout( function(){  toastr.'.$type.'(\''.$message.'\');  }  , 100  );';	
}

function value_show($text, $name, $value, $type,$count) { 

	$value = preg_replace('/[`]/', '', $value);
	if($type=="checked") 
		{ 
			return '$(\'input[name="'.$name.'"][value="'.$value.'"]\').prop(\'checked\',true);';  
		} 
	if($type=="array") 
	{ 
			return '$(\''.$text.'[name="'.$name.'"]\').eq('.$count.').val(`'.$value.'`);'; 
	} 	
	if($type=="multiple") 
	{ 
			return '$("'.$text.'[name=\''.$name.'\']").val(['.$value.']);';   
	} 	
		
	return '$(\'[name="'.$name.'"]\').val(`'.$value.'`);'; 
 }
function script($code)
{
    return '<script type="text/javascript">'.$code.'</script>';
}

function rno($length, $condition)
{
    switch ($condition) {
        case "1": {
            for ($i = 0; $i < $length; $i++) {
                $random .= chr(rand(ord('0'), ord('9')));
            }
        }
            break;
        case "A": {
            for ($i = 0; $i < $length; $i++) {
                $random .= chr(rand(ord('A'), ord('Z')));
            }
        }
            break;
        case "A1": {
            for ($i = 0; $i < $length; $i++) {
                $random .= chr(rand(ord('0'), ord('1')));
                $random .= chr(rand(ord('A'), ord('Z')));
            }
        }
            break;
    }
    return $random;
}

 

function money($number,$format) 
{ 	
    return  number_format($number, 2, '.', ','); 
} 

function encrypt($sData, $sKey = '3F579E179A27D845315CCC2BB2724')
  {
    $sData   = $sData;
    $sResult = '';
    for ($i = 0; $i < strlen($sData); $i++)
      {
        $sChar    = substr($sData, $i, 1);
        $sKeyChar = substr($sKey, ($i % strlen($sKey)) - 1, 1);
        $sChar    = chr(ord($sChar) + ord($sKeyChar));
        $sResult .= $sChar;
      }
    return encode_base64($sResult);
  }
  
function decrypt($sData, $sKey = '3F579E179A27D845315CCC2BB2724')
  {
    $sResult = '';
    $sData   = decode_base64($sData);
    for ($i = 0; $i < strlen($sData); $i++)
      {
        $sChar    = substr($sData, $i, 1);
        $sKeyChar = substr($sKey, ($i % strlen($sKey)) - 1, 1);
        $sChar    = chr(ord($sChar) - ord($sKeyChar));
        $sResult .= $sChar;
      }
    return $sResult;
  }
  
function encode_base64($sData)
  {
    $sBase64 = base64_encode($sData);
    return strtr($sBase64, '+/', '-_');
  }
function decode_base64($sData)
  {
    $sBase64 = strtr($sData, '-_', '+/');
    return base64_decode($sBase64);
  }
 


function num_encrypt($string,$condition)
{
	if($condition=="decrypt")
	{
		return join(array_map('chr', str_split($string, 3)));
	}
	else 
	{	
	return  join(array_map(function ($n) { return sprintf('%03d', $n); },
                          unpack('C*', $string)));

	}

}

 
 ?>