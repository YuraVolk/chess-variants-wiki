import Glicko2 from 'glicko2'
import { GlickoDefaults } from 'lib/conf/glickoDefaults'
import { getCompositeRating } from 'lib/conf/compositeRatings'

const l = console.log.bind(console)

const CompScaleFactor = 6
const CompScaleFactorTeams = 4

let standings, players, avgRating, q, composite, isComp, weightPercentage, gameNr, result // params
let playersByStanding, playerRatings, ratingMode

const getRating = player => {
    return getCompositeRating(player, q)
}

export function calcFfaRatingChanges(params) {
    standings = params.standings
    players = params.players
    avgRating = params.avgRating
    q = params.q
    composite = params.composite
    isComp = !/^rt:/.test(composite)
    weightPercentage = params.weightPercentage || 0
    gameNr = params.gameNr

    ratingMode  = q.ratingMode;

    playerRatings = {}
    for (const p of players) {
        if ( p && p.playerId) playerRatings[p.playerId] = getRating(p)
    }

    if (q.ruleVariants.play4mate) ratingMode = 'points'
    if (standings.length === 3) return calcFfaRatingChanges3players()
    if (standings.length === 2) return calcFfaRatingChanges2players()

    let first, second, third, fourth: any
    first  = players[standings[0].seat]
    second = players[standings[1].seat]
    third  = players[standings[2].seat]
    fourth = players[standings[3].seat]
    playersByStanding = [first, second, third, fourth]

    let ratingFormula = {
        wins: [0, 0, 0, 0],
        losses: [0, 0, 0, 0]
    }
    if (ratingMode === 'points') {
        let avg = 0; for (let s of standings) avg += s.points
        avg /= standings.length
        let totalWins = 0
        for (let i of [0, 1, 2, 3]) {
            ratingFormula.wins[i] = standings[i].points - avg
            if (ratingFormula.wins[i] < 0) {
                ratingFormula.losses[i] = -ratingFormula.wins[i]
                ratingFormula.wins[i] = 0
            }
            totalWins += ratingFormula.wins[i]
        }
        const scale = totalWins > 0 ? 4 / totalWins : 1
        for (let i of [0, 1, 2, 3]) {
            ratingFormula.wins[i] *= scale
            ratingFormula.losses[i] *= scale
        }
        // l('by points:', {standings}, {avg}, {scale}, {wins}, {losses})
    } else {
        ratingFormula = getRatingFormula4player(ratingMode, avgRating)
    }

    let tied = []
    let tied2 = []
    if (standings[0].points === standings[3].points) tied = [0, 1, 2, 3] // 4way tie
    else if (standings[0].points === standings[2].points) tied = [0, 1, 2] // first 3 tied
    else if (standings[1].points === standings[3].points) tied = [1, 2, 3] // 2nd-4th tied
    else if (standings[0].points === standings[1].points) tied = [0, 1] // 1nd-2nd tied
    else if (standings[1].points === standings[2].points) tied = [1, 2] // 2nd-3rd tied
    if (standings[2].points === standings[3].points) tied2 = [2, 3] // 3rd-4th tied
    const ties = tied.length ? [tied] : []
    if (tied2.length) ties.push(tied2)

    return doFfaCalc(ties, ratingFormula.wins, ratingFormula.losses)
}

function calcFfaRatingChanges3players() {
    let first, second, third: any
    first  = players[standings[0].seat]
    second = players[standings[1].seat]
    third  = players[standings[2].seat]
    playersByStanding = [first, second, third]
    // Create glicko players
    let ratingFormula = {
        wins: [0, 0, 0],
        losses: [0, 0, 0]
    }
    if (ratingMode === 'points') {
        let avg = 0; for (let s of standings) avg += s.points
        avg /= standings.length
        let totalWins = 0
        for (let i of [0, 1, 2]) {
            ratingFormula.wins[i] = standings[i].points - avg
            if (ratingFormula.wins[i] < 0) {
                ratingFormula.losses[i] = -ratingFormula.wins[i]
                ratingFormula.wins[i] = 0
            }
            totalWins += ratingFormula.wins[i]
        }
        const scale = totalWins > 0 ? 3 / totalWins : 1
        for (let i of [0, 1, 2]) {
            ratingFormula.wins[i] *= scale
            ratingFormula.losses[i] *= scale
        }
        // l('by points:', {standings}, {avg}, {scale}, {wins}, {losses})
    } else {
        ratingFormula = getRatingFormula3player(ratingMode, avgRating)
    }

    let tied = []
    if (standings[0].points === standings[2].points) tied = [0, 1, 2] // 3way tie
    else if (standings[0].points === standings[1].points) tied = [0, 1] // first 2 tied
    else if (standings[1].points === standings[2].points) tied = [1, 2] // 2nd-3rd tied
    const ties = tied.length ? [tied] : []

    return doFfaCalc(ties, ratingFormula.wins, ratingFormula.losses)
}

function calcFfaRatingChanges2players() {
    const glicko = new Glicko2.Glicko2(GlickoDefaults)
    let first, second: any
    first  = players[standings[0].seat]
    second = players[standings[1].seat]
    // Create glicko players

    const result = standings[0].points === standings[1].points ? 0.5 : standings[0].points > standings[1].points ? 1 : 0

    const glickoPlayer1 = glicko.makePlayer(playerRatings[first.playerId].rating, playerRatings[first.playerId].deviation, playerRatings[first.playerId].volatility)
    const glickoPlayer2 = glicko.makePlayer(playerRatings[second.playerId].rating, playerRatings[second.playerId].deviation, playerRatings[second.playerId].volatility)
    glicko.updateRatings([[glickoPlayer1, glickoPlayer2, result]])
    let ratingDiffs:any = {}
    let devitionDiffs:any = {}
    let volatilityDiffs:any = {}

    let scaleBy = isComp ? weightPercentage * CompScaleFactor : 2/3
    if (q.ratingType && isComp && q.affectComps) scaleBy *= q.affectComps/100
    // console.log(composite, q.ratingType , isComp ,weightPercentage,q.affectComps,scaleBy)

    ratingDiffs[first.playerId]      = scaleBy * (glickoPlayer1.getRating() - playerRatings[first.playerId].rating)
    ratingDiffs[second.playerId]     = scaleBy * (glickoPlayer2.getRating() - playerRatings[second.playerId].rating)
    devitionDiffs[first.playerId]    = glickoPlayer1.getRd() - playerRatings[first.playerId].deviation
    devitionDiffs[second.playerId]   = glickoPlayer2.getRd() - playerRatings[second.playerId].deviation
    volatilityDiffs[first.playerId]  = glickoPlayer1.getVol() - playerRatings[first.playerId].volatility
    volatilityDiffs[second.playerId] = Player2.getVol() - playerRatings[second.playerId].volatility

    // return diffs by seats, not standings
    var dr = [], dd = [], dv = []
    for (let seat of [0, 1, 2, 3]) {
        dr[seat] = players[seat] ? ratingDiffs[players[seat].playerId] : 0
        dd[seat] = players[seat] ? devitionDiffs[players[seat].playerId] : 0
        dv[seat] = players[seat] ? volatilityDiffs[players[seat].playerId] : 0
    }
    return {rating: dr, deviation: dd, volatility: dv}
}


function doFfaCalc(ties, wins, losses) {
    for (let tie of ties) {
        if (tie.length) {
            let totalWins = 0
            let totalLosses = 0
            for (let i of tie) {
                totalWins += wins[i]
                totalLosses += losses[i]
            }
            for (let i of tie) {
                wins[i] = totalWins / tie.length
                losses[i] = totalLosses / tie.length
            }
        }
    }

    let avgPlayer = makeAvgPlayer()
    const realAvg = avgPlayer.rating
    let data:any


    // we run the calc over and over changing avgPlayer.rating until the sum of changes is near 0 (to prevent inflation/deflation)
    // about 15% of games are aborted. assuming avg 3 points lost per abort (this is a conservative guess)
    // we need to add about 0.5 points back per game to compensate.
    // for solo and variants, aborts are slightly more frequent
    // for bullet, abort losses are half.
    let minRatingDiffSum = -0.1
    let maxRatingDiffSum = 0.5
    let ratingDiffSum, avgToUse, doagain
    let maxIterations = 0
    let avgDiff
    // max 180 diff from real avg, otherwise it gets too distorted (relatively rare case, only if rating span is v large)
    // const isWta = ratingMode === 'wta' || ratingMode === 'points' && q.ratingMode === 'wta' //solo p4m

    // problem with old FFA was no room for bending in 3 0 0 -3 -> 1st = -4th which is just wrong
    // with new ffa morphing:
    // 1st is always (3,4)
    // 2nd is always (-1.33, 1)
    // 3rd is always (-1.33, -1)
    // 4th is always (-3, -1.33)So the only one that ever gets close to 0 is 2nd.
    // so there are always 3 ratings to bend with which should work out ok
    const isWta = ratingMode === 'wta' || /^m\d+/.test(ratingMode) || (ratingMode === 'points' && q.ratingMode === 'wta') //solo p4m

    const maxDiff = isWta ? 1000 : 120
    do {
        data = doMatches(wins, losses, avgPlayer, true)
        ratingDiffSum = 0
        // l(data.ratingDiffs)
        for (let p of playersByStanding) ratingDiffSum += data.ratingDiffs[p.playerId]

        avgDiff = realAvg - avgPlayer.rating
        // l({avgDiff}, maxDiff/2, {ratingDiffSum})
        doagain = Math.abs(avgDiff) < maxDiff/2 && (ratingDiffSum < minRatingDiffSum || ratingDiffSum > maxRatingDiffSum)
        if (doagain) avgPlayer.rating -= (ratingDiffSum > 0 ? 5 : 10) * ratingDiffSum
    } while(doagain && maxIterations++ < 30)
    avgToUse = avgPlayer.rating
    if (!isWta) avgToUse = avgPlayer.rating + avgDiff/2
    // l({avgToUse})
    avgDiff = realAvg - avgToUse
    // l({avgDiff})
    if (Math.abs(avgDiff) > maxDiff) {
        avgToUse = realAvg + (realAvg < avgPlayer.rating ? maxDiff : -maxDiff)
        // l('akdkd')
    }
    let s:any = [Math.round(avgToUse)]
    for (let p of playersByStanding) s.push(Math.round(playerRatings[p.playerId].rating))
    s.push(realAvg.toFixed(0))
    s.push(avgDiff.toFixed(0))
    s.push(ratingDiffSum.toFixed(2))
    s.push('#' + gameNr)
    l(ratingMode + 'RatingCalcAvg:', s.join(','))

    avgPlayer = makeAvgPlayer() // with avg dev&vol
    avgPlayer.rating = avgToUse
    // }
    data = doMatches(wins, losses, avgPlayer)

    // return diffs by seats, not standings
    var dr = [], dd = [], dv = []
    for (let seat of [0, 1, 2, 3]) {
        dr[seat] = players[seat] ? data.ratingDiffs[players[seat].playerId] : 0
        dd[seat] = players[seat] ? data.devitionDiffs[players[seat].playerId] : 0
        dv[seat] = players[seat] ? data.volatilityDiffs[players[seat].playerId] : 0
    }
    return {rating: dr, deviation: dd, volatility: dv}
}


function doMatches(wins, losses, avgPlayer, forApprox?) {
    const glicko = new Glicko2.Glicko2(GlickoDefaults)
    if (forApprox) {
        avgPlayer.deviation = 65
        avgPlayer.volatility = 0.06
    }

    let ratingDiffs:any = {}
    let devitionDiffs:any = {}
    let volatilityDiffs:any = {}

    let i = 0
    while (i < playersByStanding.length) {
        const player = playersByStanding[i]
        const pRating = playerRatings[player.playerId]
        let diff = 0
        if (wins[i] > 0) {

            const glickoPlayer = glicko.makePlayer(pRating.rating, forApprox ? 65 : pRating.deviation, forApprox ? 0.06 : pRating.volatility)
            const glickoOpponent = glicko.makePlayer(avgPlayer.rating, avgPlayer.deviation, avgPlayer.volatility)
            glicko.updateRatings([[glickoPlayer, glickoOpponent, 1]])
            diff += wins[i] * (glickoPlayer.getRating() - pRating.rating)
        }
        if (losses[i] > 0) {
            const glickoPlayer = glicko.makePlayer(pRating.rating, forApprox ? 65 : pRating.deviation, forApprox ? 0.06 : pRating.volatility)
            const glickoOpponent = glicko.makePlayer(avgPlayer.rating, avgPlayer.deviation, avgPlayer.volatility)
            glicko.updateRatings([[glickoPlayer, glickoOpponent, 0]])
            diff += losses[i] * (glickoPlayer.getRating() - pRating.rating)
        }

        let scaleBy = isComp ? weightPercentage * CompScaleFactor : 2/3
        if (q.ratingType && isComp && q.affectComps) scaleBy *= q.affectComps/100
        // if (!forApprox) console.log(q.ratingType , isComp ,weightPercentage,q.affectComps,scaleBy)

        ratingDiffs[player.playerId] = diff * scaleBy
        if (forApprox) { i++; continue }

        // play 1 match for deviation/volatility
        const glickoPlayer = glicko.makePlayer(pRating.rating, forApprox ? 65 : pRating.deviation, forApprox ? 0.06 : pRating.volatility)
        const glickoOpponent = glicko.makePlayer(avgPlayer.rating, avgPlayer.deviation, avgPlayer.volatility)
        glicko.updateRatings([[glickoPlayer, glickoOpponent, 0.5]]) // result doesn't matter
        devitionDiffs[player.playerId] = glickoPlayer.getRd() - pRating.deviation
        volatilityDiffs[player.playerId] = glickoPlayer.getVol() - pRating.volatility
        i++
    }

    return {ratingDiffs, devitionDiffs, volatilityDiffs}
}

function makeAvgPlayer() {
    let sums = { rating: 0, deviation: 0, volatility: 0 }
    for (let p of playersByStanding) {
        const pRating = playerRatings[p.playerId]
        sums.rating     += pRating.rating
        sums.deviation  += pRating.deviation
        sums.volatility += pRating.volatility
    }
    const n = playersByStanding.length
    return {
        rating: sums.rating / n,
        deviation: sums.deviation / n,
        volatility: sums.volatility / n
    }
}


export function calcTeamsRatingChanges(params) {
    const glicko = new Glicko2.Glicko2(GlickoDefaults)
    result = params.result
    players = params.players
    q = params.q
    composite = params.composite
    isComp = !/^rt:/.test(composite)
    weightPercentage = params.weightPercentage || 0
    gameNr = params.gameNr

    ratingMode = q.ratingMode

    var teammate = q.ruleVariants.teammate
    var opponent1 = 1
    var opponent2 = 3
    if (teammate !== 1 && teammate !== 3) { teammate = 2; }
    if (teammate === 1) { opponent1 = 2; opponent2 = 3; }
    if (teammate === 3) { opponent1 = 1; opponent2 = 2; }

    playerRatings = {}
    for (const p of players) {
        if (p && p.playerId) playerRatings[p.playerId] = getRating(p)
    }

    const redRating = playerRatings[players[0].playerId]
    const teammateRating = playerRatings[players[teammate].playerId]
    const opponent1Rating = playerRatings[players[opponent1].playerId]
    const opponent2Rating = playerRatings[players[opponent2].playerId]

    // Create 2 glicko teams
    const team1RatingDiff = redRating.rating - teammateRating.rating
    const team2RatingDiff = opponent1Rating.rating - opponent2Rating.rating

    let team1AverageRating, team1AverageDev, team1AverageVol
    let team2AverageRating, team2AverageDev, team2AverageVol
    // The higher rated player in each team is weighted 2/3 more than their lower rated counterpart.
    if (team1RatingDiff > 0) {
        team1AverageRating = redRating.rating * (2 / 3) + teammateRating.rating * (1 / 3)
    } else {
        team1AverageRating = redRating.rating * (1 / 3) + teammateRating.rating * (2 / 3)
    }
    team1AverageDev = redRating.deviation * (1 / 2) + teammateRating.deviation * (1 / 2)
    team1AverageVol = redRating.volatility * (1 / 2) + teammateRating.volatility * (1 / 2)

    if (team2RatingDiff > 0) {
        team2AverageRating = opponent1Rating.rating * (2 / 3) + opponent2Rating.rating * (1 / 3)
    } else {
        team2AverageRating = opponent1Rating.rating * (1 / 3) + opponent2Rating.rating * (2 / 3)
    }
    team2AverageDev = opponent1Rating.deviation * (1 / 2) + opponent2Rating.deviation * (1 / 2)
    team2AverageVol = opponent1Rating.volatility * (1 / 2) + opponent2Rating.volatility * (1 / 2)

    // make players using team avg ratings but indiv. deviations
    var g1 = glicko.makePlayer(team1AverageRating, redRating.deviation, redRating.volatility)
    var g2 = glicko.makePlayer(team2AverageRating, opponent1Rating.deviation, opponent1Rating.volatility)
    var g3 = glicko.makePlayer(team1AverageRating, teammateRating.deviation, teammateRating.volatility)
    var g4 = glicko.makePlayer(team2AverageRating, opponent2Rating.deviation, opponent2Rating.volatility)

    // "enemy player"
    var gTeam1 = glicko.makePlayer(team1AverageRating, team1AverageDev, team1AverageVol)
    var gTeam2 = glicko.makePlayer(team2AverageRating, team2AverageDev, team2AverageVol)

    // use as for each player
    let matches = []
    matches.push([g1, gTeam2, result])
    matches.push([g3, gTeam2, result])
    matches.push([gTeam1, g2, result])
    matches.push([gTeam1, g4, result])
    glicko.updateRatings(matches)

    let scaleBy = isComp ? weightPercentage * CompScaleFactorTeams : 1
    if (q.ratingType && isComp && q.affectComps) scaleBy *= q.affectComps/100

    const dr1 = (g1.getRating() - team1AverageRating) * scaleBy // + 0.05 // comp for aborts
    const dr2 = (g2.getRating() - team2AverageRating) * scaleBy // + 0.05 // comp for aborts
    const dr3 = (g3.getRating() - team1AverageRating) * scaleBy // + 0.05 // comp for aborts
    const dr4 = (g4.getRating() - team2AverageRating) * scaleBy // + 0.05 // comp for aborts

    const dd1 = g1.getRd() - redRating.deviation
    const dd2 = g2.getRd() - opponent1Rating.deviation
    const dd3 = g3.getRd() - teammateRating.deviation
    const dd4 = g4.getRd() - opponent2Rating.deviation

    const dv1 = g1.getVol() - redRating.volatility
    const dv2 = g2.getVol() - opponent1Rating.volatility
    const dv3 = g3.getVol() - teammateRating.volatility
    const dv4 = g4.getVol() - opponent2Rating.volatility

    // return ratings in order of seats (not standings)
    let dr, dd, dv
    if (teammate === 1) {
        dr = [ dr1, dr3, dr2, dr4 ]
        dd = [ dd1, dd3, dd2, dd4 ]
        dv = [ dv1, dv3, dv2, dv4 ]
    } else if (teammate === 3) {
        dr = [ dr1, dr2, dr4, dr3 ]
        dd = [ dd1, dd2, dd4, dd3 ]
        dv = [ dv1, dv2, dv4, dv3 ]
    } else {
        dr = [ dr1, dr2, dr3, dr4 ]
        dd = [ dd1, dd2, dd3, dd4 ]
        dv = [ dv1, dv2, dv3, dv4 ]
    }
    return {rating: dr, deviation: dd, volatility: dv}
}


export const getRatingFormula4player = (ratingMode, avgRating) => {
    let wins = [0, 0, 0, 0]
    let losses = [0, 0, 0, 0]
    if (ratingMode === 'std') {
        wins = [3, 1, 0, 0]
        losses = [0, 0, 1, 3]
    } else if (ratingMode === 'wta') {
        wins = [4, 0, 0, 0]
        losses = [0, 4/3, 4/3, 4/3]
    } else if (ratingMode === 'wtm') {
        wins = [3, 1, 0, 0]
        losses = [0, 1, 1, 2]
    } else {
        // morph ffa => solo as avgRating goes up
        let mD = /^m(\d{4})$/.exec(ratingMode)
        const soloPoint = mD ? parseInt(mD[1], 10) : 2500
        const a1 = 1
        const a2 = 7/3
        const a4 = 5/3
        const b1 = 624
        const b2 = 3/4372
        const b4 = 3122/3
        const c1 = 3
        const c2 = -4/3
        const c4 = -3
        const d = (soloPoint - 2 * avgRating + 1500) / (soloPoint - 1500)
        const w1 = a1 * Math.pow(Math.pow(b1, d) + 1, -1) + c1 // FirstScoring, always >0
        const w2 = a2 * Math.pow(Math.pow(b2, d) + 1, -1) + c2 // SecondScoring
        const w4 = a4 * Math.pow(Math.pow(b4, d) + 1, -1) + c4 // FourthScoring, always <0
        const w3 = -1 * ( w1 + w2 + w4 ) // ThirdScoring, always <0

        wins = [w1, 0, 0, 0]
        losses = [0, 0, -w3, -w4]
        if (w2 >= 0) { wins[1] = w2 }
        else { losses[1] = -w2 }

    }

    return { wins, losses }
    // l({gameNr, avgRating, soloPoint, wins, losses})
}

export const getRatingFormula3player = (ratingMode, avgRating) => {
    let wins = [0, 0, 0]
    let losses = [0, 0, 0]
    if (ratingMode === 'std') {
        wins = [2, 0.5, 0]
        losses = [0, 0.5, 2]
    } else if (ratingMode === 'wta') {
        wins = [2.5, 0, 0]
        losses = [0, 1.25, 1.25]
    } else {
        // morph ffa => solo as avgRating goes up
        let mD = /^m(\d{4})$/.exec(ratingMode)
        const soloPoint = mD ? parseInt(mD[1], 10) : 2500
        const a1 = 9/4
        const a3 = -3/2
        const a4 = -9/4
        const d = (soloPoint - 2 * avgRating + 1500) / (soloPoint - 1500)
        const w1 = 3/4 * Math.pow(Math.pow(1871/4, d) + 1, -1) + a1 // FirstWins
        const l2 = 3/4 * Math.pow(Math.pow(1871/4, -d) + 1, -1) + a3 // SecondLoss
        const l3 = 3/4 * Math.pow(Math.pow(1871/4, d) + 1, -1) + a4 // ThirdLoss
        const w2 = -1 * (w1 + l2 + l3) // SecondWins
        wins = [w1, w2, 0]
        losses = [0, -l2, -l3]
        if (avgRating >= soloPoint) {
            wins = [3, 0, 0]
            losses = [0, 1.5, 1.5]
        }
    }
    // l({gameNr, avgRating, soloPoint, wins, losses})
    return { wins, losses }
}