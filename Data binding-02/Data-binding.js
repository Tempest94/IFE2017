'use strict'

Observer.prototype ={
    walk : function (obj) {
        let val;
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {  
                val = obj[key];
                if (typeof val === 'object') {
                    new Observer(val);
                }

                this.convert(key, val);
            }
            else
                console.log('No such keys')

        }
    },
    convert : function (key, val) {
        let _this = this;
        Object.defineProperty(this.data, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                console.log('你访问了' + key);
                return val
            },
            set: function (newVal) {
                console.log('你设置了' + key + ', 新的值为' + newVal);
                if (newVal === val) return;
                val = newVal
                _this.emit(key, val, newVal)

            }
        })
    },
    //sub
    on: function(eventType,handler){
        var self = this;

        if(!(eventType in self.handlers)){
            self.handlers[eventType]=[];
        }
        self.handlers[eventType].push(handler);
        return self;
    },

    // pub
    emit: function(eventType){
        console.log(eventType)

        var self = this;
        if(!self.handlers[eventType]){
            return;
        }
        var handlerArgs = Array.prototype.slice.call(arguments,1);
        for(var i = 0; i < self.handlers[eventType].length; i++) {
              self.handlers[eventType][i].apply(self,handlerArgs);
        }
        return self;
    },

}


let data = {
    app1:{
        name: {
            lastName: 'liang',
            firstName: 'shaofeng'
        },
        age: 25,
        address: {
            home: "home address",
            office: "office address"
        }
    },
    app2: {
         university: 'bupt',
         age: 28,
         major: 'computer'
    }
};

function Observer(data) {
    this.handlers = {};
    this.data = data;
    this.walk(data);
}

let app1 = new Observer(data.app1);
let app2 = new Observer(data.app2);

Observer.prototype.$watch=function(attr,callback){
    this.on(attr,callback);
}

app1.$watch('age', function(newVal) {
    console.log(`我的年纪变了，现在已经是：${newVal}岁了`);
});

//output
app1.data.name.lastName;
app1.data.name.firstName = 'lalala';

app1.data.age = 100; // 输出：'我的年纪变了，现在已经是100岁了'
