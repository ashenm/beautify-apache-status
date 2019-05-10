(function () {

  document.onreadystatechange = function onDOMContentLoaded () {

    if (document.readyState !== 'interactive') { return; }

    var lead = document.createElement('ul');
    var meta = document.createElement('meta');
    var bootstrap = document.createElement('link');
    var legend = document.createElement('div');
    var style = document.createElement('style');
    var toggler = document.createElement('li');
    var load = document.createElement('div');

    var map = {
      '_': { color: 'bg-info', desc: 'Waiting for Connection' },
      'S': { color: 'bg-warning', desc: 'Starting up' },
      'R': { color: 'bg-goldenrod', desc: 'Reading Request' },
      'W': { color: 'bg-success', desc: 'Sending Reply' },
      'K': { color: 'bg-yellowgreen', desc: 'Keepalive (read)' },
      'D': { color: 'bg-dark', desc: 'DNS Lookup' },
      'C': { color: 'bg-yellow', desc: 'Closing Connection' },
      'L': { color: 'bg-secondary', desc: 'Logging' },
      'G': { color: 'bg-success', desc: 'Gracefully finishing' },
      'I': { color: 'bg-peachpuff', desc: 'Idle cleanup of worker' },
      '.': { color: 'bg-light', desc: 'Open slot (no process)' }
    };

    // lead summary
    var stats = [ '<div class="table-responsive"><table class="table table-sm table-borderless">' ];

    // scoreboard legend entries
    legend.segsHTML = [ ];

    // construct scoreboard legend keys
    Object.values(map).forEach(function (o) {
      legend.segsHTML.push('<div class="col-2" style="font-size: x-small;"><span class="d-inline-block ' + o.color + '" style="width: 8px; height: 8px;"></span> ' + o.desc + '</div>');
    });

    // construct scoreboard legend and stylesheet
    legend.innerHTML = legend.segsHTML.join('');
    style.innerHTML = '.bg-goldenrod { background-color: goldenrod; } .bg-yellowgreen { background-color: yellowgreen; } .bg-aquamarine { background-color: aquamarine; } .bg-yellow { background-color: yellow; } .bg-peachpuff { background-color: peachpuff; }';

    // style lead and scoreboard legend
    lead.className = 'list-group text-center mb-3';
    legend.className = 'row no-gutters mb-3';

    // remove last most legend table
    document.querySelector('table:last-of-type').outerHTML = '';

    // style existing tables
    document.querySelectorAll('table').forEach(function (e) {
      e.className = 'table table-sm table-bordered table-hover m-0';
      e.outerHTML = '<div class="table-responsive mb-3">' + e.outerHTML + '</div>';
    });

    // convert dls to tables
    document.querySelectorAll('dl').forEach(function (e) {
      stats.push(e.innerHTML.replace(/<dt>(.*?): ?(.*?)<\/dt>/gs, '<tr><td>$1</td><td>$2</td></tr>'));
      e.parentElement.removeChild(e);
    });

    // reconstruct scoreboard
    load.innerHTML = document.querySelector('pre').innerHTML.replace(/./gs, function (m) {
      return map[m] ? '<span style="width: 12px; height: 12px; margin-bottom: 2px; margin-right: 2px;" class="load d-inline-block text-center ' + map[m].color + '"></span>' : '';
    });

    // apply mods to document removing unneeded elements
    document.body.innerHTML = '<div class="container-fluid py-3 px-lg-0" style="max-width: 768px;">' + stats.join('')
      + '</table></div>' + document.body.innerHTML.replace(/<hr ?\/?>|<pre>.*<\/pre>|<p>.*<\/p>/gs, '') + '</div>';

    // modal last most detailed stat table
    toggler.table = document.querySelector('.table-responsive:last-of-type');

    // construct bootstrap modal
    document.modal = document.createElement('div');
    document.modal.backdrop = document.createElement('div');
    document.modal.innerHTML = '<div class="modal-dialog modal-xl"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Comprehensive Statistics</h5><button type="button" class="close" data-dismiss="modal" aria-label="close" onclick="document.modal.close()"><span aria-hidden="true">&times;</span></button></div><div class="modal-body p-0">' + toggler.table.outerHTML + '</div></div></div>';
    document.modal.backdrop.className = 'modal-backdrop show';
    document.modal.className = 'modal';

    // construct modal opener method
    document.modal.close = function (event) {
      document.body.removeChild(document.modal.backdrop);
      document.body.classList.remove('modal-open');
      document.modal.classList.remove('d-block');
    };

    // construct modal closer method
    document.modal.open = function (event) {
      document.body.appendChild(document.modal.backdrop);
      document.body.classList.add('modal-open');
      document.modal.classList.add('d-block');
    };

    // construct modal opener button
    toggler.onclick = document.modal.open;
    toggler.table = toggler.table.parentElement.replaceChild(document.modal, toggler.table);
    toggler.innerHTML = '<span class="pr-2" style="vertical-align: middle;">Comprehensive Statistics</span><svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 576 512"><path fill="currentColor" d="M576 24v127.984c0 21.461-25.96 31.98-40.971 16.971l-35.707-35.709-243.523 243.523c-9.373 9.373-24.568 9.373-33.941 0l-22.627-22.627c-9.373-9.373-9.373-24.569 0-33.941L442.756 76.676l-35.703-35.705C391.982 25.9 402.656 0 424.024 0H552c13.255 0 24 10.745 24 24zM407.029 270.794l-16 16A23.999 23.999 0 0 0 384 303.765V448H64V128h264a24.003 24.003 0 0 0 16.97-7.029l16-16C376.089 89.851 365.381 64 344 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V287.764c0-21.382-25.852-32.09-40.971-16.97z"></path></svg>';
    toggler.className = 'list-group-item list-group-item-action py-1';
    toggler.style.cursor = 'pointer';

    // hide auto-generated title
    document.querySelector('h1').className = 'd-none';

    // construct lead stats from stray dts
    document.querySelectorAll('dt').forEach(function (e) {

      e.innerText.split(/,|-/).forEach(function (t) {
        lead.appendChild(e.mod = document.createElement('li'));
        e.mod.className = 'list-group-item py-1';
        e.mod.innerHTML = t;
      });

      e.outerHTML = '';

    });

    // comprehensive stats modal toggler
    lead.appendChild(toggler);

    // inject components
    document.body.firstElementChild.firstElementChild
      .insertAdjacentElement('afterend', load)
      .insertAdjacentElement('afterend', legend)
      .insertAdjacentElement('afterend', lead);

    // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha256-YLGeXaapI0/5IgZopewRJcFXomhRMlYYjugPLSyNjTY=" crossorigin="anonymous" />
    bootstrap.setAttribute('rel', 'stylesheet');
    bootstrap.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css');

    // define page dimensions and scaling
    meta.setAttribute('content', 'width=device-width, initial-scale=1, shrink-to-fit=no');
    meta.setAttribute('name', 'viewport');

    // inject libraries and metas
    document.head.insertAdjacentElement('afterbegin', meta);
    document.head.appendChild(bootstrap);
    document.head.appendChild(style);

  };

})();
