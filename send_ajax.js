// Variable to hold request
function SendData_aktif() {

var request;

// Bind to the submit event of our form
    // Prevent default posting of form - put here to work in case of errors
    event.preventDefault();

    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
        url: "php-app/req.php/UDApmb_reg",
        type: "post",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log("Hooray, it worked!");
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });

}

function Upload_file() {
	
        var fd = new FormData();
//        var up = $("#formUpload_dok input[type=file]");
        var up = $("#formUpload_dok input[type=file");
		
//		console.log(up);
//			fd.append('image', up[0]);
		
		jQuery.each(up, function(i,val) {
			//console.log(val);

			nm_file="xxx";
			
			switch(i)
			{
			case 0:
				nm_file = "KTP"
				break;
			case 1:
				nm_file = "KK"
				break;
			case 2:
				nm_file = "IJAZAH"
				break;
			case 3:
				nm_file = "AKTA"
				break;
			case 4:
				nm_file = "FOTO"
				break;
			case 5:
				nm_file = "SP"
				break;
			}	
			
			fd.append(nm_file, val.files[0]);
			
		});

		$.ajax({
			   url : 'pmb/UploadBerkas',
			   type : 'POST',
			   data : fd,          // ;formData,
			   contentType: false,
			   processData: false,
			   success : function( respon ) {

				$('#dialog1').on("hidden.bs.modal", null);

				   if ( respon.status == 0) {
						$("#text_modal").html("<h3>USERID tidak terdaftar !!, cek email anda</h3>");
					   
				   } else if (respon.status == 1) {
					   st_up=respon.result
						err = false;
						
						
						for (nel=1; nel<=6; nel++) 
						{
							if ( respon.result[nel] == -1) 
							{
									err = true;
									$( up[ nel-1 ] ).css("background-color", "red");
							}
							if (respon.result[nel]== 1) 
							{
									$( up[ nel-1 ] ).css("background-color", "");
							}
						}

							if ( respon.error == 0) {
								$("#text_modal").html("Semua berkas sudah di terima...!!");
								} else {
								$("#text_modal").html("Ada Berkas yang ditolak..");
							}
		
						}
					$('#dialog1').modal("show");
					},
			   error : function(e, x, z) {
				   
			   }
				
			});

			event.preventDefault();
		
}