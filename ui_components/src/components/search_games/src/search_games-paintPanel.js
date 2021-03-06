/**
 * Paint panel.
 */

let selected_genre = "concept_computer_game";

let collectionOfGameSctpID;

function change_genre(new_value) {
	selected_genre = new_value;
}

function _initLinks() {

	links = document.getElementsByClassName("link_internal"); //Находим все ссылки на странице

	for (let i = 0; i < links.length; i++) {

		links[i].addEventListener("click", function (e)
		{
			e.preventDefault();
			_LinkClick(e.target.getAttribute("href"));
		});
	}
 }

 function _LinkClick(sctpID) {
	let addr;
	// SCWeb.core.Server.resolveScAddr(['ui_main_menu'], function (keynodes) {
		addr = parseInt(sctpID);	
		SCWeb.core.Server.resolveScAddr(["ui_menu_view_full_semantic_neighborhood"],
		function (data) {
			// Get command of ui_menu_view_full_semantic_neighborhood
			var cmd = data["ui_menu_view_full_semantic_neighborhood"];
			// Simulate click on ui_menu_view_full_semantic_neighborhood button
			SCWeb.core.Main.doCommand(cmd,
			[addr], function (result) {
				// waiting for result
				if (result.question != undefined) {
					// append in history
					SCWeb.ui.WindowManager.appendHistoryItem(result.question);
				}
			});
		});

 }

 function setStyles(el){
	el.append(`<style style="display:none">
	th, td {
		padding: 0px 15px 0px 5px ;
	  }
	td {
		width: 300px;
		word-break: break-all;
	}
    </style>`);
}

function sortTable(n) {
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById("table");
	switching = true;
	// Set the sorting direction to ascending:
	dir = "asc"; 
	/* Make a loop that will continue until
	no switching has been done: */
	while (switching) {
	  // Start by saying: no switching is done:
	  switching = false;
	  rows = table.getElementsByTagName("TR");
	  /* Loop through all table rows (except the
	  first, which contains table headers): */
	  for (i = 1; i < (rows.length - 1); i++) {
		// Start by saying there should be no switching:
		shouldSwitch = false;
		/* Get the two elements you want to compare,
		one from current row and one from the next: */
		x = rows[i].getElementsByTagName("TD")[n];
		y = rows[i + 1].getElementsByTagName("TD")[n];
		/* Check if the two rows should switch place,
		based on the direction, asc or desc: */
		if (dir == "asc") {
		  if (x.innerText.toLowerCase() > y.innerText.toLowerCase()) {
			// If so, mark as a switch and break the loop:
			shouldSwitch = true;
			break;
		  }
		} else if (dir == "desc") {
		  if (x.innerText.toLowerCase() < y.innerText.toLowerCase()) {
			// If so, mark as a switch and break the loop:
			shouldSwitch = true;
			break;
		  }
		}
	  }
	  if (shouldSwitch) {
		/* If a switch has been marked, make the switch
		and mark that a switch has been done: */
		rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		switching = true;
		// Each time a switch is done, increase this count by 1:
		switchcount ++; 
	  } else {
		/* If no switching has been done AND the direction is "asc",
		set the direction to "desc" and run the while loop again. */
		if (switchcount == 0 && dir == "asc") {
		  dir = "desc";
		  switching = true;
		}
	  }
	}
  }


function find(self,container) {

	let game_name_filter = document.getElementById("search_text_field").value;

	let publisher_filter = document.getElementById("publisher_filter").value;

	let developer_filter = document.getElementById("developer_filter").value;
	
	let platform_filter =  document.getElementById("platform_filter").value;


	let collectionOfPublisherSctpID;

	let collectionOfDeveloperSctpID;

	let collectionOfPlatformSctpID;


    let getAllGamesID = self._moba();
	
		let getAllGamesName = getAllGamesID.then((array) => {
			collectionOfGameSctpID = array;
			return self._getName(array);
		});

		let getAllGamePublisherID = getAllGamesID.then(self._publishers);

		let getAllGamePublisherName = getAllGamePublisherID.then((array) => {
			collectionOfPublisherSctpID = array;
			return self._getName(array);
		})


		let getAllGameDeveloperID = getAllGamesID.then(self._developer);

		let getAllGameDeveloperName = getAllGameDeveloperID.then((array) => {
			 collectionOfDeveloperSctpID = array;
			 return self._getName(array);
		 })
	
		let getAllGamePlatformID = getAllGamesID.then(self._platform);
	
		let getAllGamePlatformName = getAllGamePlatformID.then((array) => {
			 collectionOfPlatformSctpID = array;
			 return self._getName(array);
		})
		Promise.all([getAllGamesName, getAllGamePublisherName, getAllGameDeveloperName, getAllGamePlatformName]).then((result) => {

			setTimeout(function(){
				setTimeout(function(){
					let sizeOfResult = Math.max(result[0].length, result[1].length,result[2].length, result[3].length);
	
					let gamesName = [];
					let publishersName = [];
					let developersName = [];
					let platformsName = [];
	
					let newCollectionOfGameSctpID  = [];
					let newCollectionOfPublisherSctpID = [];
					let newCollectionOfDeveloperSctpID = []
					let newCollectionOfPlatformSctpID = [];
	
					for (let i = 0; i < sizeOfResult; i++) {
						let game_name_filter_condition = (result[0][i].toLowerCase().includes(game_name_filter.toLowerCase()));
	
						let publisher_filter_condition;
						for ( let j = 0; j < result[1][i].length; j += 1 ) {
							publisher_filter_condition = (result[1][i][j].toLowerCase().includes(publisher_filter.toLowerCase()));
							if (publisher_filter_condition) {
								break;
							}
						}
	
						let developer_filter_condition;
						for ( let j = 0; j < result[2][i].length; j += 1 ) {
							developer_filter_condition = (result[2][i][j].toLowerCase().includes(developer_filter.toLowerCase()));
							if (developer_filter_condition) {
								break;
							}
						}
						let platform_filter_condition;
	
						for ( let j = 0; j < result[3][i].length; j += 1 ) {
							platform_filter_condition = (result[3][i][j].toLowerCase().includes(platform_filter.toLowerCase()));
							if (platform_filter_condition) {
								break;
							}
						}
	
						 if (game_name_filter_condition && publisher_filter_condition && developer_filter_condition && platform_filter_condition) {
	
							gamesName.push(result[0][i]);
							newCollectionOfGameSctpID.push(collectionOfGameSctpID[i]);
	
							publishersName.push(result[1][i]);
							newCollectionOfPublisherSctpID.push(collectionOfPublisherSctpID[i]);
	
							developersName.push(result[2][i]);
							newCollectionOfDeveloperSctpID.push(collectionOfDeveloperSctpID[i]);
	
							platformsName.push(result[3][i]);
							newCollectionOfPlatformSctpID.push(collectionOfPlatformSctpID[i]);
					 }
					}
					self._configurateTable(gamesName,publishersName, developersName, platformsName, newCollectionOfGameSctpID, newCollectionOfPublisherSctpID, newCollectionOfDeveloperSctpID, newCollectionOfPlatformSctpID,  container);
				},500)
			},2200)
			
	
		})
	}

	
Example.PaintPanel = function (containerId) {
    this.containerId = containerId;
};

Example.PaintPanel.prototype = {

    init: function () {
        this._initMarkup(this.containerId);
    },

    _initMarkup: function (containerId) {
        var container = $('#' + containerId);

        var self = this;
				container.append(`
				<div class = "">
					Дополнительные настройки поиска
					<br>
					<p>
						<select class = "select_genre" onchange="change_genre(this.value);">
							<option value = "concept_computer_game">Любой жанр</option>
							<option value = "concept_MOBA" >MOBA</option>
							<option value = "concept_horror" >horror</option>
							<option value = "concept_MMORPG" >MMORPG</option>
						</select>
						<input type = "text" id = "publisher_filter" placeholder = "Фильтр издателя">
						<input type = "text" id = "developer_filter" placeholder = "Фильтр разработчика">
						<input type = "text" id = "platform_filter" placeholder = "Фильтр платформы">
					</p>
				</div>`
			);
		
		container.append('<div><input type = "text" id = "search_text_field" placeholder = "Введите название игры" display:inline-block> <button id = "find_by_text" type = "button" display:inline-block>FIND</button></div>');
		setStyles(container);


		SCWeb.core.Server.resolveScAddr(['ui_menu_na_keynodes'], function (keynodes) {
			$('#moveToNavigationNode').attr("sc_addr", keynodes['ui_menu_na_keynodes']);
		});

	
		$('#find_by_text').click(function () {
			find(self, container);
		});
	},

	_configurateTable: function(array_of_game_names,array_of_publishers, array_of_developers, array_of_platforms, collectionOfGameSctpID, publishersSctpID, DeveloperSctpID, PlatformSctpID, container){
		console.log("Составляем таблицу");

		if(container[0].lastChild === document.getElementsByTagName("table")[0]){
			console.log(`не первый раз`);
			container[0].lastChild.remove();
		}

		let insertIntoTable = `<tr><th onclick="sortTable(0)">название игры</th><th onclick="sortTable(1)">издатель</th><th onclick="sortTable(2)">разработчик</th><th onclick="sortTable(3)">платформа</th></tr>`;

	

		for(let i = 0; i < array_of_game_names.length; i += 1 ) { 
			console.log("получили массив,размером = " + array_of_publishers[i].length);		
			insertIntoTable += '<tr style = "border: 1px solid black">';
			insertIntoTable +=`<td style = "border: 1px solid black"><a href = "${collectionOfGameSctpID[i]}" class = "link_internal"> ${array_of_game_names[i]}</a></td>`;
			
			insertIntoTable +=`<td style = "border: 1px solid black">`;
			for(let j = 0; j < array_of_publishers[i].length; j += 1) {
				insertIntoTable +=`<a href = "${publishersSctpID[i][j]}" class = "link_internal"> ${array_of_publishers[i][j]}</a>`;
			}
			insertIntoTable +=`</td>`;

			insertIntoTable +=`<td style = "border: 1px solid black">`;
			for(let j = 0; j < array_of_developers[i].length; j += 1) {
				insertIntoTable +=`<a href = "${DeveloperSctpID[i][j]}" class = "link_internal"> ${array_of_developers[i][j]}</a>`;
			}
			insertIntoTable +=`</td>`;

			insertIntoTable +=`<td style = "border: 1px solid black">`;
			for(let j = 0; j < array_of_platforms[i].length; j += 1) {
				insertIntoTable +=`<a href = "${PlatformSctpID[i][j]}" class = "link_internal"> ${array_of_platforms[i][j]}</a>`;
			}
			insertIntoTable +=`</td>`;

			insertIntoTable +='</tr>';
		}
		container.append('<table id = "table" style = "border: 1px solid black  border-collapse: collapse">' + insertIntoTable + '</table>');
		_initLinks();
		return true;
	},

	_getName: function(array_of_sctp_ID){

		let nameArray = [];

		let main_menu_addr, nrel_main_idtf_addr;

		let promise = new Promise(function(resolve, reject) {

			SCWeb.core.Server.resolveScAddr(['nrel_main_idtf'], function (keynodes) {
			
				if ( Array.isArray(array_of_sctp_ID[0] )) {

					console.log("это двумерный массив");

					setTimeout(function(){
					let flagOfEnd = false;
					for( let i = 0; i < array_of_sctp_ID.length; i += 1 ) {
						nrel_main_idtf_addr = keynodes['nrel_main_idtf'];
						nameArray[i] = [];
						let j = 0;
						console.log(array_of_sctp_ID[i]);
						console.log("size = " + array_of_sctp_ID[i].length);
						for( j = 0; j < array_of_sctp_ID[i].length; j += 1 ) {
							console.log("jt = " + j);
							main_menu_addr = array_of_sctp_ID[i][j];

							window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_F, [
								main_menu_addr,
								sc_type_arc_common | sc_type_const,
								sc_type_link,
								sc_type_arc_pos_const_perm,
								nrel_main_idtf_addr])
								.done(function(identifiers){	 
									window.sctpClient.get_link_content(identifiers[0][2],'string').done(function(content){
										nameArray[i].push(content);
									})
					 
							 });
						
							 if (j === array_of_sctp_ID[i].length - 1 ) {
								 flagOfEnd = true;
							 }
						}
						if ( i === array_of_sctp_ID.length - 1) {
							console.log("it is the end of i ");
							 if (flagOfEnd) {
								console.log("it is the end of j ");
								console.log("Вернули такой массив имен; " + nameArray.length);
								 resolve(nameArray);
							 }
					 }

					 flagOfEnd = false;
					}

				},800)
				} else {
					console.log("это одномерный массив");
					for( let i = 0; i < array_of_sctp_ID.length; i += 1 ) {

						main_menu_addr = array_of_sctp_ID[i];
						nrel_main_idtf_addr = keynodes['nrel_main_idtf'];
	
						window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_F, [
							 main_menu_addr,
							 sc_type_arc_common | sc_type_const,
							 sc_type_link,
							 sc_type_arc_pos_const_perm,
							 nrel_main_idtf_addr])
						.done(function(identifiers){	 
							 window.sctpClient.get_link_content(identifiers[0][2],'string').done(function(content){
								 nameArray[i] = content;
							 })
				
						});
						if ( i === array_of_sctp_ID.length - 1) {
							resolve(nameArray);
						}
					}
				}
				
			});
		});
		return promise;
	},

	_platform: function(array_of_games_SCTP_ID) {
		
		let platformsSctpID = [];
		let promise = new Promise(function(resolve, reject) {
			SCWeb.core.Server.resolveScAddr(['nrel_platform'], function (keynodes) {

				let platform_nrel = keynodes['nrel_platform'];
				
	
				for( let i = 0; i < array_of_games_SCTP_ID.length; i += 1 ) {
					
					platformsSctpID[i] = [];
				
					let main_menu_addr = array_of_games_SCTP_ID[i];
					window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_F, [
						main_menu_addr,
						sc_type_arc_common | sc_type_const,
						sc_type_node | sc_type_const,/// платформа
						sc_type_arc_access | sc_type_const | sc_type_arc_pos | sc_type_arc_perm,
						platform_nrel])
					.done(function(identifiers){
						for (let j = 0; j < identifiers.length; j += 1 ) {
							platformsSctpID[i][j] = identifiers[j][2];
						}
						if(platformsSctpID.length ===  array_of_games_SCTP_ID.length ){
							resolve(platformsSctpID);
						} else if (identifiers.length === 0){
							reject("netu izdatelya")
						}
					})
				}
			});
		});
		return promise;
	}, 

	_developer: function(array_of_games_SCTP_ID){
		let developersSctpID = [];
		let promise = new Promise(function(resolve, reject) {
			SCWeb.core.Server.resolveScAddr(['nrel_developer'], function (keynodes) {

				let developer_nrel = keynodes['nrel_developer'];
				
	
				for( let i = 0; i < array_of_games_SCTP_ID.length; i += 1 ) {

					developersSctpID[i] = [];
				
					let main_menu_addr = array_of_games_SCTP_ID[i];
					window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_F, [
						main_menu_addr,
						sc_type_arc_common | sc_type_const,
						sc_type_node | sc_type_const,/// компания-разработчик
						sc_type_arc_access | sc_type_const | sc_type_arc_pos | sc_type_arc_perm,
						developer_nrel])
					.done(function(identifiers){
						for (let j = 0; j < identifiers.length; j += 1 ) {
							developersSctpID[i][j] = identifiers[j][2];
						}
						if(developersSctpID.length ===  array_of_games_SCTP_ID.length ){
							resolve(developersSctpID);
						} else if (identifiers.length === 0){
							reject("netu izdatelya")
						}
					})
				}
			});
		});
		return promise;

	},

	_publishers: function(array_of_games_SCTP_ID){
		let publishersSctpID = [];
		let promise = new Promise(function(resolve, reject) {
			SCWeb.core.Server.resolveScAddr(['nrel_publisher'], function (keynodes) {

				let publisher_nrel = keynodes['nrel_publisher'];
				
	
				for( let i = 0; i < array_of_games_SCTP_ID.length; i += 1 ) {
				
					let main_menu_addr = array_of_games_SCTP_ID[i];
					
					publishersSctpID[i] = [];
	
					window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_F, [
						main_menu_addr,
						sc_type_arc_common | sc_type_const,
						sc_type_node | sc_type_const,/// компания-издатель
						sc_type_arc_access | sc_type_const | sc_type_arc_pos | sc_type_arc_perm,
						publisher_nrel])
					.done(function(identifiers){
						for (let j = 0; j < identifiers.length; j += 1 ) {
							publishersSctpID[i][j] = (identifiers[j][2])
						}
						if(publishersSctpID.length ===  array_of_games_SCTP_ID.length ){
							resolve(publishersSctpID);
						} else if (identifiers.length === 0){
							reject("netu izdatelya")
						}
					})
				}
			});
		});
		return promise;
	
    },
        
	_moba: function() {
		let promise = new Promise(function(resolve, reject) {
			let gGameNamesID = [];
			var main_menu_addr;
			// Resolve sc-addrs.
			SCWeb.core.Server.resolveScAddr([selected_genre], function (keynodes) {
				main_menu_addr = keynodes[selected_genre];
	
				// Resolve sc-addr of ui_menu_view_full_semantic_neighborhood node
				window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_3F_A_A, [
					 main_menu_addr,
					 sc_type_arc_access | sc_type_const | sc_type_arc_pos | sc_type_arc_perm,
					 sc_type_node | sc_type_const | sc_type_node_class])
				.done(function(identifiers){

					for ( let i = 0; i < identifiers.length; i++ ) {
						gGameNamesID.push(identifiers[i][2]);
					}	
				
					if ( gGameNamesID.length === identifiers.length){

                        resolve(gGameNamesID);
                        
					} else if (gGameNamesID.length) { 

                        reject("not found");
                        
					}
				});
			});
		});
		return promise;
	}
};