var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) {
        s = '0' + s;
    }
    return s;
};

export default {
    getQueryStringByName: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    formatDate: {

        format: function (date, pattern) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y':
                        return padding(date.getFullYear(), $0.length);
                    case 'M':
                        return padding(date.getMonth() + 1, $0.length);
                    case 'd':
                        return padding(date.getDate(), $0.length);
                    case 'w':
                        return date.getDay() + 1;
                    case 'h':
                        return padding(date.getHours(), $0.length);
                    case 'm':
                        return padding(date.getMinutes(), $0.length);
                    case 's':
                        return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y':
                            _date.setFullYear(_int);
                            break;
                        case 'M':
                            _date.setMonth(_int - 1);
                            break;
                        case 'd':
                            _date.setDate(_int);
                            break;
                        case 'h':
                            _date.setHours(_int);
                            break;
                        case 'm':
                            _date.setMinutes(_int);
                            break;
                        case 's':
                            _date.setSeconds(_int);
                            break;
                    }
                }
                return _date;
            }
            return null;
        }

    },
    formatPerms: {

        formatPermsToLetter(array) {
            let arr = [];
            array.forEach((item) => {
                switch (item) {
                    case '查询':
                        arr.push('R');
                        break;
                    case '修改':
                        arr.push('U');
                        break;
                    case '增加':
                        arr.push('I');
                        break;
                    case '删除':
                        arr.push('D');
                        break;
                }
            })
            return arr;
        },
        formatPermsToCharacter(array) {
            let arr = [];
            array.forEach((item) => {
                switch (item) {
                    case 'R':
                        arr.push('查询');
                        break;
                    case 'U':
                        arr.push('修改');
                        break;
                    case 'I':
                        arr.push('增加');
                        break;
                    case 'D':
                        arr.push('删除');
                        break;
                }
            })
            return arr;
        },

    },

    ReplaceSeperator(mobiles) {
        var i;
        var result = "";
        var c;
        for (i = 0; i < mobiles.length; i++) {
            c = mobiles.substr(i, 1);
            if (c == ";" || c == "," || c == "，" || c == "\n")
                result = result + ",";
            else if (c != "\r")
                result = result + c;
        }
        return result;
    },

    ReplaceSeperatorByEnter(mobiles) {
        var i;
        var result = "";
        var c;
        for (i = 0; i < mobiles.length; i++) {
            c = mobiles.substr(i, 1);
            if (c == "\n")
                result = result + "\n";
            else if (c != "\r")
                result = result + c;
        }
        return result;
    },

    // 将 2017-05-01 的样式转化为 2017/05/01
    transformDate(str) {
        let result = '';
        for (let i = 0; i < str.length; i++) {
            let c = str.substr(i, 1);
            if (c == '-') {
                result += '/';
            } else {
                result += c;
            }
        }
        return result;
    },

    /**
     * @description 将时间戳转换成日期格式
     * @author MuNaipeng
     * @param {numver} timestamp 传入的时间戳
     * @returns
     */
    timestampToTime(timestamp, type = 's') {
        const timestampStr = timestamp + '';
        let date, Y, M, D, h, m, s;
        if (timestampStr.length == 10) {
            date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        } else {
            date = new Date(timestamp);
        };
        Y = date.getFullYear() + '-';
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        m = date.getMinutes() < 10 ? ':' + '0' + date.getMinutes() : ':' + date.getMinutes();
        s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        if (type == 's') {
            return Y + M + D + h + m + s;
        } else if (type == 'm') {
            return Y + M + D + h + m;
        } else if (type == 'h') {
            return Y + M + D + h + ':00';
        }

    }

};
