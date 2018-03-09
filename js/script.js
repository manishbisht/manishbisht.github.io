/**
 * Created by Manish Bisht on 7/5/2016.
 */
$(document).ready(function () {
    loadMenu();
    loadResumeLink();
    addEmailandNumber();
    loadFooter();
    loadYear();
});

function loadMenu() {
    var menuhtml = '<a class="mdl-navigation__link" href="index">Overview</a>';
    menuhtml += '<a class="mdl-navigation__link" href="skills">Skills</a>';
    menuhtml += '<a class="mdl-navigation__link" href="work-experience">Work Experience</a>';
    menuhtml += '<a class="mdl-navigation__link" href="competitive-programming">Competitive Programming</a>';
    menuhtml += '<a class="mdl-navigation__link" href="open-source">Open Source</a>';
    menuhtml += '<a class="mdl-navigation__link" href="education">Education</a>';
    menuhtml += '<a class="mdl-navigation__link" href="projects">Projects</a>';
    menuhtml += '<a class="mdl-navigation__link" id="resume-link" target="_blank">Resume</a>';
    menuhtml += '<a class="mdl-navigation__link" href="https://github.com/manishbisht" target="_blank">Code on Github</a>';
    menuhtml += '<a class="mdl-navigation__link" href="https://medium.com/@manishbisht" target="_blank">Blog on Medium</a>';
    menuhtml += '<a class="mdl-navigation__link" href="https://www.quora.com/profile/Manish-Bisht-39" target="_blank">Questions on Quora</a>';
    menuhtml += '<a class="mdl-navigation__link" href="contact">Contact</a>';
    $('#main-menu').html(menuhtml);
}

function loadResumeLink() {
    var resume = "https://goo.gl/CWVvm9";
    document.getElementById('resume-link').href = resume;
}

function addEmailandNumber() {
    var email = "manish.bisht490@gmail.com";
    var mobileNumber = "+91-8559874393";
    $(".email").html(email);
    $(".mobile-number").html(mobileNumber);
}

function loadFooter() {
    var html = '<span class="symbol"><a class="plinks facebook" href="http://fb.com/imanishbisht" target="_blank">circlefacebook</a> </span>';
    html += '<span class="symbol"><a class="plinks twitter" href="https://twitter.com/ManishBisht02" target="_blank">circletwitterbird</a> </span>';
    html += '<span class="symbol"><a class="plinks googleplus" href="https://plus.google.com/+ManishBisht02" target="_blank">circlegoogleplus</a> </span>';
    html += '<span class="symbol"><a class="plinks instagram" href="https://www.instagram.com/manishbisht02" target="_blank">circleinstagram</a> </span>';
    html += ' <span class="symbol"><a class="plinks linkedin" href="https://www.linkedin.com/in/manishbisht02" target="_blank">circlelinkedin</a> </span>';
    html += '<span class="symbol"><a class="plinks github" href="https://github.com/manishbisht" target="_blank">circlegithub</a> </span>';
    html += '<span class="symbol"><a class="plinks pinterest" href="https://www.pinterest.ca/imanishbisht/" target="_blank">circlepinterest</a> </span>';
    html += '<br><br>';
    html += '<h3>&copy; <span id="copyright-year"></span> Manish Bisht &middot; Hosted with <i class="material-icons">favorite</i> on GitHub</h3>';
    $('#footer').html(html);
}

function loadYear() {
    var currentTime = new Date();
    $("#copyright-year").text(currentTime.getFullYear());
}
