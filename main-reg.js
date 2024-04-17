// to get current year
	$(function() {
		
		$('#navbarSupportedContent a').on('click', function(e) {
				$( "section" ).each(function( index ) {
					//console.log(this.getAttribute("href"));
					this.setAttribute("style","display:none");
				});

				$("#navbarSupportedContent li").each(function( index ) {
					this.setAttribute("class","nav-item");
				});
				
//			console.log(this.getAttribute("href"));

			osec = $( this.getAttribute("href")).get()[0]
				osec.setAttribute("style","display:flex");
			
			omain = $('#main_hero').get()[0]
				omain.setAttribute("class","sub_page hero_area");
				omain.setAttribute("style","height:auto;");

			this.closest("li").setAttribute("class","nav-item active");

		const url = new URL(window.location);
		//		url.searchParams.set('slide', e.to);
				window.history.pushState({}, '', url);			
			
		})
	})

	function GetFilteTF()
	{	
		file_tf = "";
		$.ajax({
			   url : base_url + 'userlogin/ws_get_data/bukti_reg',
			   type : 'POST',
			   dataType: "json",
			   success : function( respon ) {
				   
						    file_tf =  respon.data;

					if (typeof file_tf !== 'undefined' )
					{	

							if  (  typeof file_tf.name !== null ) {
									html ='\
									  <div class="form_container">\
										<span style="color:red;">'+ ( file_tf.name=="Y" ? "Sudah di-Verifikasi" : "Belum di-Verifikasi") +' </span>\
										  <div class="img-box">\
												<img src="' + base_url + "/php-app/images/" + file_tf.name + '" alt="">\
										  </div>\
									  </div>';
								$("#bukti_reg_pmb").html( html );
							}

							if (respon.status == "1")
							{
									html ='\
									<div class="form_container">\
										<p>Pembayaran bisa Transfer melalui : </p>\
										<p>Bank : BNI <br>No. Rekening : 335588875<br>\
										a.n SEKOLAH TINGGI ILMU MANAJEMEN BUDI BAKTI YAYASAN</p>\
										<p>Lampirkan dalam keterangan Pembayaran dengan mencantumkan no. pendaftaran anda</p>\
										<p><i>misal :</i><br><i>Keterangan</i> : PMB012345678</p>\
										<hr>\
										<p>Biaya pembelian FORM PMB sebesar : <br>Rp. 200.000,- <i>( Dua Ratus Ribu Rupiah )</i>\
									</div>';

									//$("#status_reg").html(html);
							}

							if (respon.status == "1") {
									db = respon.data;
									$('[name=userID]').val(db.user);
									$('[name=Passpmb]').val(db.pass);
							}
					}
			   }
			})
	}		
	
