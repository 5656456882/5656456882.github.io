L.Control.MyMousePosition = L.Control.extend({
    options: {
        position: 'bottomleft',
        emptyString: '经度: 0  纬度: 0',//默认信息
        lngFirst: true,
        numDigits: 4,//小数点位数
        lngFormatter: undefined,
        latFormatter: undefined,
        prefix: ""
    },
    onAdd: function (map) {// L.Control原生方法
        this._container = L.DomUtil.create('div', `gm-leaflet-control-mouseposition`);
        L.DomEvent.disableClickPropagation(this._container);
        map.on('mousemove', this._onMouseMove, this);
        this._container.innerHTML = this.options.emptyString;
        return this._container;
    },
    onRemove: function (map) {// L.Control 原生方法
        // 删除DOM
        L.DomUtil.remove(this._container);
        // 删除监听
        map.off('mousemove', this._onMouseMove)
    },
    _onMouseMove: function (e) {// 自定义方法
        var lng = this.options.lngFormatter ? this.options.lngFormatter(e.latlng.lng) : L.Util.formatNum(e.latlng.lng, this.options.numDigits);
        var lat = this.options.latFormatter ? this.options.latFormatter(e.latlng.lat) : L.Util.formatNum(e.latlng.lat, this.options.numDigits);
        var value = '经度：' + lng + '  纬度：' + lat;
        var prefixAndValue = this.options.prefix + ' ' + value;
        this._container.innerHTML = prefixAndValue;
    }
});
L.Map.mergeOptions({
    positionControl: false
});
L.Map.addInitHook(function () {
    if (this.options.positionControl) {
        this.positionControl = new L.Control.MyMousePosition();
        this.addControl(this.positionControl);
    }
});
// 添加到L.control 控件中，注意这里是小写
L.control.myMousePosition = function (options) {
    return new L.Control.MyMousePosition(options);
};