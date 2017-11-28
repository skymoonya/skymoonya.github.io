var postcss = require('postcss');
var originCssText = `
html{
        body{
            border:1px solid #ff0;
            border-top:75px solid #ff0;
            border-right:10px solid #ff0;/*no*/
        }
    }
`;
//
//function nonForcedNumericRegex(number) {
//    // finds pixel values not followed by `/* force */`
//    return new RegExp(number + 'px(?!\\s*\\/\\*\\s*force\\s*\\*\\/)', 'g');
//}
//var pr = postcss.plugin('pr', function (opts) {
//    opts = {
//        base: 16,
//    };
//    var regex = /([\d\.]+)px(\s*\/\*\s*force\s*\*\/)?/g;
//
//    var convert = function (context) {
//        var replaceable = context.match(regex);
//
//        if (replaceable) {
//            replaceable.forEach(function (value) {
//                var matches = regex.exec(value);
//                regex.lastIndex = 0;
//
//                // if the value is not forced to be pixels, let's replace any matching
//                if (!matches[2]) {
//                    context = context.replace(nonForcedNumericRegex(matches[1]), matches[1] / opts.base + 'em');
//                }
//            });
//        }
//
//        return context;
//    };
//
//    return function (css) {
//        css.eachInside(function (node) {
//            if (node.type === 'decl') {
//                node.value = convert(node._value ? node._value.raw : node.value);
//            }
//        });
//    };
//})


var px2rem = require('../build/px2rem')

var newCssText = postcss().use(px2rem({ remUnit: 75 })).process(originCssText).css;

console.log('----------', newCssText)
