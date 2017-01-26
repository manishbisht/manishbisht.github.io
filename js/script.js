/**
 * Created by Manish Bisht on 7/5/2016.
 */
$(document).ready(function () {
    loadMenu();
    loadResumeLink();
    addEmailandNumber();
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
    var resume = "http://goo.gl/Rro9Sk";
    document.getElementById('resume-link').href = resume;
}

function addEmailandNumber() {
    var email = "manish.bisht490@gmail.com";
    var mobileNumber = "+91-8559874393";
    $(".email").html(email);
    $(".mobile-number").html(mobileNumber);
}

function loadYear() {
    var currentTime = new Date();
    $("#copyright-year").text(currentTime.getFullYear());
}