export default class Trig{

  public readonly OrbitType = {
    COS: 'cos',
    SIN: 'sin'
  };

  public distance(point1: {x: number, y: number}, point2: {x: number, y: number}):number {
    var distx:number = point2.x - point1.x;
    var disty:number = point2.y - point1.y;
    return Math.sqrt(Math.pow(distx, 2) + Math.pow(disty, 2));
  }
  public angle(point1: {x: number, y: number}, point2: {x: number, y: number}):number {

    var distx:number = point2.x - point1.x;
    var disty:number = point2.y - point1.y;
    var masterdist:number = this.distance(point1, point2);
    var primary_anglex:number = distx / masterdist;
    var anglex:number = Math.asin(primary_anglex) * 180 / Math.PI;
    var primary_angley:number = disty / masterdist;
    var angley:number = Math.asin(primary_angley) * 180 / Math.PI;
    var resultVal:number;
    if (disty < 0) {
        resultVal = anglex;
    }
    else if (disty >= 0 && distx >= 0) {
        resultVal = angley + 90;
    }
    else if (disty >= 0 && distx < 0) {
        resultVal = (angley * -1) - 90;
    }
    return resultVal;

  }
  public orbit(_center:number, _radius:number, _angle:number, orbitType: string):number {

    var resultVal;
    if (orbitType == this.OrbitType.COS) {
        resultVal = _center + (Math.cos(this.degreesToRadians(_angle)) * _radius);
    }
    if (orbitType == this.OrbitType.SIN) {
        resultVal = _center + (Math.sin(this.degreesToRadians(_angle)) * _radius);
    }
    return resultVal;
  }
  public degreesToRadians(deg:number):number{
    return deg * (Math.PI / 180)
  }
  public radiansToDegrees(rad:number):number{
    return rad * (180 / Math.PI)
  }
  public intersection(_tl:{x: number, y: number},_tr:{x: number, y: number},_br:{x: number, y: number},_bl:{x: number, y: number})
  {

    var a1 = _br.y - _tl.y;
    var b1 = _tl.x - _br.x;
    var a2 = _bl.y - _tr.y;
    var b2 = _tr.x - _bl.x;

    var denom = a1 * b2 - a2 * b1;
    //alert(_br.y);
    //if (denom == 0) return null;

    var c1 = _br.x * _tl.y - _tl.x * _br.y;
    var c2 = _bl.x * _tr.y - _tr.x * _bl.y;

    var p = {x:(b1 * c2 - b2 * c1)/denom, y:(a2 * c1 - a1 * c2)/denom};

    //if (getDistance(p, _br) > getDistance(_tl, _tr)) return null;
    //if (getDistance(p, _tl) > getDistance(_tl, _tr)) return null;
    //if (getDistance(p, _bl) > getDistance(_br, _bl)) return null;
    //if (getDistance(p, _tr) > getDistance(_br, _bl)) return null;

    return p;
  }
}
