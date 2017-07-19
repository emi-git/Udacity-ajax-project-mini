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
    var address = streetStr + ', ' + cityStr;
    $greeting.text('So, you want to live at ' + address + '?');
    // YOUR CODE GOES HERE!
    var url = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&';
    var locationFilter = 'location=' + address;
    url = url + locationFilter;
    // url = url + '&key=' + googleStreetViewImageAPIKEY;
    var newImg = $(document.createElement('img'))
        .attr({ src: url })
        .addClass("bgimg")
    $body.append(newImg);

    // Your NYTimes AJAX request goes HERE
    $.getJSON();
    var NYSearchArticleURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    NYSearchArticleURL += '?' + $.param({
        'api-key': "376f99e151a14628be472f37e34a6956"
    });
    $.ajax({
        url: NYSearchArticleURL,
        method: 'GET',
    }).done(function(result) {
        console.log(result);
    }).fail(function(err) {
        throw err;
    });

    return false;
};

$('#form-container').submit(loadData);