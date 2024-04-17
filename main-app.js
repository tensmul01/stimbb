

/* main js for entry  */
var __PDF_DOC,
	__CURRENT_PAGE,
	__TOTAL_PAGES,
	__PAGE_RENDERING_IN_PROGRESS = 0,
	__CANVAS = 0, 		// $('#pdf-canvas').get(0),
	__CANVAS_CTX = 0, 	// __CANVAS.getContext('2d');
	__object = null
	
	
	function MYalert(txtHeader, txtData, ocBatal=[], callb ) 
	{
	const max =1000;
	const min =1;
	
	var randomnumber = Math.floor(Math.random() * (max - min + 1)) + min;
		
	var idAlert= "my-alert-" + 	randomnumber;
	var html_modal="";
		html_modal += '<div class="modal fade" id="' + idAlert + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">';

		html_modal += '<div class="modal-dialog modal-dialog-centered" role="document">';
		html_modal += '<div class="modal-content">';
		html_modal += '		<div class="modal-header">';
		html_modal += '		  <h4 class="modal-title">'+txtHeader+'</h4>';
		html_modal += '		</div>';
		html_modal += '		<div class="modal-body">';
		html_modal += '		  <p id = "text_modal">'+txtData+'.</p>';
		html_modal += '		</div>';

		if (ocBatal.length == 0) {
			ocBatal = [["Tutup","","btn-success"]];
		}
		
		if ( ocBatal.length != 0 ) {
		
			html_modal += '		<div class="modal-footer">';
			html_modal += '		  <button id="IDmodal_button1" value="false" type="button" class="btn '+ocBatal[0][2]+'" data-dismiss="modal" onclick="'+ocBatal[0][1]+'" >'+ocBatal[0][0]+'</button>';

			if ( ocBatal.length==2 ) {
				if (ocBatal[1].length==2) {
					ocBatal[1]=[ocBatal[1][0],ocBatal[1][1],"btn-success"]
				}
				html_modal += '		  <button id="IDmodal_button2" value="false" type="button" class="btn '+ocBatal[1][2]+'" data-dismiss="modal" onclick="'+ocBatal[1][1]+'" >'+ocBatal[1][0]+'</button>';
			}

			html_modal += '		</div>';
		}
		html_modal += '	  </div>';
		html_modal += '	</div>';
		html_modal += '	</div>';
		
		var emodal = document.createElement('div');
			emodal.innerHTML=html_modal;
			document.body.appendChild(emodal);

			$("#"+idAlert).on('hidden.bs.modal', function(){
				emodal.remove()
				if ( callb ) {
					 callb();
				}
			});
		 //console.log(  $("#"+idAlert) )
		 $("#"+idAlert).modal("show");

		return true;
	}	


$(document).ready(function()	{
		pmb_socket = false //new WebSocket() //"wss://socketsbay.com/wss/v2/101/e1783ed3254d3940a4955c1f42a76cf6/");

		pmb_socket.onopen = function(event) 
		{ 
//			alert("socket open now") 
		}

		pmb_socket.onerror = function(event) 
		{ 
			/* alert("socket error") */
		}

		/* create div for dialog */
		$.get( base_url + 'register/text-data/modal-dialog-1.html', function(data) {
		   document.getElementById("user_dialog").innerHTML = data
		}, 'text');
	
	$(function(){
		
		$("#formPMB").submit(function (event) {
		const oForm = document.getElementById('formPMB');
		var data_entry	= getFormData( $("#formPMB") );


		$.ajax({
			   url : base_url + 'pmb/registrasi',
			   type : 'POST',
			   data : data_entry,          // ;formData,
			   dataType: "json",
			   success : function( respon ) {
				   if ( respon.status == 1) {
						  $("#text_modal").html("<h3>Email ini sudah terdaftar dengan</h3><br>dengan no. pmb : <bold>" +respon.idPMB+ "</bold>");
				   } else if (respon.status == 0) {
						  $("#text_modal").html("<h3>Terima kasih, ada sudah terdaftar,</h3><br>dengan no. pmb : <bold>" +respon.idPMB+ "</bold><br>Cek email anda untuk langkah selanjutnya !");
				   }
					$('#dialog1').modal("show");
				}
		});
		
		event.preventDefault();
		
		});

		$("#formLoginPMB").submit(function (event) {
		var data_entry	= getFormData( $("#formLoginPMB") );
		

		$.ajax({
			   url : base_url + 'pmb/login',
			   type : 'POST',
			   data : data_entry,          // ;formData,
			   dataType: "json",
			   success : function( respon ) {

					var d = new Date();
					data_send = {'idPMB': data_entry.userID, 'pesan' : "Login", 'waktu': d.toTimeString().substr(0,8)}
					
				   if ( respon.status == 0) {
						  $("#text_modal").html("<h3>USER tidak terdaftar !</h3>");
							  $('#dialog1').on("hidden.bs.modal",function() {document.location.href=""});
				   } else if (respon.status == 1) {

						$('#dialog1').on("hidden.bs.modal", null)

						GetFilteTF();

						switch(true) {
						  case respon.valid == 9:
							document.location.href = base_url
							break;

						  case respon.valid == 5:
						  $("#text_modal").html("<h3>Anda sudah diterima sebagai Mahasiswa, Silahkan login di <a href='https://sibudi.stimbudibakti.ac.id'>sini</a> </h3>");
							  $('#dialog1').on("hidden.bs.modal",function() 								{
								  document.location.href = "https://sibudi.stimbudibakti.ac.id";
								  });
							break;

						  case respon.valid == 3:
						  $("#text_modal").html("<h3>Lanjutkan ke pengisian Biodata dan kelengkapan dokumen lainnya</h3>");
							  $('#dialog1').on("hidden.bs.modal",function() 								{
								  document.location.href = base_url;
								  });
							break;

						  case respon.valid == 2:
							break;

						  case respon.valid == 1:
							GetFilteTF();
							$("#text_modal").html("Data pembayaran belum di-Verifikasi, hubungi admin PMB<br>" + "<i>catatan</i> : <b>" + respon.note + "</b>");
							$('#dialog1').on("hidden.bs.modal",function() { location.reload()});
							break;

						  default:
							html  = "Account PMB anda <b>belum Aktif<b>,<br>lakukan UP-load bukti pembayaran anda !";
							html += '<hr><p>Klik <a href="#" ><label for="file-upload" style="cursor: pointer;">disini</label><input id="file-upload" type="file" style="display: none;"  onchange="upload_ini(this)" /></a> untuk Upload Bukti</p><p id="text_file">file : </p>';
							html2 = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
							html2 +='<button type="button" class="btn btn-primary" data-dismiss="modal">Kirim</button>';
							
							$("#text_modal").html( html );
							$("#text_button").html( html2 );
							
						}

				   }

					$('#dialog1').modal("show");

					if (pmb_socket.readyState==1) {
						brt= JSON.stringify(data_entry);
						pmb_socket.send(brt);
					}
				
				}

				
		});
		event.preventDefault();
		});

		$("#form_biodata").submit(function (event) {
		var data_entry	= getFormData( $("#form_biodata") );
		var data_entry	= formToJSON( $("#form_biodata") );
		
		//$("#form_biodata").serialize();
		//	console.log(data_entry);

		$.ajax({
			   url : base_url + 'pmb/Biodata',
			   type : 'POST',
			   data : data_entry,          // ;formData,
			   dataType: "json",
			   success : function( respon ) {
				   if ( respon.status == 1) {
						  $("#text_modal").html("<h3>Lanjutkan dengan melengkapi Dokumen pendukungnya</h3>");
							  $('#dialog1').on("hidden.bs.modal",function() {document.location.href=""});
				   } else {
						  $("#text_modal").html("<h3>Terjadi kesalahan !</h3>");
				   }
				$('#dialog1').modal("show");
				}
				
		});
		
		event.preventDefault();
		
		});



	  $("#car2").on('slide.bs.carousel', function (e){
		$("[data-slide-to=" + e.from + "]").children().attr("class","mycircle btn btn-outline-primary")
		$("[data-slide-to=" + e.to + "]").children().attr("class","mycircle btn btn-primary")

		const url = new URL(window.location);
		url.searchParams.set('slide', e.to);
		window.history.pushState({}, '', url);
		//console.log(e)
	  });
	  
		spos = window.location.search.substr(1)
		if (spos.substr(0,6) == "slide=")
		{
				$("#car2").carousel( parseInt(spos.substr(6,2)) );
		}
		
	});
	
// ======================== FOMR REGISTRASI ==================		
		$("#formreg_pmb").submit(function (event) {
		var user=$('#formreg_pmb input[name="userID"]' ).val();
		
		var d = new Date();
		//var data_entry	= getFormData( $("#formreg_pmb") );
		// php-app/req.php/UDApmb_reg
        var fd = new FormData();
        var files = $("#buktitrf")[0].files;
			fd.append('bukti_tf',files[0]);
			fd.append('userID',  user);
			fd.append('Passpmb', $('#formreg_pmb input[name="Passpmb"]').val());


		brt="kosong";
		
		$.ajax({
			   url : base_url + 'pmb/activasi',
			   type : 'POST',
			   data : fd,          // ;formData,
//			   dataType: "json",
			   contentType: false,
			   processData: false,
			   success : function( respon ) 
					{

				   //$('#dialog1').on("hidden.bs.modal", function() {document.location.href=""});

				   data_send = {'idPMB': user, 'pesan' : "Sudah Registrasi...", 'waktu': d.toTimeString().substr(0,8)}

				   if ( respon.status == 0) {
						$("#text_modal").html("<h3>USERID tidak terdaftar !!, cek email anda</h3>");
					   
				   } else if (respon.status == 1) {
						

						switch(true) {

						  case respon.valid == 3:
						  $("#text_modal").html("<h3>Lanjutkan pengisian Biodata dan kelengkapan dokumen lainnya</h3>");
							data_send.pesan ="Biodata";
						  
							//$('#dialog1').on("hidden.bs.modal",function() {document.location.href="user_login.php"});
							break;

						  case respon.valid == 2:
						  $("#text_modal").html("Data pembayaran sudah diterima, hubungi admin PMB<br>" + "<i>catatan</i> : <b>" + respon.note + "</b>");
							  //$('#dialog1').on("hidden.bs.modal",function() {document.location.href="user_login.php"});
							data_send.pesan ="Validasi";
							break;

						  case respon.valid == 1:
						  $("#text_modal").html("Data pembayaran belum di-Verifikasi, hubungi admin PMB<br>" + "<i>catatan</i> : <b>" + respon.note + "</b>");
							  //$('#dialog1').on("hidden.bs.modal",function() {document.location.href="user_login.php"});
							data_send.pesan ="Verifikasi";
							break;

						  case respon.valid == 0:
							$("#text_modal").html("File tidak bisa diterima, coba ulangi !!" + "<i style='color:red;'>" + respon.error + "</i>");
							break;

						  default:
							html  = "anda belum mangaktifkan account PMB anda,<br>lakukan UP-load bukti pembayaran anda !";
							html += '<hr><p>Klik <a href="#" ><label for="file-upload" style="cursor: pointer;">disini</label><input id="file-upload" type="file" style="display: none;"  onchange="upload_ini(this)" /></a> untuk Upload Bukti</p><p id="text_file">file : </p>';
							html2 = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
							html2 +='<button type="button" class="btn btn-primary" data-dismiss="modal">Kirim</button>';
							
							$("#text_modal").html( html );
							$("#text_button").html( html2 );
							
						}
					}
						brt= JSON.stringify(data_send);
						//pmb_socket.send(brt);
						$('#dialog1').modal("show");
					},
			   error : function(e, x, z) {
				   
				   console.log("Error:");
				   console.log(e);
				   console.log(x);
				   console.log(z);
			   }
				
			});

			event.preventDefault();
		
		});
	
	$("#btnWaitReg").on("click", function (event) {
		var d = new Date();
		
		data_send = {'idPMB': MY_id, 'pesan' : "Minta Registrasi...", 'waktu': d.toTimeString().substr(0,8)}

		brt= JSON.stringify(data_send);
		pmb_socket.send(brt);

			$("#text_modal").html( "Pesan anda sudah dikirim ke Dashboard Admin" );
			$('#dialog1').modal("show");
		});

	$("input[type=file]").on("change", function(k,e) {
		fileInputchange(this);
	})
	
});
	

	function getFormData($form){
		var unindexed_array = $form.serializeArray();
		var indexed_array = {};

		//console.log(unindexed_array);

		$.map(unindexed_array, function(n, i){
			indexed_array[n['name']] = n['value'];
		});
		
		return indexed_array;
	}
	
	function objectifyForm(formArray) {
		//serialize data function
		var returnArray = {};
		for (var i = 0; i < formArray.length; i++){
			returnArray[formArray[i]['name']] = formArray[i]['value'];
		}
		return returnArray;
	}
	
	
	function upload_ini(e)	{
		$("#text_file").html("File : " + e.value);
	}

	function PauseSlide(x) {
			if ( ONpause ) {
				ONpause = false;			
				$('#car2').carousel({
					interval: 60000,
					pause: "hover"
				});
				console.log("pause");
				}
        }

	function ContinueSlide(x) {
			if ( ONpause == false ) { 
				ONpause = true;
				$('#car2').carousel({
					interval: 6000,
					pause: "hover"
				});
				console.log("continue...");
        }
	}
	
	function formToJSON( selector )
	{
		 var form = {};
		 $(selector).find(':input[name]:enabled').each( function() {
			 var self = $(this);
			 var name = self.attr('name');
			 var type = self.attr('type')

			 if ( type == "radio") {
				 if ( self.prop("checked") ) {
					form[name] = self.val();
				 } else if (!form[name] ) {
						form[name] = "";
				 }
			 }		 
			 else {
				form[name] = self.val();
			 }
		 });

		//console.log(form);
		
		return form;
	}

	function Upload_file() {
	
	event.preventDefault();

        var fd = new FormData();
        var up = $("#formUpload_dok input[type=file]");
		
		//console.log( "Aneh!!!")
		
		//console.log( up )
		
//			fd.append('image', up[0]);
		
		jQuery.each(up, function(i,val) {

			//console.log(i, val);

			nm_file="xxx";
			
			switch(val.id)
			{
			case "image[1]" :
				nm_file = "KTP"
				break;
			case "image[2]" :
				nm_file = "KK"
				break;
			case "image[3]" :
				nm_file = "IJAZAH"
				break;
			case "image[4]" :
				nm_file = "AKTA"
				break;
			case "image[5]" :
				nm_file = "FOTO"
				break;
			case "image[6]" :
				nm_file = "SP"
				break;
			case "image[10]" :
				nm_file = "SKTM"
				break;
			case "image[11]" :
				nm_file = "KHS"
				break;
			case 99:
				nm_file = "00"
				break;
			}	
			

			fd.append(nm_file, val.files[0]);

			//console.log(nm_file, val.files[0]);
			
		});


//return false;


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
	
	function Upload_daftar() {
        var fd = new FormData();
        var files = $("#TFdaftar_ulang")[0].files;
			fd.append('bukti_tf',files[0]);

		alert("upload");
		
		$.ajax({
			   url : base_url + 'pmb/pmb_upload/bukti_tf/8',
			   type : 'POST',
			   data : fd,          // ;formData,
			   contentType: false,
			   processData: false
			}).done(function() {
				alert( "success" );
			}).fail(function() {
				alert( "error" );
			})
/*		
			   success : function( respon ) 
						{
							if ( respon.status == 1) 
							{	
								$("#text_modal").html("Data pembayaran sudah diterima, hubungi admin PMB<br>");

							} else {
								$("#text_modal").html( respon.error );
								
							}
								$('#dialog1').on("hidden.bs.modal", function(){});
								$('#dialog1').modal("show");
							
							
						}, 
			
			   error : function( e ) 
						{
		
							$("#text_modal").html("Terjadi kesalahan!!!..");
							$('#dialog1').on("hidden.bs.modal", function(){});
							$('#dialog1').modal("show");
						} 
			});
*/			
		
	}		

	function register_mhs(ob, id) {
        var fd = new FormData();
        var files = $("#TFdaftar_ulang")[0].files;
			fd.append('bukti_tf',files[0]);

		$.ajax({
			   url : base_url + 'pmb/pmb_upload/bukti_tf/8',
			   type : 'POST',
			   data : fd,          // ;formData,
			   contentType: false,
			   processData: false,
			   success : function( respon ) 
						{
							if ( respon.status == 1) 
							{	
							$("#text_modal").html("Data pembayaran sudah diterima, hubungi admin PMB<br>");
							$('#dialog1').on("hidden.bs.modal", function(){});
							$('#dialog1').modal("show");

							}							
						}, 
			
			   error : function( e ) 
						{
						} 
			});
		
	}		



 $(function() {
    $('input[data-toggle]').change(function() {
	  $(this).val ( ( $(this).prop('checked') ? "on" : "off") )
    })
  })


// Used for creating a new FileList in a round-about way
function FileListItem(a) {
  a = [].slice.call(Array.isArray(a) ? a : arguments)
  for (var c, b = c = a.length, d = !0; b-- && d;) d = a[b] instanceof File
  if (!d) throw new TypeError("expected argument to FileList is File or array of File objects")
  for (b = (new ClipboardEvent("")).clipboardData || new DataTransfer; c--;) b.items.add(a[c])
  return b.files
}

async function fileInputchange( oInput ) {
  const maxWidth = 800
  const maxHeight = 800
  const result = []
  var   canvas,
        _img  = document.getElementById( oInput.getAttribute("for").substr(1) )
 
  		if ( _img.nodeName == "CANVAS" ) {
		   canvas = _img
		} else {
		   canvas = document.createElement("canvas");
		   
		   canvas.width  = 600
		   canvas.height = 800
		   
		}

  var arrFile = null, filelist = null ;
  
  //console.log(oInput)
  
  for (const file of oInput.files) {
	  arrFile = file;

/*
	if (file.size < 200*1024)
		{
		//  tidak perlu di perkecil
			return false;
		}

		console.log(file);
*/
	console.log("file : ", file);
	
	if (file.type == "application/pdf") {
		//__CANVAS = $('#pdf-canvas').get(0)
		//__CANVAS_CTX = __CANVAS.getContext('2d');
		//showPDF( URL.createObjectURL($("#buktitrf").get(0).files[0]) );
		
		init_input_PDF( oInput, canvas);
		_img.src = canvas.toDataURL('image/jpeg', 1.0);
		
		//canvas = $('#' + tmpImg ).get(0)
		//return false;
	} else {
		
		if ( document.getElementById("pdf-canvas") !== null) {
			
		   canvas = $('#pdf-canvas').get(0)
		   console.log("canvas from html")
		} else {
		   console.log("canvas from script")
		   canvas = document.createElement("canvas");
		   //section = oInput.closest("section")
		   //console.log(section)
		   //section.appendChild(canvas)
		}
		
		const ctx = canvas.getContext('2d')
		
		const img = await file.image()
		
		// calculate new size
		const ratio = Math.min(maxWidth / img.width, maxHeight / img.height)
		const width = img.width * ratio + .5 | 0
		const height = img.height * ratio + .5 | 0

		// resize the canvas to the new dimensions
		canvas.width = width
		canvas.height = height

		// scale & draw the image onto the canvas
		ctx.drawImage(img, 0, 0, width, height)
		
		
		// document.body.appendChild(canvas)
		if ( _img.nodeName == "IMG" ) {
			_img.src = canvas.toDataURL('image/jpeg', 1.0);  // just to preview //
		}
	}
	
	 

	 if (file.size < 200*1024 && file.type !== "application/pdf" )
		{
		//  tidak perlu di perkecil
			console.log(file.size)
			return false;
		}
  		

  }
/*  
  	const blob = await new Promise( rs => canvas.toBlob(rs,'image/jpeg', 0.95) )
	const resizedFile = new File([blob], arrFile.name, arrFile)
				  result.push(resizedFile)

	const fileList = new FileListItem(result)
*/
  
  //console.log(result)
	const blob = await new Promise( rs => canvas.toBlob(rs,'image/jpeg', 0.95) )
	const resizedFile = new File([blob], arrFile.name, arrFile)
		  result.push(resizedFile)

	      fileList = new FileListItem(result)
/*		  
  if ( arrFile.type == "application/pdf" ) {
	  
	const blob = dataURItoBlob(_img.src);
	const resizedFile = new File( [blob], arrFile.name, arrFile)
		  result.push(resizedFile)

		  fileList = new FileListItem(result)
	
  } else {
	const blob = await new Promise( rs => canvas.toBlob(rs,'image/jpeg', 0.95) )
	const resizedFile = new File([blob], arrFile.name, arrFile)
		  result.push(resizedFile)

	      fileList = new FileListItem(result)
	  
  }
 */
  
  // temporary remove event listener since
  // assigning a new filelist to the input
  // will trigger a new change event...
  //oInput.onchange = null
  oInput.files = fileList
 
  console.log(oInput.files);
  //fileInput.onchange = change
}


testb = (function(){
	function getCanvasBlob(canvas) {
	  return new Promise(function(resolve, reject) {
		canvas.toBlob(function(blob) {
		  resolve(blob)
		})
	  })
	}

	var canvasBlob = getCanvasBlob(canvas);

	canvasBlob.then(function(blob) {
	  // do stuff with blob
	}, function(err) {
	  console.log(err)
	});
	});

function cek_Upload_file() {

}


function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
  return blob;

}

function SetAuto() {
	
	$("[class^=auto-").each(function(k, ob) {
		switch (true) {
			case $(ob).hasClass('auto-matakuliah'):
				SetAutoComplete(ob, "adm/auto_entry/matakuliah")
				break;
			case $(ob).hasClass('auto-dosen'):
				SetAutoComplete(ob, "adm/auto_entry/dosen")
				break;				
			case $(ob).hasClass('auto-mhs'):
				SetAutoComplete(ob, "adm/auto_entry/mahasiswa")
				break;		
			case $(ob).hasClass('auto-daftar'):
				SetAutoComplete(ob, "admin/auto_entry/mhs_daftar", Callb_Daftar)
				break;
		}
	});
}


function SetAutoComplete(ob, urlData, callback) {
// set auto compltete for field entry ......
//var inp_data = $(id).attr("id");
//console.log(inp_data);

//var name_input = document.querySelector("#"+inp_data).dataset.id;

		$(ob)
		.autocomplete({
		  source: function( request, response ) {
			$.ajax( {
			  "url" 	: base_url + urlData,
			  "dataType": "json",
			  "data"	: {
						  cari: request.term
			  },
			  success: function( data ) {
				response( data );
			  }
			});
		  },
		  minLength: 0,
		  change: function( event, ui ) {
				/*
					ob.dataset.id = ui.item.id;
						if ( callback ) 
							{ 
							callback( ui );}
				*/			
					},
					
		  select: function (event, ui) {
						ob.dataset.id = ui.item.id;
						if ( callback ) 
							{ 
							callback( ui.item.id );}
						}

		  		  
		})
}

function Callb_Daftar( ui_id ) {
let  id = 0	
	//console.log(ui_id)
	event.preventDefault();
	
	if ( typeof(ui_id)== "object" ) {
		url = base_url + "admin/auto_entry/mhs_daftar?ord=" + ui_id.value
	} else {
		url = base_url + "admin/auto_entry/mhs_daftar?id=" + ui_id
	}
	
	$.ajax( {
			  "url" 	: url,
			  "type"	: "get", 
			  "dataType": "json",
	     	  "success" : function( data ) {
				 
				out           = document.querySelector("#biodata-container") 
				out.innerHTML = data.html;
				
				/* - display pdf image -- */
				view_img_pdf()
				/* - end - */
				
				if ( typeof(ui_id)== "object" ) {
					document.querySelector("#ord_data").innerHTML=ui_id.value;
				}
			  }
		})

}		

/* ====== PDV view on img src =============*/
/* <script src="//mozilla.github.io/pdf.js/build/pdf.js"></script> */

	function view_img_pdf() {
		ob = document.querySelectorAll("[data-image=pdf]")
		Object.keys(ob).forEach(function(key, el) {

			ob[key].setAttribute("alt","- pdf -")

			dv = ob[key].closest("div");
			
			view_Pdf( dv )

		});
	}

	function view_Pdf( canvasdiv )
	{
		//var canvasdiv = document.getElementById( nm_div );  
		
		var url = canvasdiv.querySelector("img").src;
		var sp  = document.createElement('span')
			canvasdiv.appendChild(sp)
			sp.innerHTML = "Loading.. PDF";

		var PDFJS = window['pdfjs-dist/build/pdf'];
		//var PDFJS = window['pdf'];

			PDFJS.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
			//PDFJS.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

		var loadingTask = PDFJS.getDocument(url);

		loadingTask.promise.then(function(pdf) {

		  //var canvasdiv = document.getElementById( nm_div );
		  var totalPages = pdf.numPages
		  var data = [];

		  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
			  pdf.getPage(pageNumber).then(function(page) {

			  var scale = 1.5;
			  var viewport = page.getViewport({ scale: scale });

			  var canvas = document.createElement('canvas');
				  canvas.id  = "render" + pageNumber;
				  canvas.setAttribute("onclick", "window.open(this.toDataURL(\"image/png\"), '_blank')");
				  canvas.style.cursor = "pointer";
				  canvasdiv.appendChild(canvas);

			  // Prepare canvas using PDF page dimensions
			  var context = canvas.getContext('2d');
				  canvas.height = viewport.height;
				  canvas.width  = viewport.width;

			  // Render PDF page into canvas context
			  var renderContext = { canvasContext: context, viewport: viewport };

			  var renderTask = page.render(renderContext);
				  renderTask.promise.then(	function() {
											//data.push(canvas.toDataURL('image/png'))
											//console.log(data.length + ' page(s) loaded in data')
											
											//canvas.onclick = function(){window.open(canvas.src)};
											});
			});
		  }
		  
		  sp.remove();
		  
		}, function(reason) {
		  // PDF loading error
		  console.error(reason);
		});
	}



