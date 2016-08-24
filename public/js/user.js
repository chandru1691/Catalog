var g_id = '', g_email = '';
var init = function () {
    var search_ = ($('#userSearch').val() != null && $('#userSearch').val() != '') ? ('?search=' + $('#userSearch').val()) : '';
    $.get('/api/users' + search_, {}, function (r) {
        var str = '';
        for (var i = 0; i < r.length; i++) {
            var name = '',
                email = '';
            if (r[i].facebook) {
                name = r[i].facebook.name;
                email = r[i].facebook.email;
            } else {
                name = r[i].google.name;
                email = r[i].google.email;
            }
            str += '<tr><td>' + name + '</td><td>' + email + '</td><td><a data-id="' + r[i]._id + '" data-email="' + email + '" onclick="viewCatalog($(this))">View Catalogs</a></td></tr>';
        }
        $('#userList').html(str);
        $('.user-catalog').hide();
        $('.user-list').show();
    }, 'json');
};
init();
var viewCatalog = function (me) {
    if(me != null){
        g_id = me.attr('data-id');
        g_email = me.attr('data-email');
    }
    $('#userCatalogSearch').attr('data-id', g_id);
    $('.user-catalog .head').text('Users -> ' + g_email);
    var search_ = ($('#userCatalogSearch').val() != null && $('#userCatalogSearch').val() != '') ? ('?search=' + $('#userCatalogSearch').val()) : '';
    $.get('/api/users/personal/' + g_id + search_, {}, function (r) {
        var str = '';
        for (var i = 0; i < r.d.length; i++) {
            str += '<tr><td>' + r.d[i].item + '</td><td>' + r.d[i].isbn + '</td><td>' + r.d[i].description + '</td><td>' + r.d[i].author + '</td><td>' + (((r.d[i].access.indexOf(r.me) != -1) || (r.d[i].owner == r.me)) ? '' : '<a onclick="addMe(\'' + r.d[i]._id + '\');">Add to My List</a>') + '</td></tr>';
        }
        $('#userCatalogList').html(str);
        $('.user-list').hide();
        $('.user-catalog').show();
    }, 'json');
};
var addMe = function (id) {
    var url = '/api/source/' + id;
    $.put(url, function (r) {
        alert('Added your list Successfully!.');
        viewCatalog();
    }, 'json');
};