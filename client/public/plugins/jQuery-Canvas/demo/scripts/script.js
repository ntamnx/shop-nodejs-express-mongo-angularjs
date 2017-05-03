$(document).ready(function() {
    var options = {
        height: "300px",
                width: "300px",
        line_width: 12,
        color: "#48CFAD",
        starting_position: 25,
        percent: 25,
        text: "percent"
    }
    var progress_circle = $("#progress-circle").gmpc(options);
    progress_circle.gmpc('animate', 60, 3000);
});
