options={
	debug:true
	}
util={
	ajax:function(url,dati,metodo,tipodati,crossdomain,async,callback){
		/*
		uso:
		util.ajax(url, dati, [metodo], [tipodati], [crossdomain], [sync], [callback])
			url: str  (url)
			dati: str (stringa da inviare) default:''
			metodo: str 'POST' o 'GET' default:POST
			tipoDati: str 'txt' o 'html' o 'json' default:txt
			crossdomain: bool (solo per json) default false
			sync: bool  default:false
			callback: obj()	
		*/
		if(url&&dati){
			$.ajax({
				"async":async||false,
				"crossDomain":crossdomain||false,
				"url": url,
				"data":dati||'',
				"method":metodo||"POST",
				"headers":{
					"authorization": "Bearer "+dati.utente.token,
					"accept": "-v1",
					"content-type": "application/json",
					"cache-control": "no-cache"
					},	
				success: function(result){
					if(callback){
						callback(result)
						}
					},
				error:function(x,s,e){
					util.messaggio("errore","ERRORE AJAX \n"+AJAX+"\n"+unescape(s)+" - "+unescape(e))
					}	
				})
			}
		},
	pag:function(P){ // disegna un pagina
		dati.pagina=P;// carica in  variabile il valore pagina attuale
		if(dati.pag[P]===undefined){
			// se prima volta che la pagina viene caricata
			$.when($.getScript({url:"pag/js/"+P+".js"})).done(function(t){// legge la parte html dal server
				if(options.debug) eval(t) // fa in modo che il codice appaia nel debug
				$.when($.ajax({url:"pag/"+P+".html",dataType:"html"})).done(function(html){ // legge ed esegue la parte js dal server
					dati.pag[dati.pagina].html=html // carica la parte html in una variabile per futuro utilizzo
					draw() // effettua il render della pagina
					})
				})				
			}
		else{
			// altrimenti usa quello che già c'è
			draw() // effettua il render della pagina
			}
		function draw(){
			if(dati.pagina&&dati.pag[dati.pagina]){
				$("#contenuto").html(dati.pag[dati.pagina].html) 
				$("#helpPagina").html($("#contenuto .helpPagina" ).html())
				$("#titoloPagina").text(dati.pag[dati.pagina].titolo);
				$("#descrizionePagina").text(dati.pag[dati.pagina].descrizione);
				if($.isFunction(dati.pag[dati.pagina].init)){ 
					dati.pag[dati.pagina].init() // Se presente una funzione init la esegue
					}
				}
			else{
				console.log("Creare o correggere la pagina /frontend/pag/js/"+dati.pagina+".js ")
				}
			}			
		},
	menuDraw:function(){ // disegna il menu
		var MENU=$('<ul></ul>',{'class':'sidebar-menu','data-widget':'tree'}) // crea redice menu
		$.each(dati.menu,function(I,OBJ){ // ogni elemento in dati.menu
			OBJ.id=I
			if(OBJ.submenu){ // se si tratta di un submenu
				var SM=$('<ul></ul>',{'class':'treeview-menu'}) // crea oggetto radice submenu
				$.each(OBJ.submenu,function(ISM,OBJSM){	// ogni elemento in submenu
					OBJSM.id=ISM
					SM.append($('<li></li>').append(draw(OBJSM))) // crea riga di submenu
					})					
				MENU.append( 
					$('<li></li>',{'class':'treeview'}) // crea il contenitore per il submenu
					.append(draw(OBJ,"submenu")) // append intestazione submenu
					.append(SM) // append oggetto submenu
					)
				}
			else{ // non è un submenu
				OBJ.id=I
				MENU.append($('<li></li>').append(draw(OBJ))) // crea riga di menu
				}
			})
		$("#mainMenu").append(MENU)
		function draw(obj,submenu){ 											       
			var elemento=$('<a></a>',{'href':(submenu)?'#':'javascript:util.pag("'+obj.id+'")'}) 	    // link
			if(obj.icon){
				elemento.append($('<i></i>',{'class':'fa fa-fw fa-'+obj.icon}))				// icona (se presente)
				}
			else{
				elemento.append($('<i></i>',{'class':'fa fa-fw fa-bullseye'}))				// icona generica (se non presente)
				}
			elemento.append($('<span></span>',{'text':obj.titolo})) 					// testo
			if(obj.nota){ 																// note (se presenti)
				elemento.append($('<span></span>',{'class':'pull-right-container'}).append($('<small></small>',{'class':'label pull-right bg-red','text':obj.nota})))
				}
			if(submenu){																// se submenu inserisce freccia
				elemento.append($('<span></span>',{'class':'pull-right-container'}).append($('<i></i>',{'class':'fa fa-angle-left pull-right'})))
				}
			return(elemento)
			}
		},
		
	/*	
	  <div id="mainMenu">
		  <ul class="sidebar-menu" data-widget="tree" id="mainMenu">
			<li>
				<a href="javascript:util.pag('shop')">
					<i class="fa fa-shopping-cart"></i>
					<span>Shop</span>
					<span class="pull-right-container">
						<small class="label pull-right bg-red">5</small>
					</span>	
				</a>
			</li>
			<li class="treeview">
				<a href="#">
					<i class="fa fa-map-marker "></i> 
					<span>Mercato</span>
					<span class="pull-right-container">
						<i class="fa fa-angle-left pull-right"></i>
					</span>
				</a>
				<ul class="treeview-menu">
					<li>
						<a href="javascript:util.pag('shop')">
							<i class="fa fa-shopping-cart"></i>
							<span>Shop</span>
							<span class="pull-right-container">
								<small class="label pull-right bg-red">5</small>
							</span>	
						</a>
					</li>
				</ul>
			  <li>
			</li>
		  </ul>		
	  </div>		
	 */		
	isFunction:function(obj){ // controlla se l'oggetto è del tipo "function"
		return obj && {}.toString.call(obj) === '[object Function]';
		}
	}