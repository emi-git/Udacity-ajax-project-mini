function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var googleStreetViewImageAPIKEY = 'AIzaSyB5Zusczf03RjQryWwOlHxboT0FKawmB7k';
    var NYSearchArticleAPIKEY = '376f99e151a14628be472f37e34a6956';
    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    if (!streetStr || !cityStr) {
        streetStr = "30 rockefeller center",
            cityStr = "new york city, ny"
    }
    var address = streetStr + ', ' + cityStr;
    $greeting.text('So, you want to live at ' + address + '?');

    var url = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&';
    var locationFilter = 'location=' + address;
    url = url + locationFilter;
    // url = url + '&key=' + googleStreetViewImageAPIKEY;
    var newImg = $(document.createElement('img'))
        .attr({ src: url })
        .addClass("bgimg")
    $body.append(newImg);

    // Your NYTimes AJAX request goes HERE

    var NYSearchArticleURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    NYSearchArticleURL += '?' + $.param({
        'api-key': NYSearchArticleAPIKEY,
        'q': "China",
        'sort': "newest",
        'page': 0
    });
    $.getJSON(NYSearchArticleURL, function(data) {
        var docs = data.response.docs;
        var items = [];
        $.each(docs, function(index, doc) {
            var articleEle = $(document.createElement('li')).addClass("article");
            var articleA = $(document.createElement('a'))
                .attr({ href: doc.web_url })
                .text(doc.headline.main);
            var articleP = $(document.createElement('p'))
                .text(doc.snippet);
            articleEle.append(articleA, articleP);
            items.push(articleEle);
        });
        $("#nytimes-articles").append(items); //.join("")
    }).fail(function(err) {
        $("#nytimes-articles").append($(document.createElement("h1")).text("New York Times Articles Could Not Be Loaded"));
    });

    //Wikipedia API call goes here!
    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback'; //with or without the callback=wikiCallback are all ok, why

    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);
    $.ajax({
        url: wikiUrl,
        dataType: 'jsonp',
        success: function(response) {
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en/wikipedia.prg/wiki/' + articleStr;
                $wikiElem.append(
                    $(document.createElement('li')).append(
                        $(document.createElement('a'))
                        .attr({ href: url })
                        .text(articleStr)
                    )
                );
            }
            clearTimeout(wikiRequestTimeout);
        }
    })

    function onWikiJSONPLoad() {

    };

    return false;
};

$('#form-container').submit(loadData);