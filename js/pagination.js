(function($) {
    "use strict";
    var pageStyle = {

    };

    function DataNode(obj, next, pre) {
        this.obj = obj;
        this.pre = pre || "";
        this.next = next || "";
    }
    DataNode.prototype.nextTo = function(node) {
        this.next = node;
        this.next.pre = this;
        return this.next;
    }

    DataNode.prototype.preTo = function(node) {
        this.pre = node;
        this.pre.next = this;
        return this.pre;
    }

    function Pagination(pageIndex, perSize, allNums, url) {
        this.pageIndex = parseInt(pageIndex);
        this.perSize = parseInt(perSize);
        this.allNums = parseInt(allNums);
        this.pageSize = Math.ceil(this.allNums / this.perSize);
        this.url = url;
        this.showPageSize = 5;
        this.edgeSize = 0;
        this.type = "get";
        this.model = 1;
        this.firstNode = "";
        this.startNode = "";
        return this;
    }

    Pagination.prototype.setNormalPage = function(html) {
        this.normalPage = html;
    }
    Pagination.prototype.setNormalJs = function(fc) {
        this.normalJs = fc;
    }

    Pagination.prototype.setIndexPage = function(html) {
        this.indexPage = html;
    }
    Pagination.prototype.setIndexJs = function(fc) {
        this.indexJs = fc;
    }

    Pagination.prototype.setOmit = function(html) {
        this.omit = html;
    }
    Pagination.prototype.setPrePage = function(html) {
        this.prePage = html;
    }
    Pagination.prototype.setNextPage = function(html) {
        this.nextPage = html;
    }
    Pagination.prototype.setDisPrePage = function(html) {
        this.disPrePage = html;
    }
    Pagination.prototype.setDisNextPage = function(html) {
        this.disNextPage = html;
    }


    /**************************************/
    Pagination.prototype.setEdgeSize = function(edgeSize) {
        this.edgeSize = edgeSize;
        return this;
    }
    Pagination.prototype.setModel = function(model) {
        this.model = model;
    }

    Pagination.prototype.setShowPageSize = function(num) {
        this.showPageSize = num;
    }

    Pagination.prototype.setStyle = function(name) {
        var style = pageStyle[name];
        for (var key in style) {
            if (typeof(this["set" + key]) == "function") {
                this["set" + key](style[key]);
            }
        }
        return this;
    }

    Pagination.prototype.setCollectData = function(fc) {
        this.collectData = fc;
        return this;
    }

    Pagination.prototype.setType = function(type) {
        this.type = type;
        return this;
    }

    Pagination.prototype.setCallBack = function(fc) {
        this.callBack = fc;
        return this;
    }


    Pagination.prototype.go = function(pageIndex) {
        var data = {
            pageIndex: pageIndex
        };
        var otherData = {};
        if (typeof(this.collectData) == "function") {
            otherData = this.collectData();
        }

        for (var key in otherData) {
            data[key] = otherData[key];
        }
        var that = this;
        $[this.type](this.url, data, function(d) {
            that.callBack(d);
            if (that.model == 1) {
                that.pageIndex = pageIndex;
                that.append(that.initWay[0], that.initWay[1]);
            }
        });

    }

    Pagination.prototype.create = function() {
        var that = this;

        function getNormalPage(i) {
            return that.normalJs.apply($(that.normalPage), [i]).click(function() {
                that.go(i);
            });
        }

        function getIndexPage(i) {
            return that.indexJs.apply($(that.indexPage), [i]);
        }
        var preNode = this.pageIndex > 1 ? new DataNode($(this.prePage).click(function() {
            that.go(that.pageIndex - 1);
        })) : new DataNode($(this.disPrePage));
        var nextNode = this.pageIndex < this.pageSize ? new DataNode($(this.nextPage).click(function() {
            that.go(that.pageIndex + 1);
        })) : new DataNode($(this.disNextPage));
        this.startNode = preNode;
        var pNode = this.startNode;
        var startPageIndex = this.pageIndex - Math.floor(this.showPageSize / 2);
        startPageIndex = startPageIndex < 1 ? 1 : startPageIndex;
        var temp;
        for (var j = 1; j <= this.edgeSize && j < startPageIndex; j++) {
            temp = new DataNode(getNormalPage(j));
            pNode = pNode.nextTo(temp);
        }

        if (j < startPageIndex) {
            temp = new DataNode(this.omit);
            pNode = pNode.nextTo(temp);
        }
        for (var i = startPageIndex; i < startPageIndex + this.showPageSize && i <= this.pageSize; i++) {
            temp = new DataNode(i == this.pageIndex ? getIndexPage(i) : getNormalPage(i));
            pNode = pNode.nextTo(temp);
        }
        if (i <= this.pageSize - this.edgeSize && i < this.pageSize) {
            temp = new DataNode(this.omit);
            pNode = pNode.nextTo(temp);
        }
        var pp = "";
        for (var k = this.pageSize; k >= i && k > this.pageSize - this.edgeSize; k--) {
            temp = new DataNode(getNormalPage(k));
            if (pp == "") {
                pp = temp;
            } else {
                pp = pp.preTo(temp);
            }
        }
        if (pp != "") {
            pNode.nextTo(pp);
            while (pp.next != "") {
                pp = pp.next;
            }
            pNode = pp;
        }
        pNode = pNode.nextTo(nextNode);
        return this;
    }

    Pagination.prototype.append = function(way, obj) {
        this.create();
        var p = this.startNode,
            target = p.obj;
        while (p.next != "") {
            target = target.after(p.next.obj);
            p = p.next;
        }
        this.initWay = [way, obj];
        if (way == "inner") {
            obj.html(target);
        }
    }


    window.MyPage = Pagination;


    (function() {
        var page1 = {

        };
        page1.NormalPage = "<a href='javascript:void(0)'>2</a>";
        page1.IndexPage = "<span class='current'>1</span>";
        page1.Omit = "...";
        page1.PrePage = "<a href='javascript:void(0)'> < </a>";
        page1.NextPage = "<a href='javascript:void(0)'> > </a>";
        page1.DisPrePage = "<span class='disabled'> < </span>";
        page1.DisNextPage = "<span class='disabled'> > </span>";

        page1.NormalJs = function(i) {
            this.text(i);
            return this;
        }
        page1.IndexJs = function(i) {
            this.text(i);
            return this;
        }
        pageStyle.page1 = page1;
    }());









}(jQuery))
