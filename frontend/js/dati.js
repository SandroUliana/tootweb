var dati={
	utente:{
		nome:"",
		cognome:"",
		ruolo:"", // ADMIN,MASTER 
		token:"",
		messaggi:false
		},
	menu:{
		CLI_shop:{
			titolo:"Shop",
			sottotitolo:"Dove effettuare acquisti",
			icon:"shopping-cart",
			nota:'3',			
			submenu:false
			},
		CLI_ordini:{
			titolo:"Ordini",
			sottotitolo:"Tutti vostri ordini",
			icon:"area-chart",
			nota:'new',			
			submenu:false
			},
		CLI_mercato:{
			titolo:"Mercato",
			sottotitolo:"Dove scegliere i prodotti",
			icon:"map-marker",
			nota:false,			
			submenu:{
				CLI_fornitori:{
					titolo:"Fornitori",
					sottotitolo:"Qui potete scegliere i vostri fornitori.",
					nota:false			
					},
				CLI_prodotti:{
					titolo:"Prodotti",
					sottotitolo:"Tutti i prodotti disponibili tra cui scegliere.",
					nota:false			
					},
				CLI_offerte:{
					titolo:"Offerte",
					sottotitolo:"Le offerte attive e in programmazione.",
					nota:false
					}
				}
			},
		CLI_messaggi:{
			titolo:"Messaggi",
			sottotitolo:"Tutti i messaggi del cliente",
			icon:"envelope",
			nota:false,			
			submenu:false
			},
		CLI_task:{
			titolo:"Task",
			sottotitolo:"Le cose da fare.",
			icon:"cogs",
			nota:false,			
			submenu:false
			},
		CLI_demo:{
			titolo:"Demo",
			sottotitolo:"Pagina di test per widget e feature",
			icon:"bolt",
			nota:"new",			
			submenu:false
			}
		},
	pagina:"",// pagina attuale
	pag:{},   // le pagine caricate appariranno qui
	html:{
		messaggi:{
			expire:300,
			contnuto:'<p>Messaggi<(p>'
			},
		notifiche:false,
		utente:false,
		fornitore:false,
		cliente:false,
		menu:false,
		pagine:false,
		refresh:function(){
			var tt=[]
			$.each(this,function(i,v){
				if(!util.isFunction(v)){
					tt.push(i)
					}
				})
			alert(tt)
			},
		load:function(){			

			}
		
		}
	}