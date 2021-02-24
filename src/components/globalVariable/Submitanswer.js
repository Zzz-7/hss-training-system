/**
*
*  PC基础学习模块的点击提交按钮判断答题情况的方法
*/
export function submitanswer(item3, target, answer, errorNum) {
    var errorNum = errorNum
    var Theanswer = answer
    var radioAnswer = target.parent()
        .siblings(".questionList")
        .children(".question")
        .children(".answer-result");
    /*综合题*/
    var answerIndexArr = item3.correctOption ? item3.correctOption.split(",") : '';
    var optionId = $("." + item3.id);
    var index = 0 //判断所有的问题都答对了
    for(let i = 0;i < answerIndexArr.length; i++){
        var optionAnswers = 'optionAnswer'+ (i+1);
        optionAnswers = optionId.eq(i).attr("value") ?
            optionId.eq(i).attr("value") :
            optionId.eq(i).hasClass("border") ?
            optionId.eq(i).val() :
            '$' + optionId.eq(i).html().replace('&gt;',"\\gt").replace('&lt;',"\\lt") + '$';
        var options = 'option'+ (i+1);
        var inputs = 'input' + (i+1)
        if(item3[options]){
            if(Theanswer[inputs][item3.id] == optionAnswers){
                if(optionId.eq(i).attr("value") || optionId.eq(i).hasClass("border")){
                    optionId.eq(i).addClass("right").removeClass("error");
                }else{
                    optionId.eq(i).siblings(".optionDiv").addClass("right").removeClass("error");
                }
                index++
                if(target.siblings('.questionList').find('.question-select')){
                    target.siblings('.questionList').find('.question-select').removeClass('s-active').addClass('s-disable').find('.h3').removeClass('h3')
                }
                if (target.siblings('.questionList').find('.border')) {
                    target.siblings('.questionList').find('.border').attr('disabled', 'disabled')
                }
                if (target.siblings('.questionList').find('.optionDiv')) {
                    target.siblings('.questionList').find('.optionDiv').removeClass('optionDiv')
                }
                radioAnswer.removeClass("inte-learn-error").addClass("inte-learn-pass");
            }else{
                if (optionId.eq(i).attr("value")) {
                    optionId.eq(i).addClass("error").removeClass("right");
                } else if (optionId.eq(i).hasClass("border")) {
                    optionId.eq(i).addClass("error").removeClass("right");
                } else {
                    optionId.eq(i).siblings(".optionDiv").addClass("error").removeClass("right");
                }
                radioAnswer.addClass("inte-learn-error").removeClass("inte-learn-pass");
            }
        }
    }
    if(index == answerIndexArr.length){
        target.parent().hide();
        target.parent().siblings(".Btn_next").show();
    }else{
        errorNum++;
    }
    return errorNum
}


/**
*  移动端(Android)基础学习模块的点击提交按钮判断答题情况的方法
*
*/
export function MobileLearnsubmitanswer(item3, target, answer, errorNum) {
    var errorNum = errorNum
    var Theanswer = answer
    var radioAnswer = target.parent()
        .siblings(".questionList")
        .children(".question")
        .children(".answer-result");
    /*综合题*/
    var answerIndexArr = item3.correctOption ? item3.correctOption.split(",") : '';
    var optionId = $("." + item3.id);
    var index = 0 //判断所有的问题都答对了
    for(let i = 0;i < answerIndexArr.length; i++){
        var optionAnswers = 'optionAnswer'+ (i+1);
        optionAnswers = optionId.eq(i).attr("value") ?
            optionId.eq(i).attr("value") :
            optionId.eq(i).hasClass("border") ?
            optionId.eq(i).val() :
            '$' + optionId.eq(i).html().replace('&gt;',"\\gt").replace('&lt;',"\\lt") + '$';
        var options = 'option'+ (i+1);
        var inputs = 'input' + (i+1)
        if(item3[options]){
            if(Theanswer[inputs][item3.id] == optionAnswers){
                if(optionId.eq(i).attr("value") || optionId.eq(i).hasClass("border")){
                    optionId.eq(i).addClass("right").removeClass("error");
                }else{
                    optionId.eq(i).siblings(".optionDiv").addClass("right").removeClass("error");
                }
                index++
                if(target.siblings('.questionList').find('.question-select')){
                    target.siblings('.questionList').find('.question-select').removeClass('s-active').addClass('s-disable').find('.h3').removeClass('h3')
                }
                if (target.siblings('.questionList').find('.border')) {
                    target.siblings('.questionList').find('.border').attr('disabled', 'disabled')
                }
                if (target.siblings('.questionList').find('.optionDiv')) {
                    target.siblings('.questionList').find('.optionDiv').removeClass('optionDiv')
                }
                radioAnswer.removeClass("inte-learn-error").addClass("inte-learn-pass");
            }else{
                if (optionId.eq(i).attr("value")) {
                    optionId.eq(i).addClass("error").removeClass("right");
                } else if (optionId.eq(i).hasClass("border")) {
                    optionId.eq(i).addClass("error").removeClass("right");
                } else {
                    optionId.eq(i).siblings(".optionDiv").addClass("error").removeClass("right");
                }
                radioAnswer.addClass("inte-learn-error").removeClass("inte-learn-pass");
            }
        }
    }
    if(index == answerIndexArr.length){
        target.hide();
        target.siblings(".next_optin").show();
    }else{
        errorNum++;
    }
    return errorNum
}


/**
 *  PC进阶训练点解提交按钮判断答题的情况的方法
 * 
 */

 export function advancedAnswer(titleQuestion,target,answer,useranswer,nextquestion,indexright,oldQuestion){
    var answerIndexArr = titleQuestion.question.split('inputMath');
    for(let i = 0;i < answerIndexArr.length-1; i ++){
      var inputs = 'input' + (i+1)
      let _html = $(".answer" + "." + titleQuestion.id).eq(i)
      useranswer[inputs] = _html.hasClass("border")? _html.val(): 
        "$" + _html.html().replace('&gt;',"\\gt").replace('&lt;',"\\lt") +"$";
        console.log(useranswer[inputs],answer)
      if(useranswer[inputs]==''||useranswer[inputs]=='$$'){useranswer[inputs]='未作答'}
      if(i<answerIndexArr.length-2){
        oldQuestion.answerResult = nextquestion.answerResult += useranswer[inputs]+',';
      }else{
        oldQuestion.answerResult = nextquestion.answerResult += useranswer[inputs];
      }
      
      if (answer[inputs] == useranswer[inputs]) {
        nextquestion.right = true;
        target.find(".inputMath").eq(i).addClass("select_correct");
        indexright = 0;
      } else {
        nextquestion.right = false;
        target.find(".inputMath").eq(i).addClass("select_wrong");
        indexright = 1;
      }
    }
 }


 /**
  * 
  * PC 测试模块的答案获取方法
  */
 export function getUserAnswer(input, questionList) {
    for (let i = 0; i < questionList.length; i++) {
        var optionArr = questionList[i].question.split('inputMath')
        for(let j = 0; j < optionArr.length-1; j ++){
            let inputs = 'input' + (j+1)
            let _html = $(".answer" + "." + questionList[i].id).eq(j)
            if (_html.hasClass("border")) {
                input[inputs][questionList[i].id] = _html.val();
            } else {
                input[inputs][questionList[i].id] = _html.html() == '' ? ''
                 : '$' + _html.html().toString().replace(/&gt;/g,'\\gt').replace(/&lt;/g,'\\lt') + '$';
            }
        }
    }
    return input
}