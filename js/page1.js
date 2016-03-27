(function() {
    window.page1 = {

    };
    page1.normalPage = "<a href='javascript:void(0)'>2</a>";
    page1.indexPage = "<span class='current'>1</span>";
    page1.omit = "...";
    page1.prePage = "<a href='javascript:void(0)'> < </a>";
    page1.nextPage = "<a href='javascript:void(0)'> > </a>";
    page1.disPrePage = "<span class='disabled'> < </span>";
    page1.disNextPage = "<span class='disabled'> > </span>";

    page1.normalJs = function(i) {
        this.text(i);
    }
    page1.indexJs = function(i) {
        this.text(i);
    }





}())
