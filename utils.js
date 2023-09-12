const mergePredClusterData = (pred, cluster) => {
    if(!pred || !cluster) return [];
    if(pred.length !== cluster.length) return [];

    const mergedData = pred.map((coordinate, index) => {
        return {
            type: cluster[index],
            x: coordinate[0],
            y: coordinate[1],
        };
    });

    return mergedData;
}

const utils = {
    mergePredClusterData
}

module.exports = utils;