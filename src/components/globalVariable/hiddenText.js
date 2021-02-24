export function mouseenter(e, children) {
    if ($(e.target).find(children).children().width() > $(e.target).find(children).width()) {
        $(e.target).find(children).children().css({
            'text-overflow': 'clip',
            'position': 'absolute',
            'left': -($(e.target).find(children).children().width() - $(e.target).find(children).width()),
        })
    } else {
        $(e.target).find(children).children().css({
            'text-overflow': 'clip',
            'position': 'initial',
            'left': 0,
        })
    }
}
export function mouseleave(e, children) {
    if ($(e.target).find(children).children().width() > $(e.target).find(children).width()) {
        $(e.target).find(children).children().css({
            'text-overflow': 'ellipsis',
            'position': 'initial',
            'left': 0,
        })
    } else {
        $(e.target).find(children).children().css({
            'text-overflow': 'clip',
            'position': 'initial',
            'left': 0,
        })
    }
}