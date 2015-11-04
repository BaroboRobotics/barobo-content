// FIXME code duplication--make our own little library of useful functions
function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

var redRobotParam = GetURLParameter('redRobot');
var blueRobotParam = GetURLParameter('blueRobot');

$(function () {

// If we got robot IDs through GET parameters, pass them on to other Next/Back
// buttons.

if (typeof redRobotParam !== 'undefined' && typeof blueRobotParam !== 'undefined') {
    $('.page-navigation').each(function () {
        $(this).click(function () {
            var href = $(this).attr('href');
            href = href + "?redRobot=" + redRobotParam
                 + "&blueRobot=" + blueRobotParam;
            $(this).attr('href', href);
        });
    });

    // Also pass it to any hidden form inputs. This is a bit hacky, being
    // only used on prediction.html and setup.html.
    $('input[name=redRobot]').attr('value', redRobotParam);
    $('input[name=blueRobot]').attr('value', blueRobotParam);
}



});
