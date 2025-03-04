<?php
session_start();
/*
Template Name: subscribe-temp
*/

$options = _WSH()->option();
get_header();
$settings = seniorsecurity_set( seniorsecurity_set( get_post_meta( get_the_ID(), 'bunch_page_meta', true ), 'bunch_page_options' ), 0 );
$meta = _WSH()->get_meta( '_bunch_layout_settings' );
$meta1 = _WSH()->get_meta( '_bunch_header_settings' );
if ( seniorsecurity_set( $_GET, 'layout_style' ) )$layout = seniorsecurity_set( $_GET, 'layout_style' );
else
	$layout = seniorsecurity_set( $meta, 'layout', 'full' );
$sidebar = seniorsecurity_set( $meta, 'sidebar', 'blog-sidebar' );
$classes = ( !$layout || $layout == 'full' || seniorsecurity_set( $_GET, 'layout_style' ) == 'full' ) ? ' col-lg-12 col-md-12 col-sm-12 col-xs-12 ' : ' col-md-9 col-sm-8 col-xs-12 ';
$bg = seniorsecurity_set( $meta, 'header_img' );
$title = seniorsecurity_set( $meta, 'header_title' );
?>

<?php
global $wpdb;
$MERCHANT_KEY = "C1VwhhRw";
$SALT = "HFwx9CVTFB";
// Merchant Key and Salt as provided by Payu.

// $PAYU_BASE_URL = "https://sandboxsecure.payu.in";		// For Sandbox Mode
$PAYU_BASE_URL = "https://secure.payu.in";			// For Production Mode

$action = '';
$surl = 'https://senocare.in/success';
$furl = 'https://senocare.in/cancel';

$posted = array();
if(!empty($_POST)) {
   foreach($_POST as $key => $value) {    
    $posted[$key] = $value; 
	
  }
}

   


$formError = 0;

$packageErr='';
$durationErr='';
$amountErr ='';
$nameErr ='';
$emailErr ='';
$phoneErr ='';
$stateErr ='';
$cityErr ='';
$country_residenceErr ='';
$preffered_modeErr ='';

$member1_contactErr ='';
$member1_ageErr ='';
$member1_homeaddErr ='';
$member1_stateErr ='';
$member1_cityErr ='';
$member1_pincodeErr ='';

$member2_contactErr ='';
$member2_ageErr ='';
$member2_homeaddErr ='';
$member2_city_stateErr ='';
$member2_pincodeErr ='';
$formSuccess = 0;
$cal_amount = 0;
$subscribe_id ='';
if(empty($posted['txnid'])) {
  // Generate random transaction id
  $txnid = substr(hash('sha256', mt_rand() . microtime()), 0, 20);
} else {
  $txnid = $posted['txnid'];
}
$hash = '';
// Hash Sequence
$hashSequence = "key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10";
if(empty($posted['hash']) && sizeof($posted) > 0) {

	    if(!empty($posted['package']) && !empty($posted['package-duration']) ){
			$package = $posted['package'];
			$package_duration = $posted['package-duration'];
			$amount_monthly = $package*$package_duration;
			$cal_amount = (float)$amount_monthly;
			$posted['amount'] = $cal_amount;
		}

		if(empty($posted['amount'])){
		 	$posted['amount'] = $posted['user_amount'];
		 }

		if($posted['package'] == 1199){
			$package_name = "senOcare ASSIST";
		} else if($posted['package'] == 6999){
			$package_name = "senOcare COMFORT";
		} else if($posted['package'] == 1499){
			$package_name = "senOcare INDULGE";
		} else {
			$package_name ='';
		}
		
		$booked_fullname = !empty($posted['firstname']) ? $posted['firstname'] : '';
		$mobile_no = !empty($posted['phone']) ? $posted['phone'] : '';
		$email_id = !empty($posted['email']) ? $posted['email'] : '';
		$state = !empty($posted['state']) ? $posted['state'] : '';
		$city = !empty($posted['city']) ? $posted['city'] : '';
		$country = !empty($posted['country-residence']) ? $posted['country-residence'] : '';
		$preferred_mode = !empty($posted['preffered-mode']) ? $posted['preffered-mode'] : '';

		// Start get Member 1 Detail data
		$member1_mobile_no = !empty($posted['member1-contact']) ? $posted['member1-contact'] : '';
		$member1_age = !empty($posted['member1-age']) ? $posted['member1-age'] : '';
		$member1_home_address = !empty($posted['member1-home-address']) ? $posted['member1-home-address'] : '';
		$member1_state = !empty($posted['member1-state']) ? $posted['member1-state'] : '';
		$member1_city = !empty($posted['member1-city']) ? $posted['member1-city'] : '';
		$member1_pincode = !empty($posted['member1-pincode']) ? $posted['member1-pincode'] : '';
		

		$member2_mobile_no = !empty($posted['member2-contact']) ? $posted['member2-contact'] : '';
		$member2_age = !empty($posted['member2-age']) ? $posted['member2-age'] : '';
		$member2_home_address = !empty($posted['member2-home-address']) ? $posted['member2-home-address'] : '';
		$member2_state = !empty($posted['member2-state']) ? $posted['member2-state'] : '';
		$member2_city = !empty($posted['member2-city']) ? $posted['member2-city'] : '';
		$member2_pincode = !empty($posted['member2-pincode']) ? $posted['member2-pincode'] : '';


	$sql_count_results = "SELECT count(*) as count FROM `wp_y1f4ncbw4r_subscribe` WHERE email_id="."'".$posted['email']."' ";

        
    # Ejecute function
    $results = $wpdb->get_row( $sql_count_results , OBJECT );
    $total_row = $results->count;
    
	if(empty($posted['package'])){
  		$packageErr = "Package is required";
  	}
  	if(empty($posted['package-duration'])){
  		$durationErr = "Package Duration is required";
  	}
  	
  	if(empty($posted['firstname'])){
		  $nameErr = 'Name field is required.';
	} else if(!preg_match("/^[a-zA-Z ]*$/",$posted['firstname'])) {
		   $nameErr = "Only alpha characters and space are allowed.";
	  } else if (strlen($posted['firstname']) < 3 ) {
		  $nameErr = "Name must be contain minimum 3 character.";
	  } 



  	if (empty($posted['email'])) {
		$emailErr = "Email field is required.";
	  } else if (!filter_var($posted['email'], FILTER_VALIDATE_EMAIL)) {
		  $emailErr = "Invalid email format";
		} 
// 	else if($total_row > 0  ){
// 			$emailErr = "Email Id already exist.";
// 		}
	
  	
	if (empty($posted['phone'])) {
		$phoneErr = "Mobile Number field is required.";
	  } else {
		 if(!preg_match('/^[0-9]{10}+$/', $posted['phone'])){
			$phoneErr = "Invalid Mobile Number.";
		}
	}

	if(empty($posted['state'])){
  		$stateErr = "State field is required";
  	}

  	if(empty($posted['city'])){
  		$cityErr = "City field is required";
  	}

  	if(empty($posted['country-residence'])){
  		$country_residenceErr = "Country of  Residence field is required";
  	}

  	if(empty($posted['preffered-mode'])){
  		$preffered_modeErr = "Preferred Mode field is required";
  	}

  	// Start Member 1 Details Validation 

  	if (empty($posted['member1-contact'])) {
		$member1_contactErr = "Contact Number field is required.";
	  } else {
		 if(!preg_match('/^[0-9]{10}+$/', $posted['member1-contact'])){
			$member1_contactErr = "Invalid Mobile Number.";
		}
	}

	if (empty($posted['member1-age'])) {
		$member1_ageErr = "Age field is required.";
	  } else if(!is_numeric($posted['member1-age']) ){
			$member1_ageErr = "Age must contain only digits.";
	    }

	if(empty($posted['member1-home-address'])){
  		$member1_homeaddErr = "Home Address is required";
  	}

  	if(empty($posted['member1-state'])){
  		$member1_stateErr = "State field is required";
  	}

  	if(empty($posted['member1-city'])){
  		$member1_cityErr = "City field is required";
  	}

  	if(empty($posted['member1-pincode'])){
		$member1_pincodeErr = "Pincode field is required.";
	} else if (!is_numeric($posted['member1-pincode'])){
		$member1_pincodeErr = "Pincode must contain 6 digits numeric value.";
	} else if (strlen($posted['member1-pincode']) < 6 ){
		$member1_pincodeErr = "Pincode must contain 6 digits numeric value.";
	}

	// End here member 1 detail validation 


	// Start Member 2 Details Validation 

  	if (!empty($posted['member2-contact'])) {
		 if(!preg_match('/^[0-9]{10}+$/', $posted['member2-contact'])){
			$member2_contactErr = "Invalid Mobile Number.";
		}
	}

	if(!empty($posted['member2-age']) && !is_numeric($posted['member2-age']) ){
		$member2_ageErr = "Age must contain be only numeric.";
	}
	
	if(!empty($posted['member2-pincode'])) {
		if (!is_numeric($posted['member2-pincode'])){
			$member2_pincodeErr = "Pincode must contain 6 digits numeric value.";
		} else if (strlen($posted['member1-pincode']) < 6 ){
			$member2_pincodeErr = "Pincode must contain 6 digits numeric value.";
		}
	}


	// End here member 2 detail validation 

  	if(!$packageErr && !$durationErr && !$amountErr && !$nameErr && !$emailErr && !$phoneErr && !$stateErr &&  !$cityErr && !$country_residenceErr && !$preffered_modeErr && !$member1_contactErr && !$member1_ageErr && !$member1_homeaddErr && !$member1_stateErr && !$member1_cityErr &&  !$member1_pincodeErr && !$member2_contactErr && !$member2_ageErr &&  !$member2_pincodeErr) {
	 	$hashVarsSeq = explode('|', $hashSequence);
	 	$hash_string = '';  
		foreach($hashVarsSeq as $hash_var) {
		    $hash_string .= isset($posted[$hash_var]) ? $posted[$hash_var] : '';
		    $hash_string .= '|';
		}

	    $hash_string .= $SALT;
		$hash = strtolower(hash('sha512', $hash_string));
	    $action = $PAYU_BASE_URL . '/_payment'; 
	   
	    $formSuccess = 1;
	   // Start get first form data 
	    

		$to = "aasifkhan7876@gmail.com";
	    $subject = "New subscription";
	    $headers = "MIME-Version: 1.0" . "\r\n";
		$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
		$headers .= 'From: '.$email_id.' ' . "\r\n";
	    //$headers .= 'Cc: test.neuro6@gmail.com\r\n';
	    $message = '<table border="1" style="border-collapse:collapse">
				    <tr>
				        <th width="350" >PACKAGE NAME </th>
				        <td width="350">'.$package_name.'</td>
				    </tr>
				    <tr>
				        <th width="350" >PACKAGE PRICE </th>
				        <td width="350">'.$package.' Per Month</td>
				    </tr>
		             <tr>
		                <th width="350" >PACKAGE DURATION</th>
		                <td width="350">'.$package_duration.' Month</td>
		             </tr>
		             <tr>
		                <th width="350" >TOTAL AMOUNT</th>
		                <td width="350">'.$cal_amount.'</td>
		             </tr>
		             <tr>
		                <th width="350" >BOOKED BY - FULL NAME </th>
		                <td width="350">'.$booked_fullname.'</td>
		             </tr>
		             <tr>
		                <th width="350" >MOBILE NUMBER</th>
		                <td width="350">'.$mobile_no.'</td>
		             </tr>
		             <tr>
		                <th width="350" >EMAIL ID </th>
		                <td width="350">'.$email_id.'</td>
		             </tr>
		             <tr>
		                <th width="350" >STATE</th>
		                <td width="350">'.$state.'</td>
		             </tr>
		             <tr>
		                <th width="350" >CITY</th>
		                <td width="350">'.$city.'</td>
		             </tr>
             		 <tr>
		                <th width="350" >COUNTRY OF RESIDENCE</th>
		                <td width="350">'.$country.'</td>
		             </tr>
		              <tr>
		                <th width="350" >PREFERRED MODE OF COMMUNICATION </th>
		                <td width="350">'.$preferred_mode.'</td>
		             </tr>
             
		            <tr > 
		              <th height  ="50" colspan=2>Member 1 Detail</th>
		            </tr>
		            <tr>
		                <th width="350" >CONTACT NUMBER </th>
		                <td width="350">'.$member1_mobile_no.'</td>
		             </tr>
		             <tr>
		                <th width="350" >AGE </th>
		                <td width="350">'.$member1_age.'</td>
		             </tr>

		              <tr>
		                <th width="350" >HOME ADDRESS </th>
		                <td width="350">'.$member1_home_address.'</td>
		             </tr>
		              <tr>
		                <th width="350" >STATE</th>
		                <td width="350">'.$member1_state.'</td>
		             </tr>
		             <tr>
		                <th width="350" >CITY</th>
		                <td width="350">'.$member1_city.'</td>
		             </tr>
		             <tr>
		                <th width="350" >PINCODE </th>
		                <td width="350">'.$member1_pincode.'</td>
		             </tr>
             
		             <tr > 
		              <th height  ="50" colspan=2>Member 2 Detail</th>
		            </tr>
		            <tr>
		                <th width="350" >CONTACT NUMBER </th>
		                <td width="350">'.$member2_mobile_no.'</td>
		             </tr>
		             <tr>
		                <th width="350" >AGE </th>
		                <td width="350">'.$member2_age.'</td>
		             </tr>
		              <tr>
		                <th width="350" >HOME ADDRESS </th>
		                <td width="350">'.$member2_home_address.'</td>
		             </tr>
		              <tr>
		                <th width="350" >STATE</th>
		                <td width="350">'.$member2_state.'</td>
		             </tr>
		             <tr>
		                <th width="350" >CITY</th>
		                <td width="350">'.$member2_city.'</td>
		             </tr>
		             <tr>
		                <th width="350" >PINCODE </th>
		                <td width="350">'.$member2_pincode.'</td>
		             </tr>
  				</table>';
      		mail($to,$subject,$message,$headers);
      		$table_name = $wpdb->prefix . "subscribe";
      		$data = array(
      				    'package_name'=>$package_name,
      					'package'=>$package,
      					'package_duration'=>$package_duration,
      					'total_amount'=>$cal_amount,
      					'booked_fullname'=>$booked_fullname,
      					'mobile_no'=>$mobile_no,
      					'email_id'=>$email_id,
      					'state'=>$state,
      					'city'=>$city,
      					'country'=>$country,
      					'preferred_mode'=>$preferred_mode,
      					'member1_mobile_no'=>$member1_mobile_no,
      					'member1_age'=>$member1_age,
      					'member1_home_address'=>$member1_home_address,
      					'member1_state'=>$member1_state,
      					'member1_city'=>$member1_city,
      					'member1_pincode'=>$member1_pincode,
      					'member2_mobile_no'=>$member2_mobile_no,
      					'member2_age'=>$member2_age,
      					'member2_home_address'=>$member2_home_address,
      					'member2_state'=>$member2_state,
      					'member2_city'=>$member2_city,
      					'member2_pincode'=>$member2_pincode,
      					'status'=>'pending',
      					'created_at'=>date('Y-m-d H:i:s')

      					);
      		$wpdb->insert( $table_name, $data );
      		$subscribe_id = $wpdb->insert_id;


	}
  	
	} elseif(!empty($posted['hash'])) {
	  $hash = $posted['hash'];
	  $action = $PAYU_BASE_URL . '/_payment';
	  $formSuccess = 1;
	  $package = $posted['package'];
	  $package_duration = $posted['package-duration'];
	  $amount_monthly = $package*$package_duration;
	  $cal_amount = (float)$amount_monthly;
	   
	}
?>




<style>
	#sidebar-section {
		background-color: #fff!important;
	}
	
	.contact-section h3 {
		position: relative;
		text-transform: normal !important;
		font-size: 25px;
		font-weight: 800;
		color: #646d72;
		margin-bottom: 0px;
	}
	
	.contact-section .form-group h3 {
		font-weight: normal;
	}
	
	.contact-section h2 {
		position: relative;
		text-transform: normal !important;
		font-size: 16px;
		font-weight: 500 !important;
		color: #3a4145;
		line-height: 1.5em !important;
		font-family: 'PT Sans', sans-serif !important;
	}
	
	.contact-section .form-box input[type="text"],
	.form-box input[type="date"],
	.contact-section .form-box input[type="email"],
	.contact-section .form-box input[type="number"],
	.contact-section .form-box input[type="tel"],
	.contact-section .form-box input[type="password"],
	.contact-section .form-box textarea,
	.contact-section .form-box select,
	input[type="date"] {
		position: relative;
		display: block;
		width: 100%;
		background: #ffffff;
		color: #1c1c1c;
		line-height: 24px;
		padding: 7px 15px;
		border: 1px solid #cccccc;
		transition: all 500ms ease;
		-webkit-transition: all 500ms ease;
		-ms-transition: all 500ms ease;
		-o-transition: all 500ms ease;
		-moz-transition: all 500ms ease;
		min-height: 42px;
	}
	
	.contact-section .form-box .form-group {
		position: relative;
		margin-bottom: 10px;
		min-height: 110px;
	}
	.form-control[readonly] { 
		background : #eee!important; cursor : no-drop; 
	}
</style>
<!--Page Title-->

<!--<section class="page-title" <?php if($bg):?>style="background-image:url('<?php echo esc_attr($bg)?>');"<?php endif;?>>

<div class="auto-container">
	<h1>
		<?php if($title) echo wp_kses_post($title); else wp_title('');?>
	</h1>
	<div class="bread-crumb">
		<?php echo wp_kses_post(seniorsecurity_get_the_breadcrumb()); ?>
	</div>
</div>
Go Down Button -->
<!--  <div class="go-down">
<div class="curve scroll-to-target" data-target="#sidebar-section"><span class="icon fa fa-arrow-down"></span>
</div>
</div>
</section> -->

<div class="container1 page-title">
	<?php 
$image = get_field('image');
if( !empty( $image ) ): ?>
	<img src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" style="width:100%;height: 400px;"/>
	<?php endif; ?>
	<div class="centered">
		<h1>
			<?php if($title) echo wp_kses_post($title); else wp_title('');?>
		</h1>
		<div class="bread-crumb">
			<?php echo wp_kses_post(seniorsecurity_get_the_breadcrumb()); ?>
		</div>
	</div>
	<div class="go-down">
		<div class="curve scroll-to-target" data-target="#sidebar-section"><span class="icon fa fa-arrow-down"></span>
		</div>
	</div>
</div>
<style>
	.container1 {
		position: relative;
		text-align: center;
		color: white;
		padding: 0px !important;
	}
	
	.centered {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>

<!--Sidebar Page-->
<div class="sidebar-section no-bg contact-section" id="sidebar-section">
	<div class="auto-container">
		<div class="row clearfix">

			<!--Content Side-->
			<div class="content-side <?php echo esc_attr($classes);?>">

				<!--Default Section-->
				<section class="blog-section thm-unit-test">
					<!--Blog Post-->
					<?php while( have_posts() ): the_post();?>
					<!-- blog post item -->
					<div class="text">
						<?php the_content(); ?>

						<div class="clearfix"></div>

						<div class="form-box">
							<div role="form">
								<form action="<?php echo $action; ?>" method="post" name="payuForm">
									<input type="hidden" name="key" value="<?php echo $MERCHANT_KEY ?>" />
								    <input type="hidden" name="hash" value="<?php echo $hash ?>"/>
								    <input type="hidden" name="txnid" value="<?php echo $txnid ?>" />
								    <input type="hidden" name="surl" value="<?php echo $surl ?>" size="64" />
								    <input type="hidden" name="furl" value="<?php echo $furl ?>" size="64" />
								    <input type="hidden" name="service_provider" value="payu_paisa" size="64" />
								    
								     <input type='hidden' name="amount" value="<?php echo !empty($posted['amount']) ? $posted['amount'] : ''; ?>">
									 <input type='hidden' name="productinfo" value="test">
									<div class="row clearfix">
										<div class="form-group col-md-6 col-sm-12 col-xs-12">
											<div class="field-label">SELECT PACKAGE*</div>
											<p>

												<select name="package" id ="package" class="form-control">
													<option value="">Select Package</option>
													<option value="1199" <?php if( (!empty($posted['package']) && $posted['package']=="1199" ) || (isset($_GET['package']) && $_GET['package'] == "1199")  ) echo 'selected="selected"'; ?>>senOcare ASSIST</option>
													<option value="6999" <?php if( (!empty($posted['package']) && $posted['package']=="6999" ) || (isset($_GET['package']) && $_GET['package'] == "6999") )  echo 'selected="selected"'; ?> >senOcare COMFORT</option>
													<option value="1499" <?php if( (!empty($posted['package']) && $posted['package']=="1499" ) || (isset($_GET['package']) && $_GET['package'] == "1499")) echo 'selected="selected"'; ?>>senOcare INDULGE</option>
												</select>
												<span style="color:red"><?php echo $packageErr; ?></span>
											</p>
										</div>
										<div class="form-group col-md-6 col-sm-12 col-xs-12">
											<div class="field-label">PACKAGE DURATION *</div>
											<p>
												<select name="package-duration" id ="package_duration"  class="form-control">
													<option value="">Select Duration</option>
													<option value="3" <?php if(!empty($posted['package-duration']) && $posted['package-duration']=="3") echo 'selected="selected"'; ?>>3 Months</option>
													<option value="6" <?php if(!empty($posted['package-duration']) && $posted['package-duration']=="6") echo 'selected="selected"'; ?>>6 Months</option>
													<option value="12" <?php if(!empty($posted['package-duration']) && $posted['package-duration']=="12") echo 'selected="selected"'; ?>>12 Months</option>
												</select>
											</p>
											<span style="color:red"><?php echo $durationErr; ?></span>
										</div>
										<?php
											if(!empty($posted['package']) && !empty($posted['package-duration'])){
												$class = '';
											} else {
												$class = 'hide';
											}
										?>
										<div class="form-group col-md-6 col-sm-12 col-xs-12 <?php echo $class; ?>" id="main_total_amount" >
											<div class="field-label">Total Price</div>
											<p><input type="text" name="user_amount" value="<?php echo (empty($posted['user_amount'])) ? '' : $posted['user_amount']; ?>" id="total_amount" class="form-control" readonly>
												
										</div>


										<div class="form-group col-md-6 col-sm-12 col-xs-12">
											<div class="field-label">BOOKED BY - FULL NAME *</div>
											<p><input type="text" name="firstname" value="<?php echo (empty($posted['firstname'])) ? '' : $posted['firstname']; ?>" class="form-control char" maxlength="50">
											</p>
											<span style="color:red"><?php echo $nameErr; ?></span>
										</div>
										<div class="form-group col-md-6 col-sm-12 col-xs-12">
											<div class="field-label">MOBILE NUMBER*</div>
											<p><input type="text" name="phone" value="<?php echo (empty($posted['phone'])) ? '' : $posted['phone']; ?>" class="form-control numb" maxlength="10">
											</p>
											 <span style="color:red"><?php echo $phoneErr; ?></span>
										</div>
										<div class="form-group col-md-6 col-sm-12 col-xs-12">
											<div class="field-label">EMAIL ID*</div>
											<p><input type="text" name="email" value="<?php echo (empty($posted['email'])) ? '' : $posted['email']; ?>" class="form-control">
											</p>
											<span style="color:red"><?php echo $emailErr; ?></span>
										</div>
										<div class="form-group col-md-6 col-sm-12 col-xs-12">
											<div class="field-label">STATE*</div>
											<p><input type="text" name="state" value="<?php echo (empty($posted['state'])) ? '' : $posted['state']; ?>" class="form-control char">
											</p>
											<span style="color:red"><?php echo $stateErr; ?></span>
										</div>
										<div class="form-group col-md-6 col-sm-12 col-xs-12">
											<div class="field-label">CITY*</div>
											<p><input type="text" name="city" value="<?php echo (empty($posted['city'])) ? '' : $posted['city']; ?>"  class="form-control char">
											</p>
											<span style="color:red"><?php echo $cityErr; ?></span>
										</div>
										<div class="form-group col-md-6 col-sm-12 col-xs-12">
											<div class="field-label">COUNTRY OF RESIDENCE*</div>
											<p><input type="text" name="country-residence" value="<?php echo (empty($posted['country-residence'])) ? '' : $posted['country-residence']; ?>"  class="form-control char">
											</p>
											<span style="color:red"><?php echo $country_residenceErr; ?></span>
										</div>
										<div class="form-group col-md-6 col-sm-12 col-xs-12">
											<div class="field-label">PREFERRED MODE OF COMMUNICATION*</div>
											<p>
												<select name="preffered-mode" class="form-control">
													<option value="">Select Preferred Mode Of Communication</option>
													<option value="Whatsapp"  <?php if(!empty($posted['preffered-mode']) && $posted['preffered-mode']=="Whatsapp") echo 'selected="selected"'; ?>>Whatsapp</option>
													<option value="SMS" <?php if(!empty($posted['preffered-mode']) && $posted['preffered-mode']=="SMS") echo 'selected="selected"'; ?>>SMS</option>
													<option value="Email" <?php if(!empty($posted['preffered-mode']) && $posted['preffered-mode']=="Email") echo 'selected="selected"'; ?>>Email</option>
													<option value="Phone" <?php if(!empty($posted['preffered-mode']) && $posted['preffered-mode']=="Phone") echo 'selected="selected"'; ?>>Phone</option>
												</select>
											</p>
											<span style="color:red"><?php echo $preffered_modeErr; ?></span>
										</div>
										<div class="form-group col-xs-12">
											<hr>
											<h3>Member 1 Detail</h3>
										</div>
										<div class="form-group col-md-6 col-sm-12 col-xs-12">
											<div class="field-label">CONTACT NUMBER*</div>
											<p><input type="text" name="member1-contact" value="<?php echo (empty($posted['member1-contact'])) ? '' : $posted['member1-contact']; ?>" class="form-control numb" maxlength="10">
											</p>
											<span style="color:red"><?php echo $member1_contactErr; ?></span>
										</div>
										<div class="form-group col-md-6 col-sm-12 col-xs-12">
											<div class="field-label">AGE*</div>
											<p><input type="text" name="member1-age" value="<?php echo (empty($posted['member1-age'])) ? '' : $posted['member1-age']; ?>" class="form-control numb" maxlength="3">
											</p>
											<span style="color:red"><?php echo $member1_ageErr; ?></span>
										</div>
										<div class="form-group col-md-6 col-sm-12 col-xs-12">
											<div class="field-label">HOME ADDRESS*</div>
											<p><input type="text" name="member1-home-address" value="<?php echo (empty($posted['member1-home-address'])) ? '' : $posted['member1-home-address']; ?>"  class="form-control char">
											</p>
											<span style="color:red"><?php echo $member1_homeaddErr; ?></span>
										</div>
										<div class="form-group col-md-6 col-sm-12 col-xs-12">
											<div class="field-label">STATE*</div>
											<p><input type="text" name="member1-state" value="<?php echo (empty($posted['member1-state'])) ? '' : $posted['member1-state']; ?>"  class="form-control char">
											</p>
											<span style="color:red"><?php echo $member1_stateErr; ?></span>
										</div>
										<div class="form-group col-md-6 col-sm-12 col-xs-12">
											<div class="field-label">CITY*</div>
											<p><input type="text" name="member1-city" value="<?php echo (empty($posted['member1-city'])) ? '' : $posted['member1-city']; ?>"   class="form-control char" maxlength="50">
											</p>
											<span style="color:red"><?php echo $member1_cityErr; ?></span>
										</div>
										
										<div class="form-group col-md-6 col-sm-12 col-xs-12">
											<div class="field-label">PINCODE*</div>
											<p><input type="text" name="member1-pincode" value="<?php echo (empty($posted['member1-pincode'])) ? '' : $posted['member1-pincode']; ?>" class="form-control numb" maxlength="6">
											</p>
											<span style="color:red"><?php echo $member1_pincodeErr; ?></span>
										</div>
										<div class="form-group col-xs-12">
											<hr>
											<h3>Member 2 Detail ( Optional ) </h3>
										</div>
										<div class="form-group col-md-6 col-sm-12 col-xs-12">
											<div class="field-label">CONTACT NUMBER</div>
											<p><input type="text" name="member2-contact" value="<?php echo (empty($posted['member2-contact'])) ? '' : $posted['member2-contact']; ?>" class="form-control numb" maxlength="10">
											</p>
											<span style="color:red"><?php echo $member2_contactErr; ?></span>
										</div>
										<div class="form-group col-md-6 col-sm-12 col-xs-12">
											<div class="field-label">AGE</div>
											<p><input type="text" name="member2-age" value="<?php echo (empty($posted['member2-age'])) ? '' : $posted['member2-age']; ?>" class="form-control numb" maxlength="3">
											</p>
											<span style="color:red"><?php echo $member2_ageErr; ?></span>
										</div>
										<div class="form-group col-md-6 col-sm-12 col-xs-12">
											<div class="field-label">HOME ADDRESS</div>
											<p><input type="text" name="member2-home-address" value="<?php echo (empty($posted['member2-home-address'])) ? '' : $posted['member2-home-address']; ?>" class="form-control char">
											</p>
											
										</div>
										<div class="form-group col-md-6 col-sm-12 col-xs-12">
											<div class="field-label">STATE</div>
											<p><input type="text" name="member2-state" value="<?php echo (empty($posted['member2-state'])) ? '' : $posted['member2-state']; ?>"  class="form-control char" maxlength="50">
											</p>
											
										</div>
										<div class="form-group col-md-6 col-sm-12 col-xs-12">
											<div class="field-label">CITY</div>
											<p><input type="text" name="member2-city" value="<?php echo (empty($posted['member2-city'])) ? '' : $posted['member2-city']; ?>"  class="form-control char" maxlength="50">
											</p>
											
										</div>
										<div class="form-group col-md-6 col-sm-12 col-xs-12">
											<div class="field-label">PINCODE</div>
											<p><input type="text" name="member2-pincode" value="<?php echo (empty($posted['member2-pincode'])) ? '' : $posted['member2-pincode']; ?>" class="form-control numb" maxlength="6" >
											</p>
											<span style="color:red"><?php echo $member2_pincodeErr; ?></span>
										</div>
										<div class="form-group col-md-12 col-sm-12 col-xs-12 text-center">
											<input type="submit" value="Submit" id="submit_btn" class="normal-btn theme-btn">

										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
					<?php comments_template(); ?>
					<!-- end comments -->
					<?php wp_link_pages(array('before'=>'<div class="paginate-links">'.esc_html__('Pages: ', 'seniorsecurity'), 'after' => '</div>', 'link_before'=>'<span>', 'link_after'=>'</span>')); ?>
					<?php endwhile;?>

					<!--Pagination-->
					<div class="pager-outer clearfix">
						<div class="pagination text-right">
							<?php seniorsecurity_the_pagination(); ?>
						</div>
					</div>
				</section>
			</div>
			<!--Content Side-->

			<!--Sidebar-->
			<!-- sidebar area -->
			<?php if( $layout == 'right' ): ?>
			<?php if ( is_active_sidebar( $sidebar ) ) { ?>
			<div class="col-md-3 col-sm-4 col-xs-12">
				<aside class="sidebar">
					<?php dynamic_sidebar( $sidebar ); ?>
				</aside>
			</div>
			<?php } ?>
			<?php endif; ?>
			<!--Sidebar-->
		</div>
	</div>
</div>
<script>
   jQuery(document).ready(function() {
	  	var hash = '<?php echo $hash ?>';
	  		if(hash == '') {
	        	return;
	      	}
			var payuForm = document.forms.payuForm;
	  		 payuForm.submit();
	});	   
	  	
  	

    jQuery(document).on('change', '#package, #package_duration', function() {
  		var package = jQuery('#package option:selected').val();
        var package_duration = jQuery('#package_duration option:selected').val();
        var total_amount = package*package_duration;

        if(package !='' && package_duration !='' ){
        	
        	 jQuery("#main_total_amount").removeClass("hide");
        	//jQuery('#total_amount').val(total_amount);
        	jQuery('#total_amount').attr('value',total_amount);
        	
        	//jQuery('input[name="amount"]').val(500);
        } else {
        	jQuery('#main_total_amount').addClass("hide");
        }
	});
  	
 
 	jQuery('.numb').keypress(function (e) {
		if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
			return false;
		}
			   
	});
	
	jQuery(document).on('keypress', '.char', function (event) {
		 var regex = new RegExp('^[a-zA-Z ]+$');
		 var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
		 if (!regex.test(key)) {
			event.preventDefault();
				return false;
		 }
	});
  
  </script>
<?php get_footer(); ?>