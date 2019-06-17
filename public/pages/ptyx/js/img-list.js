function imgListFunc (type) {
    return {
        // 可自定义的图片
        accessGameBackgroundImgUrl: 'images/' + type + '/entry-bg.png',
        accessGameBannerImgUrl: 'images/' + type + '/entry-banner.png',
        accessGameAccessButtonImgUrl: 'images/' + type + '/entry-entryBtn.png',
        accessGameRankingButtonImgUrl: 'images/' + type + '/entry-rankBtn.png',
        accessGamePrizeButtonImgUrl: 'images/' + type + '/entry-prizeBtn.png',
        startGameBackgroundImgUrl: 'images/' + type + '/main-bg.png',
        startGameBannerImgUrl: 'images/' + type + '/main-box.png',
        startGameStartButtonImgUrl: 'images/' + type + '/main-startBtn.png',
        startGameTipButtonImgUrl: 'images/' + type + '/main-tipBtn.png',
        startGameContinueButtonImgUrl: 'images/' + type + '/main-continueBtn.png',
        startGameShareButtonImgUrl: 'images/' + type + '/main-shareBtn.png',
        // shareGameBackgroundImgUrl: 'images/' + type + '/share-bg.png',
        // shareGameBannerImgUrl: 'images/' + type + '/share-banner.png',
        // shareGameShareButtonImgUrl: 'images/' + type + '/share-giveBtn.png',

        // 不可自定义的图片
        challengeSuccessBg: 'images/' + type + '/challenge-success-bg.png',
        mainTimesBtn:'images/' + type + '/main-times.png',
        dialogBg: 'images/' + type + '/dialog-bg.png',
        giveSuccessBg: 'images/' + type + '/give-success-bg.png',
        integralPlay: 'images/' + type + '/integral-play.png',
        okBtn: 'images/' + type + '/ok-btn.png',
        playAgain: 'images/' + type + '/play-again.png',
        rankSmall: 'images/' + type + '/rank-small.png',
        ruleBg: 'images/' + type + '/rule-bg.png',
        shareGetTimes1: 'images/' + type + '/share-getTimes1.png',
        shareGetTimes2: 'images/' + type + '/share-getTimes2.png',
        shareGetTimes3: 'images/' + type + '/share-getTimes3.png',
        shareGetTimes4: 'images/' + type + '/share-getTimes4.png',
        shareTip: 'images/' + type + '/share-tip.png',
        entryRankBg: 'images/' + type + '/entry-rankBg.png',
        entryPrizeBg: 'images/' + type + '/entry-prizeBg.png'
    };
};

function replaceableImgFunc(obj,type) {
    var imgObj = imgListFunc(type);
     // 处理可替换的图片
     if (obj.accessGame) {
        imgObj.accessGameBackgroundImgUrl = obj.accessGame.backgroundImgUrl || imgObj.accessGameBackgroundImgUrl;
        imgObj.accessGameBannerImgUrl = obj.accessGame.bannerImgUrl || imgObj.accessGameBannerImgUrl;
        imgObj.accessGameAccessButtonImgUrl = obj.accessGame.accessButtonImgUrl || imgObj.accessGameAccessButtonImgUrl;
        imgObj.accessGameRankingButtonImgUrl = obj.accessGame.rankingButtonImgUrl || imgObj.accessGameRankingButtonImgUrl;
        imgObj.accessGamePrizeButtonImgUrl = obj.accessGame.prizeButtonImgUrl || imgObj.accessGamePrizeButtonImgUrl;
    }
    if (obj.startGame) {
        imgObj.startGameBackgroundImgUrl = obj.startGame.backgroundImgUrl || imgObj.startGameBackgroundImgUrl;
        imgObj.startGameBannerImgUrl = obj.startGame.bannerImgUrl || imgObj.startGameBannerImgUrl;
        imgObj.startGameContinueButtonImgUrl = obj.startGame.continueButtonImgUrl || imgObj.startGameContinueButtonImgUrl;
        imgObj.startGameShareButtonImgUrl= obj.startGame.shareButtonImgUrl || imgObj.startGameShareButtonImgUrl;
        imgObj.startGameStartButtonImgUrl = obj.startGame.startButtonImgUrl || imgObj.startGameStartButtonImgUrl;
        imgObj.startGameTipButtonImgUrl = obj.startGame.tipButtonImgUrl || imgObj.startGameTipButtonImgUrl;
    }
    if (obj.shareGame) {
        imgObj.shareGameBackgroundImgUrl = obj.shareGame.backgroundImgUrl || imgObj.shareGameBackgroundImgUrl;
        imgObj.shareGameBannerImgUrl = obj.shareGame.bannerImgUrl || imgObj.shareGameBannerImgUrl;
        imgObj.shareGameShareButtonImgUrl = obj.shareGame.shareButtonImgUrl || imgObj.shareGameShareButtonImgUrl;
    }
    return imgObj;
}


