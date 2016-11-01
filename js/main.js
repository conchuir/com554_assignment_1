// JS for tabs and menu bar
// Clears selected menu items
function clear_selection() {
    var list_items = document.getElementsByTagName('nav')[0].children[0].children;
    for(var i=1; i<list_items.length; i++) {
        list_items[i].className = "";
    }
}

// Marks menu item as selected - triggered by onclcick event
function select(element)   {
    clear_selection();
    element.className = "selected";
    document.title = "VIM - " + element.innerHTML;
}

// Adapted from https://codepen.io/cssjockey/pen/jGzuK
$(document).ready(function(){
    $('ul.tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');
        select(this);
        $("#"+tab_id).addClass('current');
    })
})

// --------------------------------------------------------
// Specific JS for contact form
// Validate data is present before sending
function checkSubmit()   {
    if (document.getElementById('name').value == null || document.getElementById('name').value == "") {
        alert("Name field is required");
        return false;
    }
    if (document.getElementById('email').value == null || document.getElementById('email').value == "") {
        alert("Email field is required");
        return false;
    }
    if (document.getElementById('subject').value == null || document.getElementById('subject').value == "") {
        alert("Subject field is required");
        return false;
    }
    if (document.getElementById('message').value == null || document.getElementById('message').value == "") {
        alert("Message field is required");
        return false;
    }
    return true;
}

// Submit data (runs checkSubmit first)
function send() {
    if (checkSubmit())  {
        var url = "contact.php?";
        url += "name=";
        url += document.getElementById('name').value;
        url += "&email=";
        url += document.getElementById('email').value;
        url += "&subject=";
        url += document.getElementById('subject').value;
        url += "&message=";
        url += document.getElementById('message').value;
        url = url.replace(/ /g, "%20");
        url += " #response"
        $("#return").load(url);
    }
}

// --------------------------------------------------------
// JS for news feed
// Populate news table from RSS feed
$(document).ready(function(){
    //var rss_url = "https://groups.google.com/forum/feed/vim_announce/msgs/rss.xml"
    // Google prevent other websites from loading this data so a local copy will be used
    var rss_url = "docs/rss.xml"
    $.get(rss_url, function (data) {
        var i = 0;
        $(data).find("item").each(function () {
            var item = $(this);
            var table = document.getElementById("news_table");
            var cell1 = table.insertRow(i).insertCell(0);
            var cell2 = table.insertRow(i+1).insertCell(0);
            cell1.innerHTML = "<h3 class=\"tooltip\"><a href="+item.find("link").text()+">"+item.find("title").text()+"</a><span class=\"tooltiptext\">"+item.find("pubDate").text()+"</span></h3>";
            cell2.innerHTML = "<p>"+item.find("description").text()+"</p>";
            i += 2
        })
    });
});


// --------------------------------------------------------
// JS for quiz
// Make divs invisible on page load
$(document).ready(function(){
    $('#question_2').hide();
    $('#question_3').hide();
    $('#question_4').hide();
    $('#question_5').hide();
    $('#results').hide();
});

// Make divs visible
function show(div_id) {
    $("#"+div_id).show();
}

function calculateResult() {
    resultArr = $('form#quiz').serializeArray();
    var result = 0;
    for(i=0; i<resultArr.length; i++) {
        result += parseInt(resultArr[i].value);
    }
    document.getElementById('results_holder').innerHTML = "<h4>You scored "+result+" out of 5!</h4>"
}

// Humourous alert if certain ansers are selected
function stupidAnswer() {
    alert("Haha. Good one! Try again.");
}


// --------------------------------------------------------
// JS for Accordian
// Adapted from https://css-tricks.com/snippets/jquery/simple-jquery-accordion/
$(document).ready(function($) {
    var allPanels = $('.accordion > dd').hide();
    $('.accordion > dt').click(function() {
        allPanels.slideUp();
        $(this).next().slideDown();
        return false;
    });
});
