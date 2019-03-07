export default class ConfigLoader{
  constructor(_configPath: string, _onComplete: any){
    var xmlhttp = new XMLHttpRequest();
    var url = _configPath + '?x=' + Math.random().toString().split('.').join('');
    xmlhttp.onreadystatechange = function() {
      console.log(this.status);
      if (this.readyState == 4 && this.status == 200) {
        _onComplete(this.responseText);
        // self.placeObjects(JSON.parse(this.responseText), container);
        // this.initialize(JSON.parse(this.responseText));
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }
}

