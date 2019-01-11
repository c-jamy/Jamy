//分页
var Pagination = {
    code: '',
    Extend: function(data) {
        data = data || {};
        Pagination.size = data.size || 1;
        Pagination.page = data.page || 1;
        Pagination.step = data.step || 1;
    },
 //数字按钮
    Add: function(s, f) {
        for (var i = s; i < f; i++) {
            Pagination.code += '<a>' + i + '</a>';
        }
    },

// 上一页+...按钮
    Last: function() {
        Pagination.code += '<i>...</i><a>' + Pagination.size + '</a>';
    },

// 下一页+...按钮
    First: function() {
        Pagination.code += '<a>1</a><i>...</i>';
    },

// 点击方法
    Click: function() {
        Pagination.page = +this.innerHTML;
        Pagination.Start();
        $("tbody")[0].innerHTML = "";
        loadinfo(Pagination.page*10-10,Pagination.page*10,false);
    },
	
// 上一页
    Prev: function() {
        Pagination.page--;
        if (Pagination.page < 1) {
            Pagination.page = 1;
        }
        $("tbody")[0].innerHTML = "";
        loadinfo(Pagination.page*10-10,Pagination.page*10,false);
        Pagination.Start();
    },

// 下一页
    Next: function() {
        Pagination.page++;
        if (Pagination.page > Pagination.size) {
            Pagination.page = Pagination.size;
        }
        $("tbody")[0].innerHTML = "";
        loadinfo(Pagination.page*10-10,Pagination.page*10,false);
        Pagination.Start();
    },

// 绑定页面
  Bind: function() {
        var a = Pagination.e.getElementsByTagName('a');
        for (var i = 0; i < a.length; i++) {
            if (+a[i].innerHTML === Pagination.page){
            	a[i].className = 'current';
            } 
            a[i].addEventListener('click', Pagination.Click, false);
        }
    },

    
    Finish: function() {
        Pagination.e.innerHTML = Pagination.code;
        Pagination.code = '';
        Pagination.Bind();
    },

    // 分页类型
    Start: function() {
        if (Pagination.size < Pagination.step * 2 + 6) {
            Pagination.Add(1, Pagination.size + 1);
        }
        else if (Pagination.page < Pagination.step * 2 + 1) {
            Pagination.Add(1, Pagination.step * 2 + 4);
            Pagination.Last();
        }
        else if (Pagination.page > Pagination.size - Pagination.step * 2) {
            Pagination.First();
            Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
        }
        else {
            Pagination.First();
            Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
            Pagination.Last();
        }
        Pagination.Finish();
    },


    // 绑定按钮
    Buttons: function(e) {
        var nav = e.getElementsByTagName('a');
        nav[0].addEventListener('click', Pagination.Prev, false);
        nav[1].addEventListener('click', Pagination.Next, false);
    },

    // 创建解构
    Create: function(e) {

        var html = [
            '<a>&#9668;</a>', // 上一页按钮
            '<span></span>',  // 分页内容
            '<a>&#9658;</a>'  // 下一页按钮
        ];

        e.innerHTML = html.join('');
        Pagination.e = e.getElementsByTagName('span')[0];
        Pagination.Buttons(e);
    },

    // 初始化 e:元素  data;数据
    Init: function(e, data) {
        Pagination.Extend(data);
        Pagination.Create(e);
        Pagination.Start();
    }
};
 // 初始化
var init = function(pageSize) {
    Pagination.Init(document.getElementById('pagination'), {
        size: pageSize, // 页数
        page: 1,  // 选中的页面
        step: 3   // pages before and after current
    });
};