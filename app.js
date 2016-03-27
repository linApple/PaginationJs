(function($) {
    "use strict";
    $(function() {
        var page = new MyPage(25, 10, 245, "./post.php")
            .setEdgeSize(2)
            .setStyle("page1")
            .setCallBack(function(data) {
            	console.debug(data);
            })
            .append("inner",$(".digg"));
    });

}(jQuery))
