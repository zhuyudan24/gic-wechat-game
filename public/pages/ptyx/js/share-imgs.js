function imgListFunc (type) {
    return {
        // 可自定义的图片
        shareGameBackgroundImgUrl: '../images/' + type + '/share-bg.png',
        shareGameBannerImgUrl: '../images/' + type + '/share-banner.png',
        shareGameShareButtonImgUrl: '../images/' + type + '/share-giveBtn.png'
    }

        // 不可自定义的图片
    //     challengeSuccessBg: '../images/' + type + '/challenge-success-bg.png',
    //     dialogBg: '../images/' + type + '/dialog-bg.png',
    //     giveSuccessBg: '../images/' + type + '/give-success-bg.png',
    //     integralPlay: '../images/' + type + '/integral-play.png',
    //     okBtn: '../images/' + type + '/ok-btn.png',
    //     playAgain: '../images/' + type + '/play-again.png',
    //     rankSmall: '../images/' + type + '/rank-small.png',
    //     ruleBg: '../images/' + type + '/rule-bg.png',
    //     shareGetTimes1: '../images/' + type + '/share-getTimes1.png',
    //     shareGetTimes2: '../images/' + type + '/share-getTimes2.png',
    //     shareGetTimes3: '../images/' + type + '/share-getTimes3.png',
    //     shareGetTimes4: '../images/' + type + '/share-getTimes4.png',
    //     shareTip: '../images/' + type + '/share-tip.png',
    //     entryRankBg: '../images/' + type + '/entry-rankBg.png',
    //     entryPrizeBg: '../images/' + type + '/entry-prizeBg.png'
    // };
};

function replaceableImgFunc(obj,type) {
    var imgObj = imgListFunc(type);
     // 处理可替换的图片
    if (obj.shareGame) {
        imgObj.shareGameBackgroundImgUrl = obj.shareGame.backgroundImgUrl || imgObj.shareGameBackgroundImgUrl;
        imgObj.shareGameBannerImgUrl = obj.shareGame.bannerImgUrl || imgObj.shareGameBannerImgUrl;
        imgObj.shareGameShareButtonImgUrl = obj.shareGame.shareButtonImgUrl || imgObj.shareGameShareButtonImgUrl;
    }
    return imgObj;
}


