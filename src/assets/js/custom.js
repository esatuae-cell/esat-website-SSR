$(document).ready(function(){
  
 setInterval(function() {
  $(".toggle").click(function(){
    $("ul").toggleClass("active");
  });

}, 1000);



window.addEventListener("scroll", function () {
    const navbar = document.getElementById("mainNavbar");

    if (window.scrollY > 50) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
});


function doGTranslate(lang_pair) {
    if (lang_pair.value) lang_pair = lang_pair.value;

    if (lang_pair == '') return;

    var lang = lang_pair.split('|')[1];

    var teCombo;

    var sel = document.querySelector('.goog-te-combo');

    if (sel) {
        sel.value = lang;
        sel.dispatchEvent(new Event('change'));
    }
}

});