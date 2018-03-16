function displayScrape() {
    $.getJSON("/scrape", function (scrape_code) {
        if (scrape_code.code == "success") {
            $.getJSON("/articles", function (data) {
                $("#nyt-0").empty();
                $("#nyt-1").empty();
                $("#nyt-2").empty();
                $("#total-number").text(data.length);
                
                $("#nyt-" + String(i % 3)).append(mainDiv);
                }
            });
        }
   });
}
