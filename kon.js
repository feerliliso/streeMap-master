var ViewModle = function() {
    var self = this;

    self.places_name = ko.observable("");
    self.places = ko.observableArray([ //生成选项数组
        {
            name: "饭店",
            view: ko.observable(true)
        },
        {
            name: "旅店",
            view: ko.observable(true)
        },
        {
            name: "博物馆",
            view: ko.observable(true)
        }
    ]);
    self.Click_input = function () {
      for(var i = 0; i < self.places().length; i++) {
          self.places()[i].view(true);
          }

    }

    self.Chick_places = function() { //点击所引起的一系列动作

        if(self.places_name() === "") { //如果是空值显示如下信息
            //select();//筛选数组
            alert(请输入你的地点);
        } else {
            select(self.places_name());
            for(var i = 0; i < self.places().length; i++) {
                if(self.places_name() === self.places()[i].name) { //如果输入地点相符显示反之不显示
                    self.places()[i].view(true);
                } else {

                    self.places()[i].view(false);
                }
            }
        }

    }
};
ko.applyBindings(new ViewModle());
