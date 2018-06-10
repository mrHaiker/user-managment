let Controllers = {};
let Services = {};

Services.firebase = firebase;

(function () {

  router();
  window.addEventListener("hashchange", () => router());

  function router (route, data){
    route = route || location.hash.slice(1) || 'login';

    let temp = route.split('?');
    let route_split = temp.length;
    let function_to_invoke = temp[0].replace('/', '') || 'login';
    let params;

    if (route_split > 1){
      params = extract_params(temp[1]);
    }

    //fire away...
    if(function_to_invoke){
      getView(function_to_invoke, params);
    }
  }

  function getView(view, params) {
    fetch(`/views/${view}.html`, {headers: new Headers({'content-type': 'text/html'})})
      .then((val) => val.text())
      .then((res) => {
        view = view === 'register' ? 'login' : view;

        if (params) Services.router = { params };

        window[view] = new Controllers[view](Services);
        document.getElementById('outlet').innerHTML = res;
      })
      .catch(err => {
        console.log('Error!!!', err)
      })
  }

  function extract_params (params_string){
    let params = {};
    let raw_params = params_string.split('&');

    let j = 0;
    for (let i = raw_params.length - 1; i >= 0; i--){
      let url_params = raw_params[i].split('=');
      if (url_params.length === 2){
        params[url_params[0]] = url_params[1];
      }
      else if (url_params.length === 1){
        params[j] = url_params[0];
        j += 1;
      }
      else {
        //param not readable. pass.
      }
    }

    return params;
  }

})();
