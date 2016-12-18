/**
 * Created by Manish Bisht on 7/5/2016.
 */
$(document).ready(function () {
    var resume = "http://goo.gl/Rro9Sk";
    document.getElementById('resume-link').href = resume;
    var currentTime = new Date()
    $("#copyright-year").text(currentTime.getFullYear());
});