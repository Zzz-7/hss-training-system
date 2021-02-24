/**
 * 
 * 测试模块的获取题型的方法
 */

export function getContentHtml(value, pIndex, isLearned) {
    var content = value;
    var pIndex = pIndex
    var isLearned = isLearned
    if (content == null) {
        return '';
    }
    var chinese = /[\u4E00-\u9FA5，；。“”？！：、（）]/g;
    var _html = "";
    switch (content.questionType) {
        case 3:
            var _select = "";
            var questionHtml = "";
            var width = 0;
            var optionStr, answer;
            var questionTemp = content.question
            var questionArr = questionTemp.split(/_{3,}/);
            for (var i = 0; i < questionArr.length; i++) {
                /*防止多加一道题 */
                questionHtml += questionArr[i];
                if (i >= questionArr.length - 1) {
                    break;
                }
                optionStr = content['option'+(i+1)] == null ? '' : content['option'+(i+1)];
                answer = optionStr;
                optionStr = optionStr.replace("$", "")
                optionStr = optionStr.replace("$", "")
                width = optionStr.length * 10 + 20;
                if (width < 80) {
                    width = 80;
                }
                if (optionStr.match(/[^\x00-\xff]/g)) { //检索是否为input的题型，只要optionStr匹配非双字节的字符就input的题型，否则是mathquill
                    _select = "<input autocomplete='off' name='" + pIndex + "' type='text' value=''  style='width:" + width + "px;' class='border answer inputMath " + pIndex + "'/>";
                    _select += "<span class='spanAnswer' style='display: none;'>(" + answer + ")</span>"
                } else {
                    _select = '<div style="display:inline-block;">'
                    _select += '<code id="latex' + pIndex + '' + i + '" class="answer ' + pIndex + '" style="display:none;"></code>'
                    _select += "<div name='" + pIndex + "' class='optionDiv inputMath " + pIndex + "' style='min-width:" + width + "px;'>"
                    _select += '<div id="math-field' + pIndex + '' + i + '" class="mq-editable-field mq-math-mode">'
                    _select += "</div></div>"
                    _select += "<span class='spanAnswer' style='display: none;'>(" + answer + ")</span>"
                    _select += "</div>"
                }
                questionHtml += _select;
            }
            _html += '<div style="line-height:2;"> ' + questionHtml + '</div>';
            break;
    }
    return _html
}
/*
    PC基础学习模块的判断的题型情况
*/
export function getContentHtmlBasicLearn(value, pIndex, isLearned) {
    var content = value;
    var pIndex = pIndex
    if (content == null) {
        return '';
    }
    var chinese = /[\u4E00-\u9FA5，；。“”？！：、（）]/g;
    var _html = "";
    switch (content.questionType) {
        case 1: //单选题
            // _html += '<div class="inte-learn-box">';
            // _html += '<div class="content inte-learn-mid-text-wrap">';
            if (isLearned) {
                _html += '<div  style="line-height:2;margin-top:24px;">' + content.question + '</div>';
                _html += '<ul class="option inte-learn-radio">';
                var index = new Date().getTime() + Math.random();
                if (content.option1 != null && content.option1 != "") {
                    _html += '<li><label><input name="input_' + index + '" type="radio" value="A" ';
                    _html += content.correctOption == "A" ? 'checked="checked" ' : '';
                    _html += 'disabled="disabled"/>A. ' + content.option1 + '</label></li>';
                }
                if (content.option2 != null && content.option2 != "") {
                    _html += '<li><label><input name="input_' + index + '" type="radio" value="B" ';
                    _html += content.correctOption == "B" ? 'checked="checked" ' : '';
                    _html += 'disabled="disabled"/>B. ' + content.option2 + '</label></li>';
                }
                if (content.option3 != null && content.option3 != "") {
                    _html += '<li><label><input name="input_' + index + '" type="radio" value="C" ';
                    _html += content.correctOption == "C" ? 'checked="checked" ' : '';
                    _html += 'disabled="disabled"/>C. ' + content.option3 + '</label></li>';
                }
                if (content.option4 != null && content.option4 != "") {
                    _html += '<li><label><input name="input_' + index + '" type="radio" value="D" ';
                    _html += content.correctOption == "D" ? 'checked="checked" ' : '';
                    _html += 'disabled="disabled"/>D. ' + content.option4 + '</label></li>';
                }
                _html += '</ul>';
            } else {
                _html += '<div style="line-height:2;margin-top:24px;" class="question">' + content.question;
                _html += '<div class="answer-result"></div></div>';
                _html += '<ul class="option inte-learn-radio">';
                if (content.option1 != null && content.option1 != "") {
                    _html += '<li><label><input name="input_' + pIndex + '" type="radio" value="A"/>A. ' + content.option1 + '</label></li>';
                }
                if (content.option2 != null && content.option2 != "") {
                    _html += '<li><label><input name="input_' + pIndex + '" type="radio" value="B"/>B. ' + content.option2 + '</label></li>';
                }
                if (content.option3 != null && content.option3 != "") {
                    _html += '<li><label><input name="input_' + pIndex + '" type="radio" value="C"/>C. ' + content.option3 + '</label></li>';
                }
                if (content.option4 != null && content.option4 != "") {
                    _html += '<li><label><input name="input_' + pIndex + '" type="radio" value="D"/>D. ' + content.option4 + '</label></li>';
                }
                _html += '</ul>';
            }
            break;
        case 2: //判断题
            if (isLearned) {
                _html += '<div style="line-height:2;margin-top:24px;">' + content.question + '</div>';
                _html += '<ul class="option inte-learn-radio">';
                var index = new Date().getTime() + Math.random();
                _html += '<li><label><input name="input_' + index + '" type="radio" value="A" ';
                _html += content.correctOption == "T" ? 'checked="checked" ' : '';
                _html += 'disabled="disabled"/>' + "正确" + '</label></li>';
                _html += '<li><label><input name="input_' + index + '" type="radio" value="B" ';
                _html += content.correctOption == "F" ? 'checked="checked" ' : '';
                _html += 'disabled="disabled"/>' + "错误" + '</label></li>';
                _html += '</ul>';
            } else {
                _html += '<div style="line-height:2;margin-top:24px;" class="question">' + content.question;
                _html += '<div class="answer-result"></div></div>';
                _html += '<ul class="option inte-learn-radio">';
                _html += '<li><label><input name="input_' + pIndex + '" type="radio" value="T"/>' + "正确" + '</label></li>';
                _html += '<li><label><input name="input_' + pIndex + '" type="radio" value="F"/>' + "错误" + '</label></li>';
                _html += '</ul>';
            }
            break;
        case 4: //文本
            _html += '<div class="inte-learn-box" style="margin-top:24px;">';
            _html += '<div class="content inte-learn-mid-text-wrap">';
            _html += '<div class="question inte-learn-sm-text inte-learn-mid-text">' + content.question;
            _html += '</div>';
            _html += '</div></div>';
            break;
        case 3: //综合题
            var _select = "";
            var questionHtml = "";
            var width = 0,
                length = 0,
                len = 0;
            var optionStr, optionArr, answer;
            var answerIndexArr = content.correctOption ? content.correctOption.split(",") : '';
            var questionTemp = content.question
            var questionArr = questionTemp.split(/_{3,}/);
            for (var i = 0; i < questionArr.length; i++) {
                questionHtml += questionArr[i];
                if (i >= questionArr.length - 1) {
                    break;
                }
                var options = 'option'+(i+1)
                optionStr = content[options] == null ? '' : content[options];
                optionArr = (optionStr || '').split("|");
                if (isLearned) {
                    if (optionArr.length == 1) {
                        answer = optionArr[0];
                    } else {
                        answer = optionArr[parseInt(answerIndexArr[i])];
                    }
                    if (chinese.test(answer)) {
                        width = (answer.length + answer.match(chinese).length) * 10 + 40;
                    } else {
                        width = answer.length * 10 + 40;
                    }
                    if (width < 80) {
                        width = 80;
                    }
                    if (optionArr.length == 1) {
                        _select = '<div class="border s-disable" style="width:' + width + 'px;display:inline-block;margin: 0 5px;">' + answer + '</div>';
                    } else {
                        _select = "<div class='question-select s-disable'>";
                        _select += "<h3 data='' style='min-width:" + width + "px; background-position-x: " + (width - 18) + "px;'>" + answer + "</h3>";
                        _select += "</div>";
                    }
                } else {
                    len = 0;
                    for (var j = 0; j < optionArr.length; j++) {
                        length = optionArr[j].length;
                        if (chinese.test(optionArr[j])) {
                            length += optionArr[j].match(chinese).length;
                        }
                        if (len < length) {
                            len = length;
                        }
                    }
                    width = len * 10 + 20;
                    if (width < 80) {
                        width = 80;
                    }
                    if (optionArr.length == 1) {
                        if (optionArr[0].match(/[^\x00-\xff]/g)) {
                            _select = "<input autocomplete='off' name='" + pIndex + "' value='' style='width:" + width + "px;' class='border answer " + pIndex + " inputMath " + pIndex + "" + i + "'/>";
                        } else {
                            _select = '<div style="display:inline-block;margin:0px;">'
                            _select += '<code id="latex' + pIndex + '' + i + '" class="answer ' + pIndex + ' " style="display:none;"></code>'
                            _select += "<div name='" + pIndex + "' class='optionDiv inputMath " + pIndex + "" + i + "' style='min-width:" + width + "px;margin:0 10px;border: 1px #ccc solid;'>"
                            _select += '<div id="math-field' + pIndex + '' + i + '" style="outline:0;border:0;" class="mq-editable-field mq-math-mode">'
                            _select += "</div></div></div>"
                        }
                    } else {
                        _select = "<div class='s-active question-select'>";
                        _select += "<h3 class='h3 " + pIndex + "' value='' data='' style='min-width:" + width + "px; background-position-x: " + (width - 15) + "px;'>请选择</h3>";
                        _select += "<ul>";
                        $(optionArr).each(function(j, option) {
                            if (option != null && option != "") {
                                _select += "<li class='list' value='" + option + "' style='min-width:" + width + "px'>" + option + "</li>";
                            }
                        });
                        _select += "</ul></div>";
                    }
                }
                questionHtml += _select;
            }
            if (isLearned) {
                _html += '<div style="line-height:2;margin-top:24px;">' + questionHtml + ' </div>';
            } else {
                _html += '<div  style="line-height:2;margin-top:24px;" class="question">' + questionHtml + '<div class="answer-result"></div></div>';
            }
            break;
    }
    return _html;
}

/*
    移动端学习模块的判断题型情况
*/
export function getContentHtmlMobileLearn(value, pIndex, isLearned) {
    var content = value;
    var pIndex = pIndex
    if (content == null) {
        return '';
    }
    var chinese = /[\u4E00-\u9FA5，；。“”？！：、（）]/g;
    var _html = "";
    switch (content.questionType) {
        case 1: //单选题
            if (isLearned) {
                _html += '<div class="question">' + content.question + '</div>';
                _html += '<ul class="option inte-learn-radio">';
                var index = new Date().getTime() + Math.random();
                if (content.option1 != null && content.option1 != "") {
                    _html += '<li><label><input name="input_' + index + '" type="radio" value="A" ';
                    _html += content.correctOption == "A" ? 'checked="checked" ' : '';
                    _html += 'disabled="disabled"/>A. ' + content.option1 + '</label></li>';
                }
                if (content.option2 != null && content.option2 != "") {
                    _html += '<li><label><input name="input_' + index + '" type="radio" value="B" ';
                    _html += content.correctOption == "B" ? 'checked="checked" ' : '';
                    _html += 'disabled="disabled"/>B. ' + content.option2 + '</label></li>';
                }
                if (content.option3 != null && content.option3 != "") {
                    _html += '<li><label><input name="input_' + index + '" type="radio" value="C" ';
                    _html += content.correctOption == "C" ? 'checked="checked" ' : '';
                    _html += 'disabled="disabled"/>C. ' + content.option3 + '</label></li>';
                }
                if (content.option4 != null && content.option4 != "") {
                    _html += '<li><label><input name="input_' + index + '" type="radio" value="D" ';
                    _html += content.correctOption == "D" ? 'checked="checked" ' : '';
                    _html += 'disabled="disabled"/>D. ' + content.option4 + '</label></li>';
                }
                _html += '</ul>';
            } else {
                _html += '<div class="question">' + content.question;
                _html += '<div class="answer-result"></div></div>';
                _html += '<ul class="option inte-learn-radio">';
                if (content.option1 != null && content.option1 != "") {
                    _html += '<li><label><input name="input_' + pIndex + '" type="radio" value="A"/>A. ' + content.option1 + '</label></li>';
                }
                if (content.option2 != null && content.option2 != "") {
                    _html += '<li><label><input name="input_' + pIndex + '" type="radio" value="B"/>B. ' + content.option2 + '</label></li>';
                }
                if (content.option3 != null && content.option3 != "") {
                    _html += '<li><label><input name="input_' + pIndex + '" type="radio" value="C"/>C. ' + content.option3 + '</label></li>';
                }
                if (content.option4 != null && content.option4 != "") {
                    _html += '<li><label><input name="input_' + pIndex + '" type="radio" value="D"/>D. ' + content.option4 + '</label></li>';
                }
                _html += '</ul>';
            }
            break;
        case 2: //判断题
            // _html += '<div class="inte-learn-box">';
            // _html += '<div class="content inte-learn-mid-text-wrap">';
            var question = content.question.replace(/<\/p>(\s)*$/, "<span style='color: #999;'>（判断题）</span></p> ");
            if (isLearned) {
                _html += '<div style="line-height:2;margin-top:12px;">' + content.question + '</div>';
                _html += '<ul class="option inte-learn-radio">';
                var index = new Date().getTime() + Math.random();
                _html += '<li><label><input name="input_' + index + '" type="radio" value="A" ';
                _html += content.correctOption == "T" ? 'checked="checked" ' : '';
                _html += 'disabled="disabled"/>' + "正确" + '</label></li>';
                _html += '<li><label><input name="input_' + index + '" type="radio" value="B" ';
                _html += content.correctOption == "F" ? 'checked="checked" ' : '';
                _html += 'disabled="disabled"/>' + "错误" + '</label></li>';
                _html += '</ul>';
            } else {
                _html += '<div style="line-height:2;margin-top:12px;" class="question">' + content.question;
                _html += '<div class="answer-result"></div></div>';
                _html += '<ul class="option inte-learn-radio">';
                _html += '<li><label><input name="input_' + pIndex + '" type="radio" value="T"/>' + "正确" + '</label></li>';
                _html += '<li><label><input name="input_' + pIndex + '" type="radio" value="F"/>' + "错误" + '</label></li>';
                _html += '</ul>';
            }
            break;
        case 4: //文本
            _html += '<div class="inte-learn-box" style="margin-top:12px;">';
            _html += '<div class="content inte-learn-mid-text-wrap">';
            _html += '<div class="question inte-learn-sm-text inte-learn-mid-text">' + content.question;
            _html += '</div>';
            _html += '</div></div>';
            break;
        case 3: //综合题
            var _select = "";
            var questionHtml = "";
            var width = 0,
                length = 0,
                len = 0;
            var optionStr, optionArr,
                answer;
            var answerIndexArr = content.correctOption ? content.correctOption.split(",") : '';
            var questionTemp = content.question.replace(/<p[^>]*>/g, "");
            questionTemp = questionTemp.replace(/<\/p>/g, "");
            questionTemp = questionTemp.replace(/<u[^>]*>/g, "");
            questionTemp = questionTemp.replace(/<\/u>/g, "");
            // questionTemp = questionTemp.replace(/<br>/g, "");
            var questionArr = questionTemp.split(/_{3,}/);
            for (var i = 0; i < questionArr.length; i++) {
                questionHtml += questionArr[i];
                if (i >= questionArr.length - 1) {
                    break;
                }
                var options = 'option'+(i+1)
                optionStr = content[options] == null ? '' : content[options];
                optionArr = (optionStr || '').split("|");
                if (isLearned) {
                    if (optionArr.length == 1) {
                        answer = optionArr[0];
                    } else {
                        answer = optionArr[parseInt(answerIndexArr[i])];
                    }
                    if (chinese.test(answer)) {
                        width = (answer.length + answer.match(chinese).length) * 10 + 20;
                    } else {
                        width = answer.length * 10 + 20;
                    }
                    if (width < 80) {
                        width = 80;
                    }
                    if (optionArr.length == 1) {
                        _select = '<div class="border" style="min-width:' + width + 'px;display:inline-block;">' + answer + '</div>';
                    } else {
                        _select = "<div class='question-select s-disable'>";
                        _select += "<h3 data=''>" + answer + "</h3>";
                        _select += "</div>";
                    }
                } else {
                    len = 0;
                    for (var j = 0; j < optionArr.length; j++) {
                        length = optionArr[j].length;
                        if (chinese.test(optionArr[j])) {
                            length += optionArr[j].match(chinese).length;
                        }
                        if (len < length) {
                            len = length;
                        }
                    }
                    width = len * 10 + 20;
                    if (width < 80) {
                        width = 100;
                    }
                    if (optionArr.length == 1) {
                        if (optionArr[0].match(/[\u4e00-\u9fa5]/g)) {
                            _select = "<input autocomplete='off' name='" + pIndex + "' value='' class='border answer " + pIndex + " inputMath " + pIndex + "" + i + "'/>";
                        } else {
                            _select = '<div style="display:inline-block;">'
                            _select += '<code id="latex' + pIndex + '' + i + '" class="answer ' + pIndex + ' " style="display:none;"></code>'
                            _select += "<div name='" + pIndex + "' class='optionDiv inputMath " + pIndex + "" + i + "'>"
                            _select += '<div id="math-field' + pIndex + '' + i + '" style="outline:0;border:0;" class="mq-editable-field mq-math-mode">'
                            _select += "</div></div></div>"
                        }
                    } else {
                        _select = "<div class='s-active question-select'>";
                        _select += "<h3 class='h3 " + pIndex + "' style='width:"+(width+20)+"px;'>请选择</h3>";
                        _select += "<ul>";
                        $(optionArr).each(function(j, option) {
                            if (option != null && option != "") {
                                _select += "<li class='list' style='width:"+(width+20)+"px;" + option + "'>" + option + "</li>";
                            }
                        });
                        _select += "</ul></div>";
                    }
                }
                questionHtml += _select;
            }
            // _html += '<div class="inte-learn-box">';
            // _html += '<div class="content inte-learn-mid-text-wrap">';
            _html += '<div class="question">' + questionHtml + '</div>';
            break;
    }
    return _html;
}

/**
 * PC进阶训练的判断是综合题的情况
 */
export function getContentHtmlAdvance(value, pIndex, isLearned) {
    var content = value;
    var pIndex = pIndex
    if (content == null) {
        return '';
    }
    var _html = "";
    switch (content.questionType) {
        case 1:
            return content.question;
        case 2:
            return content.question;
        case 3:
            var _select = "";
            var questionHtml = "";
            var width = 0;
            var optionStr, answer;
            var questionTemp = content.question
            var answerResultList = content.answerResult
            var questionArr = questionTemp.split(/_{3,}/);
            var questionAnswered = (answerResultList || '').split(',')
            for (var i = 0; i < questionArr.length; i++) {
                questionHtml += questionArr[i];
                if (i >= questionArr.length - 1) {
                    break;
                }
                optionStr = content['option'+(i+1)] == null ? '' : content['option'+(i+1)];
                answer = optionStr
                answer = answer.replace(/[(]/g, "\\left(");
                answer = answer.replace(/[)]/g, "\\right)");
                optionStr = optionStr.replace("$", "")
                optionStr = optionStr.replace("$", "")
                width = (optionStr.length * 10 + 20) < 80 ? 80 : (optionStr.length * 10 + 20);
                if (isLearned) {
                    if (answer == questionAnswered[i]) {
                        _select = '<div class="border inputMath correct" style="min-width:' + width + 'px;display:inline-block;">' + questionAnswered[i] + '</div>';
                    } else {
                        _select = '<div class="border inputMath select_wrong" style="min-width:' + width + 'px;display:inline-block;">' + questionAnswered[i] + '</div>';
                    }
                } else {
                    if (optionStr.match(/[^\x00-\xff]/g)) {
                        _select = "<input autocomplete='off' name='" + pIndex + "' type='text' value=''  style='width:" + width + "px;' class='border answer inputMath " + pIndex + "" + i + " " + pIndex + "'/>";
                    } else {
                        _select = '<div style="display:inline-block;margin:0 10px;">'
                        _select += '<code id="latex' + pIndex + '' + i + '" class="answer ' + pIndex + ' " style="display:none;"></code>'
                        _select += "<div name='" + pIndex + "' class='optionDiv inputMath " + pIndex + "" + i + "' style='min-width:" + width + "px;border: 1px #ccc solid;'>"
                        _select += '<div id="math-field' + pIndex + '' + i + '" class="mq-editable-field mq-math-mode">'
                        _select += "</div></div></div>"
                    }
                }
                questionHtml += _select;
            }
            _html += '<div style="line-height:2;">' + questionHtml + '</div>';

    }
    return _html
}