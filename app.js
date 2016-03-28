(function($) {
    "use strict";
    $(function() {
        var page = new MyPage(13, 8, 265, "./post.php")
            .setEdgeSize(1)
            .setStyle("page1")
            .setCallBack(function(data) {
            	console.debug(data);
            })
            .append("inner",$(".digg"));
    });

}(jQuery))
