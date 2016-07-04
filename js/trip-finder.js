 $(function() {

    // INIT - SEARCH VARS
    var finalRegion = "",
        finalRegionLabel = "",
        finalRegionUrl = "",
        finalCountry = "",
        finalCountryLabel = "",
        finalInterest = "",
        finalInterestLabel = "",
        searchURL = "";

    // SET SEARCH BASED ON QUERYSTRING
    if (getQueryString()["startDate"] != "" && getQueryString()["startDate"] != undefined) {

		$('#startDate').val(getQueryString()["startDate"]);

	}

	if (getQueryString()["endDate"] != "" && getQueryString()["endDate"] != undefined) {

		$('#endDate').val(getQueryString()["endDate"]);

	}

    setRegion();

    // SET REGION DROPDOWN
    function setRegion () {

        if (getQueryString()["region"] != "" && getQueryString()["region"] != undefined) {

            finalRegion = getQueryString()["region"];

            finalRegionLabel = $("#" + finalRegion).text();

            $(".js-regions-dropdown-label").text("Region : " + finalRegionLabel);

        }

    }

    // SET COUNTRY DROPDOWN
	if (getQueryString()["country"] != "" && getQueryString()["country"] != undefined) {

		finalCountry = getQueryString()["country"];

        finalCountryLabel = $("#" + finalCountry).text();

        $(".js-countries-dropdown-label").text("Country : " + finalCountryLabel);

	}

    // SET INTEREST DROPDOWN
	if (getQueryString()["interest"] != "" && getQueryString()["interest"] != undefined) {

        finalInterest = getQueryString()["interest"];

        finalInterestLabel = $("#" + finalInterest).text();

        $(".js-interests-dropdown-label").text("Interest : " + finalInterestLabel);

	}

    // INIT - DATE PICKERS
    $(".js-start-date, .js-end-date").datetimepicker({
        lang:'en',
        timepicker:false,
        format:'m/d/Y',
        formatDate:'Y/m/d',
        scrollMonth: false,
        minDate: 0
    });


    // EVENT - DROPDOWN
    $("[js-toggle]").on("click", function(event) {

        event.preventDefault();

        // if (!$(this).hasClass("js-disable-click")) {

            // TURN OFF SCROLLING FOR THE PAGE
            // $("body").toggleClass("overflow-hidden");

            // DISABLE CLICKS ON OTHER DROPDOWNS WHILE THIS IS DROPPED
            // $(this).siblings().toggleClass("js-disable-click");

            // FIND THE TARGET TO DROP
            var toggleWhat = $(this).attr("js-toggle");

            if ( $(toggleWhat).hasClass("js-open") ) {

                $(toggleWhat).toggle().toggleClass("js-open");

            } else {

                $(".js-open").hide().removeClass("js-open");

                $(toggleWhat).toggle().toggleClass("js-open");

            }

        // }

    });

    // EVENT - SELECT REGION
    $("#regions li").on("click", function(event) {

        event.preventDefault();

        // EVENT - SELECTED REGION
        finalRegion = $(this).attr("id");
        finalRegionLabel = $(this).text();
        finalRegionUrl = $(this).attr("trip-finder-link");
        console.log(finalRegionUrl);

        // CLEAR ANY COUNTRIES OR INTERSESTS PREVIOUSLY SELECTED
        finalCountry = "";
        finalCountryLabel = "By Country";
        finalInterest = "";
        finalInterestLabel = "By Interest";

        // SET DROPDOWN TEXT
        $(".js-regions-dropdown-label").text("Region : " + finalRegionLabel);
        $(".js-countries-dropdown-label").text(finalCountryLabel);
        $(".js-interests-dropdown-label").text(finalInterestLabel);

        // SHOW DROPDOWN
        $("#regions").toggle(true);

        // DISABLE OTHER DROPDOWNS
        // $(".js-disable-click").toggleClass("js-disable-click", true);

        // $("[js-toggle='#regions']").find(".fa").toggleClass("fa-times fa-angle-down");

        // TOGGLE BODY SCROLLING
        // $("body").toggleClass("overflow-hidden", true);

        // FILTER COUNTRIES BASED ON REGION
        $("#countries li").show();
        $("#countries li").not("." + finalRegion).hide();

        // FILTER INTERESTS BASED ON REGION
        $("#interests li").show();
        $("#interests li").not("." + finalRegion).hide();

         // SET VAR THAT THIS FILTER IS ACTIVE
         $(".js-region-filter-label").text("Region");
         $(".js-country-filter-label").text("Region");

        // SHOW FILTER
        $("[trip-finder='filter']").show();

    });

    // EVENT - SELECT COUNTRY
    $("#countries li").on("click", function(event) {

        event.preventDefault();

        // CLEAR ANY INTERESTS PREVIOUSLY SELECTED
        finalInterest = "";
        finalInterestLabel = "By Interest";

        // EVENT - SELECTED COUNTRY
        finalCountry = $(this).attr("id");
        finalCountryLabel = $(this).text();

        // SET DROPDOWN TEXT
        $(".js-countries-dropdown-label").text("Country : " + finalCountryLabel);
        $(".js-interests-dropdown-label").text(finalInterestLabel);

        $("#countries").toggle(true);

        // $(".js-disable-click").toggleClass("js-disable-click", true);

        // $("[js-toggle='#countries']").find(".fa").toggleClass("fa-times fa-angle-down");

        // $("body").toggleClass("overflow-hidden", true);

        // FILTER INTERESTS BASED ON COUNTRY
        $("#interests li").show();
        $("#interests li").not("." + finalCountry).hide();

         // SET VAR THAT THIS FILTER IS ACTIVE
         $(".js-country-filter-label").text("Country");

        // SHOW FILTER
        $("[trip-finder='filter']").show();

    });

    // // EVENT - SELECT INTEREST
    $("#interests li").on("click", function(event) {

        event.preventDefault();

        // EVENT - SELECTED INTEREST
        finalInterest = $(this).attr("id");
        finalInterestLabel = $(this).text();

        // SET DROPDOWN TEXT
        $(".js-interests-dropdown-label").text("Interest : " + finalInterestLabel);

        $("#interests").toggle(true);

        // $(".js-disable-click").toggleClass("js-disable-click", true);

        // $("[js-toggle='#interests']").find(".fa").toggleClass("fa-angle-down fa-times");

        // $("body").toggleClass("overflow-hidden", true);

    });

    // EVENT - CLEAR FILTER
    $(".js-filter-reset").on("click", function(event) {

        event.stopPropagation();

        $("[trip-finder='filter']").hide();

        $("#interests li, #countries li").show();

        finalRegion = "";
        finalCountry = "";

        $(".js-regions-dropdown-label").text("By Region");

        $(".js-countries-dropdown-label").text("By Country");

    });

    // EVENT - SUBMIT BUTTON
    $(".js-search-button").click(function(event) {

        event.preventDefault();

        var finalStartDate = "";
        var finalEndDate = "";

        if ($('.js-start-date').val() != "Start Date") {
            finalStartDate = encodeURI($('.js-start-date').val())
        }

        if ($('.js-end-date').val() != "End Date") {
            finalEndDate = encodeURI($('.js-end-date').val())
        }

        // Direct Link to Specific Pages - For All Regions and Custom Interest
        if (finalInterest === "custom" && finalEndDate == "" && finalStartDate == "" && finalCountry == "" && finalRegion == "") {

            var directLink = $("#custom").find("a").attr("href");

            window.location.href = directLink

        } else if (finalRegion != "" && finalEndDate == "" && finalStartDate == "" && finalCountry == "" && finalInterest == "") {

            var directLink = finalRegionUrl;

            window.location.href = directLink

        } else {

            window.location.href = "/search/?region=" + finalRegion + "&country=" + finalCountry + "&interest=" + finalInterest + "&startDate=" + finalStartDate + "&endDate=" +  finalEndDate;

        }

    });

});


function getQueryString() {

    var result = {}, queryString = location.search.substring(1),
        re = /([^&=]+)=([^&]*)/g, m;
    while (m = re.exec(queryString)) {
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return result;

}


$(window).load(function() {


    // SCRIPT FOR SCREENS LARGER THAN 1024px
    if ($(window).width() > 1025) {

        if (!$("[am-trip-finder='stage']").parent().hasClass("js-home")) {

            $("[am-trip-finder~='stage']").stick_in_parent();

        }

    }

});