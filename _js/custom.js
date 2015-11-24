// Parralax Scrolling Stuff
$('div[data-type="background"]').each(function () {
	"use strict";
	var $bgobj = $(this);
	
	$(window).scroll(function(){
		var yPos = -($(window).scrollTop() / $bgobj.data('speed'));
		var coords = '50% ' + yPos + 'px';
		$bgobj.css({backgroundPosition: coords});
	});
});
// Moz Form Ajax
$('#moz-form').on('submit', function(){
	"use strict";
	$.ajax({
		data: {
			action: "moz_api",
			data: $("#domain").val()
			},
		dataType: 'json',
		type: 'POST',
		method: 'POST',
		url: ajax_object.ajaxurl,
		success: function(response){
			$('#result').html(
			
			'<ul><li><b>Page Title:</b> '+response[0].ut+"</li>"+
			'<li><b>Canonical URL:</b> '+response[0].uu+"</li>"+
			'<li><b>External Link Equity:</b> '+response[0].ueid+"</li>"+
			'<li><b>Moz Rank for the URL:</b> '+response[0].umrp.toFixed()+"</li>"+
			'<li><b>Page Authority:</b> '+response[0].upa.toFixed()+"</li>"+
			'<li><b>Domain Authority:</b> '+response[0].pda.toFixed()+"</li>"+
			'<li><b>Date Last Crawled:</b> '+Date(time)+"</li></ul>"
			).show();
			var time = response[0].ulc;
			console.log(response[0]);
		},
		 error: function(jqXHR, textStatus, errorThrown) 
          {
          $("#result").html('<pre><code class="prettyprint">AJAX Request Failed<br/> textStatus='+textStatus+', errorThrown='+errorThrown+'</code></pre>');
          }
	});
	return false;
});
$("#hide-result").on('click', function(){
	"use strict";
	$('#result').hide();
});

// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-60811148-1', 'auto');
  ga('send', 'pageview');

// Twitter Feed
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");