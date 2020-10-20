$(document).ready(function() {
    hideLight();
});
function hideLight() {
    console.log("hide light called");
    $('.lightStuff').css('display','none');
}
function showLight() {
    $('.lightStuff').css('display','inline');
}
function hideLogin() {
    $('.loginStuff').css('display','none');
}