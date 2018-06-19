const Source = {
    Ximalaya: 'ximalaya',

    getUrl(source, id) {
        switch (source) {
            case Source.Ximalaya:
            return `http://www.ximalaya.com/revision/play/album?albumId=${id}&pageNum=1&sort=-1&pageSize=300`;
        }
    }
};

module.exports = {
    Source,
};
