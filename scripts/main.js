var currentMode;


(function(){
	var t = $.now();
	if(window.console == null) window.console = {"log" : $.noop};
	var isDev = window.location.host == "localhost";
	
	
	var deferred_load = $.get("searchbar.html");
	
	$.ajaxSetup({ 
		dataType: "json",
		traditional: true
	});
	
	$.ajaxPrefilter('json', function(options, orig, jqXHR) {
	    if (options.crossDomain && !$.support.cors) return 'jsonp';
	});
	
	var deferred_sm = $.Deferred(function( dfd ){
		$.sm("korp_statemachine.xml", dfd.resolve);
	}).promise();
	
	
	var deferred_domReady = $.Deferred(function( dfd ){
		$(dfd.resolve);
	}).promise();
	
	var deferred_mode = $.Deferred();
	if($.deparam.querystring().mode != null && $.deparam.querystring().mode != "default") {
		deferred_mode = $.getScript($.format("modes/%s_mode.js", $.deparam.querystring().mode));
	} else {
		deferred_mode.resolve();
	}
	
    var chained = deferred_mode.pipe(function() {
        return $.ajax({
			url : settings.cgi_script,
			data : {
				command : "info",
				corpus : $.map($.keys(settings.corpora), function(item) {
					return item.toUpperCase();
				}).join(),
				log : 1
			}
		});
    });

	chained.done(function( info_data ) {
		$.each(settings.corpora, function(key){
			settings.corpora[key]["info"] = info_data["corpora"][key.toUpperCase()]["info"];
		});
	});
	
	$.when(deferred_load, chained, deferred_domReady, deferred_sm, deferred_mode).then(function(searchbar_html) {
		$.revision = parseInt("$Rev$".split(" ")[1]);
		$.log("preloading done, t = ", $.now() - t);
		currentMode = $.deparam.querystring().mode || "default";
		util.browserWarn();
		
		$("#mode_switch").radioList({
            change : function() {
            	$.log("changed", this);
            	var mode = $(this).data("mode");
    			$.bbq.removeState("corpus");
    			if(mode == "default") {
    				location.search = "";
    			} else {
    				location.search = "?mode=" + mode;
    			}
            },
            selected : $($.format("a[data-mode=%s]", currentMode)).index()
		}).add("#about").vAlign();
		
		$("#searchbar").html(searchbar_html[0]);
		
		$("#search_history").change(function(event) {
			$.log("select", $(this).find(":selected"));
			location.href = $(this).find(":selected").val();
		});

		loadCorpora();
		
		$.sm.start();
		var tab_a_selector = 'ul.ui-tabs-nav a';
		
		$("#search-tab").tabs({
			event : "change",
			show : function(event, ui) {
				if($("#columns").position().top > 0)
					$("#sidebar").sidebar("updatePlacement"); //place sidebar
				var selected = $(ui.panel).attr("id").split("-")[1];
				$.sm.send("searchtab." + selected);
			}
		});
		$("#result-container").korptabs({
			event : "change",
			show : function(event, ui) {
				if($(ui.tab).parent().is(".custom_tab")) {
					$.sm.send("resultstab.custom");
				} else {
					var currentId = $(ui.panel).attr("id");
//					//				if(currentId == null) return;
					var selected = currentId.split("-")[1];
//					if($("#sidebar").is(":hidden"))
//						$("#rightStatsTable").css({"width": $("#content").innerWidth() - ($("#leftStatsTable").width() + 50)});
//					else {
//						$("#rightStatsTable").css("width", $("#content").innerWidth() - ($("#leftStatsTable").width() +500));
//						$("#rightStatsTable").animate({"width": $("#content").innerWidth() - ($("#leftStatsTable").width() + 50)});
//					}
					$.sm.send("resultstab." + selected);
				}
			},
			panelTemplate : "<div>" + kwicResults.initHTML + "</div>",
			tabTemplate : '<li class="custom_tab"><a class="custom_anchor" href="#{href}"><span rel="localize[example]">#{label}</span></a><a class="tabClose" href="#"><span class="ui-icon ui-icon-circle-close"></span></a></li>'
		});
		
		$("#result-container li.ui-state-disabled").live({
			mouseover : function() {
				nTimeout = setTimeout(function() {
					$("#lemgram_select").highlight();
				}, 750);
				
			},
			mouseout : function() {
				if(nTimeout)
					clearTimeout(nTimeout);
				$("#lemgram_select").highlight("abort");
			}
		});
		
		var tabs = $(".ui-tabs");
		tabs.find(tab_a_selector).click(function() {
			if($(this).parent().is(".ui-state-disabled")) return;
			var state = {},
			id = $(this).closest( '.ui-tabs' ).attr( 'id' ),
			// Get the index of this tab.
			idx = $(this).parent().prevAll().length;
			
			// Set the state!
			state[ id ] = idx;
			$.bbq.pushState( state );
			return false;
		});
		
		$(".custom_anchor").live("mouseup", function() {
			$.log("custom click");
			$.bbq.removeState("result-container");
			$(this).triggerHandler( 'change' );
		});
		
		function onHashChange(event, isInit) {
			var prevFragment = $.bbq.prevFragment || {};
			var e = $.bbq;
			function hasChanged(key) {
				return prevFragment[key] != e.getState(key);
			}
			
			var hpp = e.getState("hpp", true);
			if(hpp)
				kwicResults.$result.find(".num_hits").val(hpp);
			if(!isInit && hasChanged("hpp")) {
				kwicResults.handlePaginationClick(0, null, true);
			}
			
			if(hasChanged("lang")) {
				util.localize();
			}
				
			
			var page = e.getState("page", true);
			if(hasChanged("page") && !hasChanged("search")) {
				kwicResults.setPage(page);
			}
			
			var sort = e.getState("sort");
			if(isInit && sort) {
				kwicResults.$result.find(".sort_select").val(sort);
			}
			if(!isInit && hasChanged("sort")) {
				kwicResults.handlePaginationClick(0, null, true);
			}
			
			if(isInit) {
				kwicResults.current_page = page;
			}
			
			var corpus = e.getState("corpus");
			if (corpus && corpus.length != 0 && corpus != prevFragment["corpus"]){
				var corp_array = corpus.split(',');
				var processed_corp_array = Array();
				$.each(corp_array, function(key, val) {
				    processed_corp_array.extend(getAllCorporaInFolders(settings.corporafolders, val));
				});
				
				corpusChooserInstance.corpusChooser("selectItems", processed_corp_array);
				$("#select_corpus").val(corpus);
				simpleSearch.enableSubmit();
			}
			
			function getAllCorporaInFolders(lastLevel, folderOrCorpus) {
			    var outCorpora = Array();
			    
			    // Go down the alley to the last subfolder
			    while(folderOrCorpus.contains(".")) {
			         var posOfPeriod = folderOrCorpus.indexOf(".");
			         var leftPart = folderOrCorpus.substr(0, posOfPeriod);
			         var rightPart = folderOrCorpus.substr(posOfPeriod+1);
			         if(lastLevel[leftPart]) {
			             lastLevel = lastLevel[leftPart];
			             folderOrCorpus = rightPart;
			         } else {
			             break;   
			         }
			    }
			    
			    if (lastLevel[folderOrCorpus]) {
			        // Folder
			        // Continue to go through any subfolders
			        $.each(lastLevel[folderOrCorpus], function(key, val) {
			            if(key != "title" && key != "contents" && key != "description")
			                outCorpora.extend(getAllCorporaInFolders(lastLevel[folderOrCorpus], key));
			        });
			        // And add the corpora in this folder level
			        outCorpora.extend(lastLevel[folderOrCorpus]["contents"]);
			    } else {
                    // Corpus
                    outCorpora.push(folderOrCorpus);
			    }
			    return outCorpora;
			}
			
			function showAbout() {
				$("#about_content").dialog({
					beforeClose : function() {
						$.bbq.removeState("display");
						return false;
					}
				}).css("opacity", 0);
				$("#ui-dialog-title-about_content").attr("rel", "localize[about]");
				$("#about_content").fadeTo(400,1);
				$("#about_content").find("a").blur(); // Prevents the focus of the first link in the "dialog"
			}
			
			if(e.getState("display") == "about") {
				if($("#about_content").is(":empty")) {
					$("#about_content").load("about.html", function() {
						$("#revision").text($.revision);
						showAbout();
					});
				} else {
					showAbout();
				}
				
			} else  {
				$("#about_content").closest(".ui-dialog").fadeTo(400, 0, function() {
					$("#about_content").dialog("destroy");
				});
			}
			
			tabs.each(function() {
				var idx = e.getState( this.id, true );
				if(idx === null) return;
				$(this).find( tab_a_selector ).eq( idx ).triggerHandler( 'change' );
			});
			
			var search = e.getState("search");
			if(search != null && search !== prevFragment["search"]) {
				kwicResults.current_page = page || 0;
				var type = search.split("|")[0];
				var value = search.split("|").slice(1).join("|");
				
				view.updateSearchHistory(value);
				
				switch(type) {
				case "word":
					$("#simple_text").val(value);
					simpleSearch.onSimpleChange();
					simpleSearch.setPlaceholder(null, null);
					simpleSearch.makeLemgramSelect();
					$.sm.send("submit.kwic", {value : value, page : page});
					break;
				case "lemgram":
					$.sm.send("submit.lemgram", {value : value, page : page});
					break;
				case "saldo":
					extendedSearch.setOneToken("saldo", value);
					$.sm.send("submit.kwic", {value : value, page : page});
					break;
				case "cqp":
					advancedSearch.setCQP(value);
					$.sm.send("submit.kwic", {value : value, page : page});
					break;
				}
			}
			
			$.bbq.prevFragment = $.deparam.fragment();
		}
		$(window).bind( 'hashchange', onHashChange);
		
		$(window).scroll(function() {
			$("#sidebar").sidebar("updatePlacement");
		});
		
		//setup about link
		$("#about").click(function() {
			if($.bbq.getState("display") == null) {
				$.bbq.pushState({display : "about"});
			} else {
				$.bbq.removeState("display");
			}
		});
		
		$("#languages").radioList({
			change : function() {
//				util.localize();
				$.bbq.pushState({lang : $(this).radioList("getSelected").data("lang")});
			}  
		}).vAlign();
		
		
		$("#sidebar").sidebar().sidebar("hide");
		
		$("#simple_text")[0].focus();
		
		$(document).click(function() {
			$("#simple_text").autocomplete("close");
		});
		
//		util.localize();
		onHashChange(null, true);
		$("body").fadeTo(400, 1, function() {
			$(this).css("opacity", "");
		});
		view.updateSearchHistory();
	});


})();


