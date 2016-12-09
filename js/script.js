/**
 * Created by Manish Bisht on 7/5/2016.
 */
$(document).ready(function () {
    var resume = "https://drive.google.com/file/d/0BzRzoZj__GxWeUUtQ1dWMmVJNEE";
    document.getElementById('resume-link').href = resume;
    var currentTime = new Date()
    $("#copyright-year").text(currentTime.getFullYear());
});