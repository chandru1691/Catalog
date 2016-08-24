var init = function () {
    var search_ = ($('#catalogSearch').val() != null && $('#catalogSearch').val() != '')?('?search='+$('#catalogSearch').val()):'';
    $.get('/api/source'+search_, {}, function (r) {
        var str = '';
        for (var i = 0; i < r.d.length; i++) {
            str += '<tr><td>' + r.d[i].item + '</td><td>' + r.d[i].isbn + '</td><td>' + r.d[i].description + '</td><td>' + r.d[i].author + '</td><td>' + (((r.d[i].access.indexOf(r.me) != -1) || (r.d[i].owner == r.me)) ? '' : '<a onclick="addMe(\'' + r.d[i]._id + '\');">Add to My List</a>') + '</td></tr>';
        }
        $('#allCatalog').html(str);
    }, 'json');
};
var addMe = function (id) {
    var url = '/api/source/' + id;
    $.put(url, function (r) {
        alert('Added your list Successfully!.');
        init();
    }, 'json');
};
init();