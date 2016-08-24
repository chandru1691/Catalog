var present_id = '';
var init = function () {
    var search_ = ($('#myCatalogSearch').val() != null && $('#myCatalogSearch').val() != '')?('?search='+$('#myCatalogSearch').val()):'';
    $.get('/api/source/personal'+search_, {}, function (r) {
        var str = '';
        for (var i = 0; i < r.d.length; i++) {
            str += '<tr><td>' + r.d[i].item + '</td><td>' + r.d[i].isbn + '</td><td>' + r.d[i].description + '</td><td>' + r.d[i].author + '</td><td data-id="' + r.d[i]._id + '">'+((r.d[i].owner == r.me)?'<a onclick="editCatalog($(this))">Edit</a> | <a onclick="deleteCatalog($(this))">Delete</a>':'')+'</td></tr>';
        }
        $('#myCatalog').html(str);
        $('.add-catalog').hide();
        $('.list-catalog').show();
    }, 'json');
};
var editCatalog = function (me) {
    present_id = me.parent().attr('data-id');
    $.get('/api/source/personal/' + me.parent().attr('data-id'), {}, function (r) {
        $('#title').val(r.d[0].item);
        $('#isbn').val(r.d[0].isbn);
        $('#description').val(r.d[0].description);
        $('#author').val(r.d[0].author);
        $('.list-catalog').hide();
        $('.add-catalog').show();
    }, 'json');
}
var addmodifyCatalog = function () {
    var m = 'post';
    var l = '/api/source';
    if (present_id != '') {
        m = 'put';
        l = '/api/source/' + present_id;
    }
    $[m](l, {
        item: $('#title').val(),
        isbn: $('#isbn').val(),
        description: $('#description').val(),
        author: $('#author').val()
    }, function (r) {
        alert('Saved Successfully!.');
        init();
        present_id = '';
    }, 'json');
};
var deleteCatalog = function (me) {
    $['delete']('/api/source/personal/' + me.parent().attr('data-id'), {}, function (r) {
        alert('Deleted Successfully!.');
        init();
    }, 'json');
}
init();