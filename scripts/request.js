var current_page = 0;
var num_result = 0;

function handlePaginationClick(new_page_index, pagination_container) {
	if(new_page_index != current_page){
		var items_per_page = parseInt($("#num_hits").val());
		
		var cqp 	= $("#Pagination").data("cqp");
		var corpus 	= getCorpus().toUpperCase();
		
		var start 	= new_page_index*items_per_page;
		var end 		= (start + items_per_page);
		$.log("make request", cqp, corpus, start, end);		
		makeRequest(cqp, corpus, start, end);
		current_page = new_page_index;
	}
    
   return false;
}

function makeRequest(cqp, corpus, start, end){
	var selected_corpus = settings.corpora[getCorpus()];
	var attributes = ['msd','lemma'];

	var data = {};
	
	if(corpus == 'ALL'){
		
		data =	{
				command:'query',
				corpus:getAllCorpora(),
				cqp:cqp,
				start:start,
				end:end,
				context:'1 sentence',
				show:[],
				show_struct:[]  
			};		
	}else{
			data =	{
					command:'query',
					corpus:corpus,
					cqp:cqp,
					start:start,
					end:end,
					context:'1 sentence',
					show:[],
					show_struct:[]  
				};
	}

	$.each(selected_corpus.attributes, function(key,val){
		data.show.push(key);
	});
	

	if (selected_corpus.struct_attributes) {
		$.each(selected_corpus.struct_attributes, function(key,val){
			data.show_struct.push(key);
		});
	}
	$("#Pagination").data("cqp", cqp);
	$.ajax({ url: settings.cgi_script, 
				dataType: "jsonp", 
				data:data,
				success: corpus_results
	});
	
	setJsonLink(data);
}

function setJsonLink(data){
	
	var url = settings.cgi_script+'?'+jQuery.param(data);
	$('#json-link').attr('href', url);
	$('#json-link').css('display', 'inline');
}

function onSubmit(evt) {
	var currentVisible = $("#tabs-container > div:visible");
	
	$.log("onSubmit", currentVisible);
	switch(currentVisible.attr("id")) {
	case "korp-simple":
		$.log("simple", simplesearch);
		onSimpleChange();
		
		// clear the simple search from previous lemgram search result widgets
		$("#result-container").tabs("option", "disabled", [2]);
		$("#lemgram_select").remove();
		$("#similar_lemgrams").empty();
		
		$.log("after simple", simplesearch);
		break;
	case "korp-extended":
		updateCQP();
		break;
//	case "korp-advanced":
//		break;
	}
	submitFormToServer();
}

function submitFormToServer(cqp){
	num_result = 0;
//	TODO: loading text broken
//	$('#results').append("<p alt='localize[loading]'/>").find("p");
	
	cqp 	= cqp || $("#cqp_string").val();
	var corpus 	= getCorpus().toUpperCase();
	
	var start 	= 0;
	var end 	= $("#num_hits").val()-1;
		
	makeRequest(cqp, corpus, start, end);
	
}

function buildPager(number_of_hits){
	var items_per_page = $("#num_hits").val();
	if(number_of_hits > items_per_page){
		$("#Pagination").pagination(number_of_hits, {
			items_per_page:items_per_page, 
			callback:handlePaginationClick,
			next_text: util.getLocaleString("next"),
			prev_text: util.getLocaleString("prev"),
			link_to:"javascript:void(0)",
			num_edge_entries:2,
			ellipse_text: '..'
		});
		$(".next").attr("rel", "localize[next]");
		$(".prev").attr("rel", "localize[prev]");
		
	}else{
		$("#Pagination").html('');
	}
}

function selectLeft(sentence, offset) {
	return sentence.tokens.slice(offset, sentence.match.start);
}

function selectMatch(sentence) {
	var from = sentence.match.start;
	return sentence.tokens.slice(from, sentence.match.end);
}

function selectRight(sentence) {
	var from = sentence.match.end;
	var len=sentence.tokens.length;

	var to = len;
//	if((len-sentence.match.end) > 12)
//		to = sentence.match.end+12;
	
	return sentence.tokens.slice(sentence.match.end, to);
}


function corpus_results(data) {
	if(data.ERROR) {
		$.error("json fetch error: " + $.dump(data.ERROR));
		return;
	} 
	if(!num_result) {
		buildPager(data.hits);
	}
	num_result = data.hits;
	$('#num-result').html(data.hits);
	if(!data.hits) {
		$.log("no kwic results");
		$("#results-table").empty();
		$("#Pagination").empty();
		return;
	}
	var effectSpeed = 100;
//	$('#results').find("p").remove();
	$.log("if", $.trim($("#results-table").html()).length, $("#results-table").children.length);
	if($.trim($("#results-table").html()).length) {
		$("#results").fadeOut(effectSpeed, function() {
			$("#results-table").empty();
			corpus_results(data);
		});
		return;
	}
	else {
		$("#results").hide();
	}
	if($("#sidebar").css("right") == "0px" && !$("#result-container").tabs("option", "selected"))
		showSidebar();
	$.log("corpus_results");
	
	var corpus = settings.corpora[getCorpus()];
	
	
	
	$.each(data.kwic, function(i,sentence){
		var offset = 0; 
//		if(sentence.match.start > 12)
//			offset = sentence.match.start-12;
	    var splitObj = {
	    		"left" : selectLeft(sentence, offset),
	    		"match" : selectMatch(sentence),
	    		"right" : selectRight(sentence)
	    };
	    
		$( "#sentenceTmpl" ).tmpl( splitObj, {rowIndex : i})
				.appendTo( "#results-table" )
				.find(".word")
				.click(
						function(event) {
							event.stopPropagation();
							util.SelectionManager.select($(this));
							var clickedWord = parseInt($(this).attr("name").split("-")[1]);
							var data = sentence.tokens[offset + clickedWord];
							updateSidebar(sentence.structs, data, sentence.corpus);
						}
				);
		
		$('.result_table tr:even').addClass('alt');
	});
	$('#results-wraper').show();
//	make the first matched word selected by default.
	$(".match").children().first().click();
	$("#results").fadeIn(effectSpeed);
	
	var matchLeft = $(".match").first().position().left;
	$("#table_scrollarea").scrollLeft(matchLeft - $("#table_scrollarea").innerWidth() / 2);
}
